import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [response, setResponse] = useState(null);

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post('http://127.0.0.1:5000/bfhl', parsedJson);
      setResponse(res.data);
    } catch (error) {
      setErrorMessage('Invalid JSON input');
    }
  };

  return (
    <div>
      <h1>YOUR_ROLL_NUMBER</h1>
      <input 
        type="text" 
        value={jsonInput} 
        onChange={handleJsonChange} 
        placeholder='Enter JSON' 
      />
      <button onClick={handleSubmit}>Submit</button>
      {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}

      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
