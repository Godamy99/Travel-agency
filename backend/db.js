const mysql = require("mysql2");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const db = mysql.createConnection({
  host: "localhost", // XAMPP MySQL host
  port: 3306, // Default MySQL port
  user: "root", // Default MySQL user in XAMPP
  password: "mahmoud_005", // Leave blank if no password is set
  database: "travel_agency", // Your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the process if the connection fails
  } else {
    console.log("Database connected!");
  }
});

module.exports = db; // Export the database connection
