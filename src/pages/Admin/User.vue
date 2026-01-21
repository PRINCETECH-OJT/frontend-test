<script setup>
import { ref, onMounted } from "vue";
import api from "../../api";
import SideBar from "../../components/sidebar.vue";
import Button from "../../components/ui/button.vue";
import Input from "../../components/ui/input.vue";
// Dropdown import removed
import Modal from "../../components/modal.vue";
import { UserPlusIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";

const users = ref([]);
const roles = ref(["admin", "instructor", "student"]);
const loading = ref(false);
const showModal = ref(false);

const newUser = ref({
  username: "",
  email: "",
  password: "",
  role: "student",
});

const fetchUsers = async () => {
  try {
    const response = await api.get("/api/users");
    users.value = response.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const handleCreateUser = async () => {
  loading.value = true;
  try {
    await api.post("/api/users", newUser.value);
    showModal.value = false;
    await fetchUsers();
    newUser.value = { username: "", email: "", password: "", role: "student" };
  } catch (error) {
    alert(
      "Error: " + (error.response?.data?.message || "Something went wrong"),
    );
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUsers);
</script>

<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <SideBar />

    <main class="flex-1 overflow-y-auto p-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-2xl font-bold text-[#060e57]">User Management</h1>
          <p class="text-sm text-gray-500 mt-1">
            Manage system accounts and access levels.
          </p>
        </div>
        <Button @click="showModal = true">
          <template #icon-left><UserPlusIcon class="w-5 h-5 mr-2" /></template>
          Add New User
        </Button>
      </div>

      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-4 text-sm font-bold text-[#364150]">
                Username
              </th>
              <th class="px-6 py-4 text-sm font-bold text-[#364150]">
                Email Address
              </th>
              <th class="px-6 py-4 text-sm font-bold text-[#364150]">Role</th>
              <th
                class="px-6 py-4 text-sm font-bold text-[#364150] text-center"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="user in users"
              :key="user.id"
              class="hover:bg-gray-50 transition"
            >
              <td class="px-6 py-4 text-sm font-medium text-[#060e57]">
                {{ user.username }}
              </td>
              <td class="px-6 py-4 text-sm text-[#364150]">{{ user.email }}</td>
              <td class="px-6 py-4">
                <span
                  class="px-3 py-1 text-xs font-bold rounded-full bg-indigo-50 text-indigo-700 capitalize"
                >
                  {{ user.roles?.[0] || "No Role" }}
                </span>
              </td>
              <td class="px-6 py-4 space-x-3 text-center">
                <button
                  class="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <PencilIcon class="w-5 h-5" />
                </button>
                <button
                  class="text-red-600 hover:text-red-800 transition-colors"
                >
                  <TrashIcon class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="users.length === 0" class="p-12 text-center text-gray-400">
          No records found.
        </div>
      </div>
    </main>

    <Modal :show="showModal" title="Create New User" @close="showModal = false">
      <div class="space-y-4">
        <Input
          v-model="newUser.username"
          label="Username"
          placeholder="e.g. jdoe2024"
        />
        <Input
          v-model="newUser.email"
          label="Email Address"
          placeholder="user@example.com"
        />
        <Input v-model="newUser.password" label="Password" type="password" />

        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-semibold text-[#364150]"
            >Assign Role</label
          >
          <select
            v-model="newUser.role"
            class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all capitalize"
          >
            <option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
        </div>
      </div>

      <template #footer>
        <Button variant="outline" class="flex-1" @click="showModal = false"
          >Cancel</Button
        >
        <Button :loading="loading" class="flex-1" @click="handleCreateUser"
          >Create User</Button
        >
      </template>
    </Modal>
  </div>
</template>