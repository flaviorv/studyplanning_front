import React from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
    const {studentName, studentId} = useLocation();
    return (
        <div>
            <h1>Study Planning</h1>
            <h2>Home</h2>            
            <p>{studentName}</p>
            <p>{studentId}</p>

        </div>
    );
};

export default Home;