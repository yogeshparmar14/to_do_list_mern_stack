
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = ({ tasks, deleteTask, updateTask, rearrangetask, updateTitle }) => {

    // ... (existing code)
    const itemsPerPage = 3
    const [searchQuery, setSearchQuery] = useState('');
    const [itemTasks, setItemTasks] = useState([])
    const [sortedTasks, setSortedTasks] = useState([])
    const [sortBy, setSortBy] = useState("title"); // Default sorting by title
    // const [editTask,setEditTask] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [indexOfLastItemState, setIndexOfLastItemState] = useState(0)
    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = itemTasks.slice(indexOfFirstItem, indexOfLastItem);
        setSortedTasks(currentItems)
        setIndexOfLastItemState(indexOfLastItem)
        console.log("hell2")
    }, [currentPage])
    useEffect(() => {
        if (tasks) {
            setSortedTasks(tasks)
            setItemTasks(tasks)
        }
        console.log("hello")
    }, [tasks])
    useEffect(() => {
        if (sortBy === "priority") {
            const dataArray = itemTasks.sort((a, b) => { return a?.priority - b?.priority })
            console.log("dataArray", dataArray)
            setSortedTasks(dataArray)
        }
    }, [sortBy])

    const searchFunction = (value) => {
        console.log("searchQuery")
        const filteredTask = itemTasks.filter(
            (task) =>
                task.title.toLowerCase().includes(value.toLowerCase()) ||
                task.description.toLowerCase().includes(value.toLowerCase())
        );
        setSortedTasks(filteredTask)
    }


    // const sortedByPrio =(value)=>{
    //     if(value==="priority"){

    //     }
    // }

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const updatedTasks = Array.from(sortedTasks);
        const [reorderedTask] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, reorderedTask);
        rearrangetask(updatedTasks);
    };
    console.log("render")
    console.log("sortedTasks", sortedTasks)
    return (
        <div>
            <div className="todo-list">
                {/* Search bar and sorting dropdown */}
                <div style={{
                    position: "relative",
                    top: "-10px"
                }}>
                    <input
                        type="text"
                        placeholder="Search tasks by title or description"
                        // value={searchQuery}
                        onChange={(e) => searchFunction(e.target.value)}
                    />
                    {/* Sorting dropdown */}
                    {/* <label style={{marginLeft: "25px"}}>
                Sort by:
                <select onChange={(e) => {setSortBy(e.target.value)}}>
                    <option value="">Title</option>
                    <option value="priority">Priority</option>
                    <option value="dueDate">Due Date</option>
                  f
                </select>
            </label> */}
                </div>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="todo-list" type="TASK" >
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}
                            //   style={{padding: "20px"}}
                            >
                                {sortedTasks.map((task, index) => (
                                    <Draggable key={task._id.toString()} draggableId={task._id.toString()} index={index} >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="task-item"
                                            //  style={{padding: "40px"}}
                                            >
                                                <div key={task.id} className="task-item">
                                                    <h3>{task.title}</h3>
                                                    <p>{task.description}</p>
                                                    <div className="task-buttons">
                                                        <button onClick={() => { updateTitle(task) }}>
                                                            edit
                                                        </button>
                                                        <button onClick={() => updateTask(task._id, task.completed)}>
                                                            {task.completed ? 'task as uncomplete' : 'task as complete'}
                                                        </button>
                                                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

            </div>
            <div className="task-buttons" style={{
                top: "15px",
                right: "345px"
            }}

            >
                <button
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    disabled={indexOfLastItemState >= itemTasks.length}
                >next</button>
            </div>
        </div>
    );
};

export default TodoList;



