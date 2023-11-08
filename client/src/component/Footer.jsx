import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div>
            <section className="footer">
                <div className="box-container">
                    <div className="box">
                        <Link to="tel:1234567890">
                            <i className="fas fa-phone"></i>+123-456-7890
                        </Link>
                        <Link to="tel:1111122333">
                            <i className="fas fa-phone"></i>+111-226-3333
                        </Link>
                        <Link to="VersatileLodge@gmail.com">
                            <i className="fas fa-envelope"></i>VersatileLodge@gmail.com
                        </Link>
                        <Link to="">
                            <i className="fas fa-map-marker-alt"></i>Valencia, Bukidnon - 8709
                        </Link>
                    </div>
                    <div className="box">
                        <Link to={'/'}> Home</Link>
                        <Link to={'/about'}> About</Link>
                        <Link to={'/room'}> Rooms</Link>
                        <Link to={'/contact'}> Contact</Link>
                        <Link to={'/reviews'}> Reviews</Link>
                    </div>
                    <div className="box">
                        <Link to="#">
                            Facebook<i className="fab fa-facebook"></i>
                        </Link>
                        <Link href="#">
                            Youtube<i className="fab fa-youtube"></i>
                        </Link>
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