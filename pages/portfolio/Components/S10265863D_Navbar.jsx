/*
Student Name: Cedrick Tan Yi Quan
Student Number: S10265863D
*/

// Imports
// Import dependencies.
import React from "react";

// Import CSS.
import "../S10265863D_CSS.css";


// S10265863D_Navbar component for navigation.
const S10265863D_Navbar = () => {
    return (
        <nav className="navbar">

            {/* Page title */}
            <div className="navbar-title">Portfolio</div>

            {/* Navigation links */}
            <ul className="navbar-links">
                <li><a href="/S10269605">Dashboard</a></li>
                <li><a href="/buy-and-sell">Buy/Sell</a></li>
                <li><a href="/portfolio">Profile</a></li>

                {/* Logout button with a different style */}
                <li><a href="/" className="logout">Logout</a></li>
            </ul>
        </nav>
    );
};

export default S10265863D_Navbar;
