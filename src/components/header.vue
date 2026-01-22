<script setup>
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";
import ustpLogo from '../assets/ustplogo1.png'

// Auth store
const auth = useAuthStore();

// Props (optional: let parent pass a logo URL)
// const props = defineProps({
//   logo: {
//     type: String,
//     default: "/logo1.png", // default logo if none provided
//   },
// });

// Example placeholder for the USTP logo
const ustpLogoRef = ref(ustpLogo);

// You can also add emits if you want parent to handle clicks
const emit = defineEmits(["logout"]);
</script>

<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <img :src="ustpLogoRef" alt="USTP" class="h-10 w-10 rounded-lg object-contain" />
          <div>
            <div class="font-semibold text-gray-900">USTP Portal</div>
            <div class="text-xs text-gray-500">Student Access</div>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <!-- Search -->
        <div class="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 text-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search resources..." class="bg-transparent border-0 outline-0 text-sm text-gray-600 w-48" />
        </div>

        <!-- Notifications -->
        <button class="relative p-2 text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <!-- Settings -->
        <button class="p-2 text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <!-- User Profile -->
        <div class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <div class="font-semibold text-gray-900 text-sm">{{ auth.user.email }}</div>
            <div class="text-xs text-gray-500">{{ auth.user.username }}</div>
          </div>
          <div class="h-10 w-10 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center">
            <span class="text-blue-700 font-bold text-sm">AR</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
