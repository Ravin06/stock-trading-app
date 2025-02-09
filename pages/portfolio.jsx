/*
Student Name: Cedrick Tan Yi Quan
Student Number: S10265863D
*/

import React, { useState, useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler } from "chart.js";
import Navbar from "./portfolio/Components/navbar.jsx";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);

const Portfolio = () => {
    const [timeRange, setTimeRange] = useState("6M");

    // Static stock data (except for marketPrice)
    const initialStocks = [
        { symbol: "AAPL", quantity: 10, avgPrice: 145 },
        { symbol: "TSLA", quantity: 5, avgPrice: 300 },
        { symbol: "AMZN", quantity: 3, avgPrice: 200 },
    ];

    const [stocks, setStocks] = useState(initialStocks.map(stock => ({ ...stock, marketPrice: null })));

    // Fetch market prices from Finnhub API
    useEffect(() => {
        const fetchMarketPrices = async () => {
            try {
                const updatedStocks = await Promise.all(
                    initialStocks.map(async (stock) => {
                        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=cujqgbpr01qgs4826d3gcujqgbpr01qgs4826d40`);
                        const data = await response.json();
                        return {
                            ...stock,
                            marketPrice: data.c || stock.avgPrice, // 'c' is the current price in Finnhub's response
                        };
                    })
                );
                setStocks(updatedStocks);
            } catch (error) {
                console.error("Error fetching market prices:", error);
            }
        };

        fetchMarketPrices();
    }, []);

    // Calculate total stock value dynamically
    const totalStockValue = stocks.reduce((acc, stock) => {
        return acc + stock.quantity * (stock.marketPrice || stock.avgPrice);
    }, 0);

    // Sample data for different time ranges (for net worth of stock over time)
    const timeRangeData = {
        "5D": { labels: ["5/2/25", "6/2/25", "7/2/25", "8/2/25", "9/2/25"], data: [2400, 3000, 3500, 3700, totalStockValue] },
        "1M": { labels: ["10/1/25", "25/1/25", "9/2/25"], data: [1500, 1750, totalStockValue] },
        "3M": { labels: ["10/11/24", "26/12/24", "9/2/25"], data: [800, 900, totalStockValue] },
        "6M": { labels: ["10/8/24", "10/11/24", "9/2/25"], data: [400, 800, totalStockValue] },
        "YTD": { labels: ["1/1/25", "21/1/25", "9/2/25"], data: [1900, 2200, totalStockValue] },
        "1Y": { labels: ["10/2/24", "11/8/24", "9/2/25"], data: [50, 405, totalStockValue] },
        "MAX": { labels: ["19/3/23", "29/2/24", "9/2/25"], data: [500, 200, totalStockValue] }
    };

    const chartData = {
        labels: timeRangeData[timeRange].labels,
        datasets: [
            {
                label: "Net Worth of Stocks",
                data: timeRangeData[timeRange].data,
                borderColor: "#4CAF50",
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return null;
                    }
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, "rgba(76, 175, 80, 0.5)");
                    gradient.addColorStop(1, "rgba(76, 175, 80, 0)");
                    return gradient;
                },
                fill: true,
            },
        ],
    };

    const cashData = {
        labels: ["USD Cash", "SGD Cash", "HKD Cash"],
        datasets: [
            {
                data: [5000, 3000, 2000],
                backgroundColor: ["#FFD700", "#00CED1", "#8A2BE2"],
                hoverOffset: 4,
            },
        ],
    };

    // Static cash balance (USD + SGD + HKD)
    const cashBalance = 5000 + 3000 + 2000;

    // Compute dynamic account balance
    const accountBalance = cashBalance + totalStockValue;

    return (
        <div className="p-6 bg-[#1e1e1e] min-h-screen flex">
            <Navbar />
            {/* Left Side Panel (Account Info & Cash Balance) */}
            <div className="w-1/4 bg-[#232323] p-6 rounded-xl shadow-md mr-6 border border-[#3a3a3a] flex flex-col">
                <h2 className="text-xl font-semibold mb-4 text-gray-300">Account Info</h2>
                <div className="border-b border-[#3a3a3a] pb-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-400">Total Account Value</h3>
                    <p className="text-3xl font-bold text-white">${accountBalance.toFixed(2)}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-400">Cash Available</h3>
                    <p className="text-md font-bold text-white">USD: $5,000</p>
                    <p className="text-md font-bold text-white">SGD: S$3,000</p>
                    <p className="text-md font-bold text-white">HKD: HK$2,000</p>
                </div>
                <div className="mt-6">
                    <Doughnut data={cashData} />
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                {/* Main Chart */}
                <div className="w-full bg-[#2a2a2a] p-6 rounded-xl shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-300">Portfolio Worth Over Time</h2>
                    <Line data={chartData} />
                </div>

                {/* Date Selector Range */}
                <div className="w-full bg-[#232323] p-2 rounded-lg mb-6">
                    <div className="flex justify-between">
                        {["5D", "1M", "3M", "6M", "YTD", "1Y", "MAX"].map((range) => (
                            <button
                                key={range}
                                className={`flex-1 text-center py-3 rounded-md text-gray-300 mx-2 ${timeRange === range ? "bg-gray-500 bg-opacity-30" : "hover:text-white"}`}
                                onClick={() => setTimeRange(range)}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Positions Table */}
                <div className="w-full bg-[#2a2a2a] p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-300">Positions</h2>
                    <table className="w-full text-left text-gray-300">
                        <thead>
                        <tr className="border-b border-gray-500">
                            <th className="p-4">Symbol</th>
                            <th className="p-4">Quantity</th>
                            <th className="p-4">Avg Price</th>
                            <th className="p-4">Market Price</th>
                            <th className="p-4">Total Value</th>
                            <th className="p-4">Profit/Loss</th>
                        </tr>
                        </thead>
                        <tbody>
                            {stocks.map((stock) => {
                                const totalValue = stock.quantity * (stock.marketPrice || stock.avgPrice);
                                const profitLoss = ((stock.marketPrice || stock.avgPrice) - stock.avgPrice) * stock.quantity;

                                return (
                                    <tr key={stock.symbol} className="border-b border-gray-600 hover:bg-[#3a3a3a]">
                                        <td className="p-4 font-semibold text-white">{stock.symbol}</td>
                                        <td className="p-4">{stock.quantity}</td>
                                        <td className="p-4">${stock.avgPrice.toFixed(2)}</td>
                                        <td className="p-4">{stock.marketPrice ? `$${stock.marketPrice.toFixed(2)}` : "Loading..."}</td>
                                        <td className="p-4 font-semibold">${totalValue.toFixed(2)}</td>
                                        <td className={`p-4 font-semibold ${profitLoss >= 0 ? "text-green-400" : "text-red-400"}`}>
                                            ${profitLoss.toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
