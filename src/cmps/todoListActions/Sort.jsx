import React from 'react';
import Select from '../pickers/Select';



export default function Sort({
  sortBy,
  setSortBy
}) {

  const sortOptions = ['creation date', 'due date', 'status', 'in charge of', 'priority'];

  return (
    <div className='todo-list-sort flex align-center' >
      <p>Sort:</p>
      <Select
        options={sortOptions}
        currOption={sortBy}
        setOption={setSortBy}
      />
    </div>
  )
}

