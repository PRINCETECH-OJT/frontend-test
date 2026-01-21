import { defineStore } from 'pinia'
import api from '../api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
  },

  actions: {
    async login(username, password) {
      this.loading = true

      // 1️⃣ Get CSRF cookie
      await api.get('/sanctum/csrf-cookie')

      // 2️⃣ Login (session-based)
      await api.post('/login', { username, password })

      // 3️⃣ Fetch authenticated user
      await this.fetchUser()

      this.loading = false
    },

    async logout() {
      await api.post('/logout')
      this.user = null
    },

    async fetchUser() {
      try {
        const response = await api.get('/api/user')
        this.user = response.data
      } catch (e) {
        this.user = null
      }
    },
  },
})
