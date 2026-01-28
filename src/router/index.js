import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Dashboard from "../pages/Dashboard.vue";

//Admin Routes
import User from "../pages/Admin/User.vue";
import Role from "../pages/Admin/Role.vue";

import Campus from "../pages/Organization/Campus.vue";
import College from "../pages/Organization/College.vue";
import Department from "../pages/Organization/Department.vue";

import Admission from "../pages/Admission/Admission.vue";

const routes = [
  { path: "/", redirect: "/login" },

  { path: "/login", component: Login, meta: { guest: true } },
  { path: "/register", component: Register, meta: { guest: true } },

  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/users", component: User, meta: { requiresAuth: true } },
  { path: "/roles", component: Role, meta: { requiresAuth: true } },
  { path: "/campuses", component: Campus, meta: { requiresAuth: true } },
  { path: "/colleges", component: College, meta: { requiresAuth: true } },
  { path: "/departments", component: Department, meta: { requiresAuth: true } },
  { path: "/permissions", component: User, meta: { requiresAuth: true } },
  { path: "/groups", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/courses", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/requests", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/classes", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/schedule", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/settings", component: Dashboard, meta: { requiresAuth: true } },

  { path: "/admission", component: Admission },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();

  if (auth.user === null) {
    await auth.fetchUser();
  }

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return next("/login");
  }

  if (to.meta.guest && auth.isLoggedIn) {
    return next("/dashboard");
  }

  next();
});

export default router;
