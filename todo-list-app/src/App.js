// App.js
import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from './Home';
 import Signup from './Signup';
 import Login from './Login'
const router = createBrowserRouter([
    {
      path: "/",
      element: <Signup/>,
    },
    {
        path: "/to-do-list",
        element: <Home/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
  ]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
