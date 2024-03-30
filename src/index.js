import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Courses from "./routes/Course/Courses";
import Subjects from "./routes/Subject/Subjects";
import RegisterStudent from "./routes/Student/RegisterStudent";
import Login from "./routes/Student/Login";
import Weeks from "./routes/Week/Weeks";
import CurrentWeek from "./routes/Week/CurrentWeek";
import NewCourse from "./routes/Course/NewCourse";
import NewSubject from "./routes/Subject/NewSubject";
import NewWeek from "./routes/Week/NewWeek";
import NewGoal from "./routes/Goal/NewGoal";

const router = createBrowserRouter([
  
  { path: "/", element: <App />}, 
  { path: "/login", element: <Login /> },
  { path: "/registerstudent", element: <RegisterStudent /> },
  { path: "/courses", element: <Courses /> },
  { path: "/subjects", element: <Subjects /> },
  { path: "/weeks", element: <Weeks/>},
  { path: "/currentweek", element: <CurrentWeek/>},
  { path: "/newcourse", element: <NewCourse/>},
  { path: "/newsubject", element: <NewSubject/>},
  { path: "/newweek", element: <NewWeek/>},
  { path: "/newgoal", element: <NewGoal/>}

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
