<script setup lang="ts">
import ShowSearchCard from "@/components/ui/ShowSearchCard.vue";
import { searchStore } from "@/stores/searchStore";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const store = searchStore();

const query = computed(() => route.params?.query as string);

onMounted(() => {
  if (query.value) {
    store.searchShows(query.value);
  }
});
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold text-left mb-8 text-gray-900 dark:text-white">
      Search result for '{{ store.searchQuery }}'
    </h1>
    <div
      v-if="store.searchResults?.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ShowSearchCard
        v-for="result in store.searchResults"
        :key="result.show.id"
        v-bind="result.show"></ShowSearchCard>
    </div>
    <div v-else class="no-search-result-box">
      <p class="text-gray-700 dark:text-gray-300 text-lg font-medium mb-2">
        No shows found
      </p>
      <p class="text-gray-500 dark:text-gray-400">
        Try adjusting your search criteria.
      </p>
    </div>
  </div>
</template>

<style scoped>
.no-search-result-box {
  @apply flex flex-col items-center justify-center p-6 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg shadow-lg;
}
</style>
