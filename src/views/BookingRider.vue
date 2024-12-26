<template>
    <div class="form-container">
      <h2>Available Bookings</h2>
  
      <!-- Bookings List -->
      <div v-if="bookings.length > 0">
        <h3>Available Bookings</h3>
        <ul>
          <li v-for="booking in bookings" :key="booking.id">
            {{ booking.item }} - {{ booking.pickup_location }} to {{ booking.dropoff_location }} on {{ booking.date }}
            <button @click="acceptBooking(booking.id)">Accept</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        bookings: [], 
        popupMessage: "", 
        popupVisible: false, 
      };
    },
    methods: {
      // Accept the booking
      async acceptBooking(bookingId) {
        const apiUrl = `https://booking.fikkton.com.ng/api/bookings/${bookingId}/accept`;
        
        try {
          const token = localStorage.getItem("access_token");
          if (!token) throw new Error("You need to login first.");
  
          // Send request to accept booking
          const response = await axios.put(apiUrl, {}, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response)
  
          // Show success message
          this.popupMessage = "Booking Accepted!";
          this.popupVisible = true;
          alert("Booking Accepted!");
  
          // Refresh bookings list
          this.fetchBookings();
        } catch (error) {
          const errorMsg = error.response?.data?.message || "Failed to accept the booking. Please try again.";
          this.popupMessage = `Error: ${errorMsg}`;
          this.popupVisible = true;
        }
      },
  
      // Fetch the list of bookings for the rider
      async fetchBookings() {
        const apiUrl = "https://booking.fikkton.com.ng/api/bookings";
        try {
          const token = localStorage.getItem("access_token");
          if (!token) throw new Error("You need to login first.");
  
          const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.bookings = response.data;
        } catch (error) {
          console.error("Error fetching bookings:", error);
          alert("Failed to fetch bookings. Please try again.");
        }
      },
  
      // Close the popup message
      closePopup() {
        this.popupVisible = false;
      },
    },
  
    // Fetch bookings when the component is mounted
    mounted() {
      this.fetchBookings();
    },
  };
  </script>
  
  <style scoped>
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup p {
    background-color: white;
    padding: 10px;
    border-radius: 8px;
    font-size: 18px;
    width: 300px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  ul li {
    padding: 10px;
    margin: 5px;
    border: 1px solid #ddd;
    cursor: pointer;
    border-radius: 4px;
  }
  
  ul li:hover {
    background-color: #f0f0f0;
  }
  </style>
  