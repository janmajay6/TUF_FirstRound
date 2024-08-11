// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to get the banner data
app.get('/api/banner', (req, res) => {
  db.query('SELECT * FROM banner WHERE id = 1', (err, results) => {
    if (err) {
      console.error('Error fetching banner data:', err);
      return res.status(500).send('Server error');
    }
    res.json(results[0]);
  });
});

// Route to update the banner data
app.post('/api/banner', (req, res) => {
  const { description, timer, link, visible } = req.body;

  const query = `
    UPDATE banner 
    SET description = ?, timer = ?, link = ?, visible = ?
    WHERE id = 1
  `;

  db.query(query, [description, timer, link, visible], (err, results) => {
    if (err) {
      console.error('Error updating banner data:', err);
      return res.status(500).send('Server error');
    }
    res.send('Banner updated successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
