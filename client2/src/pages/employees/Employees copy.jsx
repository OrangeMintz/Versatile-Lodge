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

const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Address', accessor: 'address' },
    { Header: 'Birthday', accessor: 'birthday' },
    { Header: 'Number', accessor: 'phoneNumber' },
    { Header: 'Sex', accessor: 'sex' },
    { Header: 'Role', accessor: 'role' },
    {
        Header: 'Options',
        accessor: 'options',
        Cell: ({ row, setOpenModal }) => (
            <button className='option-btn' onClick={() => setOpenModal(true)}>
                Option
            </button>
        ),
        disableSortBy: true,
    },
];

const Employees = () => {
    const navigate = useNavigate();

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);

    // Check LOGON
    const { user, setUser } = useContext(UserContext);
    const [operationsComplete, setOperationsComplete] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data including the role from the /profile endpoint
                const profileResponse = await axios.get('/profile');
                setUser(profileResponse.data); // Assuming setUser is a state updater function

                // Fetch employee data using the /admin/user endpoint
                const employeeResponse = await axios.get('/admin/user');
                setData(employeeResponse.data);
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

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        state,
        setGlobalFilter,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
    } = useTable(
        { columns, data, initialState: { pageIndex: 0 }, setOpenModal: setOpenEditModal },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { pageIndex, globalFilter } = state;

    // State to track the selected user ID
    const [selectedUserId, setSelectedUserId] = useState(null);

    // Function to handle row clicks or selection
    const handleRowClick = (userId) => {
        setSelectedUserId(userId);
        setOpenEditModal(true);
    };


    return (
        <div className='employeesMain employeesPage'>
            <HeaderAdmin role={user?.isAdmin ? 'Admin' : user?.isManager ? 'Manager' : 'Employee'} />
            <Sidebar />

            <section className="employees">
                <h1 className="heading">Our Employees</h1>
                {/* <EmployeeEditModal open={openEditModal} onClose={() => setOpenEditModal(false)} /> */}
                <EmployeeEditModal open={openEditModal} onClose={() => setOpenEditModal(false)} userId={selectedUserId} />


                <EmployeeAddModal open={openAddModal} onClose={() => setOpenAddModal(false)} />

                <div className="search-container">
                    <input
                        className='searchInput'
                        placeholder='Search here...'
                        id="search"
                        type="text"
                        value={globalFilter || ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                </div>

                <span className="addEmployee" onClick={() => setOpenAddModal(true)}>+ Add Employees</span>
                <div className="employeesContainer">
                    {loading && <Loader />} {/* Show Loader while data is being fetched */}

                    {!loading && !error && (
                        <table {...getTableProps()} className="employeesTable">
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th className="theaderMain" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                <span className="theader">
                                                    {column.id !== 'options' ? (
                                                        <>
                                                            {column.render('Header')}
                                                            <span className="arrows">
                                                                {' '}
                                                                {column.isSorted ? (column.isSortedDesc ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>) : <span><i className="fas fa-chevron-down"></i><i className="fas fa-chevron-up"></i></span>}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        column.render('Header')
                                                    )}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} onClick={() => handleRowClick(row.original.id)}>
                                            {row.cells.map((cell) => (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}

                    {error && <Error message="Error fetching user data" />}
                </div>

                <div className="pagination">
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Previous
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {state.pageIndex + 1} of {Math.ceil(data.length / state.pageSize)}
                        </strong>{' '}
                    </span>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        Next
                    </button>{' '}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Employees;
