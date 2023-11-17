import Navbar from '../../component/Navbar';
import Footer from '../../component/footer';
import Loader from '../../component/Loader';
import Error from '../../component/Error';
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import moment from 'moment'; // Import moment library
import './bookingHistory.css';

const BookingHistory = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await axios.get(`/api/bookingHistory/${id}`);
        setBookingHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking history:', error);
        setError('Error fetching booking history. Please try again.');
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, [id]);




  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/bookingHistory/${bookingId}`);
      // Update the bookingHistory state to reflect the removal of the canceled booking
      setBookingHistory((prevBookingHistory) =>
        prevBookingHistory.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.error('Error canceling booking:', error);
      // Handle error
    }
  };



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

      {/* Booking History section */}
      <section className="booking-history">
        <h1>---Booking History---</h1>

        {loading && <Loader />}
        {error && <Error />}

        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>Reserved</th>
                <th>Room</th>
                <th>Branch</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
              <tr>
                <td>Reserved</td>
                <td>Room</td>
                <td>Branch</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>Amount</td>
                <td>Status</td>
                <td>button</td>
              </tr>
              <tr>
                <td>Reserved</td>
                <td>Room</td>
                <td>Branch</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>Amount</td>
                <td>Status</td>
                <td>button</td>
              </tr>
              <tr>
                <td>Reserved</td>
                <td>Room</td>
                <td>Branch</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>Amount</td>
                <td>Status</td>
                <td>cancel</td>
              </tr>
              <tr>
                <td>Reserved</td>
                <td>Room</td>
                <td>Branch</td>
                <td>Start Date</td>
                <td>End Date</td>
                <td>Amount</td>
                <td>Status</td>
                <td>cancel</td>
              </tr>
              
            </thead>
            <tbody>
              {bookingHistory.map((booking) => (
                <tr key={booking._id}>
                  <td>{moment(booking.bookingDate).format('MM-DD-YYYY:HH:mm:ss')}</td>
                  <td>{booking.roomName}</td>
                  <td>{booking.branch}</td>
                  <td>{moment(booking.checkInDate).format('MM-DD-YYYY')}</td>
                  <td>{moment(booking.checkOutDate).format('MM-DD-YYYY')}</td>
                  <td>{`₱${booking.price}`}</td>
                  <td>{booking.status}</td>
                  <td><button className='btnDetail' onClick={() => handleCancelBooking(booking._id)}>Cancel</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default BookingHistory;
