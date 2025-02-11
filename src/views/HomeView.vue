<script setup lang="ts">

import { homepageStore } from '@/stores/homepageStore';
import HomePageMainSlider from '@/components/slider/HomePageMainSlider.vue'
import GenreSlider from '@/components/slider/GenreSlider.vue'
import { onMounted } from 'vue';

import 'swiper/swiper-bundle.css';

const store = homepageStore();

onMounted(() => {
  store.populateHomepageData();
});

</script>

<template>
  <HomePageMainSlider :shows="store.topShows" />
  <GenreSlider v-for="itm in store.showByGenres" :key="itm.genre" v-bind="itm" />
</template>