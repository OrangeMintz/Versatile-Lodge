import React, { useContext, useEffect, useState } from 'react';
import './roomsUnavailable.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { UserContext } from '../../components/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import Loader from '../../components/Loader';
import Error from '../../components/Error';
import moment from 'moment';

const RoomsUnavailable = () => {
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

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/room/");
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

            // Check if the current date is within the booking range
            return moment(currentDate).isBetween(bookingStartDate, bookingEndDate, null, '[]');
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

    return (
        <div>
            <HeaderAdmin />
            <Sidebar />

            <section className="roomsUnavailable">
                <h1 className="heading">Occupied Rooms</h1>
                <div className="roomState">
                    <a href="./roomsAvailable">Available Rooms</a>
                    <a className="stateBtn state">Unavailable Rooms</a>
                </div>

                <div className="searchNadd">
                    <select value={selectedLocation} onChange={handleLocationChange}>
                        <option value="all">All</option>
                        <option value="Malaybalay">Malaybalay</option>
                        <option value="Valencia">Valencia</option>
                        <option value="Maramag">Maramag</option>
                    </select>
                    <input className="searchRoom" type="text" placeholder="Search here..." value={searchTerm} onChange={handleSearch} />
                </div>

                {/* Display unavailable rooms */}
                {loading && <Loader />}
                {error && <Error />}
                {!loading && !error && (
                    filteredAndSearchedRooms.map(room => (
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
                                    <button className="roomBtn">Update</button>
                                    {room.unavailable && (
                                        <p className="roomAvailability">{room.unavailable ? "Maintenance" : "Available"}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </section>

            <Footer />
        </div>
    );
};

export default RoomsUnavailable;




// import React, { useContext, useEffect, useState } from 'react';
// import './roomsUnavailable.css';
// import HeaderAdmin from '../../components/HeaderAdmin';
// import Sidebar from '../../components/Sidebar';
// import Footer from '../../components/Footer';
// import { UserContext } from '../../components/userContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// import Loader from '../../components/Loader';
// import Error from '../../components/Error';
// import moment from 'moment';

// const RoomsUnavailable = () => {
//     const navigate = useNavigate();

//     // Check LOGON
//     const { user, setUser } = useContext(UserContext);
//     const [operationsComplete, setOperationsComplete] = useState(false);

//     useEffect(() => {
//         if (!user) {
//             axios
//                 .get('/profile')
//                 .then(({ data }) => {
//                     setUser(data);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching user profile:', error);
//                 })
//                 .finally(() => {
//                     // Set operationsComplete to true after data fetching is complete
//                     setOperationsComplete(true);
//                 });
//         }
//     }, [user, setUser]);

//     useEffect(() => {
//         if (operationsComplete && !user) {
//             navigate('/401');
//             toast.error("Unauthorized Access");
//         }
//         if (operationsComplete && user && user.isEmployee === true) {
//             toast.error("Unauthorized Access");
//             navigate('/dashboard');
//         }
//     }, [user, operationsComplete, navigate]);
//     // Check LOGON

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8000/api/room/");
//                 setData(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const currentDate = moment().format('MM/DD/YYYY');

//     const filteredRooms = data.filter(room => {
//         if (room.unavailable) {
//             return true; // Room has unavailable boolean set to true, include from the list
//         }

//         if (!room.currentbookings || room.currentbookings.length === 0) {
//             return false; // Room has no current bookings, include in the list
//         }



//         // Check if any booking overlaps with the current date (today)
//         return room.currentbookings.some(booking => {
//             const bookingStartDate = moment(booking.fromDate, 'MM-DD-YYYY').format('MM/DD/YYYY');
//             const bookingEndDate = moment(booking.toDate, 'MM-DD-YYYY').format('MM/DD/YYYY');

//             // Check if the current date is within the booking range
//             return moment(currentDate).isBetween(bookingStartDate, bookingEndDate, null, '[]');
//         });
//     });



//     return (
//         <div>
//             <HeaderAdmin />
//             <Sidebar />

//             <section className="roomsUnavailable">
//                 <h1 className="heading">Occupied Rooms</h1>
//                 <div className="roomState">
//                     <a href="./roomsAvailable">Available Rooms</a>
//                     <a className="stateBtn state">Unavailable Rooms</a>
//                 </div>

//                 {/* Display unavailable rooms */}
//                 {loading && <Loader />}
//                 {error && <Error />}
//                 {!loading && !error && (
//                     filteredRooms.map(room => (
//                         <div key={room._id} className="roomsRow">
//                             <div className="roomsRowWrapper">
//                                 <img src={room.imageurls[0]} alt="" />
//                                 <div className="roomDetails">
//                                     <p className='sub-heading'>{room.branch}</p>
//                                     <p>{room.name}</p>
//                                     <p className='sub'>Per Day: {room.price}</p>
//                                     <p className='sub'>Max People:{room.maxPeople}</p>
//                                 </div>
//                                 <div className="roomButtons">
//                                     <button className="roomBtn">Update</button>
//                                     {room.unavailable && (
//                                         <p className="roomAvailability">{room.unavailable ? "Maintenance" : "Available"}</p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </section>

//             <Footer />
//         </div>
//     );
// };

// export default RoomsUnavailable;
