/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

// configuration for different time filters on the stock chart based on finnhub api (resolution needed)
export const chartConfig = {
    "1D": { resolution: "1", days: 1, weeks: 0, months: 0, years: 0 }, // 1-minute intervals, past 1 day
    "1W": { resolution: "15", days: 0, weeks: 1, months: 0, years: 0 }, // 15-minute intervals, past 1 week
    "1M": { resolution: "60", days: 0, weeks: 0, months: 1, years: 0 }, // 1-hour intervals, past 1 month
    "1Y": { resolution: "D", days: 0, weeks: 0, months: 0, years: 1 }, // daily intervals, past 1 year
};
