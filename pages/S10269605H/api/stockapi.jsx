/*
    Student Name : Tan Jun Rui Javen
    Student Number: S10269605H
*/

// Base URL for Finnhub API
const BASE_URL = "https://finnhub.io/api/v1";

// API Key for authentication
const API_KEY = "cuiv6n1r01qtqfmjknb0cuiv6n1r01qtqfmjknbg";

// Check if API key exists
if (!API_KEY) {
    console.error("API Key is missing! Check your .env file.");
} else {
    console.log("API Key Loaded:", API_KEY);
}

/*
  Fetches data from the Finnhub API.
*/
const fetchData = async (endpoint) => {
    try {
        const url = `${BASE_URL}${endpoint}&token=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API Fetch Error:", error.message);
        throw error;
    }
};

// search for stock symbols
export const searchSymbol = (query) => fetchData(`/search?q=${query}`);

// get stock details (company info)
export const fetchStockDetails = (stockSymbol) =>
    fetchData(`/stock/profile2?symbol=${stockSymbol}`);

// get the latest stock price
export const fetchQuote = (stockSymbol) =>
    fetchData(`/quote?symbol=${stockSymbol}`);

// get historical data for stock charts
export const fetchHistoricalData = (stockSymbol, resolution, from, to) =>
    fetchData(`/stock/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}`);
