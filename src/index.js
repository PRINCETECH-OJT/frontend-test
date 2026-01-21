import { createRouter, createWebHistory } from "vue-router";

import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import Dashboard from "./pages/Dashboard.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { hideNavbar: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { hideNavbar: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { hideNavbar: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
