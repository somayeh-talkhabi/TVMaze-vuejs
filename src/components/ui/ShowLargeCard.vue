<script setup lang="ts">
import Rating from "@/components/ui/Rating.vue";
import type { Show } from "@/types";

const props = defineProps<Show>();
</script>
<template>
  <RouterLink :to="`/details/${props.id}`" class="card-wrapper">
    <div class="overflow-hidden h-full">
      <img
        :src="props.image?.original || '/src/assets/img/no-image.jpg'"
        :alt="props.name"
        class="w-full h-full object-cover transition-transform duration-300" />
    </div>

    <div
      class="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-0 backdrop-blur-none text-white opacity-0 transition-all duration-500 group-[.swiper-slide-next]:opacity-100 group-[.swiper-slide-next]:bg-opacity-50 group-[.swiper-slide-next]:backdrop-blur-md">
      <h2 class="text-2xl font-semibold">{{ props.name }}</h2>

      <div class="mt-2">
        <Rating :rating="props.rating?.average"></Rating>
      </div>

      <div class="mt-2 text-sm">
        <span class="text-gray-300">Genre: </span>
        <span class="text-gray-100">{{ props.genres?.join(", ") }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card-wrapper {
  @apply relative h-full cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden transition-all transform;
}
</style>
