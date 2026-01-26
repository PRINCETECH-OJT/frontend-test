<script setup>
import { onMounted } from "vue";
import { useResource } from "../../composables/useResource";
import { GraduationCap, Plus, MoreVertical } from "lucide-vue-next";
import Sidebar from "../../components/sidebar.vue";
import Header from "../../components/header.vue";
import Button from "../../components/ui/button.vue";

const { items: colleges, loading, fetchItems } = useResource("/api/colleges");

onMounted(fetchItems);
</script>

<template>
  <div class="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
    <Sidebar />
    <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <Header />
      <main class="p-4 md:p-8">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-bold text-slate-800">
              College Management
            </h1>
            <p class="text-slate-500 text-sm">
              Manage USTP colleges and locations.
            </p>
          </div>
          <Button
            ><template #icon-left><Plus :size="18" /></template>Add
            College</Button
          >
        </div>

        <div
          class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div v-if="loading" class="p-20 text-center">
            <div
              class="animate-spin inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mb-4"
            ></div>
            <p class="text-slate-500 text-sm">Loading records...</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead
                class="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs font-bold uppercase"
              >
                <tr>
                  <th class="px-6 py-4">ID</th>
                  <th class="px-6 py-4">College Details</th>
                  <th class="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr
                  v-for="college in colleges"
                  :key="college.id"
                  class="hover:bg-blue-50/50 transition-colors"
                >
                  <td class="px-6 py-4 text-slate-400 font-mono text-xs">
                    #{{ college.id }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <GraduationCap class="text-blue-600" :size="18" />
                      <div class="flex flex-col">
                        <span class="font-bold text-slate-700 text-sm">
                          {{ college.college_code }}
                        </span>
                        <span class="text-xs text-slate-500">
                          {{ college.college_description }}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button
                      class="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <MoreVertical :size="18" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
