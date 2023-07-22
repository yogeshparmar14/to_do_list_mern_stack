// import React, { useState } from 'react';
// import './styles.css';
// import TodoForm from './TodoForm';
// import TodoList from './TodoList';

// const App = () => {
//   const [tasks, setTasks] = useState([]);

//   const addTask = (task) => {
//     setTasks([...tasks, task]);
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   const updateTask = (id, updatedTask) => {
//     setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
//   };

//   return (
//     <div className="app">
//       <h1>Todo List</h1>
//       <TodoForm addTask={addTask} />
//       <TodoList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} />
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import './styles.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import EditTask from './EditTask';
 

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [notification, setNotification] = useState('');
  const [updateData,setUpdataData]=useState()
  const [openPopUp,setOpenPopUp]=useState(false)
  useEffect(()=>{
    getAllTask()
  },[])
 
const getAllTask = ()=>{
  let token = localStorage.getItem('token')
  fetch(
    "http://localhost:8000/user/getAllTask",{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'authorization':`Bearer ${token}`
      }
    })
                .then((res) => res.json())
                .then((json) => {
                   console.log("json",json)
                   setTasks(json);
                })
}
  const addTask = async(task) => {
    let token = localStorage.getItem('token')
    const response = await fetch('http://localhost:8000/user/addTask', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
          'Content-Type': 'application/json',
          'authorization':`Bearer ${token}`
      }
  });
  const result = await response.json();
  if(result.status===200){
    getAllTask()
  }
   
    setNotification(`New task added: ${task.title}`);
    setTimeout(() => {
      setNotification('');
    }, 3000); // Hide notification after 3 seconds
  };

   const deleteTask = async(id) => {
    let token = localStorage.getItem('token')
    const response = await  fetch(`http://localhost:8000/user/deleteTask/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization':`Bearer ${token}`
      },
    })
    const result = await response.json();
    if(result.status===200){
      getAllTask()
    }
  };

  const updateTask = async(id,completed) => {
    let token = localStorage.getItem('token')
    const response = await  fetch(`http://localhost:8000/user/updateTask/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization':`Bearer ${token}`
      },
      body: JSON.stringify({
        "completed":!completed 
     })
    })
    const result = await response.json();
    console.log("result",result)
    if(result.status===200){
      getAllTask()
    }
    // setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const updateTitle = async(task)=>{
    setUpdataData(task)
    setOpenPopUp(true)
  }

  const updateTaskWithApi =async(newTask)=>{
    let token = localStorage.getItem('token')
    const response = await  fetch(`http://localhost:8000/user/updateTask/${updateData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization':`Bearer ${token}`
      },
      body: JSON.stringify(newTask)
    })
    const result = await response.json();
    console.log("result",result)
    if(result.status===200){
      getAllTask()
    }
    setOpenPopUp(false)
  }
console.log("tasks",tasks)
  return (
    <div className="app">
      <h1>Todo List</h1>
      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}
      <TodoForm addTask={addTask} button="Add Task" />
      <TodoList tasks={tasks} deleteTask={deleteTask} updateTask={updateTask} rearrangetask={(task)=>{
        console.log("task",task);setTasks(task)}} updateTitle={updateTitle}/> 
      {openPopUp? <div>
         <div className='flex-center'> </div> 
         <div className="popup">
          <div className="popup-content">
          <EditTask  updateData={updateData} updateTaskWithApi={updateTaskWithApi} />
            <button onClick={()=>{setOpenPopUp(false)}}>Close</button>
          </div>
        </div>
      </div>:null} 
       {/* <Signup/>*/} 
     {/* <Login/> */}
    </div>
  );
};

export default Home;
