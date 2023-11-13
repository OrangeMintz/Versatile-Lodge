import Navbar from '../../component/Navbar';
import Footer from '../../component/footer';
import Loader from '../../component/Loader';
import './bookNow.css';

import { UserContext } from '../../context/userContext';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import axios from 'axios';

import moment from 'moment'


const BookNow = () => {

    // Get Room
    const { id, fromDate, toDate } = useParams();
    const apiUrl = `http://localhost:8000/api/room/${id}`;
    const { data, loading, error } = useFetch(apiUrl);

    // Get Profile
    const { user, setUser } = useContext(UserContext);

    // Total Days
    const totalDays = moment(toDate).diff(moment(fromDate), 'days') + 1;

    const totalAmount = totalDays * data.price;


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
        <div>
            <Navbar />
            <div className="container">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <p>Error: {error.message}</p>
                ) : (
                    <div className="detailsWrapper">
                        <div className="imageContainer">
                            <p className="centered-text">{data.name}</p>
                            <img src={data.imageurls && data.imageurls.length > 0 ? data.imageurls[0] : ''} alt="Room Image" />
                        </div>
                        <div className="details">
                            <h1>Booking Detail:</h1>
                            <h2 className='name'>Name: {user.name}</h2>
                            <p className='name'>Room: {data.name} </p>
                            <p className='name'>Branch: {data.branch} </p>
                            <p className='fromDate'>From Date: <span>{fromDate}</span></p>
                            <p className='toDate'>To Date: <span>{toDate}</span></p>
                            <p className='maxCount'>Max Count: <span>{data.maxPeople}</span></p>
                            <h1>Amount</h1>
                            <p className="totalDays">Total Days: <span>{totalDays}</span></p>
                            <p className="totalDays">Rent Per Day: {data.price}</p>
                            <h1>Total Amount: ₱{totalAmount}</h1>
                            <Link to={`/payment/${id}`} className='payBtn'>Book Now</Link>

                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default BookNow;
