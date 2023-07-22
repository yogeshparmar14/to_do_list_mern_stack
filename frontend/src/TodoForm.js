import React, { useState } from 'react';

const TodoForm = ({ addTask,button,updateData }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority,setPriority]=useState()
    const [dueDate,setDueDate]=useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(button==="Update Task")
        if (!title || !description) return; // Simple form validation
        const newDate = new Date(dueDate).getTime()
        const newTask = {
            title,
            description,
            priority,
            duedate:newDate,
            completed: false,

        };
        console.log("newTask2",newTask)
        addTask(newTask);
        setTitle('');
        setDescription('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
        <p>Title</p>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <p>Priority</p>
             <input
                type="number"
                placeholder="Priority"
                value={priority}
                min="0"
                max="10"
                onChange={(e) => setPriority(e.target.value)}
            />
            <p>Due Date</p>
              <input
                type="date"
                placeholder="Due Date"
                // value={priority}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <p>Description</p>
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">{button}</button>
        </form>
    );
};

export default TodoForm;



