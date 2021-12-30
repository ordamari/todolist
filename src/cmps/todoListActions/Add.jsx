import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { utilService } from '../../services/utilService';
import TaskForm from '../task/TaskForm';



export default function Add({
    users,
    onAddTask,
    isOpen,
    toggleIsOpen
}) {
    const [title, setTitle] = useState('');
    const [descripiton, setDescripiton] = useState('');
    const [priority, setPriority] = useState(1);
    const [status, setStatus] = useState('pending');
    const [calenderDate, setCalenderDate] = useState(new Date(moment().startOf('day')));
    const [timeInText, setTimeInText] = useState('');
    const [currUser, setCurrUser] = useState(null);
    const [wrongMsg, setWrongMsg] = useState('Title is requested');
    const [isTimeInTextValid, setIsTimeInTextValid] = useState(false);

    useEffect(() => {
        if (users) setCurrUser(users[0])
    }, [])

    useEffect(() => {
        clearForm()
    }, [isOpen])

    function clearForm() {
        setTitle('');
        setDescripiton('');
        setPriority(1);
        setStatus('pending')
        setCalenderDate(new Date(moment().startOf('day')));
        setTimeInText('');
        setCurrUser(users[0]);
        setWrongMsg('Title and time of day are requested')
    }

    function onFormSubmit(ev) {
        ev.preventDefault();
        if (!title) {
            setWrongMsg('Must have a title')
            return;
        }

        if (timeInText && !isTimeInTextValid) {
            setWrongMsg('Unvalid Time')
            return;
        }

        let dueDate = calenderDate.getTime();
        if (timeInText) {
            dueDate += utilService.parseDaytime(timeInText);
        }

        const newTask = {
            title,
            descripiton,
            priority,
            status,
            createAt: Date.now(),
            dueDate,
            inChargeOf: currUser.id,
        }

        onAddTask(newTask);
        toggleIsOpen();
    }

    return (
        <div className='add-task' >
            {isOpen &&
                <TaskForm
                    formTitle='Add Task'
                    toggleIsOpen={toggleIsOpen}
                    onSubmit={onFormSubmit}
                    wrongMsg={wrongMsg}
                    title={title}
                    setTitle={setTitle}
                    descripiton={descripiton}
                    setDescripiton={setDescripiton}
                    priority={priority}
                    setPriority={setPriority}
                    status={status}
                    setStatus={setStatus}
                    users={users}
                    currUser={currUser}
                    setCurrUser={setCurrUser}
                    calenderDate={calenderDate}
                    setCalenderDate={setCalenderDate}
                    timeInText={timeInText}
                    setTimeInText={setTimeInText}
                    isTimeInTextValid={isTimeInTextValid}
                    setIsTimeInTextValid={setIsTimeInTextValid}
                />
            }
        </div>
    )
}

