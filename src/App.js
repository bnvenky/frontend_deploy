import React, { useState } from 'react';
import DataForm from './components/DataForm';

function App() {
  const [data, setData] = useState([]);

  const handleDataSave = (newData) => {
    setData([...data, newData]);
  };

  return (
    <div>
      <h1>Data Management App</h1>
      <DataForm onDataSave={handleDataSave} />
  
      {/* <ul>
        {data.map((item, index) => (
          <li key={index}>{item.data}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;