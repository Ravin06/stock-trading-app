/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

// Import dependencies
import React, { useState, useEffect } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts"; // Import charting components from recharts
import Card from "../Components/card"; // Import Card component
import { mockHistoricalData } from "../Components/mock"; // Import mock data
import "../S10269605H.css"; // Import centralized CSS
import { chartConfig } from "../Components/config"; // Import chart filter settings
import ChartFilter from "../Components/chartfilter"; // Import chart filter buttons

const Chart = () => {
    const [data, setData] = useState(mockHistoricalData["1W"]); // Default to 1W
    const [filter, setFilter] = useState("1W");

    useEffect(() => {
        // Ensure that the selected filter exists in mockHistoricalData
        if (mockHistoricalData[filter]) {
            setData(mockHistoricalData[filter]);
        } else {
            console.error("Invalid filter:", filter);
            setData([]);
        }
    }, [filter]);

    return (
        <Card>
            {/* Chart Filter Buttons (1D, 1W, 1M, 1Y) */}
            <div className="relative">
                <ul className="chart-filter-container">
                    {Object.entries(chartConfig).map(([key]) => (
                        <li key={key}>
                            <ChartFilter
                                text={key} // Filter text
                                active={filter === key} // Highlight selected filter
                                onClick={() => setFilter(key)} // Update filter on click
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Chart Display */}
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        {/* Gradient Fill */}
                        <defs>
                            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="maroon" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="maroon" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        {/* Chart Area */}
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="maroon"
                            strokeWidth={1}
                            fill="url(#chartColor)"
                        />

                        {/* X & Y Axis */}
                        <XAxis dataKey="date" tick={{ fill: "white" }} /> {/* White date labels */}
                        <YAxis domain={["auto", "auto"]} tick={{ fill: "white" }} />

                        {/* Tooltip with Date & Value */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#333", // Dark background
                                color: "white", // White text for visibility
                                border: "1px solid gray",
                            }}
                            labelFormatter={(label) => `Date: ${label}`} // Show date in tooltip
                            formatter={(value) => [`Price: ${value}`, "Stock Value"]} // Show stock value
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default Chart;

