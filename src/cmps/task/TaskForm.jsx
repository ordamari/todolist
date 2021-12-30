import React from 'react';
import Calendar from 'react-calendar';
import TextareaAutosize from 'react-textarea-autosize';
import Select from '../pickers/Select';
import TimePicker from '../pickers/TimePicker';
import UserSelect from '../pickers/UserSelect';

export default function TaskForm({
  formTitle,
  toggleIsOpen,
  onSubmit,
  wrongMsg,
  title,
  setTitle,
  descripiton,
  setDescripiton,
  priority,
  setPriority,
  status,
  setStatus,
  users,
  currUser,
  setCurrUser,
  calenderDate,
  setCalenderDate,
  timeInText,
  setTimeInText,
  isTimeInTextValid,
  setIsTimeInTextValid
}) {

  const priorityOptions = [1, 2, 3];
  const statusOptions = ['pending', 'in progress', 'done', 'canceled'];

  function stop(ev) {
    ev.stopPropagation();
  }

  return (
    <div
      className="form-container"
      onClick={toggleIsOpen}
    >
      <form onSubmit={onSubmit}
        className='flex column'
        onClick={stop}
      >
        <h2>{formTitle}</h2>
        <p>{wrongMsg}</p>
        <input
          type="text"
          placeholder='Title'
          value={title}
          onChange={({ target }) => { setTitle(target.value) }}
        />
        <TextareaAutosize
          type="text"
          placeholder='Descripiton'
          value={descripiton}
          onChange={({ target }) => { setDescripiton(target.value) }}
          minRows={3}
        />
        <div className="form-select-container flex align-center">
          <p>Priority:</p>
          <Select
            options={priorityOptions}
            currOption={priority}
            setOption={setPriority}
          />
        </div>
        <div className="form-select-container flex align-center">
          <p>Stauts:</p>
          <Select
            options={statusOptions}
            currOption={status}
            setOption={setStatus}
          />
        </div>
        <div className="form-select-container flex align-center">
          <p>In Charge Of:</p>
          {currUser &&
            <UserSelect
              users={users}
              currUser={currUser}
              setCurrUser={setCurrUser}
            />
          }
        </div>
        <Calendar
          className='cal'
          onChange={setCalenderDate}
          value={calenderDate}
          calendarType="Hebrew"
          locale="ISR"
        />
        <TimePicker
          value={timeInText}
          setValue={setTimeInText}
          isTimeInTextValid={isTimeInTextValid}
          setIsTimeInTextValid={setIsTimeInTextValid}
        />
        <button>Save</button>
      </form>
    </div>
  )
}

