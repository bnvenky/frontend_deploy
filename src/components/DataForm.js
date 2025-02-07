// filepath: /c:/Users/shaik/OneDrive/Desktop/testingSimplePage(NoorSir)/my-react-app/frontend/src/components/DataForm.js
import React, { useState } from 'react';

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
            const apiUrl = process.env.REACT_APP_API_URL;
            console.log('Sending request to:', apiUrl);
            console.log('Sending data:', { data: inputData });
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ data: inputData.trim() })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Response from server:', result);
            setInputData('');
            setError('');
            onDataSave(result.data);
            // Refresh the data list after saving
            fetchData();
        } catch (error) {
            console.error('Error saving data:', error);
            setError(`Failed to save data: ${error.message}`);
        }
    };

    const fetchData = async () => {
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            console.log('Fetching data from:', apiUrl);
            
            const response = await fetch(apiUrl, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Data fetched:', result);
            setSavedData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(`Failed to fetch data: ${error.message}`);
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