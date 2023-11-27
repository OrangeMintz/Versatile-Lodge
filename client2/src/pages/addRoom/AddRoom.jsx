import './addRoom.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../../components/userContext';
import axios from 'axios';


const AddRoom = () => {

  const navigate = useNavigate();
  // CHECK LOGON

  const { user, setUser } = useContext(UserContext);
  const [operationsComplete, setOperationsComplete] = useState(false);

  useEffect(() => {
    if (!user) {
      axios
        .get('/profile')
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
  }, [user, operationsComplete, navigate]);


  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    price: '',
    maxPeople: '',
    desc: '',
    imageurls: null,

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
      setFormData((prevData) => {
        console.log({ ...prevData, imageurls: files });
        return {
          ...prevData,
          imageurls: files,
        };
      });
    }
  };


  const submitForm = async () => {
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
      const response = await axios.post('http://localhost:8000/api/room', formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <HeaderAdmin />
      <Sidebar />
      <section className="AddRoom">
        <h1 className="heading">Add Room</h1>
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
            />

            <label htmlFor="branch">Branch:</label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Branch</option>
              <option value="Malaybalay">Malaybalay</option>
              <option value="Maramag">Maramag</option>
              <option value="Valencia">Valencia</option>
            </select>

            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="maxPeople">Maximum People:</label>
            <input
              type="number"
              id="maxPeople"
              name="maxPeople"
              value={formData.maxPeople}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="desc"
              name="desc"
              rows="2"
              value={formData.desc}
              onChange={handleInputChange}
            ></textarea>

            <label htmlFor="images">Images:</label>
            <input
              className="file"
              type="file"
              id="imageurls"
              name="imageurls"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />

            <button type="button" className="addRoomBtn" onClick={submitForm}>
              Add Room
            </button>
          </form>
        </div>

      </section>

      <Footer />
    </div>
  )
}

export default AddRoom;