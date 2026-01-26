<script setup>
import { ref, onMounted, computed } from "vue";
import api from "../../api";
import Sidebar from "../../components/sidebar.vue";
import Header from "../../components/header.vue";

const roles = ref([]);
const permissions = ref([]);
const selectedRole = ref(null);
const selectedPermissions = ref([]);
const loading = ref(false);
const saving = ref(false);

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

  await api.post(`/api/roles/${selectedRole.value.id}/permissions`, {
    permissions: selectedPermissions.value,
  });

  await fetchRoles();
  const refreshedRole = roles.value.find((r) => r.id === selectedRole.value.id);

  selectRole(refreshedRole);
  saving.value = false;
};

onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchRoles(), fetchPermissions()]);
  loading.value = false;
});
</script>

<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <Sidebar />

    <div class="flex-1 flex flex-col min-w-0">
      <Header />

      <main class="flex-1 overflow-y-auto p-8">
        <h1 class="text-2xl font-bold text-[#060e57]">Roles & Permissions</h1>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Roles List -->
          <div class="bg-white border rounded-xl p-4">
            <h2 class="font-semibold mb-4">Roles</h2>

            <ul class="space-y-2">
              <li
                v-for="role in roles"
                :key="role.id"
                @click="selectRole(role)"
                class="px-4 py-2 rounded-lg cursor-pointer transition"
                :class="
                  selectedRole?.id === role.id
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'hover:bg-gray-50'
                "
              >
                {{ role.name }}
              </li>
            </ul>
          </div>

          <!-- Permissions -->
          <div class="lg:col-span-2 bg-white border rounded-xl p-4">
            <h2 class="font-semibold mb-4">
              Permissions
              <span v-if="selectedRole" class="text-sm text-gray-500">
                for "{{ selectedRole.name }}"
              </span>
            </h2>

            <div v-if="!selectedRole" class="text-gray-500">
              Select a role to manage permissions.
            </div>

            <div
              v-else
              class="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto"
            >
              <label
                v-for="permission in permissions"
                :key="permission.id"
                class="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  :checked="selectedPermissions.includes(permission.id)"
                  @change="togglePermission(permission.id)"
                />
                <span class="text-sm">{{ permission.name }}</span>
              </label>
            </div>

            <div class="mt-6 flex justify-end">
              <button
                v-if="selectedRole"
                @click="savePermissions"
                :disabled="saving"
                class="px-5 py-2 bg-[#060e57] text-white rounded-lg hover:opacity-90 disabled:opacity-50"
              >
                {{ saving ? "Saving..." : "Save Changes" }}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
