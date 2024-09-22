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

    const {
      alphabets,
      numbers,
      highest_lowercase_alphabet,
      email,
      roll_number,
      user_id,
      file_mime_type,
      file_size_kb
    } = response;

    let filtered = [];

    if (selectedFilters.includes('Alphabets')) {
      filtered = filtered.concat(alphabets);
    }
    
    if (selectedFilters.includes('Numbers')) {
      filtered = filtered.concat(numbers);
    }

    if (selectedFilters.includes('Highest lowercase alphabet')) {
      filtered = filtered.concat(highest_lowercase_alphabet);
    }

    if (selectedFilters.includes('Email')) {
      filtered.push(`Email: ${email}`);
    }

    if (selectedFilters.includes('Roll Number')) {
      filtered.push(`Roll Number: ${roll_number}`);
    }

    if (selectedFilters.includes('User ID')) {
      filtered.push(`User ID: ${user_id}`);
    }

    if (selectedFilters.includes('File MIME Type')) {
      filtered.push(`File MIME Type: ${file_mime_type}`);
    }

    if (selectedFilters.includes('File Size')) {
      filtered.push(`File Size (KB): ${file_size_kb}`);
    }

    setFilteredResponse(filtered.join(', '));
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Vishaal's Front End App</h1>
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
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            <option value="Email">Email</option>
            <option value="Roll Number">Roll Number</option>
            <option value="User ID">User ID</option>
            <option value="File MIME Type">File MIME Type</option>
            <option value="File Size">File Size (KB)</option>
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
