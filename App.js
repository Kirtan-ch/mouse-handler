import React, { useState, useEffect } from 'react';

function App() {
  // State to track mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // State to track click count
  const [clickCount, setClickCount] = useState(0);
  
  // State to track where clicks happened
  const [clickHistory, setClickHistory] = useState([]);

  // Effect for mouse move listener
  useEffect(() => {
    // Event handler function for mouse movement
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    // Add event listener when component mounts
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  // Event handler function for mouse clicks
  const handleMouseClick = (event) => {
    // Increment click counter
    setClickCount(prevCount => prevCount + 1);
    
    // Add click position to history
    setClickHistory(prevHistory => [
      ...prevHistory, 
      { 
        id: Date.now(), 
        x: event.clientX, 
        y: event.clientY 
      }
    ]);
  };

  return (
    <div 
      className="app" 
      onClick={handleMouseClick}
      style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5'
      }}
    >
      <h1>Mouse Event Demo</h1>
      
      <div className="tracker-box">
        <h2>Current Position</h2>
        <p>X: {mousePosition.x}, Y: {mousePosition.y}</p>
      </div>
      
      <div className="click-counter">
        <h2>Click Counter</h2>
        <p>Total Clicks: {clickCount}</p>
      </div>
      
      <div className="click-history">
        <h2>Recent Clicks (last 5)</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {clickHistory.slice(-5).map(click => (
            <li key={click.id}>
              Position: X: {click.x}, Y: {click.y}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;