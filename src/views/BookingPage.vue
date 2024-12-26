<template>
  <div class="form-container">
    <h2>Make a Booking</h2>
    <form @submit.prevent="book">
      <input v-model="item" type="text" placeholder="Item" required />
      <input v-model="pickup_location" type="text" placeholder="Pickup Location" required />
      <input v-model="dropoff_location" type="text" placeholder="Dropoff Location" required />
      <button type="submit">Book</button>
    </form>

    <!-- Popup for Success/Failure -->
    <div v-if="popupVisible" class="popup">
      <p>
        {{ popupMessage }}
        <span @click="closePopup" class="close-btn">✕</span>
      </p>
    </div>

    <!-- Bookings List -->
    <div v-if="bookings.length > 0">
      <h3>Your Bookings</h3>
      <ul>
        <li v-for="booking in bookings" :key="booking.id">
          {{ booking.item }} - {{ booking.pickup_location }} to {{ booking.dropoff_location }} on {{ booking.date }}
          <button v-if="booking.status === 'accepted'" @click="openRatingModal(booking.id)">Rate Booking</button>
          <button class="completed" v-if="booking.status === 'completed'">Completed</button>
          <button class="pending" v-if="booking.rider_id === null">Pending</button>
        </li>
      </ul>
    </div>

    <!-- Rating Modal -->
    <RatingModal ref="ratingModal" @rating-submitted="handleRatingSubmitted" />
  </div>
</template>

<script>
import axios from "axios";
import RatingModal from "@/components/RatingModal.vue";

export default {
  components: {
    RatingModal
  },
  data() {
    return {
      pickup_location: "",
      dropoff_location: "",
      item: "",
      bookings: [],
      popupVisible: false,
      popupMessage: "",
    };
  },
  methods: {
    async book() {
      const apiUrl = "https://booking.fikkton.com.ng/api/bookings";
      const payload = {
        item: this.item,
        pickup_location: this.pickup_location,
        dropoff_location: this.dropoff_location,
        date: new Date().toISOString(),
      };

      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("You need to login first.");

        await axios.post(apiUrl, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.popupMessage = "Booking Successful!";
        this.popupVisible = true;
        this.fetchBookings();
      } catch (error) {
        const errorMsg = error.response?.data?.message || "Booking failed. Please try again.";
        this.popupMessage = `Error: ${errorMsg}`;
        this.popupVisible = true;
      }

      this.resetForm();
    },
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
    closePopup() {
      this.popupVisible = false;
    },
    openRatingModal(bookingId) {
      this.$refs.ratingModal.openRatingModal(bookingId);
    },
    handleRatingSubmitted(bookingId) {
      const booking = this.bookings.find(b => b.id === bookingId);
      if (booking) {
        booking.status = 'completed';
      }
    },
    resetForm() {
      this.item = "";
      this.pickup_location = "";
      this.dropoff_location = "";
    },
  },
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

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}
.pending {
  width: 100%;
  padding: 10px;
  background-color: #eb6b16;
  color: white;
  border: none;
  border-radius: 4px;
}

.pending:hover {
  background-color: #5e3807;
}
.completed {
  width: 100%;
  padding: 10px;
  background-color: #1dc62e;
  color: white;
  border: none;
  border-radius: 4px;
}

.completed:hover {
  background-color: #164907;
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

.close-btn {
  background-color: none;
  color: black;
  border: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  padding: 12px;
}

ul li:hover {
  background-color: #f0f0f0;
}
</style>
