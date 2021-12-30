import React from 'react';
import { utilService } from '../../services/utilService';

export default function TimePicker({
    value,
    setValue,
    isTimeInTextValid,
    setIsTimeInTextValid
}) {

    function updateValue(ev) {
        const textTime = ev.target.value;
        setIsTimeInTextValid(utilService.checkTimeIsValid(textTime))
        setValue(textTime);
    }

    return (
        <input
            className={`time-picker ${isTimeInTextValid ? 'valid' : 'unvalid'} ${value?'':'empty'}`}
            type="text"
            placeholder='HH:MM AM/PM'
            value={value}
            onChange={updateValue}
        />
    )
}