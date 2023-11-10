import React, { useState } from 'react';
import "./bookingHistory.css"
import Footer from '../../component/footer';
import Navbar from '../../component/Navbar';

const BookingHistory = () => {

  return (
    <div>
      <Navbar />

      {/* Booking History section */}
      <section className="booking-history">
        <h1>---Booking History---</h1>
        <table>
          <tr>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Room#</th>
            <th>Branch</th>
            <th>Amount</th>
          </tr>
          <tr>
            <td>1</td>
            <td>2023-10-15</td>
            <td>101</td>
            <td>Branch A</td>
            <td>$150.00</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2023-10-16</td>
            <td>203</td>
            <td>Branch B</td>
            <td>$200.00</td>
          </tr>
          <tr>
            <td>3</td>
            <td>2023-10-17</td>
            <td>305</td>
            <td>Branch C</td>
            <td>$175.00</td>
          </tr>
        </table>
      </section>

      <Footer />

    </div>
  );
};

export default BookingHistory;