<script setup lang="ts">
import type { Cast } from '@/types'

const props = defineProps<Cast>()

</script>
<template>
    <div class="cast-wrapper group">
        <div class="cast-img-wrapper">
            
            <img :src="props.person?.image?.original || '/src/assets/img/no-image.jpg'" :alt="props.person?.name"
                class="cast-img-primary group-hover:opacity-0" />

            
            <img :src="props.character?.image?.original || '/src/assets/img/no-image.jpg'" :alt="props.character?.name"
                class="cast-img-secondary group-hover:opacity-100" />
        </div>

        <h3>{{ props.person?.name }}</h3>
        <p>{{ props.character?.name }}</p>
    </div>
</template>

<style scoped>
.cast-wrapper {
    @apply bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg 
}

.cast-img-wrapper {
    @apply relative w-full aspect-[2/3] overflow-hidden rounded-lg
}

.cast-img-primary {
    @apply absolute w-full h-full object-cover transition-opacity duration-300 opacity-100 
}

.cast-img-secondary {
    @apply absolute w-full h-full object-cover opacity-0  transition-opacity duration-300
}

h3 {
    @apply text-xl font-semibold text-gray-800 dark:text-white my-3
}

p {
    @apply text-gray-600 dark:text-gray-400
}
</style>