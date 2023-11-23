import React from 'react';

const EmployeeEditModal = ({ open, onClose }) => {
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
                        <h1 style={{ color: 'var(--black)' }}>Edit an Employee</h1>
                        <form action="#" className="employeeForm">
                            {/* <label htmlFor="">Name:</label> */}
                            <input type="text" placeholder='Enter Name...' />
                            {/* <label htmlFor="">Email:</label> */}
                            <input type="email" placeholder='Enter Email...' />
                            {/* <label htmlFor="">Address:</label> */}
                            <input type="text" placeholder='Enter Address...' />
                            {/* <label htmlFor="">Birthday:</label> */}
                            <input type="datetime" placeholder='Enter Birthday...' />
                            {/* <label htmlFor="">Number:</label> */}
                            <input type="number" placeholder='Enter Phone Number...' />
                            <div className='radioBtns'>
                                <span style={{ fontSize: "15px" }}>Male:
                                    <input type="radio" name="sex" value="Male" className='radioBtn' />
                                </span>
                                <span style={{ fontSize: "15px" }}>Female:
                                    <input type="radio" name="sex" value="Female" className='radioBtn' />
                                </span>
                            </div>
                            <div className="notInTable">
                                <label htmlFor="imageInput">Picture:</label>
                                <input type="file" id="imageInput" accept="image/*" />
                                <label htmlFor="username">Username:</label>
                                <input type="text" />
                                <label htmlFor="password">Password:</label>
                                <input type="passowrd" />
                            </div>
                            <div className="btnContainer">
                                <button className="deleteBtn" style={{ fontSize: "16px", borderRadius: "5px" }}>Archive</button>

                                <input type="submit" value="Update" className='updateBtn' />
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EmployeeEditModal;