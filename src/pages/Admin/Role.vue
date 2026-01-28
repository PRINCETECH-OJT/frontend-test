<script setup>
import { ref, onMounted, computed } from "vue";
import api from "../../api";
import Sidebar from "../../components/sidebar.vue";
import Header from "../../components/header.vue";
import Button from "../../components/ui/button.vue"; //
import Input from "../../components/ui/input.vue"; //
import Modal from "../../components/modal.vue"; //
import { PlusIcon } from "@heroicons/vue/24/outline";

const roles = ref([]);
const permissions = ref([]);
const selectedRole = ref(null);
const selectedPermissions = ref([]);
const loading = ref(false);
const saving = ref(false);

// State for Creating Roles
const showRoleModal = ref(false);
const roleLoading = ref(false);
const newRoleName = ref("");

/* Fetch all roles */
const fetchRoles = async () => {
  const { data } = await api.get("/api/roles");
  roles.value = data;
};

/* Fetch all permissions */
const fetchPermissions = async () => {
  const { data } = await api.get("/api/permissions");
  permissions.value = data;
};

/* Create a new role */
const handleCreateRole = async () => {
  if (!newRoleName.value) return;
  roleLoading.value = true;
  try {
    await api.post("/api/roles", { name: newRoleName.value });
    await fetchRoles();
    showRoleModal.value = false;
    newRoleName.value = "";
  } catch (error) {
    alert(
      "Error creating role: " +
        (error.response?.data?.message || "Something went wrong"),
    );
  } finally {
    roleLoading.value = false;
  }
};

/* Select a role */
const selectRole = (role) => {
  selectedRole.value = role;
  selectedPermissions.value = role.permissions.map((p) => p.id);
};

/* Toggle permission */
const togglePermission = (permissionId) => {
  if (selectedPermissions.value.includes(permissionId)) {
    selectedPermissions.value = selectedPermissions.value.filter(
      (id) => id !== permissionId,
    );
  } else {
    selectedPermissions.value.push(permissionId);
  }
};

/* Save permissions to role */
const savePermissions = async () => {
  if (!selectedRole.value) return;
  saving.value = true;
  try {
    await api.post(`/api/roles/${selectedRole.value.id}/permissions`, {
      permissions: selectedPermissions.value,
    });
    await fetchRoles();
    const refreshedRole = roles.value.find(
      (r) => r.id === selectedRole.value.id,
    );
    selectRole(refreshedRole);
  } finally {
    saving.value = false;
  }
};

onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchRoles(), fetchPermissions()]);
  loading.value = false;
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
            <h1 class="text-2xl font-bold text-black">Roles & Permissions</h1>
            <p class="text-sm text-gray-500 mt-1">
              Configure user roles and define their access levels.
            </p>
          </div>
          <Button @click="showRoleModal = true">
            <template #icon-left><PlusIcon class="w-5 h-5 mr-2" /></template>
            Add Role
          </Button>
        </div>

        <div v-if="loading" class="p-20 text-center bg-white rounded-xl border">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"
          ></div>
          <p class="text-slate-500 text-sm font-medium">
            Loading security configuration...
          </p>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="bg-white border rounded-xl p-4 shadow-sm">
            <h2 class="font-semibold mb-4 text-[#364150]">System Roles</h2>
            <ul class="space-y-2">
              <li
                v-for="role in roles"
                :key="role.id"
                @click="selectRole(role)"
                class="px-4 py-2.5 rounded-lg cursor-pointer transition text-sm"
                :class="
                  selectedRole?.id === role.id
                    ? 'bg-blue-50 text-blue-700 font-bold border border-blue-100'
                    : 'text-gray-600 hover:bg-gray-50 border border-transparent'
                "
              >
                {{ role.name }}
              </li>
            </ul>
          </div>

          <div
            class="lg:col-span-2 bg-white border rounded-xl p-6 shadow-sm flex flex-col"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="font-semibold text-[#364150]">
                Permissions
                <span
                  v-if="selectedRole"
                  class="ml-1 font-normal text-gray-400 italic"
                >
                  — assigned to "{{ selectedRole.name }}"
                </span>
              </h2>
              <Button
                v-if="selectedRole"
                :loading="saving"
                size="sm"
                @click="savePermissions"
              >
                Save Changes
              </Button>
            </div>

            <div
              v-if="!selectedRole"
              class="flex-1 flex flex-col items-center justify-center text-gray-400 py-20 border-2 border-dashed border-gray-100 rounded-xl"
            >
              <p>Select a role from the left to manage its permissions.</p>
            </div>

            <div
              v-else
              class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2"
            >
              <label
                v-for="permission in permissions"
                :key="permission.id"
                class="flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all"
                :class="
                  selectedPermissions.includes(permission.id)
                    ? 'bg-blue-50/50 border-blue-200'
                    : 'hover:bg-gray-50 border-gray-100'
                "
              >
                <input
                  type="checkbox"
                  class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  :checked="selectedPermissions.includes(permission.id)"
                  @change="togglePermission(permission.id)"
                />
                <span class="text-sm font-medium text-gray-700">{{
                  permission.name
                }}</span>
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>

    <Modal
      :show="showRoleModal"
      title="Create New Role"
      @close="showRoleModal = false"
    >
      <div class="space-y-4">
        <Input
          v-model="newRoleName"
          label="Role Name"
          placeholder="e.g. Content Manager"
        />
        <p class="text-xs text-gray-500">
          Note: Role names are usually converted to lowercase in the backend.
        </p>
      </div>
      <template #footer>
        <Button variant="outline" class="flex-1" @click="showRoleModal = false"
          >Cancel</Button
        >
        <Button :loading="roleLoading" class="flex-1" @click="handleCreateRole"
          >Create Role</Button
        >
      </template>
    </Modal>
  </div>
</template>
