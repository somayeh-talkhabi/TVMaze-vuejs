<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
    <Navbar />
    <RouterView />
    <Footer />
</template>

<style scoped></style>
