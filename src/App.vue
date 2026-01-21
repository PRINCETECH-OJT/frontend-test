<script setup>
import { useRoute } from "vue-router";

// Get access to the current route information
const route = useRoute();
</script>

<template>
  <div class="app-container">
    <nav v-if="!route.meta.hideNavbar">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>

    <hr v-if="!route.meta.hideNavbar" />

    <router-view />
  </div>
</template>

<style>
/* Your existing styles... */
.app-container {
  font-family: Arial, sans-serif;
  text-align: center;
  /* margin-top: 20px;  <-- You might want to remove top margin for the login page too */
}
nav {
  padding: 20px;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b883;
}
</style>
