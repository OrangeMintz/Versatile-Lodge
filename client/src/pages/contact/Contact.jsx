import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./contact.css";
import axios from "axios";
import Footer from "../../component/footer";
import Navbar from "../../component/Navbar";

// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const Contact = () => {

    //GOOGLE MAP API
    // const mapContainerStyle = {
    //     width: "100%",
    //     height: '600px',
    // };

    // const center = {
    //     lat: 7.917101367126545,
    //     lng: 125.08983695765984,
    // };

    // const locations = [
    //     // { lat: 8.142751171033453, lng: 125.12257864444442 },
    //     { lat: 7.917101367126545, lng: 125.08983695765984 }, // Another location
    //     { lat: 8.142743226351817, lng: 125.12743448393374 }, // Another location
    //     { lat: 7.758363209056108, lng: 125.00179601085193 }, // Another location
    // ];
    //GOOGLE MAP API


    const center = [7.917101367126545, 125.08983695765984];

    const locations = [
        [7.917101367126545, 125.08983695765984],
        [8.142743226351817, 125.12743448393374],
        [7.758363209056108, 125.00179601085193],
    ];


    return (
        <div>
            <Navbar />

            <section className="contact-heading">

                <h1>--- Contact Us ---</h1>

                <MapContainer center={center} zoom={19} style={{ width: '100%', height: '600px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {locations.map((location, index) => (
                        <Marker key={index} position={location}>
                            <Popup >
                                <p style={{ fontSize: "15px" }}>
                                    {index === 0 && 'Valencia Branch'}
                                    {index === 1 && 'Malaybalay Branch'}
                                    {index === 2 && 'Maramag Branch'}</p>

                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* <LoadScript googleMapsApiKey="AIzaSyBS1jYdTx1vV22gtxsF-8I7C95fVbJAsL8" onLoad={() => { }}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={19}
                    >
                        {locations.map((location, index) => (

                            <Marker
                                key={index}
                                position={location}
                            />
                        ))}
                    </GoogleMap>
                </LoadScript> */}




            </section >

            {/* <!-- contact section --> */}
            <section section className="contact" id="contact" >

                <div className="row">

                    <form action="" method="post">
                        <h3>send us message</h3>
                        <input type="text" name="name" required maxLength="50" placeholder="enter your name" className="box" />
                        <input type="email" name="email" required maxLength="50" placeholder="enter your email" className="box" />
                        <input type="number" name="number" required maxLength="10" min="0" max="99999999" placeholder="enter your number" className="box" />
                        <textarea name="msg" className="box" required maxLength="1000" placeholder="enter your message" cols="30" rows="10"></textarea>
                        <input type="submit" value="send message" name="send" className="btn" />
                    </form>

                    <div className="faq">
                        <h3 className="title">frequently asked questions</h3>
                        <div className="box">
                            <h3>how to cancel?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                        </div>
                        <div className="box">
                            <h3>is there any vacancy?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                        </div>
                        <div className="box">
                            <h3>what are payment methods?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                        </div>
                        <div className="box">
                            <h3>how to claim coupons codes?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                        </div>
                        <div className="box">
                            <h3>what are the age requirements?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptate vitae temporibus quis necessitatibus quos provident atque sapiente aperiam illum iusto fugiat  tenetur in cupiditate magni?</p>
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>

                </div>

            </section >

            <Footer />
        </div >


    );
}

export default Contact;
