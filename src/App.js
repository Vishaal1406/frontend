import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [filteredResponse, setFilteredResponse] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    document.title = "Vishaal's Front End App";
  }, []);

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post('https://backend-07nl.onrender.com/bfhl', parsedJson);
      setResponse(res.data);
    } catch (error) {
      setErrorMessage('Invalid JSON input');
    }
  };

  const handleFilterChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedFilters(options);
  };

  const filterResponse = () => {
    if (!response) return;

    let filtered = [];

    if (selectedFilters.includes('Alphabets') && response.alphabets.length) {
        filtered.push(`Alphabets: ${response.alphabets.join(', ')}`);
    }
    
    if (selectedFilters.includes('Numbers') && response.numbers.length) {
        filtered.push(`Numbers: ${response.numbers.join(', ')}`);
    }

    if (selectedFilters.includes('Highest lowercase alphabet') && response.highest_lowercase_alphabet.length) {
        filtered.push(`Highest lowercase alphabet: ${response.highest_lowercase_alphabet[0]}`);
    }

    if (selectedFilters.includes('Email') && response.email) {
        filtered.push(`Email: ${response.email}`);
    }

    if (selectedFilters.includes('Roll Number') && response.roll_number) {
        filtered.push(`Roll Number: ${response.roll_number}`);
    }

    if (selectedFilters.includes('File MIME Type') && response.file_mime_type) {
        filtered.push(`File MIME Type: ${response.file_mime_type}`);
    }

    if (selectedFilters.includes('File Size') && response.file_size_kb) {
        filtered.push(`File Size (KB): ${response.file_size_kb}`);
    }

    setFilteredResponse(filtered.join(', '));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Vishaal's Front End App</h1>
      <p className="mb-4 text-gray-600">
        Example input: {`{ "data": ["M", "1", "334", "4", "B", "Z", "a"], "email": "john_doe@srmist.edu.in", "roll_number": "RA12345678901234", "file_b64": "BASE_64_ENCODED_STRING" }`}</p>
      <p className="mb-4 text-gray-600">The Mail should end with srmist.edu.in and the Roll number should be starting with RA followed by 14 digits</p>
      <input 
        type="text" 
        value={jsonInput} 
        onChange={handleJsonChange} 
        placeholder='Enter JSON' 
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button 
        onClick={handleSubmit} 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

    {response && (
        <div className="mt-4">
          <label className="block mb-2">Select Filters:</label>
          <select 
            multiple={true} 
            onChange={handleFilterChange} 
            className="w-full border border-gray-300 rounded p-2 mb-4"
          >
            {/* Conditional rendering of filter options based on response data */}
            {response.alphabets.length > 0 && <option value="Alphabets">Alphabets</option>}
            {response.numbers.length > 0 && <option value="Numbers">Numbers</option>}
            {response.highest_lowercase_alphabet.length > 0 && <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>}
            {response.email && <option value="Email">Email</option>}
            {response.roll_number && <option value="Roll Number">Roll Number</option>}
            {response.file_mime_type && <option value="File MIME Type">File MIME Type</option>}
            {response.file_size_kb && <option value="File Size">File Size (KB)</option>}
          </select>
          <button 
            onClick={filterResponse} 
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Filter Response
          </button>
          <div className="mt-4">
            <p className="font-semibold">Filtered Response: {filteredResponse}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
