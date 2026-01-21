<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  CalendarIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon, roles: ["all"] },
  {
    name: "Users",
    path: "/users",
    icon: UsersIcon,
    roles: ["admin", "super_admin"],
  },
  {
    name: "Groups",
    path: "/groups",
    icon: UserGroupIcon,
    roles: ["admin"],
  },
  {
    name: "Student",
    path: "/courses",
    icon: BookOpenIcon,
    roles: ["instructor"],
  },
  {
    name: "Requests",
    path: "/requests",
    icon: UsersIcon,
    roles: ["instructor"],
  },
  {
    name: "My Classes",
    path: "/classes",
    icon: AcademicCapIcon,
    roles: ["student", "instructor"],
  },
  { name: "Schedule", path: "/schedule", icon: CalendarIcon, roles: ["all"] },
  { name: "Settings", path: "/settings", icon: Cog6ToothIcon, roles: ["all"] },
];

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};

const isActive = (path) => route.path === path;

const filteredMenuItems = computed(() => {
  return menuItems.filter((item) => {
    if (item.roles.includes("all")) return true;

    if (!authStore.user || !authStore.user.roles) return false;

    return item.roles.some((role) => authStore.hasRole(role));
  });
});
</script>

<template>
  <aside
    class="flex flex-col w-64 h-screen px-5 py-6 overflow-y-auto bg-white border-r border-gray-200 shadow-sm"
  >
    <div class="flex items-center gap-3 px-2 mb-8 mt-2">
      <div class="p-2 bg-[#060e57] rounded-lg">
        <AcademicCapIcon class="w-6 h-6 text-white" />
      </div>
      <span class="text-xl font-bold tracking-wide text-[#060e57]"
        >UniPortal</span
      >
    </div>

    <div class="flex flex-col justify-between flex-1">
      <nav class="flex flex-col gap-y-4">
        <router-link
          v-for="item in filteredMenuItems"
          :key="item.name"
          :to="item.path"
          class="flex items-center px-4 py-3 transition-all duration-200 transform rounded-xl gap-x-3 group"
          :class="[
            isActive(item.path)
              ? 'bg-[#060e57] text-white shadow-md'
              : 'text-[#364150] hover:bg-gray-50 hover:text-[#060e57]',
          ]"
        >
          <component
            :is="item.icon"
            class="w-5 h-5 transition-colors"
            :class="
              isActive(item.path)
                ? 'text-white'
                : 'text-[#364150] group-hover:text-[#060e57]'
            "
          />
          <span class="font-semibold text-sm tracking-wide">{{
            item.name
          }}</span>
        </router-link>
      </nav>
      <div class="mt-6 space-y-4">
        <div
          class="p-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center gap-x-3"
        >
          <img
            class="object-cover w-10 h-10 rounded-full border-2 border-white shadow-sm"
            src="https://ui-avatars.com/api/?name=User+Name&background=060e57&color=fff"
            alt="avatar"
          />
          <div class="overflow-hidden">
            <h2 class="text-sm font-bold text-[#060e57] truncate">
              {{ authStore.user?.username || "Loading..." }}
            </h2>
            <p class="text-xs text-[#364150] truncate">
              {{ authStore.user?.roles?.[0] || "No Role" }}
            </p>
          </div>
        </div>

        <button
          @click="handleLogout"
          class="flex w-full items-center justify-center px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-xl gap-x-2 text-[#364150] hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100 hover:cursor-pointer"
        >
          <ArrowLeftOnRectangleIcon class="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  </aside>
</template>