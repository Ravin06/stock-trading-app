/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

//import dependencies
import React from "react";
import Card from "../Components/card";

// component to display stock details inside a card
const Details = ({ details }) => {
    // defines the labels for each stock detail field
    const detailsList = {
        name: "Name",
        country: "Country",
        currency: "Currency",
        exchange: "Exchange",
        ipo: "IPO Date",
        marketCapitalization: "Market Capitalisation",
        finnhubIndustry: "Industry",
    };

    // converts market capitalization from millions to billions for better display.
    const convertMillionToBillion = (number) => {
        return (number / 1000).toFixed(2);
    };

    return (
        <Card>
            <ul className="details-list">
                {/* loop through the detailsList object and display each detail */}
                {Object.keys(detailsList).map((item) => (
                    <li key={item} className="details-item">
                        <span className="details-label">{detailsList[item]}</span>
                        <span className="details-value">
                            {/* convert market capitalization to billions if applicable */}
                            {item === "marketCapitalization"
                                ? `${convertMillionToBillion(details[item])}B`
                                : details[item]}
                        </span>
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default Details;
