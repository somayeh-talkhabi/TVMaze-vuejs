<script setup lang="ts">
import { ref, onMounted } from "vue";
import SearchBox from "@/components/ui/SearchBox.vue";
import MoonIcon from "@/components/ui/icons/MoonIcon.vue";
import SunIcon from "@/components/ui/icons/SunIcon.vue";
import SearchToggleIcon from "@/components/ui/icons/SearchToggleIcon.vue";
import UserIcon from "@/components/ui/icons/UserIcon.vue";

const isSearchOpen = ref(false);
const isUserMenuOpen = ref(false);

const isDarkMode = ref(false);

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
  isUserMenuOpen.value = false;
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
  isSearchOpen.value = false;
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
};

onMounted(() => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  } else {
    isDarkMode.value = false;
    document.documentElement.classList.remove("dark");
  }
});
</script>
<template>
  <header>
    <div class="header-container">
      <RouterLink :to="`/`" class="flex items-center">
        <img src="@/assets/img/logo.png" alt="Logo" class="h-10 w-auto" />
      </RouterLink>

      <div class="hidden md:flex flex-1 px-20 mx-4 items-center">
        <SearchBox />
      </div>

      <div class="hidden md:flex items-center space-x-4">
        <button @click="toggleDarkMode" class="theme-toggler">
          <MoonIcon v-if="!isDarkMode"></MoonIcon>
          <SunIcon v-else></SunIcon>
        </button>

        <a href="#" class="login-link"> Log In </a>

        <a href="#" class="register-link"> Register </a>
      </div>

      <div class="flex items-center md:hidden">
        <button @click="toggleSearch" class="toggler-sm">
          <SearchToggleIcon></SearchToggleIcon>
        </button>

        <button @click="toggleDarkMode" class="toggler-sm">
          <MoonIcon v-if="!isDarkMode"></MoonIcon>
          <SunIcon v-else></SunIcon>
        </button>
        <button @click="toggleUserMenu" class="toggler-sm">
          <UserIcon></UserIcon>
        </button>
      </div>
    </div>

    <div v-if="isSearchOpen" class="search-container-sm">
      <div class="flex items-center p-3">
        <SearchBox />
      </div>
    </div>

    <div v-if="isUserMenuOpen" class="search-container-sm">
      <div class="flex flex-col space-y-2 p-3">
        <a href="#" class="login-link-sm"> Log In </a>
        <a href="#" class="login-link-sm"> Register </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  @apply sticky w-full top-0 start-0 bg-white shadow-md dark:bg-gray-800 z-30;
}

.header-container {
  @apply container mx-auto px-4 py-4 flex items-center justify-between;
}

.theme-toggler {
  @apply p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.login-link {
  @apply text-gray-700 dark:text-gray-200 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.register-link {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.toggler-sm {
  @apply p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.search-container {
  @apply md:hidden bg-white dark:bg-gray-800 px-4 py-2 border-t border-gray-200 dark:border-gray-700;
}

.login-link-sm {
  @apply w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500;
}
</style>
