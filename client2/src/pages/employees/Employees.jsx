import React from 'react';
import './employees.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';


const Employees = () => {
    return (
        <div>
            <HeaderAdmin />
            <Sidebar />

            <section className="employees">
                <h1 className="heading">Our Employees</h1>
                <span className="addEmployee">+ Add Employees</span>
                <div className="employeesContainer">
                    <table className="employeesTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Birthday</th>
                                <th>Number</th>
                                <th>    </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Chizuru Mizuhara</td>
                                <td>exampleexampleexample@gmail.com</td>
                                <td>Sumpon</td>
                                <td>May 14, 2023</td>
                                <td>09123465789</td>
                                <td><a href="/profileEmployee" className='option-btn'>Option</a></td>
                            </tr>
                            <tr>
                                <td>Mr Boy Alucardo</td>
                                <td>example@gmail.com</td>
                                <td>Sumpon</td>
                                <td>May 14, 2023</td>
                                <td>09123465789</td>
                                <td><a href="#" className='option-btn'>Option</a></td>
                            </tr>
                            <tr>
                                <td>Ramon</td>
                                <td>example@gmail.com</td>
                                <td>Sumpon</td>
                                <td>May 14, 2023</td>
                                <td>09123465789</td>
                                <td><a href="#" className='option-btn'>Option</a></td>
                            </tr>
                            <tr>
                                <td>Ramon</td>
                                <td>example@gmail.com</td>
                                <td>Sumpon</td>
                                <td>May 14, 2023</td>
                                <td>09123465789</td>
                                <td><a href="#" className='option-btn'>Option</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Employees;