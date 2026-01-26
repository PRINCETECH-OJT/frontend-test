<script setup>
import { ref, computed } from "vue";

import {
  Bell,
  UserPlus,
  GraduationCap,
  FileBadge,
  BookOpen,
  Wallet,
  Calendar,
} from "lucide-vue-next";

import Sidebar from "../components/sidebar.vue";
import Header from "../components/header.vue";
import DashboardTile from "../components/dashboard-tile.vue";

const user = ref({ name: "Jomar", status: "Regular Student" });
const balance = ref(77381.75);

const dashboardTiles = [
  { label: "Notifications", icon: Bell, color: "#6366f1", count: 3 },
  { label: "Enrollment", icon: UserPlus, color: "#ef4444" },
  { label: "Grades", icon: GraduationCap, color: "#10b981" },
  { label: "Assessment", icon: FileBadge, color: "#8b5cf6" },
  { label: "Ledger", icon: BookOpen, color: "#64748b" },
];

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
});

const formatCurrency = (val) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(val);
};
</script>

<template>
  <div class="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
    <Sidebar />

    <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <Header />

      <main class="p-4 md:p-8 flex flex-col xl:flex-row gap-8">
        <div class="flex-1">
          <div
            class="bg-white p-6 rounded-2xl mb-8 border border-slate-200 shadow-sm flex justify-between items-center"
          >
            <div>
              <h2
                class="text-slate-500 text-sm font-medium uppercase tracking-wider"
              >
                {{ greeting }}
              </h2>
              <h1 class="text-2xl font-bold text-slate-800">
                Welcome back, <span class="text-blue-600">{{ user.name }}</span
                >!
              </h1>
            </div>
            <span
              class="hidden sm:block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100 uppercase"
            >
              {{ user.status }}
            </span>
          </div>

          <div
            class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            <DashboardTile
              v-for="tile in dashboardTiles"
              :key="tile.label"
              v-bind="tile"
            />
          </div>
        </div>

        <div class="w-full xl:w-80 flex flex-col gap-6">
          <div
            class="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-200 shadow-sm"
          >
            <div class="flex justify-between items-start mb-4">
              <p
                class="text-sm font-semibold text-amber-800 uppercase tracking-tight"
              >
                Outstanding Balance
              </p>
              <Wallet class="w-5 h-5 text-amber-400" />
            </div>
            <p class="text-3xl font-black text-slate-900 mb-4">
              {{ formatCurrency(balance) }}
            </p>
            <button
              class="w-full py-2 bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold rounded-lg text-sm transition-colors"
            >
              Settle Account
            </button>
          </div>

          <div
            class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
          >
            <h3 class="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar class="w-5 h-5 text-blue-500" />
              Upcoming Events
            </h3>
            <div
              class="text-center text-slate-400 py-10 italic border-2 border-dashed border-slate-100 rounded-xl text-sm"
            >
              No events scheduled for today.
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
