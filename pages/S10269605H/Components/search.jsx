/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

//import dependencies 
import React, { useState } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"; //import icons from the heroicons library
import "../S10269605H.css"; // Import centralized CSS
import SearchResults from "./searchresults";
import { searchSymbol } from "../api/stockapi";

const Search = () => {
    // search input and search results states
    const [input, setInput] = useState("");
    const [bestMatches, setBestMatches] = useState([]);

    // clears input and removes search results
    const clearSearch = () => {
        setInput("");
        setBestMatches([]);
    };

    // fetches stock symbol that matches the input
    const updateBestMatches = async () => {
        try {
            if (input) {
                const searchResults = await searchSymbol(input);
                setBestMatches(searchResults.result); // store the best matches
            }
        } catch (error) {
            console.log(error);
            setBestMatches([]); // reset if there's an error
        }
    };

    return (
        <div className="search-container">
            {/* Search Input */}
            <input
                type="text"
                value={input}
                className="search-input"
                placeholder="Search stock..."
                onChange={(event) => setInput(event.target.value)}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        updateBestMatches();
                    }
                }}
            />

            {/* clear button (X icon) */}
            {input && (
                //get rid of any thing in the search box once x button is clicked.
                <button className="clear-button" onClick={clearSearch}>
                    <XMarkIcon className="clear-icon" />
                </button>
            )}

            {/* search button (magnifying glass icon) */}
            <button onClick={updateBestMatches} className="search-button">
                {/* searches for the stock once the icon is clicked */ }
                <MagnifyingGlassIcon className="search-button-icon" />
            </button>

            {/* Display search results if there are matches */}
            {input && bestMatches.length > 0 && (
                <div className="search-results-wrapper">
                    <SearchResults results={bestMatches} clearSearch={clearSearch} />
                </div>
            )}
        </div>
    );
};

export default Search;
