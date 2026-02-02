<script setup lang="ts">
defineProps<{
  label?: string;
  modelValue: string | number;
  options: string[] | number[];
  placeholder?: string;
  id?: string;
  required?: boolean;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <div class="w-full space-y-2">
    <label
      v-if="label"
      :for="id"
      class="text-xs font-bold uppercase tracking-wider text-gray-500"
    >
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        @input="
          emit('update:modelValue', ($event.target as HTMLSelectElement).value)
        "
        class="w-full appearance-none rounded-lg border px-4 py-3 text-sm font-medium text-gray-900 shadow-sm transition-colors focus:outline-none focus:ring-4"
        :class="[
          error
            ? 'border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500/10'
            : 'border-gray-200 bg-white hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500/10',
        ]"
      >
        <option value="" disabled selected>
          {{ placeholder || "- Select -" }}
        </option>
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400"
      >
        <svg
          class="h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>

    <p v-if="error" class="text-xs font-medium text-red-600 animate-pulse">
      {{ error }}
    </p>
  </div>
</template>
