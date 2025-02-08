/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

//import dependencies
import { useContext, useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import "../S10269605H.css"; // import centralized CSS
import Header from "./header";
import Details from "../Components/details";
import Overview from "../Components/overview";
import Chart from "./chart";
import StockContext from "./stockcontext";
import { fetchQuote, fetchStockDetails } from "../api/stockapi"; // import API functions

const Dashboard = () => {
    const { stockSymbol } = useContext(StockContext); // get selected stock symbol

    const [stockDetails, setStockDetails] = useState({}); // store stock details
    const [quote, setQuote] = useState({}); // store stock price quote

    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetch stock details
                const stockDetailsResponse = await fetchStockDetails(stockSymbol);
                setStockDetails(stockDetailsResponse);

                // fetch stock quote (latest price, change)
                const quoteResponse = await fetchQuote(stockSymbol);
                setQuote(quoteResponse);
            } catch (error) {
                console.error("Error fetching stock data:", error);
                setStockDetails({});
                setQuote({});
            }
        };

        if (stockSymbol) {
            fetchData(); // fetch data when stockSymbol changes
        }
    }, [stockSymbol]); // re-run when stockSymbol changes

    return (
        <>
            <Navbar />
            <div className="dashboard">
                {/* display stock symbol as the header, call from header.jsx */}
                <div className="header">
                    <Header name={stockSymbol || "Loading..."} />
                </div>

                {/* chart section, call from chart.jsx */}
                <div className="chart">
                    <Chart />
                </div>

                {/* right Section (Overview & Details) */}
                <div className="right-section">
                    <div className="overview">
                        {/* call the overview function from overview.jsx */}
                        <Overview
                            symbol={stockSymbol}
                            price={quote.pc || "N/A"} // show latest price or "N/A"
                            change={quote.d || 0} // show price change
                            changePercent={quote.dp || 0} // show percentage change
                            currency={stockDetails.currency || "USD"} // show currency
                        />
                    </div>
                    {/* call the details function from details.jsx */}
                    <div className="details">
                        <Details details={stockDetails} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
