<template>
  <div :class="[darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900', 'flex flex-col min-h-screen']">
    <div class="mx-auto w-full max-w-[400px] flex flex-col min-h-screen">
      <TopBar :darkMode="darkMode" @toggleDarkMode="toggleDarkMode" />
      <div class="flex-1 flex items-center justify-center">
        <!-- Future navigation for multiple games can go here -->
        <ArithmeticGame :darkMode="darkMode" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ArithmeticGame from "./components/ArithmeticGame.vue";
import TopBar from "./components/TopBar.vue";

const darkMode = ref(true);

onMounted(() => {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode !== null) {
    darkMode.value = savedMode === "true";
  }
});

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  localStorage.setItem("darkMode", darkMode.value.toString());
};
</script>

<style>
</style>