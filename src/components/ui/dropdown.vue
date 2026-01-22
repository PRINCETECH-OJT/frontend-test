<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  options: {
    type: Array,
    default: () => [],
  },
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="w-full text-left">
    <label
      v-if="label"
      class="block text-sm font-bold text-[#364150] mb-1.5 ml-1"
      >{{ label }}</label
    >
    <div class="relative">
      <select
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#060e57] outline-none bg-white text-gray-900 capitalize cursor-pointer appearance-none font-medium relative z-10"
      >
        <option value="" disabled>Select a role</option>
        <option
          v-for="opt in options"
          :key="opt"
          :value="opt"
          class="text-black bg-white"
        >
          {{ opt }}
        </option>
      </select>

      <div
        class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400 z-20"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>