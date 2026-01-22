import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import Login from '../pages/Login.vue'  
import Register from "../pages/Register.vue";
import Dashboard from '../pages/Dashboard.vue'

//Admin Routes
import User from "../pages/Admin/User.vue";

const routes = [
   { path: "/", redirect: "/login" },

  // Public Routes
  {
    path: "/login",
    component: Login,
    meta: { guest: true, hideNavbar: true },
  },
  {
    path: "/register",
    component: Register,
    meta: { guest: true, hideNavbar: true },
  },

  {
    path: "/dashboard",
    component: Dashboard,
  meta: { requiresAuth: true, hideNavbar: true },
  },
  {
    path: "/users",
    component: User,
    meta: { requiresAuth: true, hideNavbar: true },
  },
  {
    path: "/groups",
    component: Dashboard, // replace later
    meta: { requiresAuth: true, hideNavbar: true },
  },
  {
    path: "/courses",
    component: Dashboard,
    meta: { requiresAuth: true, hideNavbar: true },
  },
  {
    path: "/requests",
    component: Dashboard,
    meta: { requiresAuth: true, hideNavbar: true },
  },
  {
    path: "/classes",
    component: Dashboard,
    meta: { requiresAuth: true, hideNavbar: true },
  },
  {
    path: "/schedule",
    component: Dashboard,
    meta: { requiresAuth: true, hideNavbar: true },
  },
  {
    path: "/settings",
    component: Dashboard,
    meta: { requiresAuth: true, hideNavbar: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
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
