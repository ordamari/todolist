import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function Select({
    options,
    currOption,
    setOption
}) {

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    function toggleIsOpen() {
        setIsOptionsOpen(state => !state)
    }

    return (
        <div
            className='select-container'
            onClick={toggleIsOpen}
        >
            <div className="select flex align-center justify-space-between">
                <p>{currOption}</p>
                <span
                    className="toggle-options-btn"
                >
                    {isOptionsOpen ? (
                        <ArrowDropUpIcon />
                    ) : (
                        <ArrowDropDownIcon />
                    )}
                </span>
            </div>
            {isOptionsOpen &&
                <div className="options">
                    {options.map((option, idx) =>
                        <div
                            className="option"
                            key={idx}
                            onClick={() => { setOption(option) }}
                        >
                            <p>{option}</p>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}