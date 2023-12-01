import React, { useContext, useEffect, useState } from 'react';
import './roomsUnavailable.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { UserContext } from '../../components/userContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import moment from 'moment';

const RoomsUnavailable = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    // Check LOGON
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
                    // Set operationsComplete to true after data fetching is complete
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
    // Check LOGON

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/room/");
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const currentDate = moment().format('MM/DD/YYYY');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('all');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const filteredRooms = data.filter(room => {
        if (room.unavailable) {
            return true; // Room has unavailable boolean set to true, include from the list
        }

        if (!room.currentbookings || room.currentbookings.length === 0) {
            return false; // Room has no current bookings, include in the list
        }

        // Check if any booking overlaps with the current date (today)
        return room.currentbookings.some(booking => {
            const bookingStartDate = moment(booking.fromDate, 'MM-DD-YYYY').format('MM/DD/YYYY');
            const bookingEndDate = moment(booking.toDate, 'MM-DD-YYYY').format('MM/DD/YYYY');

            const isOverlapping = moment(currentDate).isBetween(bookingStartDate, bookingEndDate, null, '[]');
            const isReserved = booking.status === 'reserved';

            // Only include the room if it overlaps with the current date and is not reserved
            return isOverlapping && !isReserved;
        });
    });

    const filteredAndSearchedRooms = filteredRooms
        .filter(room => {
            const branchMatch = selectedLocation.toLowerCase() === 'all' || room.branch.toLowerCase() === selectedLocation.toLowerCase();
            const nameMatch = room.name.toLowerCase().includes(searchTerm.toLowerCase());
            const maxPeopleMatch = room.maxPeople.toString().includes(searchTerm);
            const priceMatch = room.price.toString().includes(searchTerm);

            return branchMatch && (nameMatch || maxPeopleMatch || priceMatch);
        });


    const sortedRooms = filteredAndSearchedRooms.sort((room1, room2) => {
        // Compare by room name
        const nameComparison = room1.name.localeCompare(room2.name);

        if (nameComparison !== 0) {
            return nameComparison;
        }

        // Compare by status (booked first)
        const status1 = room1.currentbookings.some(booking => booking.status === 'booked');
        const status2 = room2.currentbookings.some(booking => booking.status === 'booked');

        if (status1 && !status2) {
            return -1;
        } else if (!status1 && status2) {
            return 1;
        }

        return 0;
    });



    const handleShowModal = (roomId) => {
        setSelectedRoomId(roomId);
        setShowModal(true);
    };

    const handleHideModal = () => {
        setSelectedRoomId(null);
        setShowModal(false);
    };

    const handleConfirmArchive = async () => {
        try {

            // Fetch the details of the room before it's archived
            const roomDetailsResponse = await axios.get(`/api/room/${selectedRoomId}`);
            const roomDetails = roomDetailsResponse.data;

            // Call the API to archive the room
            await axios.delete(`/api/room/${selectedRoomId}`);
            toast.success(`Room archived successfully!`);
            // Refetch data after archiving
            reFetch();
            await axios.post(`/api/room/archive`, roomDetails);


        } catch (error) {
            console.error('Error archiving room:', error);
        } finally {
            // Hide the modal
            handleHideModal();
        }
    };

    return (
        <div className='roomsUnavailablePage'>
            <HeaderAdmin />
            <Sidebar />
            <section className="roomsUnavailable">
                <h1 className="heading">Occupied Rooms</h1>
                <div className="roomState">
                    <div className="links">
                        <Link to="/roomsAvailable">Available Rooms</Link>
                        <Link className="stateBtn state">Unavailable Rooms</Link>
                    </div>
                    <div className="searchNselect">
                        <select value={selectedLocation} onChange={handleLocationChange}>
                            <option value="all">All</option>
                            <option value="Malaybalay">Malaybalay</option>
                            <option value="Valencia">Valencia</option>
                            <option value="Maramag">Maramag</option>
                        </select>
                        <input className="searchRoom" type="text" placeholder="Search here..." value={searchTerm} onChange={handleSearch} />
                    </div>
                </div>


                {loading && <Loader />}
                {error && <Error />}
                {!loading && !error && (
                    sortedRooms.map(room => (
                        <div key={room._id} className="roomsRow">
                            <div className="roomsRowWrapper">
                                <img src={room.imageurls[0]} alt="" />
                                <div className="roomDetails">
                                    <p className='sub-heading'>{room.branch}</p>
                                    <p>{room.name}</p>
                                    <p className='sub'>Per Day: {room.price}</p>
                                    <p className='sub'>Max People:{room.maxPeople}</p>
                                </div>
                                <div className="roomButtons">
                                    {/* <button className="roomBtn"><span className='fa-solid fa-pencil'></span></button> */}
                                    <Link to={`/room/edit/${room._id}`} className="roomBtn-pencil"><span className='fa-solid fa-pencil'></span></Link>
                                    <button className="roomBtn-trashcan" onClick={() => handleShowModal(room._id)}>
                                        <span className='fa-solid fa-trash'></span>
                                    </button>
                                    <p className="roomAvailability">
                                        {room.unavailable ? "Maintenance" : room.currentbookings.some(booking => booking.status === 'booked') ? "Booked" : "Available"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </section>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="overlay">
                    <div className="modal">
                        <p>Are you sure you want to archive this room?</p>
                        <button onClick={handleHideModal}>No</button>
                        <button onClick={handleConfirmArchive}>Yes</button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default RoomsUnavailable;