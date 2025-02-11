<script setup lang="ts">
import Rating from '@/components/ui/Rating.vue';
import CastCard from '@/components/ui/CastCard.vue';
import { getShowById } from '@/services/apiService';
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import type { Show } from '@/types';

const route = useRoute()
const show = ref<Show | null>(null)
const formattedSchedule = computed(() => {
  const days = show.value?.schedule?.days?.join(", ") ?? "";
  const time = show.value?.schedule?.time ?? "";

  if (days && time) {
    return `${days} at ${time}`;
  } else if (days) {
    return days;
  } else if (time) {
    return `at ${time}`;
  } else {
    return "Unknown";
  }
});

const id = computed(() => route.params.id);

onMounted(async () => {
  const showData = await getShowById(+id.value);
  show.value = showData;
})
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="show-title">{{ show?.name }}</h1>
    <div class="show-content-wrapper">
      <div class="md:col-span-1">
        <img :src="show?.image?.original || '/src/assets/img/no-image.jpg'" :alt="show?.name"
          class="w-full rounded-lg shadow-lg" />
      </div>
      <div class="md:col-span-2">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed" v-html="show?.summary">
          </p>
        </div>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Show Information</h2>
          <div class="space-y-4">
            <div>
              <h3 class="info-title">Rating</h3>
              <p class="info-text">
                <Rating :rating="show?.rating?.average"></Rating>
              </p>
            </div>
            <div>
              <h3 class="info-title">Schedule</h3>
              <p class="info-text">{{ formattedSchedule }}</p>
            </div>
            <div>
              <h3 class="info-title">Status</h3>
              <p class="info-text">{{ show?.status }}</p>
            </div>
            <div>
              <h3 class="info-title">Genres</h3>
              <p class="info-text">{{ show?.genres?.join(", ") }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-12">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Cast</h2>
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <CastCard v-for="cast in show?._embedded?.cast" v-bind="cast"></CastCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.show-title {
  @apply text-4xl font-bold text-gray-900 dark:text-white mb-4
}

.show-content-wrapper {
  @apply grid grid-cols-1 md:grid-cols-3 gap-8
}

.info-title {
  @apply text-lg font-medium text-gray-700 dark:text-gray-300
}

.info-text {
  @apply text-gray-600 dark:text-gray-400
}
</style>