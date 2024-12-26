<template>
  <div class="form-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="name" type="name" placeholder="Name" required />
      <input v-model="password" type="password" placeholder="Password" required />

      <select v-model="role">
        <option value="user">User</option>
        <option value="rider">Rider</option>
      </select>



      <button type="submit">Sign Up</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: '', // Default role is customer
    };
  },
  methods: {
    signup() {
      const apiUrl = 'https://booking.fikkton.com.ng/api/register';
      const payload = {
        email: this.email,
        name: this.name,
        password: this.password,
        role: this.role,
      };

      axios
        .post(apiUrl, payload, {
          headers: {
            'Content-Type': 'application/json', // Ensure JSON payload
          },
        })
        .then((response) => {
          console.log('Registration successful:', response.data);
          alert('Registration successful! You can now log in.');
          this.$router.push('/login'); // Redirect to login
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.error('Error:', error.response.data.message || 'Failed to register.');
            alert(`Error: ${error.response.data.message || 'Failed to register.'}`);
          } else {
            console.error('Error during registration:', error.message || 'Unknown error');
            alert('An error occurred during registration. Please try again later.');
          }
        });
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

select {
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
}

input[type="tel"] {
  padding-left: 15px;
}
</style>
