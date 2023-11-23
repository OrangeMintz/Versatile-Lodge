import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EmployeeAddModal = ({ open, onClose }) => {

    const navigate = useNavigate()
    const [file, setFile] = useState("")
    const [image, setImage] = useState("")
    const [uploadedImage, setUploadedImage] = useState("")
    const [role, setRole] = useState(""); // New state variable for role


    function previewFiles(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImage(reader.result);
        };
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        previewFiles(file);

    }

    const [data, setData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '', // New state variable for confirm password
        address: '',
        birthday: '',
        sex: '',
        phoneNumber: '',
    });

    const registerUser = async (e) => {
        e.preventDefault();

        //file
        console.log(e.target.files)

        const { name, username, email, password, confirmPassword, address, birthday, sex, phoneNumber } = data;

        if (password !== confirmPassword) {
            // Check if password and confirm password match
            toast.error('Password and Confirm Password do not match');
            return;
        }

        const isAdmin = role === 'Admin';
        const isManager = role === 'Manager';

        try {
            const { data } = await axios.put(`/admin/user/${userId}`, {
                name,
                username,
                email,
                password,
                address,
                birthday,
                sex,
                phoneNumber,
                image: image,
                isAdmin,
                isManager,
            });

            //
            try {
                // console.log(data)
                setUploadedImage(uploadedImage);

            } catch (error) {
                console.log(error)
            }
            // 
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '', // Clear the input fields, including confirm password
                    address: '',
                    birthday: '',
                    phoneNumber: '',
                    sex: '',
                });
                toast.success('Added Employee Successful');
                window.location.href = `${window.location.origin}/employees`;

            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    if (!open) return null
    return (
        <div className="overlay" onClick={onClose}>
            <div className="modalContainer"
                onClick={(e) => {
                    e.stopPropagation()
                }}>
                <div className="modalBox">
                    <p className="closeBtn" onClick={onClose}>X</p>
                    <div className="content">
                        <h1 style={{ color: 'var(--black)', fontSize: "20px", marginTop: "2rem" }}>Add an Employee</h1>
                        <form className="employeeForm" onSubmit={registerUser}>
                            <input type="text" placeholder='Enter Name...' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                            <input type="email" placeholder='Enter Email...' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                            <input type="text" placeholder='Enter Address...' value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
                            <input type="date" placeholder='Enter Birthday...' value={data.birthday} onChange={(e) => setData({ ...data, birthday: e.target.value })} />
                            <input type="number" placeholder='Enter Phone Number...' value={data.phoneNumber} onChange={(e) => setData({ ...data, phoneNumber: e.target.value })} />
                            <select name="role" required value={role} onChange={(e) => setRole(e.target.value)} >
                                <option value="" defaultValue disabled> -- Select Role -- </option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                            </select>
                            <div className='radioBtns'>
                                <span style={{ fontSize: "15px" }}>Male:

                                    <input
                                        type="radio"
                                        name="sex"
                                        value="Male"
                                        className='radioBtn'
                                        checked={data.sex === 'Male'}
                                        onChange={(e) => setData({ ...data, sex: e.target.value })}
                                    />
                                </span>
                                <span style={{ fontSize: "15px" }}>Female:
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="Female"
                                        className='radioBtn'
                                        checked={data.sex === 'Female'}
                                        onChange={(e) => setData({ ...data, sex: e.target.value })}
                                    />
                                </span>
                            </div>
                            <h1 style={{ color: 'var(--black)', fontSize: "20px", }}>User Credentials</h1>
                            <input type="text" placeholder='Enter Username...' value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                            <input type="password" placeholder='Enter Password...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                            <input
                                type="password"
                                placeholder="Confirm Password..."
                                value={data.confirmPassword}
                                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                            />
                            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleChange} />

                            <div className="btnContainer">
                                <input type="submit" value="Add" className='updateBtn' />
                            </div>
                        </form>
                    </div>

                </div>
            </div >
        </div >
    )
}

export default EmployeeAddModal;