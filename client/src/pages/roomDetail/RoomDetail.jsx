import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch"
import "./roomdetail.css";
import Footer from "../../component/footer";
import Loader from "../../component/Loader";

import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import Navbar from "../../component/Navbar";
// import SwiperCarousel from "../../component/SwiperCarousel";

const RoomDetail = () => {
    const [navbarActive, setNavbarActive] = useState(false);

    const toggleNavbar = () => {
        setNavbarActive(!navbarActive);
    };

    const handleUserBtnClick = () => {                      // for toggling profile
        const profile = document.querySelector('.profile');
        profile.classList.toggle('active');
    }
    const { id } = useParams();
    const apiUrl = `http://localhost:8000/api/room/${id}`;
    const { data, loading, error } = useFetch(apiUrl)

    const [slideNumber, setSlideNumber] = useState(0); // Current image index

    const handleMove = (direction) => {
        if (direction === "l") {
            setSlideNumber((prevNumber) => (prevNumber === 0 ? data.imageurls.length - 1 : prevNumber - 1));
        } else {
            setSlideNumber((prevNumber) => (prevNumber === data.imageurls.length - 1 ? 0 : prevNumber + 1));
        }
    }

    useEffect(() => {
        if (data.imageurls) {
            const swiper = new Swiper(".home-slider", {
                loop: true,
                effect: "coverflow",
                spaceBetween: 30,
                grabCursor: true,
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
        }
    }, [data.imageurls]);

    return (
        <>
            <div>
                <Navbar />
                {loading ? (<h1 style={{ paddingTop: '20vh' }} ><Loader /></h1>) : error ? (<Error />)
                    : (
                        <section className="home" id="home">
                            <div className="swiper home-slider">
                                <div className="swiper-wrapper">
                                    {data && data.imageurls ? (
                                        data.imageurls.map((imageUrl, index) => (
                                            <div className="box swiper-slide" key={index}>
                                                <img src={imageUrl} alt={`Image ${index + 1}`} />
                                                {/* <img src={photos[slideNumber].src} alt="" className="sliderImg" /> */}

                                                <div className="swiper-button-prev" onClick={() => handleMove("l")}></div>
                                                <div className="swiper-button-next" onClick={() => handleMove("r")}></div>



                                            </div>
                                        ))
                                    ) : (
                                        <p>No images available</p>
                                    )}
                                </div>
                            </div>

                            <div className="availability" id="availability">
                                <div className="flex">
                                    <div className="room-details">
                                        <h3 className="room-name">{data.branch} {data.name}</h3>
                                        <div className="room-price">
                                            <h3 className="price">P{data.price}/Night</h3>
                                        </div>
                                    </div>
                                </div>
                                <h4>Description:</h4>
                                <p className="description"> {data.desc}</p>
                            </div>
                        </section>
                    )}

                <Footer />
            </div>
        </>

    );
}

export default RoomDetail;
