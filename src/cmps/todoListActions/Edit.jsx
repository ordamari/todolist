import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { utilService } from '../../services/utilService';
import TaskForm from '../task/TaskForm';



export default function Edit({
    users,
    onEditTask,
    task,
    close
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
        if (users.length && task) setCurrUser(users.find(user => user.id === task.inChargeOf))
    }, [])

    useEffect(() => {
        if (task) clearForm()
    }, [task])

    function clearForm() {
        setTitle(task.title);
        setDescripiton(task.descripiton);
        setPriority(task.priority);
        setStatus(task.status)
        setCalenderDate(new Date(moment(task.dueDate).startOf('day')));
        setTimeInText(utilService.timestampToTimeInDay(task.dueDate));
        setCurrUser(users.find(user => user.id === task.inChargeOf));
        setWrongMsg('Title is requested')
        setIsTimeInTextValid(true);
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
            id: task.id,
            title,
            descripiton,
            priority,
            status,
            createAt: task.createAt,
            dueDate,
            inChargeOf: currUser.id,
        }

        onEditTask(newTask);
        close();
    }

    return (
        <div className='edit-task' >
            {task &&
                <TaskForm
                    formTitle='Edit Task'
                    toggleIsOpen={close}
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

