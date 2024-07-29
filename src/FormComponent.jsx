import axios from 'axios';
import React, { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    location: '',
    totalsqft: '',
    bath: '',
    bhk: ''
  });

  const [responseData,setResponseData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert totalsqft, bath, and bhk to numbers
    const dataToSend = {
      ...formData,
      location: formData.location,
      totalsqft: parseInt(formData.totalsqft),
      bath: parseFloat(formData.bath),
      bhk: parseInt(formData.bhk, 10)
    };

    try {
      const response = await axios.post('http://localhost:8080/api/predict', dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Data sent successfully:', response.data);
      setResponseData(response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Total Sqft:</label>
        <input
          type="number"
          name="totalsqft"
          value={formData.totalsqft}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Bath:</label>
        <input
          type="number"
          name="bath"
          value={formData.bath}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>BHK:</label>
        <input
          type="number"
          name="bhk"
          value={formData.bhk}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
      {responseData && (
      <div>
        <h2>API Response:</h2>
        <pre>{JSON.stringify(responseData, null, 2)}</pre>
      </div>
    )}
    </form>
  );
};

export default FormComponent;
