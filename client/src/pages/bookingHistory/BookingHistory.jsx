import Navbar from '../../component/Navbar';
import Footer from '../../component/footer';
import Loader from '../../component/Loader';
import Error from '../../component/Error';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import moment from 'moment'; // Import moment library
import './bookingHistory.css';
import { toast } from 'react-hot-toast'


const BookingHistory = () => {
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingIdToCancel, setBookingIdToCancel] = useState(null);
  const navigate = useNavigate()

  // Check LOGON
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
      navigate('/login');
    }
  }, [user, operationsComplete, navigate]);
  // Check LOGON

  // Fetch booking history once user data is available
  useEffect(() => {
    // Ensure user is available and has an 'id'
    if (user && user.id) {
      const fetchBookingHistory = async () => {
        try {
          const response = await axios.get(`/api/bookingHistory/${user.id}`);
          setBookingHistory(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching booking history:', error);
          setError('Error fetching booking history. Please try again.');
          setLoading(false);
        }
      };

      fetchBookingHistory();
    }
  }, [user]);


  const handleCancelBooking = async (bookingId) => {
    // Show the confirmation modal and set the booking ID to cancel
    setShowModal(true);
    setBookingIdToCancel(bookingId);
  };

  const handleConfirmCancel = async () => {
    try {
      // Cancel the booking using the stored booking ID
      await axios.delete(`/api/bookingHistory/${bookingIdToCancel}`);
      toast.success('Reservation Cancelled Successfully')

      // Update the bookingHistory state to reflect the removal of the canceled booking
      setBookingHistory((prevBookingHistory) =>
        prevBookingHistory.filter((booking) => booking._id !== bookingIdToCancel)
      );

      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error('Error canceling booking:', error);
      toast.error('Error canceling reservation')

      // Handle error
    }
  };

  const handleCancel = () => {
    // Close the modal without canceling the booking
    setShowModal(false);
  };

  return (
    <>
      {user && (

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
                </thead>
                <tbody>
                  {bookingHistory.map((booking) => (
                    <tr key={booking._id}>
                      <td>{moment(booking.bookingDate).format('MMMM DD YYYY HH:mm:ss')}</td>
                      <td>{booking.roomName}</td>
                      <td>{booking.branch}</td>
                      <td>{moment(booking.checkInDate).format('MM-DD-YYYY')}</td>
                      <td>{moment(booking.checkOutDate).format('MM-DD-YYYY')}</td>
                      <td>
                        {`₱${Math.max(1, moment(booking.checkOutDate).diff(moment(booking.checkInDate), 'days') + 1) * booking.price}`}
                      </td>
                      <td>{booking.status}</td>
                      <td>
                        <span className='btnCancel' onClick={() => handleCancelBooking(booking._id)}>
                          Cancel
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          {/* Confirmation Modal */}
          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <p>Are you sure you want to cancel your booking?</p>
                <button onClick={handleCancel}>No</button>
                <button onClick={handleConfirmCancel}>Yes</button>

              </div>
            </div>
          )}

          <Footer />
        </div>
      )}
    </>
  );
};


export default BookingHistory;
