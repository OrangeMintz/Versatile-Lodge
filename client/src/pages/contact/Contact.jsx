import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./contact.css";
import axios from "axios";
import Footer from "../../component/footer";
import Navbar from "../../component/Navbar";
import FAQ from "../../component/FAQ";

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

                <MapContainer center={center} zoom={19} style={{ width: '100%', height: '700px' }}>
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

            <FAQ/>

            <Footer />
        </div >


    );
}

export default Contact;
