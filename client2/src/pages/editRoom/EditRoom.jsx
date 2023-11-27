import './editRoom.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../../components/userContext';
import axios from 'axios';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { Link } from 'react-router-dom';


const EditRoom = () => {
    const navigate = useNavigate();

    // CHECK LOGIN
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

    const { id } = useParams();
    const [roomData, setRoomData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        branch: '',
        price: '',
        maxPeople: '',
        status: '',
        images: null,
        desc: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`/api/room/${id}`)
            .then((response) => {
                setRoomData(response.data);
                setFormData({
                    branch: response.data.branch,
                    status: response.data.unavailable ? 'Maintenance' : 'Available',
                });
            })
            .catch((error) => {
                console.error('Error fetching room data:', error);
                setError('Error fetching room data. Please try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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

        if (isTaken) {
            toast.error('Room name is already taken. Please choose a different name.');
            return;
        }

        if (!isValidRoomNameFormat) {
            toast.error('Room name should start with "Room " followed by a number.');
            return;
        }

        axios
            .put(`/api/room/${id}`, formData)
            .then((response) => {
                console.log('Success:', response.data);
                window.location.href = `${window.location.origin}/roomsAvailable`;
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Error updating room. Please try again later.');
                toast.error(error);
            });
    };

    return (
        <div>
            <HeaderAdmin />
            <Sidebar />
            <section className="AddRoom">
                <div className="title-back">
                    <h1 className="heading">Edit Room</h1>
                    <Link to="/roomsAvailable">back</Link>     
                </div>
                <div className="formContainer">
                    {loading && <Loader />}
                    {error && <Error />}
                    {!loading && !error && roomData && (
                        <form onSubmit={submitForm}>
                            <label htmlFor="name">Room Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder={roomData ? roomData.name : "Room Name"}
                            />

                            <label htmlFor="branch">Branch:</label>
                            <select id="branch" name="branch" value={formData.branch} onChange={handleInputChange}>
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
                                placeholder={roomData ? roomData.price.toString() : "Price"}
                            />

                            <label htmlFor="maxPeople">Maximum People:</label>
                            <input
                                type="number"
                                id="maxPeople"
                                name="maxPeople"
                                value={formData.maxPeople}
                                onChange={handleInputChange}
                                placeholder={roomData ? roomData.maxPeople.toString() : "Maximum People"}
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

                            <label htmlFor="desc">Description:</label>
                            <textarea
                                id="desc"
                                name="desc"
                                rows="8"
                                value={formData.desc}
                                onChange={handleInputChange}
                                placeholder={roomData ? roomData.desc : "Room Description"}
                            ></textarea>

                            <button type="button" className="addRoomBtn" onClick={submitForm}>
                                Update Room
                            </button>
                        </form>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default EditRoom;