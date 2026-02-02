<template>
  <div
    class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
  >
    <div v-if="loading" class="p-20 text-center">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"
      ></div>
      <p class="text-slate-500 text-sm font-medium">Loading records...</p>
    </div>

    <table v-else class="w-full text-left border-collapse">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            :class="[
              'px-6 py-4 text-sm font-bold text-[#364150]', // Specific color from User.vue
              header.align === 'center'
                ? 'text-center'
                : header.align === 'right'
                  ? 'text-right'
                  : 'text-left',
            ]"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-if="items.length === 0">
          <td :colspan="headers.length" class="p-12 text-center text-gray-400">
            No records found.
          </td>
        </tr>

        <tr
          v-else
          v-for="(item, index) in items"
          :key="index"
          class="hover:bg-gray-50 transition"
        >
          <td
            v-for="header in headers"
            :key="header.key"
            :class="[
              'px-6 py-4 text-sm',
              header.align === 'center'
                ? 'text-center'
                : header.align === 'right'
                  ? 'text-right'
                  : 'text-left',
            ]"
          >
            <slot :name="header.key" :item="item">
              <span class="text-[#364150]">{{ item[header.key] }}</span>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
