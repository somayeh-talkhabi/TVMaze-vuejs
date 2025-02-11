<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ rating?: number | null }>();

const fullStars = computed(() => (props.rating ? Math.floor(props.rating / 2) : 0));
const halfStar = computed(() => (props.rating && props.rating % 2 >= 1 ? 1 : 0));
const emptyStars = computed(() => (props.rating ? 5 - fullStars.value - halfStar.value : 5));
</script>

<template>
  <div class="flex items-center text-gray-800 dark:text-gray-200">
    <span v-if="rating === null" class="text-gray-500 dark:text-gray-400">Unknown Rating</span>
    <template v-else>
      <div class="flex space-x-1">
        <span v-for="n in fullStars" :key="`full-${n}`" class="text-yellow-400">★</span>
        <span v-if="halfStar" class="text-yellow-400">☆</span>
        <span v-for="n in emptyStars" :key="`empty-${n}`" class="text-gray-400 dark:text-gray-600">☆</span>
      </div>
      <span class="ml-2 text-sm">{{ rating }}/10</span>
    </template>
  </div>
</template>
