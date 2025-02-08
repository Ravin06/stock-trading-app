/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/


// import necessary dependencies
import React from "react";
import "../S10269605H.css"; // import centralised css file

/**
 * card component that acts as a container for other components.
 * used to maintain consistent styling across the app.
 */
const Card = ({ children }) => {
    return (
        <div className="card">{children}</div>
    );
};

export default Card;
