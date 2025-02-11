<script setup lang="ts">
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import ShowSliderItemLarge from '@/components/ui/ShowLargeCard.vue'
import type { Show } from '@/types'

const modules = ref([Autoplay])

const props = defineProps<{
  shows?: Show[]; 
}>();
</script>

<template>
    
    <swiper :slides-per-view="1" :space-between="0" :loop="true" :modules="modules" :breakpoints="{
        640: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
      }" class="h-[44rem]"
        :autoplay="{ delay: 2500, disableOnInteraction: false, }">
        <swiper-slide v-for="sh in props.shows" :key="sh.id" class="group">
            <ShowSliderItemLarge v-bind="sh" />
        </swiper-slide>
    </swiper>

</template>