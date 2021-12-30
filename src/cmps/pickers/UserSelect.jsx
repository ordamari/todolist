import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function UserSelect({
    users,
    currUser,
    setCurrUser
}) {

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    function toggleIsOpen() {
        setIsOptionsOpen(state => !state)
    }

    return (
        <div
            className='select-user-container'
            onClick={toggleIsOpen}
        >
            <div className="select-user flex align-center justify-space-between">
                <img src={currUser.profileUrl} alt="" />
                <p>{currUser.userName}</p>
                <span className="toggle-options-btn">
                    {isOptionsOpen ? (
                        <ArrowDropUpIcon />
                    ) : (
                        <ArrowDropDownIcon />
                    )}
                </span>
            </div>
            {isOptionsOpen &&
                <div className="options">
                    {users.map((user, idx) =>
                        <div
                            className="option flex align-center"
                            key={idx}
                            onClick={() => { setCurrUser(user) }}
                        >
                            <img src={user.profileUrl} alt="" />
                            <p>{user.userName}</p>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}