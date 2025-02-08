/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

//import dependencies
import React from "react";
import Search from "./search"; // import the search component
import "../S10269605H.css"; // import centralized CSS

// header component displaying the stock name and search bar
const Header = ({ name }) => {
    return (
        <div className="header-container">
            {/* display the company or stock symbol as the title */}
            <h1 className="company-title">{name}</h1>

            {/* renders the search bar component */}
            <Search />
        </div>
    );
};

export default Header;

