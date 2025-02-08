/*
    Student Name : Wynston Wong Jun De
    Student Number: S10266219F
*/



import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { LineChart, Line, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Cookies from 'js-cookie';  // Import the js-cookie library
import Navbar from './buy-and-sell/Components/navbar.jsx'; // Import the Navbar component

const StockTradingPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [action, setAction] = useState('buy');
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [darkMode, setDarkMode] = useState(true); // Default is dark mode
  const [currentPrice, setCurrentPrice] = useState(0);
  const [graphData, setGraphData] = useState([]);  // Holds the graph data for Bitcoin
  const [bitcoinAmount, setBitcoinAmount] = useState(0); // Track the amount of Bitcoin owned

  // Fetch Bitcoin data and update graph
  const fetchBitcoinData = async () => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1');
      const data = await res.json();

      // Map the fetched data into the format used by the chart
      const formattedData = data.prices.map((pricePoint) => ({
        time: new Date(pricePoint[0]).toLocaleTimeString(),
        price: pricePoint[1],
      }));

      setGraphData(formattedData);
      setCurrentPrice(formattedData[formattedData.length - 1].price);
    } catch (error) {
      console.error('Error fetching Bitcoin data:', error);
    }
  };

  // Run this on component mount to fetch the Bitcoin data
  useEffect(() => {
    fetchBitcoinData();
    const interval = setInterval(fetchBitcoinData, 60000); // Update the price every minute
    return () => clearInterval(interval);
  }, []);

  // Retrieve Bitcoin amount from cookies on page load
  useEffect(() => {
    const storedBitcoinAmount = Cookies.get('bitcoinAmount');
    if (storedBitcoinAmount) {
      setBitcoinAmount(parseFloat(storedBitcoinAmount));
    }
  }, []);

  // Calculate the highest and lowest values from the graph data
  const getMaxMinPrice = () => {
    const prices = graphData.map((data) => data.price);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    return { maxPrice, minPrice };
  };

  const { maxPrice, minPrice } = getMaxMinPrice();

  const handleTrade = () => {
  if (action === 'sell' && quantity > bitcoinAmount) {
    alert('You do not have enough Bitcoin to sell.');
    return;
  }

  const totalValue = currentPrice * quantity;
  const transaction = {
    id: transactions.length + 1,
    quantity,
    action,
    totalValue,
    timestamp: new Date().toLocaleString(),
  };

  // Update Bitcoin amount based on action (buy or sell)
  if (action === 'buy') {
    const newAmount = parseFloat((bitcoinAmount + quantity).toFixed(6)); // Add Bitcoin to holdings
    setBitcoinAmount(newAmount);
    Cookies.set('bitcoinAmount', newAmount);  // Save the new Bitcoin amount in the cookie
  } else if (action === 'sell') {
    const newAmount = parseFloat((bitcoinAmount - quantity).toFixed(6)); // Subtract Bitcoin from holdings
    setBitcoinAmount(newAmount);
    Cookies.set('bitcoinAmount', newAmount);  // Save the new Bitcoin amount in the cookie
  }

  setTransactions([transaction, ...transactions]);

  // Create the alert message
  const newAlert = `${action === 'buy' ? 'Bought' : 'Sold'} ${quantity} Bitcoin for $${totalValue.toFixed(2)}`;
  setAlerts([newAlert, ...alerts]); // Add alert to the list

  setQuantity(1);

  // Refresh the graph by fetching the updated data
  fetchBitcoinData();  // Refresh graph data after the trade
};


  // Toggle between dark and light modes
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Calculate the value of Bitcoin holdings
  const bitcoinValue = bitcoinAmount * currentPrice;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '90vh',
        backgroundColor: darkMode ? '#121212' : '#ffffff',
        color: darkMode ? '#ffffff' : '#000000',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      {/* Navbar component here */}
      <Navbar />

      {/* Your existing content */}
      <div
        style={{
          flex: 2,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h2 style={{ marginBottom: '10px', textAlign: 'center', fontSize: '30px' }}>Bitcoin Price</h2>
        <div style={{ marginTop: '20px' }}>
          <ResponsiveContainer width="95%" height={350}>
            <LineChart data={graphData}>
              <defs>
                <linearGradient id="gradientColor" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#dc3545" stopOpacity={0.4} />
                  <stop offset="100%" stopColor={darkMode ? '#121212' : '#ffffff'} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={darkMode ? '#444444' : '#e0e0e0'} strokeDasharray="5 5" />
              <XAxis dataKey="time" stroke={darkMode ? '#ffffff' : '#000000'} />
              <YAxis
                stroke={darkMode ? '#ffffff' : '#000000'}
                tickFormatter={(value) => `$${value} `}
                domain={[minPrice, maxPrice]}  // Set Y-axis domain to show values between min and max prices
              />
              <Tooltip />
              {/* The red line */}
              <Line
                type="monotone"
                dataKey="price"
                stroke="#dc3545" // Red line
                strokeWidth={2}
                dot={true}
              />
              {/* Area with gradient below the line */}
              <Area
                type="monotone"
                dataKey="price"
                stroke="none" // No stroke on the area
                fill="url(#gradientColor)" // Gradient under the line
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Buy/Sell Form */}
      <div
        style={{
          flex: 1,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h2>{action === 'buy' ? 'Buy Bitcoin' : 'Sell Bitcoin'}</h2>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          style={{
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid red', // Red border
            width: '80%',
            color: '#ffffff', // White text
            backgroundColor: '#000000', // Black background
          }}
        />
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          style={{
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid red', // Red border
            width: '80%',
            color: '#ffffff', // White text
            backgroundColor: '#000000', // Black background
          }}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <button
          onClick={handleTrade}
          style={{
            backgroundColor: action === 'buy' ? '#dc3545' : '#dc3545',  // Changed to red
            color: '#ffffff',
            padding: '10px',
            border: '1px solid red', // Red border
            borderRadius: '5px',
            width: '80%',
          }}
        >
          {action === 'buy' ? 'Buy Now' : 'Sell Now'}
        </button>

        {/* Alerts Section */}
<div
  style={{
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#000000',  // Black background
    color: '#ffffff',  // White text
    borderRadius: '5px',
    border: '1px solid red', // Red border
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  }}
>
  {alerts.map((alert, index) => (
    <div key={index} style={{ marginBottom: '10px' }}>
      <strong>{alert}</strong>
    </div>
  ))}
</div>


        {/* Bitcoin Amount */}
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#000000',  // Black background
            color: '#ffffff',  // White text
            borderRadius: '5px',
            border: '1px solid red', // Red border
            width: '100%',
            textAlign: 'center',
          }}
        >
          <h3>Bitcoin Amount: {bitcoinAmount.toFixed(6)} BTC</h3>
          <h3>Bitcoin Value: ${bitcoinValue.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default StockTradingPage;

