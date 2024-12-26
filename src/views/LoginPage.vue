<template>
  <div class="form-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const apiUrl = "https://booking.fikkton.com.ng/api/login";
      const payload = {
        email: this.email,
        password: this.password,
      };

      try {
        const response = await axios.post(apiUrl, payload, {
          headers: { "Content-Type": "application/json" },
        });

        const { access_token } = response.data;
        const role = response.data.user.role
        console.log(role)
        if (access_token) {
          localStorage.setItem("access_token", access_token);
          alert("Login successful!");
          if(role == "rider") {
            this.$router.push("rider/booking");
          } else {
            this.$router.push("/booking");
          }
          
        } else {
          throw new Error("Token not received. Please try again.");
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || "Login failed.";
        alert(`Error: ${errorMsg}`);
      }
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
}
</style>
