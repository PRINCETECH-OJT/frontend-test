<script setup>
import { useAuthStore } from './stores/auth' 
 
const auth = useAuthStore()   

const logout = async () => {
  await auth.logout() 
}
</script>

<template>
  <div class="app-container">   
    <router-view />
  </div>
</template>

<style> 
.app-container {
  font-family: Arial, sans-serif;
  text-align: center; 
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
