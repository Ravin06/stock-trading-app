/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/


// Import dependencies
import React, { useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts"; // import charting components from recharts
import Card from "../Components/card"; // import card
import { mockHistoricalData } from "../Components/mock"; // import mock data for chart since no historical data from api
import { convertUnixTimestampToDate } from "./date-help"; // import date conversion function
import "../S10269605H.css"; // import centralized CSS file
import { chartConfig } from "../Components/config"; // import chart configuration settings. 
import ChartFilter from "../Components/chartfilter"; // import chart filter settings

const Chart = () => {
    // store chart data and selected filter in a state
    const [data, setData] = useState(mockHistoricalData);
    const [filter, setFilter] = useState("1W");

    // format data to match the expected structure for the chart
    const formatData = () => {
        return data.c.map((item, index) => ({
            value: item.toFixed(2), // 2dp for stock price
            date: convertUnixTimestampToDate(data.t[index]), // convert time to readable date
        }));
    };

    return (
        <Card>
            {/* chart filter buttons such as : 1D, 1W, 1M, 1Y */}
            <div className="relative">
                <ul className="chart-filter-container">
                    {Object.entries(chartConfig).map(([key]) => (
                        <li key={key}>
                            <ChartFilter
                                text={key} // button text
                                active={filter === key} // highlights the selected filter
                                onClick={() => setFilter(key)} // updates filter on click
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* display charts using recharts*/}
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={formatData()}>

                        {/* add gradient color for the charts*/}
                        <defs>
                            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1"> 
                                <stop offset="5%" stopColor="maroon" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="maroon" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        {/* color of the chart line */}
                        <Area
                            type="monotone" // Smooth curve for better visuals
                            dataKey="value" // Uses 'value' from dataset
                            stroke="maroon" // Line color
                            strokeWidth={1} // Line thickness
                            fill="url(#chartColor)" // Uses the defined gradient fill
                        />

                        {/* settings for the x and y axis */}
                        <XAxis dataKey="date" /> {/* shows date on the x axis */}
                        <YAxis domain={["auto", "auto"]} /> {/* automatically scale the y axis*/}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "white", // Dark background
                                color: "maroon", // White text for visibility
                                border: "1px solid gray",
                            }}
                        /> {/* shows data when hovering cursor over points.*/}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );

};

export default Chart;
