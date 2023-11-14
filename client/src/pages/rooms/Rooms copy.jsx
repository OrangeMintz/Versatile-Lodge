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



import { DatePicker, Space, Button } from 'antd'
// import 'antd/dist/reset.css'

const Rooms = () => {

    const { data, loading, error } = useFetch("http://localhost:8000/api/room/")
    console.log("Rooms Data", data);


    const [allrooms, setallrooms] = useState()
    const [duplicateroom, setduplicateroom] = useState([])
    const [fromDate, setfromDate] = useState()
    const [toDate, settoDate] = useState()
    const { RangePicker } = DatePicker;

    // setallrooms(data)
    // setduplicateroom(data)


    function filterByDate(dates) {
        console.log((dates[0].format('MM-DD-YYYY')))
        console.log((dates[1].format('MM-DD-YYYY')))
        setfromDate((dates[0].format('MM-DD-YYYY')))
        settoDate((dates[1].format('MM-DD-YYYY')))


        // var temprooms = []
        // var availability = false
        // for (const data of duplicateroom) {
        //     for (const booking of data.currentbookings) {
        //         if (!moment((dates[0].format('MM-DD-YYYY'))).isBetween(booking.fromDate, booking.toDate) &&
        //             !moment((dates[0].format('MM-DD-YYYY'))).isBetween(booking.fromDate, booking.toDate)) {
        //             if (
        //                 (dates[0].format('MM-DD-YYYY')) !== booking.fromDate &&
        //                 (dates[0].format('MM-DD-YYYY')) !== booking.toDate &&
        //                 (dates[1].format('MM-DD-YYYY')) !== booking.fromDate &&
        //                 (dates[1].format('MM-DD-YYYY')) !== booking.toDate

        //             ) {
        //                 availability = true;
        //             }
        //         }

        //     }

        //     if (availability == true || room.currentbookings.length == 0) {
        //         temprooms.push(room)
        //     }
        // }
    }



    const handleUserBtnClick = () => {                      // for toggling profile
        const profile = document.querySelector('.profile');
        profile.classList.toggle('active');
    }

    const { user, setUser } = useContext(UserContext);
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


    const [navbarActive, setNavbarActive] = useState(false);

    const toggleNavbar = () => {
        setNavbarActive(!navbarActive);
    };

    return (
        <>
            <Navbar />
            {/* <!-- rooms section --> */}
            <section className="rooms">

                <h1>--- Explore Our Rooms ---</h1>
                <h1>{allrooms}</h1>



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

                {/* <!-- Create a dashed horizontal rule with a specific color --> */}
                {/* <hr style="border-style: solid; border-color: white"/> */}

                <div className="card-container">
                    {loading ? (<h1><Loader /></h1>) : error ? (<Error />)
                        : (
                            data
                                .slice() // Create a shallow copy of the data to avoid modifying the original array
                                .sort((room1, room2) => {
                                    // Extract the room number from the room names
                                    const roomNumber1 = parseInt(room1.name.match(/\d+/)[0]);
                                    const roomNumber2 = parseInt(room2.name.match(/\d+/)[0]);
                                    // Compare the room numbers
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
