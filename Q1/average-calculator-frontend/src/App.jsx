import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [numberId, setNumberId] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setNumberId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Make GET request to your own backend with the specified numberId
      const result = await axios.get(`http://localhost:5000/numbers/${numberId}`);
      setResponse(result.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching data');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={numberId} 
            onChange={handleInputChange} 
            placeholder="Enter number ID (p, f, e, r)" 
          />
          <button type="submit">Fetch Number</button>
        </form>
        {error && <p>{error}</p>}
        {response && (
          <div>
            <h2>Previous Window State:</h2>
            <p>{JSON.stringify(response.windowPrevState)}</p>
            <h2>Current Window State:</h2>
            <p>{JSON.stringify(response.windowCurrState)}</p>
            <h2>Numbers:</h2>
            <p>{JSON.stringify(response.numbers)}</p>
            <h2>Average:</h2>
            <p>{response.avg}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
