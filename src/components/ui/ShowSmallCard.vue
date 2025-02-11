<script setup lang="ts">
import Rating from '@/components/ui/Rating.vue';
import type { Show } from '@/types'

const props = defineProps<Show>()

</script>
<template>
  <RouterLink :to="`/details/${props.id}`"
    class="group block bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all transform hover:scale-[1.02] hover:shadow-xl">

    <div class="relative overflow-hidden">
      <img :src="props.image?.original || '/src/assets/img/no-image.jpg'" :alt="props.name"
        class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />

      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity"></div>
    </div>

    <div class="p-5">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
        {{ props.name }}
      </h2>

      <div class="mt-2 flex items-center">
        <Rating :rating="props.rating?.average"></Rating>
      </div>

      <div class="mt-2">        
        <span class="text-sm text-gray-700 dark:text-gray-300 overflow-hidden whitespace-nowrap text-ellipsis">{{ props.genres?.join(", ") }}</span>
      </div>
    </div>
  </RouterLink>
</template>