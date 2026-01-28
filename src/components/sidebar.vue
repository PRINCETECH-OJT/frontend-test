<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import {
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  BookOpenIcon,
  AcademicCapIcon,
  CalendarIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  ViewColumnsIcon,
  BuildingOfficeIcon,
  RectangleGroupIcon,
} from "@heroicons/vue/24/outline";

defineProps({
  mobileMenuOpen: {
    type: Boolean,
    default: true,
  },
});

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const expandedMenus = ref([]);

const toggleMenu = (menuName) => {
  if (expandedMenus.value.includes(menuName)) {
    expandedMenus.value = expandedMenus.value.filter((m) => m !== menuName);
  } else {
    expandedMenus.value.push(menuName);
  }
};

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon, roles: ["all"] },
  {
    name: "Users",
    path: "/users",
    icon: UsersIcon,
    roles: ["admin", "super_admin"],
  },
  {
    name: "Roles & Perm",
    path: "/roles",
    icon: UserGroupIcon,
    roles: ["admin"],
  },
  {
    name: "Campuses",
    path: "/campuses",
    icon: BuildingLibraryIcon,
    roles: ["admin", "super_admin"],

    children: [
      {
        name: "Overview",
        path: "/campuses",
        icon: ViewColumnsIcon,
        roles: ["admin", "super_admin"],
      },
      {
        name: "Colleges",
        path: "/colleges",
        icon: AcademicCapIcon,
        roles: ["admin", "super_admin"],
      },
      {
        name: "Departments",
        path: "/departments",
        icon: BuildingOfficeIcon,
        roles: ["admin", "super_admin"],
      },
    ],
  },
  {
    name: "Curricula",
    path: "/curricula",
    icon: BookOpenIcon,
    roles: ["admin", "super_admin"],
  },
  {
    name: "Courses",
    path: "/courses",
    icon: BookOpenIcon,
    roles: ["admin", "super_admin"],
  },
  {
    name: "Students",
    path: "/students",
    icon: UserCircleIcon,
    roles: ["admin", "super_admin"],
  },
  {
    name: "My Classes",
    path: "/classes",
    icon: AcademicCapIcon,
    roles: ["student", "instructor"],
  },
  { name: "Schedule", path: "/schedule", icon: CalendarIcon, roles: ["all"] },
];

const filteredMenuItems = computed(() => {
  return menuItems.filter((item) => {
    if (item.roles.includes("all")) return true;
    if (!authStore.user?.roles) return false;
    return item.roles.some((role) => authStore.hasRole(role));
  });
});

const isActive = (path) => route.path === path;

const handleLogout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>

<template>
  <aside
    :class="[
      'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 lg:translate-x-0',
      mobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <div class="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
      <div class="p-2 bg-[#060e57] rounded-lg">
        <AcademicCapIcon class="w-6 h-6 text-white" />
      </div>
      <span class="text-xl font-bold tracking-wide text-[#060e57]">
        UniPortal
      </span>
    </div>

    <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
      <div v-for="item in filteredMenuItems" :key="item.name">
        <div v-if="item.children">
          <button
            @click="toggleMenu(item.name)"
            class="flex w-full items-center cursor-pointer justify-between gap-3 px-4 py-3 rounded-lg ml-2 font-medium transition text-gray-600 hover:bg-gray-50 hover:text-blue-600"
            :class="{
              'bg-blue-50 text-blue-700':
                expandedMenus.includes(item.name) || isActive(item.path),
            }"
          >
            <div class="flex items-center gap-3">
              <component :is="item.icon" class="w-5 h-5" />
              {{ item.name }}
            </div>
            <ChevronDownIcon
              class="w-4 h-4 transition-transform duration-200"
              :class="{ 'rotate-180': expandedMenus.includes(item.name) }"
            />
          </button>

          <div
            v-show="expandedMenus.includes(item.name)"
            class="mt-1 ml-4 pl-4 border-l border-gray-100 space-y-1 cursor-pointer"
          >
            <router-link
              v-for="sub in item.children"
              :key="sub.name"
              :to="sub.path"
              class="flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition"
              :class="
                isActive(sub.path)
                  ? 'text-blue-700 font-bold bg-blue-50/50'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50/50'
              "
            >
              <component :is="sub.icon" class="w-4 h-4" />
              {{ sub.name }}
            </router-link>
          </div>
        </div>

        <router-link
          v-else
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition"
          :class="
            isActive(item.path)
              ? 'bg-blue-50 text-blue-700 border border-blue-100'
              : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
          "
        >
          <component :is="item.icon" class="w-5 h-5" />
          {{ item.name }}
        </router-link>
      </div>
    </nav>

    <div class="px-4 py-4 border-t border-gray-200 space-y-4">
      <div class="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
        <img
          class="w-10 h-10 rounded-full border shadow-sm"
          :src="`https://ui-avatars.com/api/?name=${authStore.user?.username || 'User'}&background=060e57&color=fff`"
          alt="avatar"
        />
        <div class="overflow-hidden">
          <p class="text-sm font-semibold text-gray-900 truncate">
            {{ authStore.user?.username || "Loading..." }}
          </p>
          <p class="text-xs text-gray-500 truncate capitalize">
            {{ authStore.user?.roles?.[0] || "No role" }}
          </p>
        </div>
      </div>

      <button
        @click="handleLogout"
        class="flex w-full items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium rounded-lg transition"
      >
        <ArrowLeftOnRectangleIcon class="w-5 h-5" />
        Logout
      </button>
    </div>
  </aside>
</template>
