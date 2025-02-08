/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

//import dependencies
import React from "react";

const ChartFilter = ({ text, active, onClick }) => {
    return (
        <button
            onClick={onClick} // calls function when the button is clicked
            className={`chart-filter-button ${active ? "active" : ""}`} // adds "active" class if selected
        >
            {text} {/* displays the filter name */}
        </button>
    );
};

export default ChartFilter;

