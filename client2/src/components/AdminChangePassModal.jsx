import React from 'react';

const AdminChangePassModal = ({open, onClose}) => {
    if(!open) return null
    return (
        <div className="overlay" onClick={onClose}>
            <div className="adminModalContainer"
                 onClick={(e) => {
                    e.stopPropagation()
                 }}>
                <div className="adminModalBox">
                    <p className="closeBtn" onClick={onClose}>X</p>
                    <div className="adminContent">
                        <h1 className="heading" style={{color: 'var(--black)'}}>Change Password</h1>
                        <form action="#" className='adminForm'>
                            <label htmlFor="">Current Password:</label>
                            <input type="password" placeholder='enter your current password' />
                            <label htmlFor="">New Password:</label>
                            <input type="password" placeholder='enter your new password'/>
                            <label htmlFor="">Confirm Password:</label>
                            <input type="password" placeholder='confirm your password' />

                            <div className="btnContainer">
                                <input type="submit" value="Confirm" className='updateBtn'/>
                            </div>
                        </form>
                    </div>
 
                </div>
            </div>
        </div>
    )
}

export default AdminChangePassModal;