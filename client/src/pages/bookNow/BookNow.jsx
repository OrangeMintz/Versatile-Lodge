import Footer from '../../component/footer';
import './bookNow.css';

const BookNow = () => {

    const handleUserBtnClick = () => {                      // for toggling profile
        const profile = document.querySelector('.profile');
        profile.classList.toggle('active');
    }

    return (
        <div>
            <section className="header">
                <div className="flex">
                    <a href="#home" className="logo">Versatile Lodge</a>
                    <div className="menu fas fa-bars" id="menu-btn"></div>
                </div>

                <nav className="navbar">
                    <a href="./">Home</a>
                    <a href="./about">About</a>
                    <a href="./rooms" className="active">Rooms</a>
                    <a href="./contact">Contact</a>
                    <a href="./reviews">Reviews</a>
                    <img src="assets/images/user4.jpg" id="user-btn" alt="user" onClick={handleUserBtnClick} />
                    {/* <!-- <select id="dropdown">
                    <option value="" selected>Profile</option>
                    <option value="booking-history.html">Booking History</option>
                    <option value="account-setting.html">Account Settings</option>
                    <option value="login.html">Log out</option>
                </select> --> */}
                    <div className="profile">
                        <img src="assets/images/user4.jpg" alt="" />
                        <h3>Anzai Mitsuyoshi</h3>
                        <span>client</span>
                        <a href="accountSetting" className="btn">View Profile</a>
                        <div className="flex-btn">
                            <a href="bookingHistory" className="option-btn">History</a>
                            <a href="login" className="option-btn">Logout</a>
                        </div>
                    </div>
                </nav>
            </section>

            <div className="container">
                <div className="detailsWrapper">
                    <div className="imageContainer">
                        <p className="centered-text">Versatile Lodge</p>
                        <img src="assets/images/home-img-1.jpg" alt="Lodge Logo" />
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
