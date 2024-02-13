import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EmployeeEditModal = ({ open, onClose, userId }) => {
    const navigate = useNavigate();
    const [file, setFile] = useState("");
    const [image, setImage] = useState("");
    const [uploadedImage, setUploadedImage] = useState("");
    const [role, setRole] = useState("");

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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const registerUser = async (e) => {
        e.preventDefault();

        //file
        // console.log(e.target.files)

        const { name, username, email, password, confirmPassword, address, birthday, sex, phoneNumber } = data;

        if (name) {
            // Check if name has leading or trailing spaces
            if (name.trim() !== name) {
                toast.error('Name should not contain leading/trailing spaces');
                return;

            }
        }

        // Validate email
        if (email) {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                toast.error('Invalid email format');
                return;
            }

            // Check if email is already in use
            try {
                const response = await axios.get('/admin/user/');
                const users = response.data;

                if (users.some(user => user.email === email)) {
                    toast.error('Email is already in use');
                    return;
                }
            } catch (error) {
                console.error('Error checking email:', error);
                toast.error('Error checking email. Please try again.');
                return;
            }
        }

        // Check if username is already in use
        if (username) {
            try {
                const response = await axios.get('/admin/user/');
                const users = response.data;

                if (users.some(user => user.username === username)) {
                    toast.error('Username is already in use');
                    return;
                }
            } catch (error) {
                console.error('Error checking username:', error);
                toast.error('Error checking username. Please try again.');
                return;
            }
        }



        // Validate phoneNumber
        if (phoneNumber) {
            // Check if phoneNumber starts with 0
            if (!phoneNumber.startsWith('09')) {
                toast.error('Phone number should start with 09');
                return;
            }

            // Check if phoneNumber starts with 0
            if (phoneNumber.length < 11) {
                toast.error('Enter a valid 11 digit phone number');
                return;
            }
        }

        // Validate address
        if (address && address.length < 8) {
            toast.error('Address must be at least 8 characters');
            return;
        }

        // Validate password format using regex
        if (password && !passwordRegex.test(password)) {
            toast.error('Password must contain at least 1 lowercase letter, 1 uppercase letter, a number, and special character. It should be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            // Check if password and confirm password match
            toast.error('Password and Confirm Password do not match');
            return;
        }



        const isAdmin = role === 'Admin';
        const isManager = role === 'Manager';
        const isReceptionist = role === 'Receptionist';


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
                isReceptionist
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
                toast.success('Updated Employee Successful');
                window.location.href = `${window.location.origin}/employees`;

            }
        } catch (error) {
            toast.error('An error has occurred, please try again later.');
        }
    };

    if (!open) return null




    //ARCHIVE
    const handleArchive = async (userId) => {
        try {
            const response = await axios.post(`/admin/user/${userId}/archive`);
            console.log(response.data); // Handle the response as needed
            window.location.href = `${window.location.origin}/employees`;

        } catch (error) {
            console.error('Error archiving user:', error);
            toast.error('Error archiving user. Please try again.');
        }
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="modalContainer"
                onClick={(e) => {
                    e.stopPropagation()
                }}>
                <div className="modalBox">
                    <p className="closeBtn" onClick={onClose}>X</p>
                    <div className="content">
                        <h1 style={{ color: 'var(--black)', fontSize: "20px", marginTop: "2rem" }}>Edit an Employee</h1>
                        <form className="employeeForm" onSubmit={registerUser}>
                            <input type="text" placeholder='Enter Full Name...' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                            <input type="email" placeholder='Enter Email...' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                            <input type="text" placeholder='Enter Address...' value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
                            <input type="date" placeholder='Enter Birthday...' value={data.birthday} onChange={(e) => setData({ ...data, birthday: e.target.value })} />
                            <input type="tel" placeholder='Enter Phone Number...' value={data.phoneNumber} onChange={(e) => {
                                // Only allow numeric characters and limit to 11 digits
                                const phoneNumber = e.target.value.replace(/\D/g, '').slice(0, 11);
                                setData({ ...data, phoneNumber });
                            }} />
                            <select name="role" required value={role} onChange={(e) => setRole(e.target.value)} >
                                <option value="" defaultValue disabled> -- Select Role -- </option>
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="Receptionist">Receptionist</option>

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
                                <button className="deleteBtn" style={{ fontSize: "16px", borderRadius: "5px" }} onClick={() => handleArchive(userId)} >
                                    Archive
                                </button>
                                <input type="submit" value="Update" className='updateBtn' />
                            </div>
                        </form>

                    </div>

                </div>
            </div >
        </div >
    )
}

export default EmployeeEditModal;