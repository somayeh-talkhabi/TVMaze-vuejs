<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import ShowSliderItemSmall from '@/components/ui/ShowSmallCard.vue'
import type { ShowsByGenre } from '@/types'

const modules = ref([Navigation])

const props = defineProps<ShowsByGenre>()
</script>

<template>
  <div class="container mx-auto p-6">
    <h2 class="text-blue-400 font-bold text-2xl font- mt-6 mb-5">
      {{ props.genre }}
    </h2>
    <div>
      <swiper :slides-per-view="1" :space-between="30" :navigation="true" :modules="modules" :breakpoints="{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }">
        <swiper-slide v-for="sh in props.shows" :key="sh.id">
          <ShowSliderItemSmall v-bind="sh" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>