import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import "./Navbar.css"

const Navbar = (coursesPage)=>{
        
    return (
        <nav>
            <div>
                <img src="brain.png" alt="" />
                <h3>Small steps every week</h3>
            </div>
            
            <Link className="LogoutLink" to="/login" >Sair</Link>
        </nav>
        
    )
}
export default Navbar;