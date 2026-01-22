<script setup>
import Modal from "./modal.vue";
import Button from "./ui/button.vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  show: Boolean,
  loading: Boolean,
  title: {
    type: String,
    default: "Confirm Deletion",
  },
  description: {
    type: String,
    default:
      "This action cannot be undone. This will permanently remove the item from the system.",
  },
});

const emit = defineEmits(["close", "confirm"]);
</script>

<template>
  <Modal :show="show" :title="title" @close="$emit('close')">
    <div class="flex flex-col items-center text-center p-4">
      <div class="bg-red-100 p-3 rounded-full mb-4">
        <ExclamationTriangleIcon class="w-8 h-8 text-red-600" />
      </div>
      <h3 class="text-lg font-bold text-gray-900">Are you sure?</h3>
      <p class="text-gray-500 mt-2 text-sm">
        {{ description }}
      </p>
    </div>

    <template #footer>
      <Button variant="outline" class="flex-1" @click="$emit('close')">
        Cancel
      </Button>
      <Button
        :loading="loading"
        class="flex-1 bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white"
        @click="$emit('confirm')"
      >
        Delete
      </Button>
    </template>
  </Modal>
</template>
