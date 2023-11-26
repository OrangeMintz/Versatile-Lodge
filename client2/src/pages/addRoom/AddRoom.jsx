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
    if (operationsComplete && user && user.isEmployee === true) {
      toast.error("Unauthorized Access");
      navigate('/dashboard');
    }
  }, [user, operationsComplete, navigate]);





  const [formData, setFormData] = useState({
    roomName: '',
    branch: '',
    price: '',
    maxPeople: '',
    description: '',
    images: null,
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
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  const submitForm = () => {
    // Create a FormData object to easily handle file uploads
    const formDataObject = new FormData();

    // Append form data to the FormData object
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images') {
        for (let i = 0; i < value.length; i++) {
          formDataObject.append('images[]', value[i]);
        }
      } else {
        formDataObject.append(key, value);
      }
    });

    // You can now send the formDataObject to your server using AJAX or other methods
    // Example using Fetch API (you might need to adjust this based on your backend)
    fetch('/your-api-endpoint', {
      method: 'POST',
      body: formDataObject,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Handle success, e.g., show a success message to the user
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error, e.g., show an error message to the user
      });
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
              id="roomName"
              name="roomName"
              value={formData.roomName}
              onChange={handleInputChange}
              required
            />



            {/* choose between input text or dropdown for the Branch*/}

            <label htmlFor="branch">Branch:</label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              required
            />

            {/* <label htmlFor="branch">Branch:</label>
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
                            </select> */}



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
              id="description"
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>

            <label htmlFor="images">Images:</label>
            <input
              className="file"
              type="file"
              id="images"
              name="images"
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