import { defineStore } from 'pinia';

export const useDarkModeStore = defineStore('darkMode', {
  state: () => ({
    darkMode: true,
  }),
  actions: {
    toggle() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode.toString());
    },
    loadFromLocalStorage() {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) {
        this.darkMode = savedMode === 'true';
      }
    },
  },
});
