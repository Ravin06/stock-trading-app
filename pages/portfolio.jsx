import React, { useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler } from "chart.js";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);

const Portfolio = () => {
    const [timeRange, setTimeRange] = useState("6M");

    // Sample data for different time ranges
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
                <div className="w-full bg-[#2a2a2a] p-6 rounded-xl shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-300">Account Balance Over Time</h2>
                    <Line data={chartData} />
                </div>

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
                        {[{ symbol: "AAPL", quantity: 10, avgPrice: 145, marketPrice: 150 }, { symbol: "TSLA", quantity: 5, avgPrice: 650, marketPrice: 680 }, { symbol: "AMZN", quantity: 3, avgPrice: 3200, marketPrice: 3300 }].map((stock) => {
                            const totalValue = stock.quantity * stock.marketPrice;
                            const profitLoss = (stock.marketPrice - stock.avgPrice) * stock.quantity;
                            return (
                                <tr key={stock.symbol} className="border-b border-gray-600 hover:bg-[#3a3a3a]">
                                    <td className="p-4 font-semibold text-white">{stock.symbol}</td>
                                    <td className="p-4">{stock.quantity}</td>
                                    <td className="p-4">${stock.avgPrice.toFixed(2)}</td>
                                    <td className="p-4">${stock.marketPrice.toFixed(2)}</td>
                                    <td className="p-4 font-semibold">${totalValue.toLocaleString()}</td>
                                    <td className={`p-4 font-semibold ${profitLoss >= 0 ? "text-green-400" : "text-red-400"}`}>${profitLoss.toFixed(2)}</td>
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
