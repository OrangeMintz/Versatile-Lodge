import './addRoom.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../../components/userContext';
import axios from 'axios';
import { Link } from 'react-router-dom';



const AddRoom = () => {

  const navigate = useNavigate();

  // CHECK LOGON

  const { user, setUser } = useContext(UserContext);
  const [operationsComplete, setOperationsComplete] = useState(false);

  useEffect(() => {
    if (!user) {
      axios
        .get('/profile/admin')
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        })
        .finally(() => {
          setOperationsComplete(true);
        });
    }
  }, [user, setUser]);

  useEffect(() => {
    if (operationsComplete && !user) {
      navigate('/401');
      toast.error("Unauthorized Access");
    }
    if (operationsComplete && user && user.isManager === true) {
      toast.error("Unauthorized Access");
      navigate('/dashboard');
    }

    else if (operationsComplete && user && user.isReceptionist === true) {
      toast.error("Unauthorized Access");
      navigate('/dashboard');
    }
  }, [user, operationsComplete, navigate]);

  const [file, setFile] = useState("")
  const [image, setImage] = useState("")
  const [uploadedImage, setUploadedImage] = useState("")
  const [branch, setBranch] = useState("");


  function previewFiles(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);

  }

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    maxPeople: '',
    desc: '',
  });

  const checkRoomName = async () => {
    try {
      const response = await axios.get('/api/room/');
      const rooms = response.data;
      return rooms.some(room => room.branch === formData.branch && room.name === formData.name);
    } catch (error) {
      console.error('Error checking room name:', error);
      return false;
    }
  };


  const createRoom = async (e) => {
    e.preventDefault();

    //file
    // console.log(e.target.files)

    const { name, price, maxPeople, desc } = formData;

    const isTaken = await checkRoomName();

    const isValidRoomNameFormat = /^[Rr]oom \d+/.test(name);


    if (isTaken) {
      toast.error('Room name is already taken. Please choose a different name.');
      return;
    }

    if (!isValidRoomNameFormat) {
      toast.error('Room name should start with "Room " followed by a number.');
      return;
    }

    if (branch !== "Malaybalay" && branch !== "Valencia" && branch !== "Maramag") {
      toast.error('Branch does not exists.');
      return;
    }

    if (price <= 0) {
      toast.error('Price cannot be 0 or negative.');
      return;
    }

    else if (price < 50) {
      toast.error('Price too low.');
      return;
    }

    if (maxPeople <= 0) {
      toast.error('Maximum people should be at least 1 above.');
      return;
    }

    if (!desc) {
      toast.error('Description Required');
      return;
    }

    try {
      const { formData } = await axios.post(`/api/room/`, {
        name,
        branch,
        price,
        maxPeople,
        desc,
        imageurls: image,
      });

      //
      try {
        // console.log(formData)
        setUploadedImage(uploadedImage);

      } catch (error) {
        console.log(error)
      }
      // 
      if (formData.error) {
        toast.error(formData.error);
      } else {
        setFormData({
          name: '',
          branch: '',
          price: '',
          maxPeople: '',
          desc: '',
        });
        toast.success('Added Room Successful');
        window.location.href = `${window.location.origin}/roomsAvailable`;
      }
    } catch (error) {
      // toast.error('An error occurred. Please try again.');
      window.location.href = `${window.location.origin}/roomsAvailable`;
    }

  };

  return (
    <div>
      <HeaderAdmin />
      <Sidebar />
      <section className="AddRoom">
        <div className="title-back">
          <h1 className="heading">Add Room</h1>
          <Link to="/roomsAvailable">&#8592; back</Link>
        </div>
        <div className="formContainer">
          <form onSubmit={createRoom}>

            <label htmlFor="roomName">Room Name:</label>
            {/* <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required placeholder='Enter Room Name' /> */}
            <input type="text" id="name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder='Enter Room Name' />


            <label htmlFor="branch">Branch:</label>
            <select id="branch" name="branch" value={branch} onChange={(e) => setBranch(e.target.value)} required >
              <option value="" defaultValue disabled> Select Branch</option>
              <option value="Malaybalay">Malaybalay</option>
              <option value="Valencia">Valencia</option>
              <option value="Maramag">Maramag</option>
            </select>

            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required placeholder='Enter Price' />


            <label htmlFor="maxPeople">Maximum People:</label>
            <input type="number" id="maxPeople" name="maxPeople" value={formData.maxPeople} onChange={(e) => setFormData({ ...formData, maxPeople: e.target.value })} required placeholder='Enter Maximum People' />

            <label htmlFor="description">Description:</label>
            <textarea id="desc" name="desc" rows="8" value={formData.desc} onChange={(e) => setFormData({ ...formData, desc: e.target.value })} required ></textarea>

            <label htmlFor="images">Images:</label>
            <input className="file" type="file" id="imageurls" name="imageurls" accept="image/png, image/jpeg, image/jpg" multiple onChange={handleChange} />

            <input type="submit" className="addRoomBtn" value="Add" />

          </form>
        </div>
      </section>
    </div>
  )
}
export default AddRoom;
