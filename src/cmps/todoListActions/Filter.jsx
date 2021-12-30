import React from 'react';
import Select from '../pickers/Select';



export default function Filter({
    filterBy,
    setFilterBy
}) {

    const filterByOptions = ['all tasks','open tasks', 'tasks of this week', 'archives'];
    return (
        <div className='todo-list-filter flex align-center' >
            <p>Filter:</p>
            <Select
                options={filterByOptions}
                currOption={filterBy}
                setOption={setFilterBy}
            />
        </div>
    )
}

