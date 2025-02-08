/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

//import dependencies 
import React, { useState } from "react"; // import React and useState
import Dashboard from "./S10269605H/Components/dashboard"; // import dashboard component
import "./S10269605H/S10269605H.css"; // import global CSS file
import StockContext from "./S10269605H/Components/stockcontext"; // import StockContext for state management

function App() {
    // state to manage the selected stock symbol, default is "FB"
    const [stockSymbol, setStockSymbol] = useState("FB");

    return (
        // provide stock symbol state to the entire app
        <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
            <Dashboard /> {/* render the dashboard component */}
        </StockContext.Provider>
    );
}

export default App; // export app component
