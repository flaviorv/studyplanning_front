import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <div className="NavTitle">
                <span>Study Planning</span>
            </div>
            <div className="NavLink">
                <Link to="/">Home</Link>
                <Link to="/courses">Cursos</Link>
                <Link to="/register">Registrar-se</Link>
            </div>
            
        </nav>
    );
};

export default Navbar;