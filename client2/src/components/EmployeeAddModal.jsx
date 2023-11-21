import React from 'react';

const EmployeeAddModal = ({open, onClose}) => {
    if(!open) return null
    return (
        <div className="overlay" onClick={onClose}>
            <div className="modalContainer"
                 onClick={(e) => {
                    e.stopPropagation()
                 }}>
                <div className="modalBox">
                    <p className="closeBtn" onClick={onClose}>X</p>
                    <div className="content">
                        <h1 style={{color: 'var(--black)'}}>Add an Employee</h1>
                        <form action="#">
                            {/* <label htmlFor="">Name:</label> */}
                            <input type="text" placeholder='enter a name...' />
                            {/* <label htmlFor="">Email:</label> */}
                            <input type="email" placeholder='enter an email...'/>
                            {/* <label htmlFor="">Address:</label> */}
                            <input type="text" placeholder='enter an address...' />
                            {/* <label htmlFor="">Birthday:</label> */}
                            <input type="datetime" placeholder='enter a birthday...' />
                            {/* <label htmlFor="">Number:</label> */}
                            <input type="number" placeholder='enter a phone #...' />
                            <div className='radioBtns'>
                                <span>Male: <input type="radio" name="" className='radioBtn' /></span>
                                <span>FeMale: <input type="radio" name="" className='radioBtn' /></span>
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
                                <input type="submit" value="Add" className='updateBtn'/>
                            </div>
                        </form>
                    </div>
 
                </div>
            </div>
        </div>
    )
}

export default EmployeeAddModal;