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
    const [searchTerm, setSearchTerm] = useState("");
    const { data, loading, error, reFetch } = useFetch("/api/room/");
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
        const fromDate = dates[0]?.format('MM-DD-YYYY');
        const toDate = dates[1]?.format('MM-DD-YYYY');
        setfromDate(fromDate);
        settoDate(toDate);

        const selectedBranch = document.querySelector('[name="branch"]').value;

        const availableRooms = originalData.filter(room => {
            const isDateAvailable = (
                room.currentbookings.length === 0 ||
                !room.currentbookings.some(booking =>
                    moment(fromDate).isBetween(booking.fromDate, booking.toDate, null, '[]') ||
                    moment(toDate).isBetween(booking.fromDate, booking.toDate, null, '[]') ||
                    moment(booking.fromDate).isBetween(fromDate, toDate, null, '[]') ||
                    moment(booking.toDate).isBetween(fromDate, toDate, null, '[]')
                )
            );

            const isBranchMatched = selectedBranch === 'All' || room.branch === selectedBranch;
            const isRoomAvailable = !room.unavailable; // Check the 'unavailable' property
            const isRoomBooked = room.currentbookings.some(booking => booking.status === 'booked');


            // return isDateAvailable && isBranchMatched && isRoomAvailable;
            return isDateAvailable && isBranchMatched && isRoomAvailable && !isRoomBooked;


        });

        setduplicateroom(availableRooms);
    }

    function filterByBranch(branch) {
        // Reset date values
        setfromDate(null);
        settoDate(null);

        // Reset the search input field to an empty string whenever the branch is changed
        setSearchTerm("");

        const filteredRooms = originalData.filter(room => {
            const isRoomAvailable = !room.unavailable; // Check the 'unavailable' property

            return branch === 'All' || (room.branch === branch && isRoomAvailable);



        });

        setduplicateroom(filteredRooms);
    }

    function filterBySearch(value) {
        // Reset the branch to 'All' whenever a keyword is typed in the search input
        const branchSelect = document.querySelector('[name="branch"]');
        branchSelect.value = 'All';

        const filteredRooms = originalData.filter(room => {
            const isNameMatched = room.name.toLowerCase().includes(value.toLowerCase());
            const isPriceMatched = room.price.toString().includes(value);
            const isRoomAvailable = !room.unavailable; // Check the 'unavailable' property



            // Check if the room is booked during the selected date range
            const isBookedDuringDateRange = (
                fromDate &&
                toDate &&
                room.currentbookings.some(booking =>
                    moment(fromDate).isBetween(booking.fromDate, booking.toDate, null, '[]') ||
                    moment(toDate).isBetween(booking.fromDate, booking.toDate, null, '[]') ||
                    moment(booking.fromDate).isBetween(fromDate, toDate, null, '[]') ||
                    moment(booking.toDate).isBetween(fromDate, toDate, null, '[]')
                )
            );

            return (isNameMatched || isPriceMatched) && !isBookedDuringDateRange && isRoomAvailable;

        });

        setduplicateroom(filteredRooms);
    }

    useEffect(() => {
        // Set both originalData and duplicateroom when the main data changes
        setOriginalData(data);

        // Filter out unavailable rooms by default
        const availableRooms = data.filter(room => !room.unavailable);
        setduplicateroom(availableRooms);
    }, [data]);

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
                            <select name="branch" className="input" required onChange={(e) => filterByBranch(e.target.value)}>
                                <option value="All">All</option>
                                <option value="Malaybalay">Malaybalay</option>
                                <option value="Valencia">Valencia</option>
                                <option value="Maramag">Maramag</option>
                            </select>
                        </div>
                    </form>
                    <div className='box'>
                        <RangePicker className='range-picker' format='MM-DD-YYYY' onChange={filterByDate} />
                    </div>
                    <form className="search-form">
                        <input
                            type="text"
                            name="search_box"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                filterBySearch(e.target.value);
                            }}
                        />
                        {/* Remove the submit button */}
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