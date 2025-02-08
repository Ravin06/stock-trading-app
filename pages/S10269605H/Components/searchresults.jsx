/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

//import dependencies
import React, { useContext } from "react";
import StockContext from "../Components/stockcontext";

const SearchResults = ({ results, clearSearch }) => {
    const { setStockSymbol } = useContext(StockContext); // context to update stock symbol

    return (
        <ul className="search-results-container">
            {/* Loop through the search results */}
            {results.map((item) => (
                <li
                    key={item.symbol}
                    className="search-result-item"
                    onClick={() => {
                        setStockSymbol(item.symbol); //set the selected stock
                        clearSearch(); // clear the search results box after selecting.
                    }}
                >
                    {/* display stock symbol and the company description in the search results box */ }
                    <span>{item.symbol}</span>
                    <span>{item.description}</span>
                </li>
            ))}
        </ul>
    );
};

export default SearchResults;
