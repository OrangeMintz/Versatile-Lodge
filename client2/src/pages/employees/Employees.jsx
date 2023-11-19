import React from 'react';
import { useTable, useSortBy } from 'react-table';
import './employees.css';
import HeaderAdmin from '../../components/HeaderAdmin';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';


const columns = [
    { Header: 'Name', accessor: 'name', },
    { Header: 'Email', accessor: 'email', },
    { Header: 'Address', accessor: 'address', },
    { Header: 'Birthday', accessor: 'birthday', },
    { Header: 'Number', accessor: 'number', },
    { Header: 'Options', accessor: 'options', Cell: ({ row }) => <a href="#" className='option-btn'>Option</a>, disableSortBy: true, },
];

const data = [
    { name: 'ccc', email: 'ccccccc@gmail.com', address: 'aaaaaaaaaaaaaaaaaa', birthday: 'August 14, 2023', number: '3333333333' },
    { name: 'bbbb', email: 'bbbbbbbbbbb@gmail.com', address: 'ddd', birthday: 'September 14, 2023', number: '2222222222' },
    { name: 'aaa', email: 'aaaaaaaaaaaaaa@gmail.com', address: 'ccc', birthday: 'Culling 13, 2023', number: '11111111' },
    { name: 'ddd', email: 'dddddddddddd@gmail.com', address: 'bbb', birthday: 'Grrr 14, 2023', number: '44444444444' },
    // Add more data as needed
];

const Employees = () => {

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);

    return (
        <div>
            <HeaderAdmin />
            <Sidebar />

            <section className="employees">
                <h1 className="heading">Our Employees</h1>
                <span className="addEmployee">+ Add Employees</span>
                <div className="employeesContainer">
                    <table {...getTableProps()} className="employeesTable">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th className='theaderMain' {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            <span className='theader'>

                                                {column.id !== 'options' ? (
                                                    <>
                                                        {column.render('Header')}
                                                        <span className='arrows'>
                                                            {' '}
                                                            {column.isSorted ? (column.isSortedDesc ?
                                                                <i className='fas fa-chevron-down'></i> :
                                                                <i className='fas fa-chevron-up'></i>) :
                                                                <span>
                                                                    <i className='fas fa-chevron-down'></i>
                                                                    <i className='fas fa-chevron-up'></i>
                                                                </span>
                                                            }
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
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Employees;