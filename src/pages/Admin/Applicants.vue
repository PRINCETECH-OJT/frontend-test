<script setup>
import { ref, onMounted } from "vue";
import api from "../../api";
import Sidebar from "../../components/sidebar.vue";
import Header from "../../components/header.vue";
import Table from "../../components/table.vue";
import Button from "../../components/ui/button.vue";

const applicants = ref([]);
const loading = ref(true);

const tableHeaders = [
  { label: "Student ID", key: "student_id", align: "left" },
  { label: "Name", key: "name", align: "left" },
  { label: "Program", key: "program", align: "left" },
  { label: "Date Applied", key: "date_applied", align: "left" },
  { label: "Status", key: "status", align: "left" },
  { label: "Actions", key: "actions", align: "center" },
];

const fetchApplicants = async () => {
  loading.value = true;
  try {
    const response = await api.get("/api/applicants");
    applicants.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const isApproved = async (id) => {
  if (!confirm("Approve this student?")) return;
  try {
    const response = await api.post(`/api/approve-student/${id}`);
    const creds = response.data.credentials;
    alert(
      `Student Approved!\n\nUser: ${creds.username}\nPass: ${creds.password}`,
    );
    fetchApplicants();
  } catch (e) {
    alert("Error approving student");
  }
};

onMounted(() => {
  fetchApplicants();
});
</script>

<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden font-sans">
    <Sidebar />

    <div class="flex-1 flex flex-col min-w-0">
      <Header />

      <main class="flex-1 overflow-y-auto p-8">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-bold text-black">Pending Applicants</h1>
            <p class="text-sm text-gray-500 mt-1">
              Review and approve student applications.
            </p>
          </div>
        </div>

        <Table :headers="tableHeaders" :items="applicants" :loading="loading">
          <template #student_id="{ item }">
            <span class="font-medium text-[#060e57]">
              {{ item.student_programs[0]?.student_id }}
            </span>
          </template>

          <template #name="{ item }">
            <span class="text-[#364150]">
              {{ item.profile?.last_name }}, {{ item.profile?.first_name }}
            </span>
          </template>

          <template #program="{ item }">
            <span class="text-[#364150]">
              {{ item.student_programs[0]?.curriculum_id }}
            </span>
          </template>

          <template #date_applied="{ item }">
            <span class="text-[#364150]">
              {{ new Date(item.created_at).toLocaleDateString() }}
            </span>
          </template>

          <template #status="{ item }">
            <span
              class="px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-800 capitalize"
            >
              {{ item.student_programs[0]?.status }}
            </span>
          </template>

          <template #actions="{ item }">
            <Button
              @click="isApproved(item.id)"
              class="bg-green-600 hover:bg-green-700 text-white font-semibold py-1.5 px-4 rounded text-xs shadow-sm transition-all focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Approve
            </Button>
          </template>
        </Table>
      </main>
    </div>
  </div>
</template>
