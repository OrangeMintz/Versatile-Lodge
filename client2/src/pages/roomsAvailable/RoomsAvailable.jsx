import React, { useContext, useEffect, useState } from 'react';
import './roomsAvailable.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import useFetch from "../../hooks/useFetch";
import moment from 'moment';

const RoomsAvailable = () => {
    const navigate = useNavigate();

    // Check LOGON
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

    const { data, loading, error, reFetch } = useFetch("/api/room/");
    const currentDate = moment().format('MM/DD/YYYY');

    // State to store the available rooms
    const [availableRooms, setAvailableRooms] = useState([]);

    useEffect(() => {
        // Filter out rooms with overlapping bookings and unavailable rooms
        const filteredRooms = data.filter(room => {
            if (room.unavailable) {
                return false; // Exclude rooms marked as unavailable
            }

            if (!room.currentbookings || room.currentbookings.length === 0) {
                return true; // Room has no current bookings
            }

            // Check if any booking overlaps with the current date
            return room.currentbookings.every(booking => {
                const bookingStartDate = moment(booking.fromDate, 'MM-DD-YYYY').format('MM/DD/YYYY');
                const bookingEndDate = moment(booking.toDate, 'MM-DD-YYYY').format('MM/DD/YYYY');

                return moment(currentDate).isBefore(bookingStartDate) || moment(currentDate).isAfter(bookingEndDate);
            });
        });

        // Update the state with the filtered rooms
        setAvailableRooms(filteredRooms);
    }, [data, currentDate]);

    useEffect(() => {
        // Set up an interval to refetch data every 5 minutes (adjust as needed)
        const intervalId = setInterval(() => {
            reFetch();
        }, 5 * 60 * 1000); // 5 minutes

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [reFetch]);

    // State for search term
    const [searchTerm, setSearchTerm] = useState('');
    // State for selected location
    const [selectedLocation, setSelectedLocation] = useState('all'); // 'all' or initial default value

    //FILTER BY BRANCHES
    const filterRoomsByLocation = (rooms, location) => {
        if (location.toLowerCase() === 'all') {
            return rooms;
        } else {
            return rooms.filter(room => room.branch.toLowerCase() === location.toLowerCase());
        }
    };

    // Move filteredRooms after selectedLocation is defined
    const filteredRooms = availableRooms
        .filter(room => {
            const branchMatch = selectedLocation.toLowerCase() === 'all' || room.branch.toLowerCase() === selectedLocation.toLowerCase();
            const nameMatch = room.name.toLowerCase().includes(searchTerm.toLowerCase());
            const maxPeopleMatch = room.maxPeople.toString().includes(searchTerm);
            const priceMatch = room.price.toString().includes(searchTerm);

            return branchMatch && (nameMatch || maxPeopleMatch || priceMatch);
        });




    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    return (
        <div className="roomsAvailablePage">
            <HeaderAdmin />
            <Sidebar />
            <section className="roomsAvailable">
                <h1 className="heading">Available Rooms</h1>
                <div className="roomState">
                    <Link className="stateBtn state">Available Rooms</Link>
                    <Link to="/roomsUnavailable">Unavailable Rooms</Link>
                    <select value={selectedLocation} onChange={handleLocationChange}>
                        <option value="all">All</option>
                        <option value="Malaybalay">Malaybalay</option>
                        <option value="Valencia">Valencia</option>
                        <option value="Maramag">Maramag</option>
                    </select>
                    <div className="searchNadd">
                        <input className="searchRoom" type="text" placeholder="Search here..." value={searchTerm} onChange={handleSearch} />
                    </div>
                </div>
                <div className="addRoom">
                    <span>+ Add Room</span>
                </div>
                {/* {availableRooms.map(room => ( */}
                {filteredRooms.map(room => (
                    <div key={room._id} className="roomsRow">
                        <div className="roomsRowWrapper">
                            <img src={room.imageurls[0]} alt="" />
                            <div className="roomDetails">
                                <p className='sub-heading'>{room.branch}</p>
                                <p>{room.name}</p>
                                <p className='sub'>Per Day: {room.price}</p>
                                <p className='sub'>Max People: {room.maxPeople}</p>
                            </div>
                            <div className="roomButtons">
                                <button className="roomBtn"><span className='fa-solid fa-pencil'></span></button>
                                <button className="roomBtn-archive"><span className='fa-solid fa-trash'></span></button>
                            </div>
                        </div>
                    </div>
                ))}


            </section>

            <Footer />
        </div>
    );
};

export default RoomsAvailable;
