import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const StockTradingPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [action, setAction] = useState('buy');
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [darkMode, setDarkMode] = useState(true); // Default is dark mode
  const [currentPrice, setCurrentPrice] = useState(0);
  const [graphData, setGraphData] = useState([]);  // Holds the graph data for Bitcoin
  const [bitcoinAmount, setBitcoinAmount] = useState(0); // Track the amount of Bitcoin owned

  // Function to fetch Bitcoin price and graph data
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
      setBitcoinAmount((prevAmount) => parseFloat((prevAmount + quantity).toFixed(6))); // Add Bitcoin to holdings
    } else if (action === 'sell') {
      setBitcoinAmount((prevAmount) => parseFloat((prevAmount - quantity).toFixed(6))); // Subtract Bitcoin from holdings
    }

    setTransactions([transaction, ...transactions]);

    // Create the alert message
    const newAlert = `${action === 'buy' ? 'Bought' : 'Sold'} ${quantity} Bitcoin for $${totalValue.toFixed(2)}`;
    setAlerts([newAlert, ...alerts]); // Add alert to the list

    setQuantity(1);
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
      {/* Dark/Light Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          backgroundColor: darkMode ? '#333333' : '#ffffff',
          color: darkMode ? '#333333' : '#ffffff',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {darkMode ? '🌙' : '🌞'}
      </button>

      {/* Graph Section */}
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
              <CartesianGrid stroke={darkMode ? '#444444' : '#e0e0e0'} strokeDasharray="5 5" />
              <XAxis dataKey="time" stroke={darkMode ? '#ffffff' : '#000000'} />
              <YAxis
                stroke={darkMode ? '#ffffff' : '#000000'}
                tickFormatter={(value) => `$${value} `}
                domain={[minPrice, maxPrice]}  // Set Y-axis domain to show values between min and max prices
              />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={2} dot={true} />
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
            border: '1px solid #ccc',
            width: '80%',
            color: '#000',
            backgroundColor: darkMode ? '#fff' : '#fff',
          }}
        />
        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
          style={{
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '5px',
            width: '80%',
          }}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <button
          onClick={handleTrade}
          style={{
            backgroundColor: action === 'buy' ? '#28a745' : '#dc3545',
            color: '#ffffff',
            padding: '10px',
            border: 'none',
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
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '5px',
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
            backgroundColor: '#e0f7fa',
            color: '#00796b',
            borderRadius: '5px',
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

