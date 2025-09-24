<template>
  <div class="flex justify-between items-center mb-4 p-4">
    <h1 class="text-2xl font-bold">Arithmetic Trainer</h1>
    <button
      @click="toggleDarkMode"
      class="px-3 py-1 rounded-lg text-sm font-semibold"
      :class="darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'"
    >
      <span v-if="darkMode">
        <i class="fa-solid fa-moon mr-2"/>Dark
      </span>
      <span v-else>
        <i class="fa-solid fa-sun mr-2"/>Light
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ darkMode: boolean }>();
const emit = defineEmits(['toggleDarkMode']);
const toggleDarkMode = () => emit('toggleDarkMode');
</script>
