import React from 'react';
import './payroll.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';


const Payroll = () => {
    return (
        <div>
            <HeaderAdmin />
            <Sidebar />

            <section className="payroll">
                <h1 className="heading">Payroll</h1>
                <div className="payrollContainer">
                    <table className="payrollTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Due Date</th>
                                <th>Payment Status</th>
                                <th>    </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Thrall Disruptor</td>
                                <td>November 15, 2023</td>
                                <td>Pending</td>
                                <td><a href="#" className='option-btn'>Generate</a></td>
                            </tr>
                            <tr>
                                <td>Troll Warlord</td>
                                <td>November 15, 2023</td>
                                <td>Pending</td>
                                <td><a href="#" className='option-btn'>Generate</a></td>
                            </tr>
                            <tr>
                                <td>Balanar Night Stalker</td>
                                <td>November 15, 2023</td>
                                <td>Pending</td>
                                <td><a href="#" className='option-btn'>Generate</a></td>
                            </tr>
                            <tr>
                                <td>Thirsty Blood Seeker</td>
                                <td>November 15, 2023</td>
                                <td>Pending</td>
                                <td><a href="#" className='option-btn'>Generate</a></td>
                            </tr>
                            <tr>
                                <td>Guardian OmniKnight</td>
                                <td>November 15, 2023</td>
                                <td>Pending</td>
                                <td><a href="#" className='option-btn'>Generate</a></td>
                            </tr>
                            <tr>
                                <td>Huskar Y. Reaper</td>
                                <td>November 15, 2023</td>
                                <td>Pending</td>
                                <td><a href="#" className='option-btn'>Generate</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Payroll;