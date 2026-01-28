<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "../../stores/auth";
import api from "../../api";
import SideBar from "../../components/sidebar.vue";
import Button from "../../components/ui/button.vue";
import Input from "../../components/ui/input.vue";
import Modal from "../../components/modal.vue";
import Header from "../../components/header.vue";

import DeleteConfirmationModal from "../../components/deleteConfirmationModal.vue";
import { UserPlusIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";

const auth = useAuthStore();
const users = ref([]);
const roles = ref(["admin", "instructor", "student"]);
const loading = ref(true); // Initial state is true for fetching
const isProcessing = ref(false); // New state for button actions (Save/Delete)

const showModal = ref(false);
const showDeleteModal = ref(false);
const userToDeleteId = ref(null);
const editingUserId = ref(null);

const modalTitle = computed(() =>
  editingUserId.value ? "Edit User Details" : "Create New User",
);

const newUser = ref({
  username: "",
  email: "",
  password: "",
  role: "student",
});

const fetchUsers = async () => {
  try {
    loading.value = true;
    const response = await api.get("/api/users");
    users.value = response.data;
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    loading.value = false;
  }
};

const openCreateModal = () => {
  editingUserId.value = null;
  newUser.value = { username: "", email: "", password: "", role: "student" };
  showModal.value = true;
};

const openEditModal = (user) => {
  editingUserId.value = user.id;
  let currentRole = user.roles?.[0]?.name.toLowerCase() || "student";
  if (!roles.value.includes(currentRole)) currentRole = "student";

  newUser.value = {
    username: user.username,
    email: user.email,
    role: currentRole,
    password: "",
  };
  showModal.value = true;
};

const handleSaveUser = async () => {
  isProcessing.value = true;
  try {
    const payload = { ...newUser.value };
    if (!payload.password) delete payload.password;

    if (editingUserId.value) {
      await api.put(`/api/users/${editingUserId.value}`, payload);
    } else {
      await api.post("/api/users", payload);
    }

    showModal.value = false;
    await fetchUsers();
  } catch (error) {
    console.error(error);
    alert(
      "Error: " + (error.response?.data?.message || "Something went wrong"),
    );
  } finally {
    isProcessing.value = false;
  }
};

const confirmDelete = (userId) => {
  userToDeleteId.value = userId;
  showDeleteModal.value = true;
};

const executeDelete = async () => {
  if (!userToDeleteId.value) return;
  isProcessing.value = true;
  try {
    await api.delete(`/api/users/${userToDeleteId.value}`);
    await fetchUsers();
    showDeleteModal.value = false;
    userToDeleteId.value = null;
  } catch (error) {
    alert(
      "Error: " + (error.response?.data?.message || "Something went wrong"),
    );
  } finally {
    isProcessing.value = false;
  }
};

onMounted(fetchUsers);
</script>

<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden font-sans">
    <SideBar />
    <div class="flex-1 flex flex-col min-w-0">
      <Header />

      <main class="flex-1 overflow-y-auto p-8">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-bold text-black">User Management</h1>
            <p class="text-sm text-gray-500 mt-1">
              Manage system accounts and access levels.
            </p>
          </div>
          <Button @click="openCreateModal">
            <template #icon-left
              ><UserPlusIcon class="w-5 h-5 mr-2"
            /></template>
            Add New User
          </Button>
        </div>

        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div v-if="loading" class="p-20 text-center">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"
            ></div>
            <p class="text-slate-500 text-sm font-medium">
              Loading user records...
            </p>
          </div>

          <table v-else class="w-full text-left border-collapse">
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
                <td class="px-6 py-4 text-sm text-[#364150]">
                  {{ user.email }}
                </td>
                <td class="px-6 py-4">
                  <span
                    v-for="role in user.roles"
                    :key="role.id"
                    class="px-3 py-1 text-xs font-bold rounded-full bg-indigo-50 text-indigo-700 capitalize"
                  >
                    {{ role.name }}
                  </span>
                </td>
                <td class="px-6 py-4 space-x-3 text-center">
                  <button
                    @click="openEditModal(user)"
                    class="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <PencilIcon class="w-5 h-5" />
                  </button>
                  <button
                    @click="confirmDelete(user.id)"
                    class="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <TrashIcon class="w-5 h-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            v-if="!loading && users.length === 0"
            class="p-12 text-center text-gray-400"
          >
            No records found.
          </div>
        </div>
      </main>
    </div>

    <Modal :show="showModal" :title="modalTitle" @close="showModal = false">
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
        <div>
          <Input v-model="newUser.password" label="Password" type="password" />
          <p v-if="editingUserId" class="text-xs text-gray-400 mt-1">
            Leave blank to keep the current password.
          </p>
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-semibold text-[#364150]"
            >Assign Role</label
          >
          <select
            v-model="newUser.role"
            class="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm transition-all capitalize outline-none focus:ring-2 focus:ring-blue-500"
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
        <Button :loading="isProcessing" class="flex-1" @click="handleSaveUser">
          {{ editingUserId ? "Save Changes" : "Create User" }}
        </Button>
      </template>
    </Modal>

    <DeleteConfirmationModal
      :show="showDeleteModal"
      :loading="isProcessing"
      title="Delete User"
      description="This action cannot be undone. This will permanently delete the user account."
      @close="showDeleteModal = false"
      @confirm="executeDelete"
    />
  </div>
</template>
