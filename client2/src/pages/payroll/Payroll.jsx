import React, { useContext, useEffect, useState } from 'react';
import './payroll.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { UserContext } from '../../components/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const Payroll = () => {

    const navigate = useNavigate()
    // Check LOGON
    const { user, setUser } = useContext(UserContext);
    const [operationsComplete, setOperationsComplete] = useState(false);
    useEffect(() => {
        if (!user) {
            axios
                .get('/profile')
                .then(({ data }) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                })
                .finally(() => {
                    // Set operationsComplete to true after data fetching is complete
                    setOperationsComplete(true);
                });
        }
    }, [user, setUser]);

    useEffect(() => {
        if (operationsComplete && !user) {
            toast.error("Unauthorized Access")
            navigate('/');
        }
        // if (operationsComplete && user && user.isEmployee == true) {
        //     navigate('/401');
        // }

        // if (operationsComplete && user && user.isManager == true) {
        //     navigate('/401');
        // }
    }, [user, operationsComplete, navigate]);
    // Check LOGON


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