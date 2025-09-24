<template>
  <div class="flex justify-between items-center my-4 py-4 px-6 bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
    <h1 class="text-2xl font-bold">Mindly</h1>

    <Menu as="div" class="relative inline-block text-left">
      <MenuButton>Settings</MenuButton>
      <MenuItems class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
        <MenuItem v-slot="{ active }">
          <router-link to="/arithmetic" :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm']">
          <i class="fa-solid fa-plus-minus"></i>Arithmetics</router-link>
        </MenuItem>

        <MenuItem v-slot="{ active }">
          <button
            @click.prevent="toggleDarkMode"
            :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]">
            <i :class="faClass"/>{{ darkModeButtonLabel }}
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDarkModeStore } from '../stores/darkMode';
import { storeToRefs } from 'pinia';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

const darkModeStore = useDarkModeStore();
const { darkMode } = storeToRefs(darkModeStore);

const toggleDarkMode = () => darkModeStore.toggle();

const faClass = computed(() => (darkMode.value ? 'fa-solid fa-moon mr-2' : 'fa-solid fa-sun mr-2'));
const darkModeButtonLabel = computed(() => (darkMode.value ? 'Dark' : 'Light'));
</script>
