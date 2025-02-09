/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

// Function to generate mock stock data for different timeframes
const generateMockData = (count, unit, startPrice, startYear = 2025) => {
    const data = [];
    let currentDate = new Date(`${startYear}-01-01`); // Custom start year
    let price = startPrice;

    for (let i = 0; i < count; i++) {
        price += (Math.random() - 0.5) * 5; // Random fluctuation between -2.5 and +2.5

        let formattedDate;
        if (unit === "hours") {
            formattedDate = `${String(9 + i).padStart(2, "0")}:00`; // 09:00 - 16:00
        } else if (unit === "days") {
            formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
        } else if (unit === "months") {
            formattedDate = currentDate.toLocaleString("default", { month: "short" }); // Jan, Feb, etc.
        } else if (unit === "years") {
            formattedDate = currentDate.getFullYear().toString(); // 2022, 2023, 2024, 2025
        }

        data.push({
            date: formattedDate,
            value: parseFloat(price.toFixed(2)), // Keep 2 decimal places
        });

        if (unit === "hours") {
            currentDate.setHours(currentDate.getHours() + 1);
        } else if (unit === "days") {
            currentDate.setDate(currentDate.getDate() + 1);
        } else if (unit === "months") {
            currentDate.setMonth(currentDate.getMonth() + 1);
        } else if (unit === "years") {
            currentDate.setFullYear(currentDate.getFullYear() + 1);
        }
    }

    return data;
};
// Mock stock search results
export const mockSearchResults = {
    count: 4,
    result: [
        { description: "APPLE INC", displaySymbol: "AAPL", symbol: "AAPL", type: "Common Stock" },
        { description: "APPLE INC", displaySymbol: "AAPL.SW", symbol: "AAPL.SW", type: "Common Stock" },
        { description: "APPLE INC", displaySymbol: "APC.BE", symbol: "APC.BE", type: "Common Stock" },
        { description: "APPLE INC", displaySymbol: "APC.DE", symbol: "APC.DE", type: "Common Stock" },
    ],
};

// Mock company details
export const mockCompanyDetails = {
    country: "US",
    currency: "USD",
    exchange: "NASDAQ/NMS (GLOBAL MARKET)",
    ipo: "1980-12-12",
    marketCapitalization: 1415993,
    name: "Apple Inc",
    phone: "14089961010",
    shareOutstanding: 4375.47998046875,
    ticker: "AAPL",
    weburl: "https://www.apple.com/",
    logo: "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
    finnhubIndustry: "Technology",
};

// Mock stock quote
export const mockStockQuote = {
    c: 261.74,
    h: 263.31,
    l: 260.68,
    o: 261.07,
    pc: 259.45,
    t: 1582641000,
};

// Mock historical data for 1D, 1W, 1M, and 1Y
export const mockHistoricalData = {
    "1D": generateMockData(8, "hours", 220), // Intraday (8 hours, 09:00 AM - 16:00 PM)
    "1W": generateMockData(7, "days", 220), // Full Week
    "1M": generateMockData(12, "months", 220), // Monthly (Jan-Dec)
    "1Y": generateMockData(4, "years", 220, 2022), // FIXED: Starts from 2022, ends at 2025
};