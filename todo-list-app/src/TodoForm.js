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
        const newTask = {
            title,
            description,
            priority,
            // dueDate,
            completed: false,

        };
        console.log("newTask2",newTask)
        addTask(newTask);
        setTitle('');
        setDescription('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
             <input
                type="number"
                placeholder="Priority"
                value={priority}
                min="0"
                max="10"
                onChange={(e) => setPriority(e.target.value)}
            />
              {/* <input
                type="date"
                placeholder="Priority"
                value={priority}
                onChange={(e) => setDueDate(e.target.value)}
            /> */}
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



