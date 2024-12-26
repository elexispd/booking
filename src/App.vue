<template>
  <div id="app">
    <header>
      <div class="ok">
        <img src="./assets/logo.png" alt="" height="50" />
        <h1>Booking App</h1>
      </div>

      <nav>
        <!-- Show Login if not logged in -->
        <router-link v-if="!isLoggedIn" to="/login">[ Login ]</router-link> |
        <router-link v-if="!isLoggedIn" to="/signup">[ Signup ]</router-link> |

        <!-- Show Logout if logged in -->
        <router-link v-if="isLoggedIn" to="/logout">[ Logout ]</router-link> |

        <!-- Show Make a Booking if logged in -->
        <router-link v-if="isLoggedIn" to="/booking">[ Make a Booking ]</router-link> |

        <!-- Show Track Booking if logged in -->
        <router-link v-if="isLoggedIn" to="/tracking">[ Track Booking ]</router-link>
      </nav>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // Check if the user is logged in
      isLoggedIn: localStorage.getItem("access_token") !== null,
      userRole: localStorage.getItem("user_role"), // 'rider' or other roles
    };
  },
  watch: {
    isLoggedIn(newVal) {
      if (!newVal) {
        this.userRole = null; // Reset role if the user is logged out
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  background-color: black;
  height: 100vh;
}

.ok {
  display: flex;
  justify-content: center;
  align-items: center;
}

header {
  background-color: #f8f9fa;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

nav {
  margin-top: 0;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}
</style>
