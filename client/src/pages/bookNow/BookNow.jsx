import Navbar from '../../component/Navbar';
import Footer from '../../component/footer';
import './bookNow.css';

const BookNow = () => {

    const handleUserBtnClick = () => {                      // for toggling profile
        const profile = document.querySelector('.profile');
        profile.classList.toggle('active');
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="detailsWrapper">
                    <div className="imageContainer">
                        <p className="centered-text">Versatile Lodge</p>
                        <img src="../assets/images/home-img-1.jpg" alt="Lodge Logo" />
                    </div>
                    <div className="details">
                        <h1>Booking Details</h1>
                        <p className='name'>Name: <span>Doroth</span> </p>
                        <p className='fromDate'>From Date: <span>11-05-2023</span></p>
                        <p className='toDate'>To Date: <span>11-07-2023</span></p>
                        <p className='maxCount'>Max Count: <span>11-07-2023</span></p>
                        <h1>Amount</h1>
                        <p className="totalDays">Total Days: <span>2</span></p>
                        <p className="totalDays">Rent Per Day: <span>1200</span></p>
                        <h1>Total Amount: 3000</h1>
                        <button className='payBtn'>Pay Now</button>

                    </div>
                </div>
            </div>
            <Footer />
        </div>


    );
}

export default BookNow;
