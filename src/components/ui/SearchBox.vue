<script setup>
import SearchIcon from '@/components/ui/icons/SearchIcon.vue'
import { searchStore } from '@/stores/searchStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const store = searchStore();

const query = ref('')

const executeSearch = () => {
  query.value = query.value.trim();
  store.searchShows(query.value)
  router.push(`/search/${query.value}`)
  query.value = '';
}

const searchClicked = () => {
  if (query.value.trim().length > 0) {
    executeSearch();
  }
}

const searchBoxKeyDown = (e) => {
  if (e.key === "Enter" && query.value.trim().length > 0) {
    executeSearch();
  }
}
</script>

<template>
  <input @keydown="searchBoxKeyDown" v-model="query" type="text" placeholder="Search..." />
  <button @click="searchClicked">
    <SearchIcon></SearchIcon>
  </button>
</template>

<style scoped>
input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white
}

button {
  @apply px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500
}
</style>