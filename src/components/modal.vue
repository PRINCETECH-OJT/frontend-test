<script setup>
defineProps({
  show: Boolean,
  title: String,
});
defineEmits(["close"]);
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      @click.self="$emit('close')"
    >
      <div
        class="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl transform transition-all border border-gray-100 relative overflow-visible"
      >
        <button
          @click="$emit('close')"
          class="absolute top-8 right-8 text-gray-400 hover:text-[#060e57] transition-colors"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 class="text-2xl font-black text-[#060e57] text-center mb-8">
          {{ title }}
        </h2>

        <div class="space-y-6">
          <slot />
        </div>

        <div class="flex gap-4 mt-10">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>