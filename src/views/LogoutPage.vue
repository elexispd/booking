<script>
export default {
  name: 'LogoutPage',
  data() {
    return {
      message: 'Logging out...',
    };
  },
  methods: {
    logout() {
      // Clear the access token from localStorage
      localStorage.removeItem('access_token');
      
      // Redirect the user to the login page or homepage
      this.$router.push('/login');
    },
  },
  mounted() {
    // Trigger the logout function when the component is mounted
    this.logout();
  },
};
</script>

<style scoped>
/* Styling for logout page */
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.message {
  font-size: 20px;
  color: #555;
}
</style>
