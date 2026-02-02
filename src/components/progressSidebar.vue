<script setup lang="ts">
interface Step {
  id: number;
  title: string;
  description: string;
}

defineProps<{
  steps: Step[];
  currentStep: number;
}>();
</script>

<template>
  <div
    class="sticky top-24 rounded-xl border border-gray-200 bg-white py-5 shadow-sm"
  >
    <h2
      class="text-center text-xs font-bold uppercase tracking-widest text-gray-500"
    >
      Progress
    </h2>

    <nav class="space-y-1">
      <div
        v-for="step in steps"
        :key="step.id"
        class="group flex items-center gap-3 rounded-lg px-2 py-2 transition-all"
        :class="step.id === currentStep ? 'bg-[#060E57]/5' : 'hover:bg-gray-50'"
      >
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors"
          :class="[
            step.id < currentStep
              ? 'bg-[#2563EB] border-[#2563EB] text-white'
              : step.id === currentStep
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-gray-200 text-gray-300',
          ]"
        >
          <svg
            v-if="step.id < currentStep"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-4 w-4"
          >
            <path
              fill-rule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clip-rule="evenodd"
            />
          </svg>
          <span v-else>{{ step.id }}</span>
        </div>

        <div class="flex-1">
          <p
            class="text-sm font-bold leading-tight"
            :class="
              step.id === currentStep ? 'text-[#2563EB]' : 'text-gray-500'
            "
          >
            {{ step.title }}
          </p>
        </div>
      </div>
    </nav>
  </div>
</template>
