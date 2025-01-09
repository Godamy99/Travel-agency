const db = require("./db");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const seed = async () => {
  try {
    // Clear existing data
    await db.query("DELETE FROM Clients");
    await db.query("DELETE FROM Trips");
    await db.query("DELETE FROM Bookings");
    await db.query("DELETE FROM Reviews");
    await db.query("DELETE FROM Notifications");
    await db.query("DELETE FROM Admin");

    // Add sample data
    const [client] = await db.query(
      "INSERT INTO Clients (Name, Email, Password, Phone, Address) VALUES (?, ?, ?, ?, ?)",
      [
        "John Doe",
        "john.doe@example.com",
        "password123",
        "1234567890",
        "123 Elm Street",
      ]
    );

    const [trip] = await db.query(
      "INSERT INTO Trips (Destination, Date, Price, Description) VALUES (?, ?, ?, ?)",
      ["Paris", "2024-06-15", 1500, "A week-long trip to Paris."]
    );

    await db.query(
      "INSERT INTO Bookings (ClientID, TripID, BookingDate) VALUES (?, ?, ?)",
      [client.insertId, trip.insertId, new Date()]
    );

    await db.query(
      "INSERT INTO Reviews (ClientID, TripID, Rating, Comment) VALUES (?, ?, ?, ?)",
      [client.insertId, trip.insertId, 5, "Amazing trip!"]
    );

    await db.query(
      "INSERT INTO Notifications (ClientID, Message) VALUES (?, ?)",
      [client.insertId, "Your booking has been confirmed."]
    );

    await db.query("INSERT INTO Admin (Username, Password) VALUES (?, ?)", [
      "admin",
      "admin123",
    ]);

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    process.exit();
  }
};

seed();
