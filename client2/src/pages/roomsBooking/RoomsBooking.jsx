import React, { useContext, useEffect, useState } from 'react';
import './roomsBooking.css'; // Make sure to import your CSS file
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

const RoomsBooking = () => {
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
        if (operationsComplete && user && user.isEmployee === true) {
            toast.error("Unauthorized Access");
            navigate('/dashboard');
        }
    }, [user, operationsComplete, navigate]);



    // CHECK LOGON

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

    const filterRooms = (room) => {
        const branchMatch = selectedLocation.toLowerCase() === 'all' || room.branch.toLowerCase() === selectedLocation.toLowerCase();
        const nameMatch = room.name.toLowerCase().includes(searchTerm.toLowerCase());
        const maxPeopleMatch = room.maxPeople.toString().includes(searchTerm);
        const priceMatch = room.price.toString().includes(searchTerm);

        // Check if any of the reserved bookings have a matching transactionId
        const hasMatchingTransactionId = room.currentbookings.some(booking =>
            booking.status === 'reserved' && booking.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return branchMatch && (nameMatch || maxPeopleMatch || priceMatch || hasMatchingTransactionId);
    };

    const filteredAndSearchedRooms = data.flatMap(room => {
        if (!room.currentbookings || room.currentbookings.length === 0) {
            return [];
        }

        const reservedBookings = room.currentbookings.filter(booking => booking.status === 'booked');

        return reservedBookings.map(reservedBooking => ({
            room,
            reservedBooking,
        }));
    }).filter(({ room }) => filterRooms(room));

    //ROOMS AUTO DELETE BOOKINGS
    // Function to automatically delete bookings with toDate in the past
    const autoDeleteBookings = async () => {
        try {
            // Fetch all rooms
            const response = await axios.get("/api/room/");
            const rooms = response.data;

            // Iterate through rooms and remove bookings with toDate in the past
            rooms.forEach(async (room) => {
                if (room.currentbookings && room.currentbookings.length > 0) {
                    const bookingsToRemove = room.currentbookings.filter(booking => {
                        const toDateMoment = moment(booking.toDate, 'MM-DD-YYYY');
                        return toDateMoment.isBefore(moment(), 'day');
                    });

                    if (bookingsToRemove.length > 0) {
                        // Update the room by removing the expired bookings
                        await axios.put(`/api/room/${room._id}`, { currentbookings: room.currentbookings.filter(booking => !bookingsToRemove.includes(booking)) });
                    }
                }
            });
        } catch (error) {
            console.error('Error auto-deleting bookings:', error);
        }
    };

    // Run auto-delete function on component mount
    useEffect(() => {
        autoDeleteBookings();

        // Schedule the auto-delete function to run periodically (e.g., every day)
        const intervalId = setInterval(() => {
            autoDeleteBookings();
            // }, 24 * 60 * 60 * 1000); // 24 hours
        }, 3 * 60 * 1000); // 3 minutes


        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);



    //DELETING BOOKING
    const deleteBooking = async (roomId, bookingId) => {
        try {
            await axios.delete(`/api/room/${roomId}/booking/${bookingId}`);
            window.location.reload();
            fetchData();
        } catch (error) {
            console.error('Error deleting booking:', error);
            window.location.reload();
        }
    };

    return (
        <div>
            <HeaderAdmin />
            <Sidebar />
            <section className="roomsBooking">
                <h1 className="heading">Booked Rooms (Bookings)</h1>
                <div className="roomState">
                    <Link to="/roomsReserved">Reserved</Link>
                    <Link className="stateBtn state" >Booked</Link>
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

                {/* Display reserved rooms */}
                {loading && <Loader />}
                {error && <Error />}
                {!loading && !error && (
                    filteredAndSearchedRooms.map(({ room, reservedBooking }) => (
                        <div key={`${room._id}-${reservedBooking.bookingid}`} className="roomsRow">
                            <div className="roomsRowWrapper">
                                <img src={room.imageurls[0]} alt="" />
                                <div className="roomDetails">
                                    <p className='sub-heading'>{room.branch}</p>
                                    <p>{room.name}</p>
                                    <p className='sub'>Per Day: {room.price}</p>
                                    <p className='sub'>Max People: {room.maxPeople}</p>
                                    <span className='sub'>Start Date: {reservedBooking.fromDate}</span>
                                    <span className='sub'>End Date: {reservedBooking.toDate}</span>
                                    <p className='sub'>Total Ammount: ₱{reservedBooking.totalAmount}</p>
                                    <p className='sub' style={{ fontWeight: "bold", fontStyle: 'normal' }}>{reservedBooking.transactionId}</p>
                                </div>
                                <div className="roomButtons">
                                    <button
                                        className="roomBtn-trashcan"
                                        onClick={() => deleteBooking(room._id, reservedBooking.bookingid)}
                                    >
                                        <span className='fa-solid fa-trash'></span>
                                    </button>
                                    <p className="roomBooked">{room.unavailable ? "Maintenance" : "Booked"}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}

            </section >

            < Footer />

        </div >
    )
}

export default RoomsBooking;