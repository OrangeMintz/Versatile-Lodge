import Navbar from '../../component/Navbar';
import Footer from '../../component/footer';
import Loader from '../../component/Loader';
import './bookNow.css';

import { UserContext } from '../../context/userContext';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import axios from 'axios';
import moment from 'moment';
import Error from '../../component/Error';
import { toast } from 'react-hot-toast'

const BookNow = () => {
    const navigate = useNavigate();
    const { id, fromDate, toDate } = useParams();
    const apiUrl = `http://localhost:8000/api/room/${id}`;
    const { data, loading, error } = useFetch(apiUrl);
    const { user, setUser } = useContext(UserContext);

    const [isValidDates, setIsValidDates] = useState(true);

    const totalDays = isValidDates ? moment(toDate).diff(moment(fromDate), 'days') + 1 : 0;
    const totalAmount = totalDays * data.price;

    async function bookRoom() {
        const bookingDetails = {
            room: data.name,
            room_id: data._id,
            user_id: user && user.id,
            branch: data.branch,
            fromDate,
            toDate,
            totalAmount,
            totalDays,
        }

        try {
            // Create a booking entry
            const result = await axios.post('/api/booking/', bookingDetails);
            console.log(result);
            toast.success('Reserved Successfully');

            // Create a booking history entry
            await axios.post('/api/bookingHistory/', {
                user_id: user.id,
                reservation_id: result.data._id,
                room_id: data._id,
                fromDate,
                toDate,
                roomName: data.name,
                branch: data.branch,
                price: data.price,
            });

            navigate('/'); // Redirect to the homepage after booking

        } catch (error) {
            // Handle error
            console.error(error);
        }
    }

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

        // Check if fromDate and toDate are in valid date formats
        const isValidFromDate = moment(fromDate, 'MM-DD-YYYY', true).isValid();
        const isValidToDate = moment(toDate, 'MM-DD-YYYY', true).isValid();

        if (!isValidFromDate || !isValidToDate) {
            setIsValidDates(false);
        }
    }, [user, setUser, fromDate, toDate]);

    return (
        <div>
            <Navbar />
            <div className="container">
                {loading ? (
                    <Loader />
                ) : !isValidDates ? (
                    <Error />
                ) : (
                    <div className="detailsWrapper">
                        <div className="imageContainer">
                            <p className="centered-text">{data.name}</p>
                            <img src={data.imageurls && data.imageurls.length > 0 ? data.imageurls[0] : ''} alt="Room Image" />
                        </div>
                        <div className="details">
                            <h1>Booking Detail:</h1>
                            {/* <h2 className='name'>Name: {user.name}</h2> */}
                            <p className='name'><b>Name:</b> {user && user.name}</p>
                            <p className='name'><b>Room:</b> {data.name} </p>
                            <p className='name'><b>Branch:</b> {data.branch} </p>
                            <p className='fromDate'><b>From Date:</b> <span>{fromDate}</span></p>
                            <p className='toDate'><b>To Date:</b> <span>{toDate}</span></p>
                            <p className='maxCount'><b>Max People:</b> <span>{data.maxPeople}</span></p>
                            <h1>Amount</h1>
                            <p className="totalDays"><b>Total Days:</b> <span>{totalDays} day/s</span></p>
                            <p className="totalDays"><b>Rent Per Day:</b> ₱{data.price}</p>
                            <h1>Total Amount: ₱{totalAmount}</h1>
                            <Link className='payBtn' onClick={bookRoom}>Book Now</Link>

                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default BookNow;
