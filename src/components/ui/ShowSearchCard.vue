<script setup lang="ts">
import Rating from "@/components/ui/Rating.vue";
import type { Show } from "@/types";

const props = defineProps<Show>();
</script>

<template>
  <RouterLink
    :to="`/details/${props.id}`"
    class="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
    <img
      :src="props.image?.original || '/src/assets/img/no-image.jpg'"
      :alt="props.name"
      class="w-full h-72 object-cover" />
    <div class="p-6 group-hover:text-blue-500 transition-colors">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ props.name }}
      </h2>
      <div class="mt-2 flex items-center">
        <Rating :rating="props.rating?.average"></Rating>
      </div>
      <div class="mt-2">
        <span class="text-sm text-gray-500 dark:text-gray-400">Genre: </span>
        <span class="text-sm text-gray-700 dark:text-gray-300">{{
          props.genres?.join(", ")
        }}</span>
      </div>
    </div>
  </RouterLink>
</template>
