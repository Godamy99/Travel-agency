const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path");
const db = require("./db"); // Import the database connection

const app = express();
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To handle JSON requests

// Serve HTML files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM Admin WHERE Username = ? AND Password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error." });
      if (results.length > 0) {
        res.json({ message: "Login successful!", role: "admin" });
      } else {
        // Check if it's a client
        db.query(
          "SELECT * FROM Clients WHERE Email = ? AND Password = ?",
          [email, password],
          (err, results) => {
            if (err) return res.status(500).json({ error: "Database error." });
            if (results.length > 0) {
              res.json({ message: "Login successful!", role: "user" });
            } else {
              res.status(401).json({ error: "Invalid email or password." });
            }
          }
        );
      }
    }
  );
});

// Signup API
app.post("/api/signup", (req, res) => {
  const { name, email, password, phone, address } = req.body;
  db.query(
    "INSERT INTO Clients (Name, Email, Password, Phone, Address) VALUES (?, ?, ?, ?, ?)",
    [name, email, password, phone, address],
    (err) => {
      if (err) return res.status(500).json({ error: "Database error." });
      res.json({ message: "Signup successful!" });
    }
  );
});

// Load Clients API
app.get("/api/clients", (req, res) => {
  db.query("SELECT * FROM Clients", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json(results);
  });
});

// Add Client API
app.post("/api/clients", (req, res) => {
  const { name, email, phone, address } = req.body;
  db.query(
    "INSERT INTO Clients (Name, Email, Phone, Address) VALUES (?, ?, ?, ?)",
    [name, email, phone, address],
    (err) => {
      if (err) return res.status(500).json({ error: "Database error." });
      res.json({ message: "Client added successfully!" });
    }
  );
});

// Delete Client API
app.delete("/api/clients/:id", (req, res) => {
  const clientId = req.params.id;
  db.query("DELETE FROM Clients WHERE ClientID = ?", [clientId], (err) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json({ message: "Client deleted successfully!" });
  });
});

// Load Trips API
app.get("/api/trips", (req, res) => {
  db.query("SELECT * FROM Trips", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json(results);
  });
});

// Add Trip API
app.post("/api/trips", (req, res) => {
  const { destination, date, price, description } = req.body;
  db.query(
    "INSERT INTO Trips (Destination, Date, Price, Description) VALUES (?, ?, ?, ?)",
    [destination, date, price, description],
    (err) => {
      if (err) return res.status(500).json({ error: "Database error." });
      res.json({ message: "Trip added successfully!" });
    }
  );
});

// Delete Trip API
app.delete("/api/trips/:id", (req, res) => {
  const tripId = req.params.id;
  db.query("DELETE FROM Trips WHERE TripID = ?", [tripId], (err) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json({ message: "Trip deleted successfully!" });
  });
});

// Load Bookings API
app.get("/api/bookings", (req, res) => {
  db.query("SELECT * FROM Bookings", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json(results);
  });
});

// Add Booking API
app.post("/api/bookings", (req, res) => {
  const { clientId, tripId, bookingDate } = req.body;

  // Check if the trip exists
  db.query("SELECT * FROM Trips WHERE TripID = ?", [tripId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    if (results.length === 0) {
      return res.status(404).json({ error: "Trip not found." });
    }

    // Insert the booking
    db.query(
      "INSERT INTO Bookings (ClientID, TripID, BookingDate) VALUES (?, ?, ?)",
      [clientId, tripId, bookingDate],
      (err) => {
        if (err) return res.status(500).json({ error: "Database error." });
        res.json({ message: "Booking added successfully!" });
      }
    );
  });
});

// Delete Booking API
app.delete("/api/bookings/:id", (req, res) => {
  const bookingId = req.params.id;
  db.query("DELETE FROM Bookings WHERE BookingID = ?", [bookingId], (err) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json({ message: "Booking deleted successfully!" });
  });
});

// Load Reviews API
app.get("/api/reviews", (req, res) => {
  db.query("SELECT * FROM Reviews", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json(results);
  });
});

// Add Review API
app.post("/api/reviews", (req, res) => {
  const { clientId, tripId, rating, comment } = req.body;
  db.query(
    "INSERT INTO Reviews (ClientID, TripID, Rating, Comment) VALUES (?, ?, ?, ?)",
    [clientId, tripId, rating, comment],
    (err) => {
      if (err) return res.status(500).json({ error: "Database error." });
      res.json({ message: "Review added successfully!" });
    }
  );
});

// Delete Review API
app.delete("/api/reviews/:id", (req, res) => {
  const reviewId = req.params.id;
  db.query("DELETE FROM Reviews WHERE ReviewID = ?", [reviewId], (err) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json({ message: "Review deleted successfully!" });
  });
});

// Load Analytics API
app.get("/api/analytics", (req, res) => {
  let data = {};
  db.query("SELECT COUNT(*) AS total_clients FROM Clients", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });
    data.total_clients = results[0].total_clients;

    db.query("SELECT COUNT(*) AS total_trips FROM Trips", (err, results) => {
      if (err) return res.status(500).json({ error: "Database error." });
      data.total_trips = results[0].total_trips;

      db.query(
        "SELECT COUNT(*) AS total_bookings FROM Bookings",
        (err, results) => {
          if (err) return res.status(500).json({ error: "Database error." });
          data.total_bookings = results[0].total_bookings;

          db.query(
            "SELECT COUNT(*) AS total_reviews FROM Reviews",
            (err, results) => {
              if (err)
                return res.status(500).json({ error: "Database error." });
              data.total_reviews = results[0].total_reviews;
              res.json(data);
            }
          );
        }
      );
    });
  });
});

// Start Server
app.listen(5002, () => {
  console.log("Server running on http://localhost:5002");
});
