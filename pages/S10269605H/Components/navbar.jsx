/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

//import dependencies
import React from "react";
import "../S10269605H.css"; // Import centralized CSS


// Navbar component for navigation
const Navbar = () => {
    return (
        <nav className="navbar">
            {/* app Title */}
            <div className="navbar-title">Stock Exchange App</div>

            {/* navigation links */}
            <ul className="navbar-links">
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">Buy/Sell</a></li>
                <li><a href="#">Profile</a></li>
                {/* logout button with a different style */}
                <li><a href="#" className="logout">Logout</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
