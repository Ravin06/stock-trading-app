import { useState, useEffect } from 'react';
import Head from 'next/head';

const LoginPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple check for login (you can add more logic)
    if (email === 'user@example.com' && password === 'password') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  // Toggle between dark and light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply styles based on darkMode state
  const pageStyle = {
    backgroundColor: darkMode ? '#05080f' : '#ffffff',
    color: darkMode ? '#ffffff' : '#000000',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontFamily: 'Roboto, sans-serif',
    position: 'relative',
  };

  const formContainerStyle = {
    padding: '40px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '450px',
    boxShadow: darkMode ? '0 4px 10px rgba(0, 0, 0, 0.2)' : '0 4px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 2, // Ensures the form stays above the particles
  };

  const inputStyle = {
    padding: '18px',
    marginBottom: '20px',
    borderRadius: '5px',
    width: '100%',
    border: '1px solid #ccc',
    fontSize: '18px',
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#000',
  };

  const buttonStyle = {
    backgroundColor: darkMode ? '#2a2f37' : '#007BFF',
    color: darkMode ? '#ffffff' : '#ffffff',
    padding: '18px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    width: '100%',
    fontSize: '18px',
  };

  const toggleButtonStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: darkMode ? '#2a2f37' : '#007BFF',
    color: darkMode ? '#ffffff' : '#000000',
    padding: '10px 15px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    zIndex: 3, // Keeps the toggle button on top of the particles
  };

  const headerStyle = {
    fontSize: '3rem', // Makes "Login" much bigger
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
  };

  useEffect(() => {
    // Load particles.js script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js';
    script.onload = () => {
      // Initialize particles.js after loading the script
      if (typeof window !== 'undefined') {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            shape: { type: 'circle' },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.3 } },
            line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' },
          },
          interactivity: {
            detect_on: 'window',
            events: { onhover: { enable: true, mode: 'repulse' } },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  if (isLoggedIn) {
    return (
      <div style={pageStyle}>
        <h1>Welcome to the Stock Trading Platform!</h1>
        <button onClick={() => setIsLoggedIn(false)} style={buttonStyle}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" />
      </Head>

      <button onClick={toggleDarkMode} style={toggleButtonStyle}>
        {darkMode ? '🌙' : '🌞'}
      </button>

      <div id="particles-js" style={{
        position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: 0, background: 'transparent',
      }}></div>

      <div style={formContainerStyle}>
        <h2 style={headerStyle}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
