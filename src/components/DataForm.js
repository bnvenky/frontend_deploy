// filepath: /c:/Users/shaik/OneDrive/Desktop/testingSimplePage(NoorSir)/my-react-app/frontend/src/components/DataForm.js
import React, { useState } from 'react';
import axios from 'axios';

const DataForm = ({ onDataSave }) => {
    const [inputData, setInputData] = useState('');
    const [savedData, setSavedData] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setInputData(e.target.value);
        setError(''); // Clear any previous errors
    };

    const handleSave = async () => {
        if (!inputData.trim()) {
            setError('Please enter some data');
            return;
        }

        try {
            const baseUrl = process.env.REACT_APP_API_URL; 
            //console.log('Sending request to:', apiUrl);
            console.log('Sending data:', { data: inputData });
            
            const response = await axios.post(`${baseUrl}/api/data`, { data: inputData.trim() });

            console.log('Response from server:', response.data);
            setInputData('');
            setError('');
            onDataSave(response.data.data);
            // Refresh the data list after saving
            fetchData();
        } catch (error) {
            console.error('Error saving data:', error);
            setError(`Failed to save data: ${error.response?.data?.message || error.message}`);
        }
    };

    const fetchData = async () => {
        try {
            const baseUrl = process.env.REACT_APP_API_URL; 
            //console.log('Fetching data from:', apiUrl);
            
            const response = await axios.get(`${baseUrl}/api/data`);
            
            console.log('Data fetched:', response.data);
            setSavedData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(`Failed to fetch data: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputData}
                onChange={handleInputChange}
                placeholder="Enter data"
            />
            <button style={{ marginLeft: '10px' }} onClick={handleSave}>Save</button>
            
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            
            <div>
                <h2>Saved Data</h2>
                <button onClick={fetchData}>View</button>
            </div>
            <ul>
                {savedData.map((item, index) => (
                    <li key={index}>{item.data}</li>
                ))}
            </ul>
        </div>
    );
};

export default DataForm;