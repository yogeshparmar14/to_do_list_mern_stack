import React, { useEffect, useState } from 'react';

const EditTask = ({ updateData,updateTaskWithApi }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        console.log("updateData", updateData)
        if (updateData) {
            setTitle(updateData?.title);
            setDescription(updateData?.description);
        }

    }, [updateData])
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) return; // Simple form validation
        const newTask = {
            title,
            description,
        };
        updateTaskWithApi(newTask)
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Update Task</button>
        </form>
    );
};


export default EditTask