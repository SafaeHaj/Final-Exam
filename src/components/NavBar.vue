<template>
  <nav class="navbar">
    <div class="navbar-links">
      <router-link to="/">Home</router-link>
      <router-link to="/recipes">Recipes</router-link>
    </div>
    <div class="navbar-auth">
      <div v-if="user">
        <router-link :to="`/profile/${user.uid}`">Profile</router-link>
        <button @click="logout" class="logout-button">Log Out</button>
      </div>
      <div v-else>
        <router-link to="/signin">Sign In</router-link>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { getUser, waitForAuthInit, observeUserState } from "@/composables/getUser";
import { projectAuthentication } from "@/firebase/config";

export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logout() {
      projectAuthentication.signOut().then(() => {
        console.log('User signed out');
      }).catch(error => {
        console.error('Error signing out:', error);
      });
      this.$router.push('/');
    },
    async userChanged(user) {
      this.user = user;
    }
  },
  async created() {
    await waitForAuthInit();
    this.user = getUser();
    observeUserState(this.userChanged);
  }
};
</script>

<style scoped>
.navbar {
  z-index: 1000;
  top: 0;
  position: fixed;
  width: 100%;
  background: linear-gradient(to right, #ff8c00, #ffb400); /* Smooth gradient from dark orange to bright yellow */
  color: #fff; /* White text for contrast */
  margin: 0;
  padding: 10px 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}

.logout-button {
  margin-right: 20px;
  background-color: #ffa500; /* Vibrant orange for the button */
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background-color 0.3s; /* Subtle hover effect */
}

/* Enhanced link styling */
.navbar-links a,
.navbar-auth a {
  color: #fff;
  text-decoration: none;
  margin: 0 15px;
  font-size: 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: color 0.3s;
}

.navbar-links a:hover,
.navbar-auth a:hover {
  color: #ffd700; /* Lighter yellow on hover for a gentle highlight */
}

.logout-button:hover {
  background-color: #ff7f00; /* Slightly darker orange on hover */
}


</style>
