/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

//import dependencies
import React from "react";
import Card from "../Components/card";

// overview component displays stock symbol, price, and percentage change
const Overview = ({ symbol, price, change, changePercent, currency }) => {
    return (
        <Card>
            {/* display stock symbol at the top left */}
            <span className="overview-symbol">{symbol}</span>

            {/* main content area with stock price and change */}
            <div className="overview-content">
                {/* stock price with currency */}
                <span className="overview-price">
                    ${price}
                    <span className="overview-currency">{currency}</span>
                </span>

                {/* price change - styled based on whether it's positive or negative */}
                <span className={`overview-change ${change > 0 ? "positive" : "negative"}`}>
                    {change}
                    <span>({changePercent}%)</span>
                </span>
            </div>
        </Card>
    );
};

export default Overview;
