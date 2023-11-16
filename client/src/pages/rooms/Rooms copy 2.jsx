import React, { useContext, useEffect, useState } from 'react';
import useFetch from "../../hooks/useFetch"
import "./rooms.css";
import Loader from '../../component/Loader';
import Footer from '../../component/footer';
import Error from '../../component/Error';
import Navbar from '../../component/Navbar';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import moment from 'moment';
import { DatePicker } from 'antd';

const Rooms = () => {
    const { RangePicker } = DatePicker;
    const { data, loading, error, reFetch } = useFetch("http://localhost:8000/api/room/");
    const { user, setUser } = useContext(UserContext);
    const [fromDate, setfromDate] = useState();
    const [toDate, settoDate] = useState();
    const [originalData, setOriginalData] = useState([]); // Keep the original data
    const [duplicateroom, setduplicateroom] = useState([]);

    useEffect(() => {
        // Set both originalData and duplicateroom when the main data changes
        setOriginalData(data);
        setduplicateroom(data);
    }, [data]);


    function filterByDate(dates) {
        const fromDate = dates[0].format('MM-DD-YYYY');
        const toDate = dates[1].format('MM-DD-YYYY');
        setfromDate(fromDate);
        settoDate(toDate);

        const availableRooms = data.filter(room => {
            if (room.currentbookings.length > 0) {
                return !room.currentbookings.some(booking =>
                    moment(fromDate).isBetween(booking.fromDate, booking.toDate, null, '[]') ||
                    moment(toDate).isBetween(booking.fromDate, booking.toDate, null, '[]') ||
                    moment(booking.fromDate).isBetween(fromDate, toDate, null, '[]') ||
                    moment(booking.toDate).isBetween(fromDate, toDate, null, '[]')
                );
            } else {
                return true;
            }
        });

        setduplicateroom(availableRooms);
    }



    // function filterByDate(dates) {
    //     const fromDate = dates[0].format('MM-DD-YYYY');
    //     const toDate = dates[1].format('MM-DD-YYYY');
    //     setfromDate(fromDate);
    //     settoDate(toDate);

    //     const availableRooms = originalData.filter(room => {
    //         if (room.currentbookings.length > 0) {
    //             return !room.currentbookings.some(booking =>
    //                 moment(fromDate).isBetween(booking.fromDate, booking.toDate, null, '[]') ||
    //                 moment(toDate).isBetween(booking.fromDate, booking.toDate, null, '[]') ||
    //                 moment(booking.fromDate).isBetween(fromDate, toDate, null, '[]') ||
    //                 moment(booking.toDate).isBetween(fromDate, toDate, null, '[]')
    //             );
    //         } else {
    //             return true;
    //         }
    //     });

    //     setduplicateroom(availableRooms);
    // }


    useEffect(() => {
        if (!user) {
            axios
                .get('/profile')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                });
        }
    }, [user, setUser]);

    return (
        <>
            <Navbar />
            <section className="rooms">
                <h1>--- Explore Our Rooms ---</h1>
                <div className="flex">
                    <form action="">
                        <div className="box">
                            <select name="adults" className="input" required>
                                <option value="All">All</option>
                                <option value="Malabalay">Malabalay</option>
                                <option value="Valencia">Valencia</option>
                                <option value="Maramag">Maramag</option>
                            </select>
                        </div>
                    </form>
                    <div className='box'>
                        <RangePicker className='range-picker' format='MM-DD-YYYY' onChange={filterByDate} />
                    </div>
                    <form action="" method="post" className="search-form">
                        <input type="text" name="search_box" placeholder="Search..." required maxLength="100" />
                        <button type="submit" className="fas fa-search" name="search_box"></button>
                    </form>
                </div>
                <div className="card-container">
                    {loading ? (<h1><Loader /></h1>) : error ? (<Error />)
                        : (
                            duplicateroom
                                .slice()
                                .sort((room1, room2) => {
                                    const roomNumber1 = parseInt(room1.name.match(/\d+/)[0]);
                                    const roomNumber2 = parseInt(room2.name.match(/\d+/)[0]);
                                    return roomNumber1 - roomNumber2;
                                })
                                .map((room, index) => (
                                    <div className="card" key={index}>
                                        <img src={room.imageurls[0]} alt={room.name} />
                                        <div className="description">
                                            <div className="room-details">
                                                <h3 className="room-name">{room.name}</h3>
                                                <h2 className="price">P{room.price}/Night</h2>
                                            </div>
                                            <div className="detail">
                                                <h2 className="room-branch">{room.branch}</h2>
                                            </div>
                                            <p>{room.desc}</p>
                                            <div className="view-book">
                                                {user && user.id && fromDate && toDate && (
                                                    <Link to={`/room/booking/${room._id}/${fromDate}/${toDate}`}>Book Now</Link>
                                                )}
                                                <Link to={`/room/roomDetail/${room._id}`}>View Details</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Rooms;