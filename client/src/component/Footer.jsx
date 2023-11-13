import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
    return (
        <div>
            <section className="footer">
                <div className="box-container">
                    <div className="box">
                        <a href="tel:1234567890">
                            <i className="fas fa-phone"></i>+123-456-7890
                        </a>
                        <a href="tel:1111122333">
                            <i className="fas fa-phone"></i>+111-226-3333
                        </a>
                        <a href="mailto:example@gmail.com">
                            <i className="fas fa-envelope"></i>VersatileLodge@gmail.com
                        </a>
                        <a href="#">
                            <i className="fas fa-map-marker-alt"></i>Valencia, Bukidnon - 8709
                        </a>
                    </div>
                    <div className="box">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/room">Rooms</Link>
                        <Link to="/reviews">Contact</Link>
                        <Link to="/reviews">Reviews</Link>
                    </div>
                    <div className="box">
                        <Link to="https://web.facebook.com/people/Versatile-Lodging-House/100063942217887/?_rdc=1&_rdr">
                            Facebook<i className="fab fa-facebook"></i>
                        </Link>
                        <a href="#">
                            Youtube<i className="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>

                <div className="credit">
                    &copy; Copyright @ 2023 by Versatile-Lodge | All Rights Reserved
                </div>
            </section>
        </div>
    )
}

export default Footer