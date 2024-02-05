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
    // DONT REMOVE
    // // GOOGLE MAP API
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
    // GOOGLE MAP API


    const center = [7.917101367126545, 125.08983695765984];

    const locations = [
        [7.917101367126545, 125.08983695765984],
        [8.142743226351817, 125.12743448393374],
        [7.758363209056108, 125.00179601085193],
    ];

    const [weatherValencia, setWeatherValencia] = useState({});
    const [weatherMalaybalay, setWeatherMalaybalay] = useState({});
    const [weatherMaramag, setWeatherMaramag] = useState({});

    const weatherapikey = import.meta.env.VITE_REACT_APP_WEATHER_DATA;

    const weatherapi = {
        key: weatherapikey,
        base: 'https://api.openweathermap.org/data/2.5/',
    };

    useEffect(() => {
        // Fetch weather data for Valencia
        fetch(`${weatherapi.base}weather?lat=7.8632&lon=125.1709&units=metric&APPID=${weatherapi.key}`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setWeatherValencia(result);
            });

        // Fetch weather data for Malaybalay
        fetch(`${weatherapi.base}weather?lat=8.1479&lon=125.1321&units=metric&APPID=${weatherapi.key}`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setWeatherMalaybalay(result);
            });

        // Fetch weather data for Maramag
        fetch(`${weatherapi.base}weather?lat=7.7901&lon=124.9727&units=metric&APPID=${weatherapi.key}`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setWeatherMaramag(result);
            });
    }, []); // Empty dependency array ensures the effect runs once after the initial render



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
                {/* DONT REMOVE */}
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

                {/* Weather Information */}

                <div className="weather-container">
                    <div className="weatherBox1">
                        <div className="weatherTemp">
                            {weatherValencia.name && (
                                <p className="weather-info"><i className="weatherPlace">Valencia:</i>{weatherValencia.main.temp} °C</p>
                            )}
                        </div>
                        <div className="weatherDetails">
                            {weatherMaramag.main && weatherMaramag.main.humidity && (
                                <p className="weather-info">Humidty: {weatherMaramag.main.humidity}%</p>
                            )}

                            {weatherMaramag.wind && weatherMaramag.wind.speed && (
                                <p className="weather-info">Wind Speed: {weatherMaramag.wind.speed} MPH</p>
                            )}

                            {weatherValencia.weather && weatherValencia.weather[0] && (
                                <p className="weather-info">Condition: {weatherValencia.weather[0].description}</p>
                            )}
                        </div>

                    </div>
                    <div className="weatherBox2">
                        <div className="weatherTemp">
                            {weatherMalaybalay.name && (
                                <p className="weather-info"><i className="weatherPlace">Malaybalay:</i>{weatherMalaybalay.main.temp} °C</p>
                            )}
                        </div>
                        <div className="weatherDetails">
                            {weatherMaramag.main && weatherMaramag.main.humidity && (
                                <p className="weather-info">Humidity: {weatherMaramag.main.humidity}%</p>
                            )}

                            {weatherMaramag.wind && weatherMaramag.wind.speed && (
                                <p className="weather-info">Wind Speed: {weatherMaramag.wind.speed} MPH</p>
                            )}

                            {weatherMalaybalay.weather && weatherMalaybalay.weather[0] && (
                                <p className="weather-info">Condition: {weatherMalaybalay.weather[0].description}</p>
                            )}
                        </div>

                    </div>

                    <div className="weatherBox3">
                        <div className="weatherTemp">
                            {weatherMaramag.name && (
                                <p className="weather-info"><i className="weatherPlace">Maramag:</i>{weatherMaramag.main.temp} °C</p>
                            )}
                        </div>

                        <div className="weatherDetails">
                            {weatherMaramag.main && weatherMaramag.main.humidity && (
                                <p className="weather-info">Humidty: {weatherMaramag.main.humidity}%</p>
                            )}

                            {weatherMaramag.wind && weatherMaramag.wind.speed && (
                                <p className="weather-info">Wind Speed: {weatherMaramag.wind.speed} MPH</p>
                            )}


                            {weatherMaramag.weather && weatherMaramag.weather[0] && (
                                <p className="weather-info">Condition: {weatherMaramag.weather[0].description}</p>
                            )}
                        </div>

                    </div>
                </div>
            </section >




            <FAQ />

            <Footer />
        </div >


    );
}

export default Contact;
