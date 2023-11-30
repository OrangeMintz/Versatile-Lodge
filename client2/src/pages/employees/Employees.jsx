import React, { useContext, useEffect, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import EmployeeEditModal from '../../components/EmployeeEditModal';
import EmployeeAddModal from '../../components/EmployeeAddModal';
import './employees.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../../components/userContext';

import DataTable from 'react-data-table-component'



const Employees = () => {
    const navigate = useNavigate();

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);

    // Check LOGON
    const { user, setUser } = useContext(UserContext);
    const [operationsComplete, setOperationsComplete] = useState(false);

    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data including the role from the /profile endpoint
                const profileResponse = await axios.get('/profile');
                setUser(profileResponse.data);

                // Fetch employee data using the /admin/user endpoint
                const employeeResponse = await axios.get('/admin/user');
                setData(employeeResponse.data);
                setOriginalData(employeeResponse.data); // Save the original data
            } catch (error) {
                console.error('Error fetching user or employee data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [setUser]);

    // Check LOGON
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
            navigate('/401');
            toast.error("Unauthorized Access");
        }
        if (operationsComplete && user && user.isManager === true) {
            toast.error("Unauthorized Access");
            navigate('/dashboard');
        }
    }, [user, operationsComplete, navigate]);
    // Check LOGON



    const columns = [
        {
            name: 'Role',
            selector: row => (row.isAdmin ? 'Admin' : row.isManager ? 'Manager' : 'Employee'),
            sortable: true

        },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Sex',
            selector: row => row.sex,
            sortable: true
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true
        },
        {
            name: 'Phone Number',
            selector: row => row.phoneNumber,
            sortable: true
        },
        {
            name: 'Birthday',
            selector: row => row.birthday,
            sortable: true
        },
        {
            name: 'Actions',
            cell: (row) => (
                <button className='option-btn' onClick={() => handleEdit(row._id)}>Update</button>
            ),
        },


    ];



    const customStyles = {
        headRow: {
            style: {
                borderTop: '1   px solid #dee2e6',
                fontSize: '14px',
                color: '#ffffff',
                fontWeight: 'bold',
                textAlign: 'center'
            },
        },
        headCells: {
            style: {
                color: '#2B1103',
                textAlign: 'center',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'center',
            },
        },
        cells: {
            style: {
                borderBottom: '1px solid #dee2e6',
                borderRight: '1px solid #dee2e6', // Add this line to include a right border
                padding: '10px', // Adjust padding as needed
            },
        },
        subHeader: {
            style: {
                background: 'var(--light-bg)', // Background color for the subheader
                borderBottom: '1px solid #dee2e6',
                textAlign: 'center',
                fontSize: '14px',
                padding: '10px',
            },
        },

    };

    const CustomNoDataMessage = () => (
        <div style={{ fontSize: '18px', textAlign: 'center', marginTop: '20px' }}>
            No records to be displayed
        </div>
    );

    const [searchText, setSearchText] = useState('');

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        setSearchText(searchText);

        if (searchText.trim() === '') {
            // If search text is empty, reset to the original data
            setData(originalData);
        } else {
            const filteredData = data.filter((row) =>
                Object.values(row).some(
                    (value) => typeof value === 'string' && value.toLowerCase().includes(searchText)
                )
            );
            setData(filteredData);
        }
    };

    const [editUserId, setEditUserId] = useState(null);
    const handleEdit = (userId) => {
        setEditUserId(userId);
        setOpenEditModal(true);
    };



    return (
        <div className='employeesMain employeesPage'>
            <HeaderAdmin role={user?.isAdmin ? 'Admin' : user?.isManager ? 'Manager' : 'Employee'} />
            <Sidebar />

            <section className="employees">
                <h1 className="heading">Our Employees</h1>
                {/* <EmployeeEditModal open={openEditModal} onClose={() => setOpenEditModal(false)} /> */}

                <EmployeeEditModal
                    open={openEditModal}
                    onClose={() => {
                        setEditUserId(null); // Reset the editUserId when modal is closed
                        setOpenEditModal(false);
                    }}
                    userId={editUserId}  // Pass the user ID to the modal
                />
                <EmployeeAddModal open={openAddModal} onClose={() => setOpenAddModal(false)} />


                <span className="addEmployee" onClick={() => setOpenAddModal(true)}>+ Add Employee</span>

                {loading && <Loader />}
                {error && <Error />}
                {!loading && !error && (
                    <div className="employeesContainer" style={{ marginTop: '70px' }}>

                        <DataTable
                            columns={columns}
                            data={data}
                            fixedHeader
                            fixedHeaderScrollHeight="500px"
                            pagination
                            theme="solarized"
                            customStyles={customStyles}
                            subHeader
                            noDataComponent={<CustomNoDataMessage />}

                            subHeaderComponent={<div>
                                <input
                                    className="searchInput"
                                    placeholder="Search here..."
                                    type="text"
                                    value={searchText}
                                    onChange={handleSearch}
                                />
                            </div>}
                        />
                    </div>
                )}

            </section>

            <Footer />
        </div>
    );
};

export default Employees;
