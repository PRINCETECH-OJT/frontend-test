<template>
  <div
    :style="{ backgroundColor: color }"
    class="relative flex flex-col items-center justify-center rounded-2xl p-4 text-white shadow-sm transition-all duration-300 hover:brightness-95 hover:shadow-lg hover:-translate-y-1 cursor-pointer aspect-square group"
  >
    <div
      v-if="count > 0"
      class="absolute top-3 right-3 bg-white text-gray-900 text-[10px] font-bold h-6 w-6 flex items-center justify-center rounded-full shadow-md"
    >
      {{ count }}
    </div>

    <div class="mb-3 transition-transform duration-300 group-hover:scale-110">
      <component
        :is="icon"
        :size="48"
        :stroke-width="2"
        class="drop-shadow-sm"
      />
    </div>

    <span
      class="text-center text-xs md:text-sm font-bold uppercase tracking-wide opacity-90"
    >
      {{ label }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  icon: { type: [Object, Function], required: true }, // Accepts the Lucide Component
  color: { type: String, default: "#607d8b" },
  count: { type: Number, default: 0 },
});
</script>
