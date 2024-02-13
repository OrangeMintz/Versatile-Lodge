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


  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    price: '',
    maxPeople: '',
    desc: '',
    imageurls: null,
    status: 'Available',

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { files } = e.target;

    // Check if files is not null or undefined
    if (files) {
      const acceptedFormats = ['image/jpeg', 'image/png', 'image/gif']; // Add more formats as needed

      for (let i = 0; i < files.length; i++) {
        // Check if the file type is in the accepted formats
        if (!acceptedFormats.includes(files[i].type)) {
          toast.error('Invalid image format. Please upload images in JPEG, PNG, or GIF format.');
          // Clear the selected files to prevent submission with invalid images
          e.target.value = null;
          setFormData((prevData) => ({
            ...prevData,
            imageurls: null,
          }));
          return;
        }
      }

      // If all files have valid formats, update the state
      setFormData((prevData) => ({
        ...prevData,
        imageurls: files,
      }));
    }
  };

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



  const submitForm = async (e) => {
    e.preventDefault();


    const isTaken = await checkRoomName();

    const isValidRoomNameFormat = /^[Rr]oom \d+/.test(formData.name);

    const acceptedFormats = ['image/jpeg', 'image/png', 'image/gif'];


    if (isTaken) {
      toast.error('Room name is already taken. Please choose a different name.');
      return;
    }

    if (!isValidRoomNameFormat) {
      toast.error('Room name should start with "Room " followed by a number.');
      return;
    }

    if (formData.branch !== "Malaybalay" && formData.branch !== "Valencia" && formData.branch !== "Maramag") {
      toast.error('Branch does not exists.');
      return;
    }

    if (formData.price < 50) {
      toast.error('Price too low.');
      return;
    }

    if (formData.maxPeople == 0) {
      toast.error('Maximum people should be at least 1 above.');
      return;
    }

    if (!formData.desc) {
      toast.error('Description Required');
      return;
    }

    if (!formData.imageurls) {
      toast.error('Images required');
      return;
    }

    if (!formData.status) {
      toast.error('Status required');
      return;
    }

    if (formData.imageurls) {
      for (let i = 0; i < formData.imageurls.length; i++) {
        if (!acceptedFormats.includes(formData.imageurls[i].type)) {
          toast.error('Invalid image format. Please upload images in JPEG, PNG, or GIF format.');
          return;
        }
      }
    } else {
      toast.error('Images required');
      return;
    }

    // Set unavailable based on status
    formData.status === 'Available'
      ? (formData.unavailable = false)
      : (formData.unavailable = true);

    try {
      // Create a FormData object to easily handle file uploads
      const formDataObject = new FormData();

      // Append form data to the FormData object
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'imageurls' && value) {
          for (let i = 0; i < value.length; i++) {
            formDataObject.append('imageurls', value[i]);
          }
        } else {
          formDataObject.append(key, value);
        }
      });

      // Send the formDataObject to your server using Axios
      const response = await axios.post('/api/room', formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
      window.location.href = `${window.location.origin}/roomsAvailable`;

    } catch (error) {
      console.error('Error:', error);
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
          <form>

            <label htmlFor="roomName">Room Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder='Enter Room Name'
            />

            <label htmlFor="branch">Branch:</label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              required
            >
              <option value="" defaultValue disabled>Select Branch</option>
              <option value="Malaybalay">Malaybalay</option>
              <option value="Valencia">Valencia</option>
              <option value="Maramag">Maramag</option>
            </select>

            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              placeholder='Enter Price'
            />

            <label htmlFor="maxPeople">Maximum People:</label>
            <input
              type="number"
              id="maxPeople"
              name="maxPeople"
              value={formData.maxPeople}
              onChange={handleInputChange}
              required
              placeholder='Enter Maximum People'
            />

            <label htmlFor="Status">Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Available">Available</option>
              <option value="Maintenance">Maintenance</option>
            </select>

            <label htmlFor="description">Description:</label>
            <textarea
              id="desc"
              name="desc"
              rows="8"
              value={formData.desc}
              onChange={handleInputChange}
              placeholder='Enter Description'
              required
            ></textarea>

            <label htmlFor="images">Images:</label>
            <input
              className="file"
              type="file"
              id="imageurls"
              name="imageurls"
              multiple
              // accept="image/*"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
              required
            />

            <button type="submit" className="addRoomBtn" onClick={submitForm}>
              Add Room
            </button>
          </form>
        </div>

      </section>


    </div>
  )
}

export default AddRoom;