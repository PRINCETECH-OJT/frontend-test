import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Dashboard from '../pages/Dashboard.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, meta: { guest: true, hideNavbar: true } },
  { path: '/register', component: Register, meta: { guest: true, hideNavbar: true } },
  { 
    path: '/dashboard', 
    component: Dashboard,
    meta: { requiresAuth: true, hideNavbar: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route guard
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  if (auth.user === null) {
    await auth.fetchUser()
  }

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next('/login')
  }

  if (to.meta.guest && auth.isLoggedIn) {
    return next('/dashboard')
  }

  next()
})

export default router
