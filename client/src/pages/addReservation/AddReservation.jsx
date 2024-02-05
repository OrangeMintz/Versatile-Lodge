import './AddReservation.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import React, { useContext, useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/userContext';
import toast from 'react-hot-toast';

const AddReservation = () => {
  const uuid = uuidv4();
  const { RangePicker } = DatePicker;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [branch, setBranch] = useState('');
  const [room, setRoom] = useState('');
  const [roomsData, setRoomsData] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const response = await axios.get('/api/room/');
        setRoomsData(response.data);
      } catch (error) {
        console.error('Error fetching rooms data:', error);
      }
    };

    fetchRoomsData();
  }, []);

  const handleDateChange = (dates) => {
    // Ensure dates is an array and has two elements
    if (Array.isArray(dates) && dates.length === 2) {
      const [start, end] = dates.map((date) => (date ? moment(date.format('MM-DD-YYYY')) : null));
      setStartDate(start);
      setEndDate(end);
    }
  };

  const handleBranchChange = (value) => {
    setBranch(value);
    // Reset room selection when branch changes
    setRoom('');
  };

  const handleRoomChange = (value) => {
    setRoom(value);
    const selected = roomsData.find((r) => r._id === value);
    setSelectedRoom(selected);
  };

  const getFilteredRooms = () => {
    const branchRooms = roomsData.filter((room) => room.branch === branch && !room.unavailable);

    const availableRooms = branchRooms.filter((room) => {
      const hasOverlappingBooking = room.currentbookings.some((booking) => {
        const bookingStartDate = moment(booking.fromDate, 'MM-DD-YYYY');
        const bookingEndDate = moment(booking.toDate, 'MM-DD-YYYY');

        return (
          booking.status === 'booked' &&
          startDate &&
          endDate &&
          (
            (startDate.isBetween(bookingStartDate, bookingEndDate, null, '[]') ||
              endDate.isBetween(bookingStartDate, bookingEndDate, null, '[]')) ||
            (bookingStartDate.isBetween(startDate, endDate, null, '[]') ||
              bookingEndDate.isBetween(startDate, endDate, null, '[]'))
          )
        );
      });

      return !hasOverlappingBooking;
    });

    return availableRooms;
  };

  useEffect(() => {
    if (startDate && endDate) {
      const days = moment.duration(endDate.diff(startDate)).asDays() + 1;
      setTotalDays(days);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (selectedRoom) {
      const amount = totalDays * selectedRoom.price;
      setTotalAmount(amount);
    }
  }, [totalDays, selectedRoom]);





  //CHECK filled datas
  // Function to check if all required fields are present
  // const areInputsValid = () => {
  //   return startDate && endDate && branch && room;
  // };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const areInputsValid = () => {
    return startDate && endDate && branch && room;
  };

  useEffect(() => {
    setIsButtonDisabled(!areInputsValid());
  }, [startDate, endDate, branch, room]);



  const bookRoom = async () => {
    const uuid = uuidv4();

    const bookingDetails = {
      room: selectedRoom.name,
      room_id: selectedRoom._id,
      branch: branch,
      fromDate: startDate.format('MM-DD-YYYY'),
      toDate: endDate.format('MM-DD-YYYY'),
      totalAmount: totalAmount.toString(),
      totalDays: totalDays.toString(),
      transactionId: uuid,
      status: 'reserved',
      isManual: true

    };

    try {
      // Create a booking entry
      const result = await axios.post('/api/booking/', bookingDetails);
      toast.success('Reserved Successfully');
      navigate("/roomsReserved")

      // Update the room's currentbookings
      const roomTemp = await axios.get(`/api/room/${selectedRoom._id}`);
      const updatedCurrentBookings = [
        ...roomTemp.data.currentbookings,
        {
          bookingid: result.data._id,
          fromDate: startDate.format('MM-DD-YYYY'),
          toDate: endDate.format('MM-DD-YYYY'),
          userId: user.id,
          status: 'reserved',
          isManual: true,
          totalAmount: totalAmount.toString(),
          transactionId: uuid


        },
      ];

      console.log("RESERVATION STATUS", updatedCurrentBookings)

      await axios.put(`/api/room/${selectedRoom._id}`, {
        ...roomTemp.data,
        currentbookings: updatedCurrentBookings,
      });

      // navigate('/'); // Redirect to the homepage after booking
      // window.location.href = `${window.location.origin}/roomsReserved`;

    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <Sidebar />
      <section className="AddRoom">
        <h1 className="heading">Reserved/Booked</h1>
        <div className="formContainer">
          <form>
            <label>Start & End Date:</label>
            <RangePicker
              style={{ padding: '5px' }}
              format="MM-DD-YYYY"
              onChange={handleDateChange}
              disabledDate={(current) => current && current < moment().startOf('day')}
              required
            />

            <label htmlFor="branch">Branch:</label>
            <select
              id="branch"
              name="branch"
              value={branch}
              onChange={(e) => handleBranchChange(e.target.value)}
              required
              disabled={!startDate || !endDate}
            >
              <option value="" defaultValue disabled>
                -- Select Branch --
              </option>
              {Array.from(new Set(roomsData.map((room) => room.branch))).map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>

            <label htmlFor="roomName">Room Name:</label>
            <select id="roomName" name="roomName" value={room}
              onChange={(e) => handleRoomChange(e.target.value)}
              required
              disabled={!startDate || !endDate || !branch}
            >
              <option value="" defaultValue disabled>-- Select Room --</option>
              {getFilteredRooms().map((room) => (
                <option key={room._id} value={room._id}>
                  {room.name}
                </option>
              ))}
            </select>
            {/* <button type="button" className="addRoomBtn" disabled={!areInputsValid()}>Add Reservation</button> */}
            <button type="button" className="addRoomBtn" disabled={isButtonDisabled} onClick={bookRoom}>Add Reservation</button>
          </form>

          {selectedRoom && (
            <div className='details' >
              <p>Price: <h3>₱ {selectedRoom.price} </h3> </p>
              <p>Total Days: <h3>{totalDays} Day/s </h3></p>
              <p>Total Amount:<h3>₱ {totalAmount}</h3> </p>
              <p>Maximum People: <h3>{selectedRoom.maxPeople} People</h3></p>
              <p>Transaction ID: <h3>{uuidv4()}</h3></p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AddReservation;
