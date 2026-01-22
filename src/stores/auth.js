import { defineStore } from 'pinia'
import api from '../api'
import router from '../router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,

    hasRole: (state) => (role) => {
      return state.user?.roles?.includes(role) || false;
    },
  },

  actions: {
    async login(username, password) {
      this.loading = true

      try {
        await api.get("/sanctum/csrf-cookie");

        await api.post("/login", { username, password });
 
        await this.fetchUser();
        router.push('/dashboard'); 

      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      await api.post('/logout')
      this.user = null
    },

    async fetchUser() {
      try {
        const response = await api.get('/api/user') 
        this.user = response.data.data 
      } catch (e) {
        this.user = null
      }
    },
  },
})
