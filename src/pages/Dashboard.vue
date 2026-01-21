<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 1. DEFINING THE DATA
const studentInfo = ref({
  name: "Alex Doe",
  id: "2023-10492",
  program: "BS Computer Engineering",
  semester: "2nd Semester, 2025-2026",
});

const todaysClasses = ref([
  {
    id: 1,
    name: "Digital Signal Processing",
    time: "09:00 AM - 10:30 AM",
    room: "Lab 304",
    color: "border-l-4 border-blue-500",
  },
  {
    id: 2,
    name: "Computer Architecture",
    time: "01:00 PM - 02:30 PM",
    room: "Rm 201",
    color: "border-l-4 border-orange-500",
  },
  {
    id: 3,
    name: "Web Systems & Tech",
    time: "03:00 PM - 05:00 PM",
    room: "Lab 102",
    color: "border-l-4 border-emerald-500",
  },
]);

const assignments = ref([
  {
    id: 1,
    title: "MIPS Assembly Project",
    course: "Comp. Arch",
    due: "Tomorrow",
    status: "Urgent",
    statusColor: "text-red-600 bg-red-50",
  },
  {
    id: 2,
    title: "Thesis Methodology Draft",
    course: "Research I",
    due: "Jan 25",
    status: "Pending",
    statusColor: "text-yellow-600 bg-yellow-50",
  },
  {
    id: 3,
    title: "React Component Quiz",
    course: "Web Systems",
    due: "Jan 28",
    status: "Done",
    statusColor: "text-green-600 bg-green-50",
  },
]);

const handleLogout = () => {
  router.push("/");
};
</script>

<template>
  <div class="flex h-screen bg-gray-50">
    <aside
      class="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col"
    >
      <div class="p-6 border-b border-gray-100 flex items-center gap-3">
        <div
          class="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm"
        >
          U
        </div>
        <span class="text-xl font-bold tracking-wide text-gray-800"
          >UniPortal</span
        >
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <a
          href="#"
          class="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg font-semibold border border-indigo-100"
        >
          <span>📊</span> Dashboard
        </a>

        <a
          href="#"
          class="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 font-medium rounded-lg transition"
        >
          <span>📚</span> My Courses
        </a>
        <a
          href="#"
          class="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 font-medium rounded-lg transition"
        >
          <span>📅</span> Schedule
        </a>
        <a
          href="#"
          class="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 font-medium rounded-lg transition"
        >
          <span>📝</span> Grades
        </a>
      </nav>

      <div class="p-4 border-t border-gray-100">
        <button
          @click="handleLogout"
          class="flex items-center gap-3 w-full px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 font-medium rounded-lg transition"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>

    <main class="flex-1 flex flex-col overflow-hidden">
      <header
        class="bg-white shadow-sm h-16 flex items-center justify-between px-8 border-b border-gray-200"
      >
        <h2 class="text-xl font-bold text-gray-800">Student Dashboard</h2>
        <div class="flex items-center gap-4">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-bold text-gray-900">
              {{ studentInfo.name }}
            </p>
            <p class="text-xs text-gray-500 font-medium">
              {{ studentInfo.id }}
            </p>
          </div>
          <div
            class="h-10 w-10 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-indigo-700 font-bold"
          >
            AD
          </div>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto p-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Welcome back, JC! 👋</h1>
          <p class="text-gray-600 mt-1">
            You have
            <span class="font-bold text-indigo-600">3 classes</span> and
            <span class="font-bold text-red-500">1 assignment</span> due soon.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider">
              Semester GPA
            </p>
            <p class="text-3xl font-extrabold text-gray-900 mt-2">3.85</p>
            <span
              class="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full mt-3 inline-block"
              >Top 10%</span
            >
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider">
              Attendance
            </p>
            <p class="text-3xl font-extrabold text-gray-900 mt-2">92%</p>
            <span
              class="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-full mt-3 inline-block"
              >Last 30 days</span
            >
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider">
              Credits
            </p>
            <p class="text-3xl font-extrabold text-gray-900 mt-2">84 / 120</p>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                class="bg-indigo-600 h-2 rounded-full"
                style="width: 70%"
              ></div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <h3 class="text-lg font-bold text-gray-900">Today's Schedule</h3>
            <div class="space-y-4">
              <div
                v-for="cls in todaysClasses"
                :key="cls.id"
                :class="`bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between ${cls.color}`"
              >
                <div>
                  <h4 class="font-bold text-gray-900 text-lg">
                    {{ cls.name }}
                  </h4>
                  <p
                    class="text-sm text-gray-500 font-medium flex items-center gap-2 mt-1"
                  >
                    <span>🕒 {{ cls.time }}</span>
                  </p>
                </div>
                <div class="text-right">
                  <span
                    class="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-md border border-gray-200"
                    >{{ cls.room }}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-bold text-gray-900">Assignments</h3>
              <a
                href="#"
                class="text-sm text-indigo-600 font-bold hover:underline"
                >View all</a
              >
            </div>

            <div
              class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div
                v-for="task in assignments"
                :key="task.id"
                class="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition cursor-pointer"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h5 class="font-bold text-gray-800 text-sm">
                      {{ task.title }}
                    </h5>
                    <p class="text-xs text-gray-500 font-medium mt-1">
                      {{ task.course }}
                    </p>
                  </div>
                  <span
                    :class="`text-xs font-bold px-2 py-1 rounded ${task.statusColor}`"
                    >{{ task.due }}</span
                  >
                </div>
              </div>
            </div>

            <div
              class="mt-8 bg-slate-800 rounded-xl p-6 text-white relative overflow-hidden shadow-lg"
            >
              <div class="relative z-10">
                <h4 class="font-bold text-lg">Thesis Defense</h4>
                <p class="text-slate-300 text-sm mt-1">
                  Don't forget to submit your slides.
                </p>
                <button
                  class="mt-4 bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded shadow hover:bg-slate-100 transition"
                >
                  Upload Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
