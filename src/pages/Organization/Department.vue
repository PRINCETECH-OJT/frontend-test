<script setup>
import { ref, onMounted } from "vue";
import api from "../../api";
import {
  Building,
  Search,
  Plus,
  MoreVertical,
  GraduationCap,
} from "lucide-vue-next";
import Sidebar from "../../components/sidebar.vue";
import Header from "../../components/header.vue";
import Button from "../../components/ui/button.vue";

const departments = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchDepartments = async () => {
  try {
    loading.value = true;
    const response = await api.get("/api/departments", {
      withCredentials: true,
      headers: { Accept: "application/json" },
    });

    // Handle both direct array or paginated response
    departments.value = Array.isArray(response.data)
      ? response.data
      : response.data?.data || [];
  } catch (err) {
    console.error(err);
    error.value = err.response?.data?.message || err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDepartments();
});
</script>

<template>
  <div class="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
    <Sidebar />

    <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <Header />

      <main class="p-4 md:p-8">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 class="text-2xl font-bold text-slate-800 tracking-tight">
              Department Management
            </h1>
            <p class="text-slate-500 text-sm">
              Manage academic departments and college assignments.
            </p>
          </div>
          <Button>
            <template #icon-left><Plus class="w-5 h-5" /></template>
            Add Department
          </Button>
        </div>

        <div
          class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div
            class="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center"
          >
            <div class="relative w-full sm:w-72">
              <Search
                class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                :size="18"
              />
              <input
                type="text"
                placeholder="Search departments..."
                class="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div v-if="loading" class="p-12 text-center text-slate-400">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"
            ></div>
            <p>Loading records...</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr
                  class="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider"
                >
                  <th class="px-6 py-4 w-20">ID</th>
                  <th class="px-6 py-4">Department Info</th>
                  <th class="px-6 py-4">Parent College</th>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr
                  v-for="dept in departments"
                  :key="dept.id"
                  class="group hover:bg-blue-50/50 transition-colors duration-150"
                >
                  <td class="px-6 py-4 text-slate-400 font-mono text-xs">
                    #{{ dept.id }}
                  </td>

                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:scale-110 transition-transform"
                      >
                        <Building :size="18" />
                      </div>
                      <div>
                        <p class="font-bold text-slate-700 text-sm">
                          {{ dept.department_code }}
                        </p>
                        <p class="text-xs text-slate-500">
                          {{ dept.department_name }}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2 text-slate-600">
                      <GraduationCap :size="16" class="text-slate-400" />
                      <span class="text-sm">
                        {{
                          dept.college?.college_code || "No College Assigned"
                        }}
                      </span>
                    </div>
                  </td>

                  <td class="px-6 py-4">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                      :class="
                        dept.is_active
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      "
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full mr-1.5"
                        :class="
                          dept.is_active ? 'bg-emerald-500' : 'bg-slate-400'
                        "
                      ></span>
                      {{ dept.is_active ? "Active" : "Inactive" }}
                    </span>
                  </td>

                  <td class="px-6 py-4 text-right">
                    <button
                      class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <MoreVertical :size="18" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            v-if="!loading && departments?.length === 0"
            class="p-12 text-center"
          >
            <div
              class="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Building class="text-slate-300" :size="32" />
            </div>
            <h3 class="text-slate-800 font-medium mb-1">
              No departments found
            </h3>
            <p class="text-slate-500 text-sm">
              Get started by adding a new department.
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
