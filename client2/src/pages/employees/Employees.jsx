import React, { useContext, useEffect, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import EmployeeEditModal from '../../components/EmployeeEditModal';
import './employees.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Address', accessor: 'address' },
    { Header: 'Birthday', accessor: 'birthday' },
    { Header: 'Number', accessor: 'number' },
    { Header: 'Sex', accessor: 'sex' },
    {
        Header: 'Options',
        accessor: 'options',
        Cell: ({ row }) => (<button className='option-btn' onClick={() => setOpenModal(true)}>Option</button>),
        disableSortBy: true,
    },
];

const data = [
    { name: 'ccc', email: 'ccccccc@gmail.com', address: 'aaaaaaaaaaaaaaaaaa', birthday: 'August 14, 2023', number: '3333333333', sex: 'Male'},
    { name: 'bbbb', email: 'bbbbbbbbbbb@gmail.com', address: 'ddd', birthday: 'September 14, 2023', number: '2222222222', sex: 'Male' },
    { name: 'aaa', email: 'aaaaaaaaaaaaaa@gmail.com', address: 'ccc', birthday: 'Culling 13, 2023', number: '11111111', sex: 'Female' },
    { name: 'ddd', email: 'dddddddddddd@gmail.com', address: 'bbb', birthday: 'Grrr 14, 2023', number: '44444444444', sex: 'Male' },
    // Add more data as needed
];

const Employees = () => {

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
            navigate('/401');
            toast.error("Unauthorized Access")

        }
        if (operationsComplete && user && user.isEmployee == true) {
            toast.error("Unauthorized Access")
            navigate('/dashboard');

        }

        if (operationsComplete && user && user.isManager == true) {
            toast.error("Unauthorized Access")
            navigate('/dashboard');

        }
    }, [user, operationsComplete, navigate]);
    // Check LOGON



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
        { columns, data, initialState: { pageIndex: 0 } },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { pageIndex, globalFilter } = state;


    const [openModal, setOpenModal] = useState(false);


    // const openModalHandler = () => {
    //     setOpenModal(true);
    // };

    // const columnsWithActions = columns.concat({
    //     Header: 'Options',
    //     accessor: 'options',
    //     Cell: ({ row, cell }) => (
    //         <button {...cell.getCellProps()} className='option-btn' onClick={openModalHandler}>
    //             Option
    //         </button>
    //     ),
    //     disableSortBy: true,
    // });

    return (


        <div>
            <HeaderAdmin />
            <Sidebar />

            <section className="employees">
                <h1 className="heading">Our Employees</h1>
                
                <button style={{ backgroundColor: 'wheat', padding: '1rem', margin: '1rem', cursor: 'pointer'}} onClick={() => setOpenModal(true)}>
                    Modal
                </button>
                <EmployeeEditModal open={openModal} onClose={()=> setOpenModal(false)}/>
                
                <div className="search-container">
                    <input
                        className='searchInput'
                        placeholder='serach here..'
                        id="search"
                        type="text"
                        value={globalFilter || ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                </div>
                
                <span className="addEmployee">+ Add Employees</span>
                <div className="employeesContainer">
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
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Previous
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {Math.ceil(data.length / state.pageSize)}
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



// import React from 'react';
// import { useTable, useSortBy } from 'react-table';
// import './employees.css';
// import HeaderAdmin from '../../components/HeaderAdmin';
// import Sidebar from '../../components/Sidebar';
// import Footer from '../../components/Footer';


// const columns = [
//     { Header: 'Name', accessor: 'name', },
//     { Header: 'Email', accessor: 'email', },
//     { Header: 'Address', accessor: 'address', },
//     { Header: 'Birthday', accessor: 'birthday', },
//     { Header: 'Number', accessor: 'number', },
//     { Header: 'Options', accessor: 'options', Cell: ({ row }) => <a href="#" className='option-btn'>Option</a>, disableSortBy: true, },
// ];

// const data = [
//     { name: 'ccc', email: 'ccccccc@gmail.com', address: 'aaaaaaaaaaaaaaaaaa', birthday: 'August 14, 2023', number: '3333333333' },
//     { name: 'bbbb', email: 'bbbbbbbbbbb@gmail.com', address: 'ddd', birthday: 'September 14, 2023', number: '2222222222' },
//     { name: 'aaa', email: 'aaaaaaaaaaaaaa@gmail.com', address: 'ccc', birthday: 'Culling 13, 2023', number: '11111111' },
//     { name: 'ddd', email: 'dddddddddddd@gmail.com', address: 'bbb', birthday: 'Grrr 14, 2023', number: '44444444444' },
//     // Add more data as needed
// ];

// const Employees = () => {

//     const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

//     return (
//         <div>
//             <HeaderAdmin />
//             <Sidebar />

//             <section className="employees">
//                 <h1 className="heading">Our Employees</h1>
//                 <span className="addEmployee">+ Add Employees</span>
//                 <div className="employeesContainer">
//                     <table {...getTableProps()} className="employeesTable">
//                         <thead>
//                             {headerGroups.map(headerGroup => (
//                                 <tr {...headerGroup.getHeaderGroupProps()}>
//                                     {headerGroup.headers.map(column => (
//                                         <th className='theaderMain' {...column.getHeaderProps(column.getSortByToggleProps())}>
//                                             <span className='theader'>

//                                                 {column.id !== 'options' ? (
//                                                     <>
//                                                         {column.render('Header')}
//                                                         <span className='arrows'>
//                                                             {' '}
//                                                             {column.isSorted ? (column.isSortedDesc ?
//                                                                 <i className='fas fa-chevron-down'></i> :
//                                                                 <i className='fas fa-chevron-up'></i>) :
//                                                                 <span>
//                                                                     <i className='fas fa-chevron-down'></i>
//                                                                     <i className='fas fa-chevron-up'></i>
//                                                                 </span>
//                                                             }
//                                                         </span>
//                                                     </>
//                                                 ) : (
//                                                     column.render('Header')
//                                                 )}
//                                             </span>
//                                         </th>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </thead>
//                         <tbody {...getTableBodyProps()}>
//                             {rows.map(row => {
//                                 prepareRow(row);
//                                 return (
//                                     <tr {...row.getRowProps()}>
//                                         {row.cells.map(cell => (
//                                             <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                                         ))}
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//             </section>

//             <Footer />
//         </div>
//     )
// }

// export default Employees;