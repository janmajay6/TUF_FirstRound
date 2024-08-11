// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './Banner';

function HomePage() {
  const [bannerData, setBannerData] = useState({
    description: '',
    timer: 0,
    link: '',
    visible: true,
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/banner')
      .then(response => setBannerData(response.data))
      .catch(error => console.error('Error fetching banner data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/banner', bannerData)
      .then(() => alert('Banner updated successfully'))
      .catch(error => console.error('Error updating banner:', error));
  };

  return (
    <div className="container">
      <Banner data={bannerData} setBannerData={setBannerData} />
      <div className="dashboard">
        <h1>Banner Dashboard</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={bannerData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Timer (seconds):</label>
            <input
              type="number"
              name="timer"
              value={bannerData.timer}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Link:</label>
            <input
              type="text"
              name="link"
              value={bannerData.link}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="visible"
                checked={bannerData.visible}
                onChange={handleChange}
              />
              Banner Visible
            </label>
          </div>
          <button type="submit">Update Banner</button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
