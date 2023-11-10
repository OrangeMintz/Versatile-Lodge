import './employees.css';
import HeaderAdmin from '../../component/HeaderAdmin';
import Sidebar from '../../component/Sidebar';

const Employees = () => {
    return (
        <div className="body">
            <HeaderAdmin />
            <Sidebar />
            <h1>Employees</h1>
        </div>
    )
}

export default Employees;