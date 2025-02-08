import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const StockTradingPage = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [action, setAction] = useState('buy');
  const [transactions, setTransactions] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [darkMode, setDarkMode] = useState(true); // Default is dark mode
  const [currentPrice, setCurrentPrice] = useState(0);

  const dummyGraphData = [
    { time: '10:00', price: 9.25  },
    { time: '10:10', price: 10.92 },
    { time: '10:20', price: 12.42 },
    { time: '10:30', price: 11.03 },
    { time: '10:40', price: 15.18 },
    { time: '10:50', price: 14.35 },
    { time: '11:00', price: 12.25 },
    { time: '11:10', price: 15.34 },
    { time: '11:20', price: 18.74 },
    { time: '11:30', price: 15.29 },
    { time: '11:40', price: 16.94 },
    { time: '11:50', price: 18.17 },
    { time: '12:00', price: 19.37 },
    { time: '12:10', price: 21.82 },
    { time: '12:20', price: 17.64 },
    { time: '12:30', price: 14.17 },
    { time: '12:40', price: 13.29 },
    { time: '12:50', price: 12.36 },
    { time: '13:00', price: 11.66 },
    { time: '13:10', price: 15.83 },
    { time: '13:20', price: 14.88 },
    { time: '13:30', price: 11.46 },
    { time: '13:40', price: 11.27 },
    { time: '13:50', price: 19.85 },
    { time: '14:00', price: 14.72 },
    { time: '14:10', price: 10.85 },
    { time: '14:20', price: 12.23 },
    { time: '14:30', price: 11.65 },
    { time: '14:40', price: 15.93 },
    { time: '14:50', price: 14.84 },
    { time: '15:00', price: 9.26  },
    { time: '15:10', price: 8.34  },
    { time: '15:20', price: 5.00  },
    { time: '15:30', price: 3.01  },
    { time: '15:40', price: 6.49  },
    { time: '15:50', price: 10.17 },
    { time: '16:10', price: 12.09 },
    { time: '16:20', price: 11.17 },
    { time: '16:30', price: 17.24 },
    { time: '16:40', price: 14.23 },
    { time: '16:50', price: 13.85 },
    { time: '17:00', price: 12.75 },
    { time: '17:10', price: 11.93 },
    { time: '17:20', price: 15.82 },
    { time: '17:30', price: 17.43 },
    { time: '17:40', price: 21.64 },
    { time: '17:50', price: 24.34 },
    { time: '18:00', price: 21.69 }
  ];

  // Function to get the current stock price based on the latest data
  const getCurrentPrice = () => {
    const lastPriceData = dummyGraphData[dummyGraphData.length - 1];
    setCurrentPrice(lastPriceData.price);
  };

  // Run this on component mount to set the current stock price
  useEffect(() => {
    getCurrentPrice();
  }, []);

  const handleTrade = () => {
    if (!stockSymbol) {
      alert('Please enter a stock symbol.');
      return;
    }

    const totalValue = currentPrice * quantity;
    const transaction = {
      id: transactions.length + 1,
      stockSymbol,
      quantity,
      action,
      totalValue,
      timestamp: new Date().toLocaleString(),
    };

    setTransactions([transaction, ...transactions]);

    // Create the alert message
    const newAlert = `${action === 'buy' ? 'Bought' : 'Sold'} ${quantity} shares of ${stockSymbol} for $${totalValue.toFixed(2)}`;
    setAlerts([newAlert, ...alerts]); // Add alert to the list

    setStockSymbol('');
    setQuantity(1);
    getCurrentPrice();  // Update the current stock price after each trade
  };

  // Toggle between dark and light modes
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
        <h2 style={{ marginBottom: '10px', textAlign: 'center', fontSize: '30px' }}>𝕏 Stocks</h2>
        <div style={{ marginTop: '20px' }}>
          <ResponsiveContainer width="95%" height={350}>
            <LineChart data={dummyGraphData}>
              <CartesianGrid stroke={darkMode ? '#444444' : '#e0e0e0'} strokeDasharray="5 5" />
              <XAxis dataKey="time" stroke={darkMode ? '#ffffff' : '#000000'} />
              <YAxis stroke={darkMode ? '#ffffff' : '#000000'} tickFormatter={(value) => `$${value} `} />
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
        <h2>{action === 'buy' ? 'Buy Stocks' : 'Sell Stocks'}</h2>
        <input
          type="text"
          placeholder="Stock Symbol (e.g., AAPL)"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
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
      </div>
    </div>
  );
};

export default StockTradingPage;

