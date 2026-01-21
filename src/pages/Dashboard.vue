<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import ustpLogo from '../assets/ustplogo1.png'

const auth = useAuthStore()
const router = useRouter()
const mobileMenuOpen = ref(false)

const handleLogout = async () => {
  try {
    await auth.logout()
  } catch (error) { 
    auth.user = null
  } 
}

// Student data
const studentInfo = ref({
  name: "Alex Rivera",
  id: "2021100452",
});

const currentDate = ref("Monday, October 23, 2023");

const summaryCards = ref([
  {
    title: "Current GPA",
    value: "1.75",
    change: "+0.05% from last sem",
    changeType: "positive",
    icon: "📊"
  },
  {
    title: "Units Enrolled",
    value: "21 Units",
    status: "Fully Validated",
    icon: "📚"
  },
  {
    title: "Outstanding Balance",
    value: "P 4,500.00",
    action: "Pay Now →",
    icon: "💰"
  }
]);

const todaysClasses = ref([
  {
    id: 1,
    time: "09:00 AM - 10:30 AM",
    course: "IT 211 - Data Structures",
    location: "CITC Building, Room 402",
    instructor: "Dr. Jose Mari",
    status: "ACTIVE"
  },
  {
    id: 2,
    time: "01:00 PM - 02:30 PM",
    course: "MATH 102 - Calculus 2",
    location: "CEA Building, Room 201",
    instructor: "Engr. Liza Soberano"
  },
  {
    id: 3,
    time: "03:00 PM - 04:30 PM",
    course: "GE 105 - Ethics",
    location: "Social Science Hall 1",
    instructor: "Prof. Juan Dela Cruz"
  }
]);

const newsItems = ref([
  {
    id: 1,
    title: "Summer Term 2024 Enrollment is now open!",
    category: "ENROLLMENT",
    description: "Regular enrollment starts on June 15. Please ensure your accounts are cleared...",
    timestamp: "2 hours ago",
    hasImage: true
  },
  {
    id: 2,
    title: "System Maintenance Notice",
    description: "The student portal will be offline on Sunday from 1AM to 5AM...",
    timestamp: "Yesterday",
    icon: "⚙️"
  },
  {
    id: 3,
    title: "Campus Festival 2024",
    description: "Join us for the annual university celebration featuring music and culture...",
    timestamp: "Oct 20, 2023",
    icon: "🎆"
  }
]);
</script>

<template>
  <div class="h-screen bg-gray-50 overflow-hidden">
    <!-- Mobile Menu Toggle -->
    <button 
      @click="mobileMenuOpen = !mobileMenuOpen"
      class="fixed left-4 top-4 z-50 lg:hidden rounded-lg bg-white p-2 shadow-md border border-gray-200"
      aria-label="Toggle menu"
    >
      <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-6 w-6 text-gray-700">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="h-6 w-6 text-gray-700">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Mobile Overlay -->
    <div 
      v-if="mobileMenuOpen"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      @click="mobileMenuOpen = false"
    ></div>

    <div class="flex h-screen">
      <!-- Left Sidebar -->
      <aside 
        :class="[
          'fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 lg:translate-x-0',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <a href="#" class="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-semibold border border-blue-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
            Dashboard
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 font-medium rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            My Classes
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 font-medium rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            Grades
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 font-medium rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            Schedule
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 font-medium rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
            Finances
          </a>
          <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 font-medium rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Profile
          </a>
        </nav>

        <div class="px-4 py-4 border-t border-gray-200">
          <button 
            @click="handleLogout"
            class="flex w-full items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium rounded-lg transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Top Header -->
        <header class="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-3">
                <img :src="ustpLogo" alt="USTP" class="h-10 w-10 rounded-lg object-contain" />
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
                  <div class="font-semibold text-gray-900 text-sm">{{ studentInfo.name }}</div>
                  <div class="text-xs text-gray-500">{{ studentInfo.id }}</div>
                </div>
                <div class="h-10 w-10 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center">
                  <span class="text-blue-700 font-bold text-sm">AR</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto bg-gray-50">
          <div class="max-w-7xl mx-auto px-6 py-8">
            <!-- Welcome Section -->
            <div class="mb-8">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex!</h1>
              <p class="text-gray-600">
                Today is {{ currentDate }}. You have <span class="font-semibold text-blue-600">3 classes</span> today.
              </p>
            </div>

            <!-- Summary Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div v-for="card in summaryCards" :key="card.title" class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div class="flex items-start justify-between mb-4">
                  <div class="text-3xl">{{ card.icon }}</div>
                  <div v-if="card.change" class="flex items-center gap-1 text-xs font-semibold text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    {{ card.change }}
                  </div>
                  <div v-if="card.status" class="flex items-center gap-1 text-xs font-semibold text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {{ card.status }}
                  </div>
                </div>
                <div class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">{{ card.title }}</div>
                <div class="text-3xl font-extrabold text-gray-900 mb-3">{{ card.value }}</div>
                <a v-if="card.action" href="#" class="text-sm font-semibold text-blue-600 hover:text-blue-700">{{ card.action }}</a>
              </div>
            </div>

            <!-- Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Today's Schedule -->
              <div class="lg:col-span-2">
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-blue-600">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Today's Class Schedule
                  </h2>
                  <a href="#" class="text-sm font-semibold text-blue-600 hover:text-blue-700">Full Schedule</a>
                </div>

                <div class="space-y-4">
                  <div 
                    v-for="cls in todaysClasses" 
                    :key="cls.id"
                    class="bg-white rounded-lg p-5 shadow-sm border border-gray-200"
                  >
                    <div class="flex items-start justify-between mb-3">
                      <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                          <span v-if="cls.status" class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{{ cls.status }}</span>
                          <span class="text-sm font-semibold text-gray-500">{{ cls.time }}</span>
                        </div>
                        <h3 class="text-lg font-bold text-gray-900 mb-2">{{ cls.course }}</h3>
                        <div class="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          {{ cls.location }}
                        </div>
                        <div class="text-sm text-gray-600">Instructor: {{ cls.instructor }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- University News Sidebar -->
              <div class="lg:col-span-1">
                <div class="flex items-center gap-2 mb-6">
                  <span class="text-2xl">📢</span>
                  <h2 class="text-xl font-bold text-gray-900">University News</h2>
                </div>

                <div class="space-y-4">
                  <div 
                    v-for="news in newsItems" 
                    :key="news.id"
                    class="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                  >
                    <div v-if="news.hasImage" class="h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg mb-3 flex items-center justify-center">
                      <div class="w-full h-full bg-gradient-to-r from-blue-700 via-blue-600 to-yellow-400 rounded-lg relative overflow-hidden">
                        <div class="absolute inset-0 bg-blue-800/50"></div>
                        <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-yellow-400/30 to-transparent"></div>
                      </div>
                    </div>
                    <div v-else class="text-2xl mb-2">{{ news.icon }}</div>
                    <div v-if="news.category" class="text-xs font-bold text-blue-600 uppercase mb-1">{{ news.category }}</div>
                    <h3 class="font-bold text-gray-900 text-sm mb-2">{{ news.title }}</h3>
                    <p class="text-xs text-gray-600 mb-2 line-clamp-2">{{ news.description }}</p>
                    <div class="text-xs text-gray-400">{{ news.timestamp }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
