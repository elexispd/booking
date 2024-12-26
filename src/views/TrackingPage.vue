<template>
  <div class="form-container">
    <h2>Track Your Booking</h2>
    <input v-model="bookingId" type="text" placeholder="Enter Booking ID" />
    <button @click="trackBooking">Track</button>
    <div v-if="bookingStatus">
      <p>Status: {{ bookingStatus }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookingId: '',
      bookingStatus: null,
    };
  },
  methods: {
    trackBooking() {
      console.log('Tracking Booking:', this.bookingId);
      // Simulate booking status
      this.bookingStatus = 'Confirmed';
    },
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

p {
  text-align: center;
  margin-top: 20px;
}
</style>
