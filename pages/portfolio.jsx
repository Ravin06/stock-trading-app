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

    // Sample data for different time ranges (for account balance over time)
    const timeRangeData = {
        "5D": { labels: ["Mon", "Tue", "Wed", "Thu", "Fri"], data: [20000, 21200, 22500, 23300, 24000] },
        "1M": { labels: ["Week 1", "Week 2", "Week 3", "Week 4"], data: [24000, 24300, 24700, 25000] },
        "3M": { labels: ["Jan", "Feb", "Mar"], data: [23000, 24500, 25000] },
        "6M": { labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"], data: [22000, 22500, 23000, 24000, 25000] },
        "YTD": { labels: ["Jan", "Feb", "Mar", "Apr", "May"], data: [21000, 22000, 23000, 24000, 25000] },
        "1Y": { labels: ["Feb", "Apr", "Jun", "Aug", "Oct", "Dec"], data: [20000, 21000, 22000, 23000, 24000, 25000] },
        "MAX": { labels: ["2021", "2022", "2023", "2024", "2025"], data: [15000, 18000, 20000, 23000, 25000] }
    };

    const chartData = {
        labels: timeRangeData[timeRange].labels,
        datasets: [
            {
                label: "Account Balance",
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

    return (
        <div className="p-6 bg-[#1e1e1e] min-h-screen flex">
            <Navbar />
            {/* Left Side Panel (Account Info & Cash Balance) */}
            <div className="w-1/4 bg-[#232323] p-6 rounded-xl shadow-md mr-6 border border-[#3a3a3a] flex flex-col">
                <h2 className="text-xl font-semibold mb-4 text-gray-300">Account Info</h2>
                <div className="border-b border-[#3a3a3a] pb-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-400">Total Account Value</h3>
                    <p className="text-3xl font-bold text-white">$25,000</p>
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
                    <h2 className="text-xl font-semibold mb-4 text-gray-300">Account Balance Over Time</h2>
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
