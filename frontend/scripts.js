const API_BASE_URL = "http://localhost:5002/api";

// Login function
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      if (data.role === "admin") {
        window.location.href = "admin.html"; // Redirect to admin dashboard
      } else {
        window.location.href = "index.html"; // Redirect to user dashboard
      }
    } else {
      alert(data.error || "Failed to log in. Please try again later.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Failed to log in. Please try again later.");
  }
}

// Signup function
async function signup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const phone = document.getElementById("signupPhone").value;
  const address = document.getElementById("signupAddress").value;

  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone, address }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      window.location.href = "login.html"; // Redirect to login page
    } else {
      alert(data.error || "Failed to sign up. Please try again later.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Failed to sign up. Please try again later.");
  }
}

// Load Clients
async function loadClients() {
  try {
    const response = await fetch(`${API_BASE_URL}/clients`);
    const clients = await response.json();

    const clientsList = document.getElementById("clientsList");
    clientsList.innerHTML = clients
      .map(
        (client) => `
          <div>
            <p><strong>Name:</strong> ${client.Name}</p>
            <p><strong>Email:</strong> ${client.Email}</p>
            <p><strong>Phone:</strong> ${client.Phone}</p>
            <p><strong>Address:</strong> ${client.Address}</p>
            <button onclick="deleteClient(${client.ClientID})">Delete</button>
          </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error loading clients:", error);
  }
}

// Add Client
async function addClient() {
  const name = document.getElementById("clientName").value;
  const email = document.getElementById("clientEmail").value;
  const phone = document.getElementById("clientPhone").value;
  const address = document.getElementById("clientAddress").value;

  try {
    const response = await fetch(`${API_BASE_URL}/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, address }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      loadClients(); // Refresh client list
    } else {
      alert(data.error || "Failed to add client. Please try again later.");
    }
  } catch (error) {
    console.error("Error adding client:", error);
  }
}

// Delete Client
async function deleteClient(clientId) {
  if (!confirm("Are you sure you want to delete this client?")) return;

  try {
    const response = await fetch(`${API_BASE_URL}/clients/${clientId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      loadClients(); // Refresh client list
    } else {
      alert(data.error || "Failed to delete client. Please try again later.");
    }
  } catch (error) {
    console.error("Error deleting client:", error);
  }
}

// Load Trips
async function loadTrips() {
  try {
    const response = await fetch(`${API_BASE_URL}/trips`);
    const trips = await response.json();

    const tripsList = document.getElementById("tripsList");
    tripsList.innerHTML = trips
      .map(
        (trip) => `
          <div>
            <h3>${trip.Destination}</h3>
            <p><strong>Date:</strong> ${trip.Date}</p>
            <p><strong>Price:</strong> $${trip.Price}</p>
            <p>${trip.Description}</p>
            <button onclick="deleteTrip(${trip.TripID})">Delete</button>
          </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error loading trips:", error);
  }
}

// Add Trip
async function addTrip() {
  const destination = document.getElementById("destination").value;
  const date = document.getElementById("date").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  try {
    const response = await fetch(`${API_BASE_URL}/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, date, price, description }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      loadTrips(); // Refresh trip list
    } else {
      alert(data.error || "Failed to add trip. Please try again later.");
    }
  } catch (error) {
    console.error("Error adding trip:", error);
  }
}

// Delete Trip
async function deleteTrip(tripId) {
  if (!confirm("Are you sure you want to delete this trip?")) return;

  try {
    const response = await fetch(`${API_BASE_URL}/trips/${tripId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      loadTrips(); // Refresh trip list
    } else {
      alert(data.error || "Failed to delete trip. Please try again later.");
    }
  } catch (error) {
    console.error("Error deleting trip:", error);
  }
}

// Load Bookings
async function loadBookings() {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    const bookings = await response.json();

    const bookingsList = document.getElementById("bookingsList");
    bookingsList.innerHTML = bookings
      .map(
        (booking) => `
          <div>
            <p><strong>Client ID:</strong> ${booking.ClientID}</p>
            <p><strong>Trip ID:</strong> ${booking.TripID}</p>
            <p><strong>Booking Date:</strong> ${booking.BookingDate}</p>
            <p><strong>Status:</strong> ${booking.Status}</p>
            <button onclick="deleteBooking(${booking.BookingID})">Delete</button>
          </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error loading bookings:", error);
  }
}

// Add Booking
async function addBooking() {
  const clientId = document.getElementById("bookingClientId").value;
  const tripId = document.getElementById("bookingTripId").value;
  const bookingDate = document.getElementById("bookingDate").value;

  try {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId, tripId, bookingDate }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      loadBookings(); // Refresh booking list
    } else {
      alert(data.error || "Failed to add booking. Please try again later.");
    }
  } catch (error) {
    console.error("Error adding booking:", error);
  }
}

// Delete Booking
async function deleteBooking(bookingId) {
  if (!confirm("Are you sure you want to delete this booking?")) return;

  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      loadBookings(); // Refresh booking list
    } else {
      alert(data.error || "Failed to delete booking. Please try again later.");
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
  }
}

// Load Reviews
async function loadReviews() {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    const reviews = await response.json();

    const reviewsList = document.getElementById("reviewsList");
    reviewsList.innerHTML = reviews
      .map(
        (review) => `
          <div>
            <p><strong>Client ID:</strong> ${review.ClientID}</p>
            <p><strong>Trip ID:</strong> ${review.TripID}</p>
            <p><strong>Rating:</strong> ${review.Rating}</p>
            <p><strong>Comment:</strong> ${review.Comment}</p>
            <button onclick="deleteReview(${review.ReviewID})">Delete</button>
          </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error loading reviews:", error);
  }
}

// Add Review
async function addReview() {
  const clientId = document.getElementById("reviewClientId").value;
  const tripId = document.getElementById("reviewTripId").value;
  const rating = document.getElementById("reviewRating").value;
  const comment = document.getElementById("reviewComment").value;

  try {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId, tripId, rating, comment }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      loadReviews(); // Refresh review list
    } else {
      alert(data.error || "Failed to add review. Please try again later.");
    }
  } catch (error) {
    console.error("Error adding review:", error);
  }
}

// Delete Review
async function deleteReview(reviewId) {
  if (!confirm("Are you sure you want to delete this review?")) return;

  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      loadReviews(); // Refresh review list
    } else {
      alert(data.error || "Failed to delete review. Please try again later.");
    }
  } catch (error) {
    console.error("Error deleting review:", error);
  }
}

// Load Analytics
async function loadAnalytics() {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics`);
    const data = await response.json();

    document.getElementById("totalClients").innerText = data.total_clients;
    document.getElementById("totalTrips").innerText = data.total_trips;
    document.getElementById("totalBookings").innerText = data.total_bookings;
    document.getElementById("totalReviews").innerText = data.total_reviews;
  } catch (error) {
    console.error("Error loading analytics:", error);
  }
}

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("clients.html")) {
    loadClients();
  }
  if (window.location.pathname.includes("trips.html")) {
    loadTrips();
  }
  if (window.location.pathname.includes("bookings.html")) {
    loadBookings();
  }
  if (window.location.pathname.includes("reviews.html")) {
    loadReviews();
  }
  if (window.location.pathname.includes("admin.html")) {
    loadAnalytics();
  }
});
