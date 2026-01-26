<script setup>
import { ref } from "vue";
import Sidebar from "../../components/sidebar.vue";
import Header from "../../components/header.vue";
</script>

<template>
  <div class="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
    <Sidebar />
    <div class="flex-1 flex flex-col min-w-0 overflow-y-auto">
      <Header />
    </div>
  </div>
</template>
