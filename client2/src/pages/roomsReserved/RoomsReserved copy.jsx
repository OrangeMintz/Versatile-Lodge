import React, { useContext, useEffect, useState } from 'react';
import './roomsReserved.css'; // Make sure to import your CSS file
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

const RoomsReserved = () => {

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

        const reservedBookings = room.currentbookings.filter(booking => booking.status === 'reserved');

        return reservedBookings.map(reservedBooking => ({
            room,
            reservedBooking,
        }));
    }).filter(({ room }) => filterRooms(room));


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
                        // Update the room by removing the expired reservation
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


    const handleConfirm = async (roomId, bookingid, userId) => {
        console.log('Room ID:', roomId);
        console.log('Booking ID:', bookingid);
        console.log('User ID:', userId);

        try {
            // Update room status to "booked"
            await axios.put(`/api/room/${roomId}/confirmBooking/${bookingid}`);

            // Fetch the updated room data
            const response = await axios.get(`/api/room/${roomId}`);
            const room = response.data;

            // Find the confirmed booking
            const confirmedBooking = room.currentbookings.find(booking => booking.bookingid === bookingid);

            // Filter out overlapping reservations with status 'reserved'
            const overlappingReservations = room.currentbookings.filter(booking => {
                return (
                    booking.status === 'reserved' &&
                    (
                        (booking.fromDate === confirmedBooking.fromDate && booking.toDate === confirmedBooking.toDate) ||
                        (
                            moment(booking.toDate, 'MM-DD-YYYY').isSameOrAfter(moment(confirmedBooking.fromDate, 'MM-DD-YYYY')) &&
                            moment(booking.fromDate, 'MM-DD-YYYY').isSameOrBefore(moment(confirmedBooking.toDate, 'MM-DD-YYYY'))
                        )
                    )
                );
            });

            // Auto-delete overlapping reservations
            if (overlappingReservations.length > 0) {
                const bookingsToRemove = overlappingReservations.map(booking => booking.bookingid);
                await axios.put(`/api/bookingHistory/updateStatus`, { userIds: overlappingReservations.map(booking => booking.userId) });
                await axios.put(`/api/room/${roomId}/removeOverlappingBookings`, { bookingIds: bookingsToRemove });
            }

            // If a user has reserved 2 times on the same room, keep the confirmed booking and remove the overlapping one
            const userReservations = room.currentbookings.filter(booking => booking.userId === userId && booking.status === 'reserved');
            if (userReservations.length > 1) {
                const overlappingUserBooking = userReservations.find(booking =>
                    moment(booking.toDate, 'MM-DD-YYYY').isSameOrAfter(moment(confirmedBooking.fromDate, 'MM-DD-YYYY')) &&
                    moment(booking.fromDate, 'MM-DD-YYYY').isSameOrBefore(moment(confirmedBooking.toDate, 'MM-DD-YYYY'))
                );

                if (overlappingUserBooking) {
                    // Remove the overlapping user reservation
                    await axios.put(`/api/room/${roomId}/removeOverlappingBookings`, { bookingIds: [overlappingUserBooking.bookingid] });
                }
            }

            window.location.reload();

            // Refresh the page or update the state to reflect changes
        } catch (error) {
            console.error('Error confirming booking:', error);
            toast.error('Error confirming booking. Please try again.');
        }
    };



    const handleReject = async (roomId, bookingid, userId) => {
        console.log('Room ID:', roomId);
        console.log('Booking ID:', bookingid);
        console.log('User ID:', userId);

        try {
            // Update room status to "available" (or whatever status you use for available rooms)
            await axios.put(`/api/room/${roomId}/rejectBooking/${bookingid}`);

            // Update user's booking history status to "Declined"
            await axios.put(`/api/bookingHistory/rejectBooking`, { bookingId: bookingid });

            // Refresh the page or update the state to reflect changes
            window.location.reload();
        } catch (error) {
            console.error('Error rejecting booking:', error);
            toast.error('Error rejecting booking. Please try again.');
        }
    };

    return (
        <div>
            <HeaderAdmin />
            <Sidebar />

            <section className="roomsReserved">
                <h1 className="heading">Reserved Rooms (Reservation)</h1>
                <div className="roomState">
                    <Link className="stateBtn state">Reserved</Link>
                    <Link to="/roomsBooking">Booked</Link>
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
                <div className="Reserved">
                    <Link to="/Reservation"> + Reserved a Room</Link>
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
                                    <p className='sub'>Transaction ID: {reservedBooking.transactionId}</p>
                                    {reservedBooking.isManual && (
                                        <p className='sub' style={{ fontWeight: "bold", fontStyle: 'normal' }}>
                                            Walk-In Reservation
                                        </p>
                                    )}
                                </div>
                                <div className="roomButtons">
                                    {/* <button className="roomBtn"><span className='fa-solid fa-pencil'></span></button> */}
                                    {/* <div className="roomReservedContainer"> */}
                                    <button className="roomReserved" onClick={() => handleReject(room._id, reservedBooking.bookingid, reservedBooking.userId)}>Decline</button>
                                    {/* <button className="roomReserved" >Confirm</button> */}
                                    <button className="roomReserved" onClick={() => handleConfirm(room._id, reservedBooking.bookingid, reservedBooking.userId)}>Confirm</button>
                                    {/* <button className="roomBtn-archive"><span className='fa-solid fa-trash'></span></button> */}

                                    {/* </div> */}
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

export default RoomsReserved;