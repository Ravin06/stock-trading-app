/*
    Student Name : Wynston Wong Jun De
    Student Number: S10266219F
*/

//import dependencies
import React from "react";
import "../S10266219F.css"; // Import centralized CSS


// Navbar component for navigation
const Navbar = () => {
    return (
        <nav className="navbar">
            {/* app Title */}
            <div className="navbar-title">Buy & Sell Stocks</div>

            {/* navigation links */}
            <ul className="navbar-links">
                <li><a href="/S10269605">Dashboard</a></li>
                <li><a href="/buy-and-sell">Buy/Sell</a></li>
                <li><a href="/portfolio">Profile</a></li>
                {/* logout button with a different style */}
                <li><a href="/" className="logout">Logout</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
