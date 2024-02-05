import './bookingHistoryDetails.css';
import Navbar from '../../component/Navbar';
import Footer from '../../component/footer';

const BookingHistoryDetails = () => {
    return (
        <div>
            <Navbar />
                <section className="BookingHistoryDetails">
                    <div className="left">
                        <img src="https://th.bing.com/th/id/OIP.JWTWxw5Z9DkkxK4Mt16uyQHaEF?rs=1&pid=ImgDetMain" alt="" />
                        <h1 className="roomTxt">Room #1</h1>
                    </div>
                    <div className="right">
                        <h1>Booking History Details:</h1>
                        <p className="bookingId"><b>BookingID:</b> 1</p>
                        <p className='fromDate'><b>From Date:</b> November 17, 2023</p>
                        <p className='toDate'><b>To Date:</b> November 27, 2023</p>
                        <p className="roomNum"><b>Room Number:</b> 1</p>
                        <p className="branch"><b>Branch:</b> Malaybalay</p>    
                        <p className="status"><b>Status:</b> Accepted</p>   
                        <p className="totalDays"><b>Total Days:</b> 10 day/s</p>
                        <p className="totalDays"><b>Rent Per Day:</b> ₱50</p>
                        <p className="totalAmount"><b>Total Amount</b>: ₱100</p>
                    </div>

                </section>
            <Footer />
        </div>
    );
}

export default BookingHistoryDetails;