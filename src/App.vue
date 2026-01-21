<script setup>
import { useAuthStore } from './stores/auth'
import { useRouter } from "vue-router";
 
const auth = useAuthStore() 
const router = useRouter() 

const logout = async () => {
  await auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="app-container">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link v-if="!auth.isLoggedIn" to="/login">Login</router-link>
      <router-link v-if="auth.isLoggedIn" to="/dashboard">Dashboard</router-link>
      <button v-if="auth.isLoggedIn" @click="logout">Logout</button>
    </nav>

    <hr />

    <router-view />
  </div>
</template>

<style> 
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
