// server/db.js
const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',   // MySQL host (usually 'localhost')
  user: 'root',        // MySQL username (default is 'root')
  password: 'New6#aap',// MySQL password
  database: 'banner_db'// The name of your database
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('MySQL connected...');
});

module.exports = db;
