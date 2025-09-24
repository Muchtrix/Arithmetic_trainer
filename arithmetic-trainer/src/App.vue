<template>
  <div :class="mainDarkModeClass">
    <div :class="['bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white flex flex-col min-h-screen']">
      <div class="mx-auto w-full max-w-[400px] flex flex-col min-h-screen">
        <TopBar />
        <div class="flex-1 flex items-stretch justify-center mb-4">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import TopBar from "./components/TopBar.vue";
import { useDarkModeStore } from "./stores/darkMode";

import { storeToRefs } from 'pinia';
const darkModeStore = useDarkModeStore();
const { darkMode } = storeToRefs(darkModeStore);

const mainDarkModeClass = computed(() => (darkMode.value ? 'dark' : ''));
</script>

<style>
</style>