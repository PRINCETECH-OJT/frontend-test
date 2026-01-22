<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  type: { type: String, default: "text" },
  placeholder: String,
  error: String,
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      class="block text-sm font-bold text-[#364150] mb-1.5 ml-1"
      >{{ label }}</label
    >
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#060e57] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
      :placeholder="placeholder"
      :class="{ 'border-red-500': error }"
    />
    <p v-if="error" class="text-xs text-red-500 mt-1 ml-1">{{ error }}</p>
  </div>
</template>