import React from 'react';

const EmployeeEditModal = ({open, onClose}) => {
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
                        <form action="#">
                            <label htmlFor="">Name</label>
                            <input type="text" />
                            <label htmlFor="">Email</label>
                            <input type="email" name="" id="" />
                            <label htmlFor="">address</label>
                            <input type="text" name="" id="" />
                            <label htmlFor="">Birthday</label>
                            <input type="datetime" name="" id="" />
                            <label htmlFor="">Number</label>
                            <input type="number" />
                            <div className='radioBtns'>
                                <span>Male <input type="radio" name="" className='radioBtn' /></span>
                                <span>FeMale <input type="radio" name="" className='radioBtn' /></span>
                            </div>
                            <div className="btnContainer">
                                <input type="submit" value="Update" className='updateBtn'/>
                                <button className="deleteBtn">Delete</button>
                            </div>
                        </form>
                    </div>
 
                </div>
            </div>
        </div>
    )
}

export default EmployeeEditModal;