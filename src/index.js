import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Courses from "./routes/Courses";
import Subjects from "./routes/Subjects";
import RegisterStudent from "./routes/RegisterStudent";
import Login from "./routes/Login";
import Weeks from "./routes/Weeks";
import CurrentWeek from "./routes/CurrentWeek"

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/registerstudent", element: <RegisterStudent /> },
  { path: "/", element: <App /> },
  { path: "/courses", element: <Courses /> },
  { path: "/subjects", element: <Subjects /> },
  { path: "/weeks", element: <Weeks/>},
  { path: "/currentweek", element: <CurrentWeek/>}

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
