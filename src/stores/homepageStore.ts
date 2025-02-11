import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Show, ShowsByGenre } from '@/types'
import { getAllShows } from '@/services/apiService';

export const homepageStore = defineStore('homepage', () => {
    const dataIsPopulated = ref<boolean>(false);
    const topShows = ref<Show[]>([]);
    const showByGenres = ref<ShowsByGenre[]>([]);

    function populateTopShows(shows: Show[]) {
        const sortedShows = shows.sort((a, b) => {
            const ratingA = a.rating?.average ?? -1;
            const ratingB = b.rating?.average ?? -1;

            return ratingB - ratingA;
        });

        topShows.value = sortedShows.slice(0, 10);
    }

    function populateShowByGenres(shows: Show[]) {
        const uniqueGenres = new Set<string>();

        shows.forEach((item) => {
            item.genres?.forEach((genre) => {
                uniqueGenres.add(genre);
            });
        });

        let showsByGenreArray: ShowsByGenre[] = [];

        uniqueGenres.forEach((genre) => {
            showsByGenreArray.push({
                genre,
                shows: shows
                    .filter((show) => (show.genres?.indexOf(genre) ?? -1) > -1)
                    .sort((a, b) => {
                        const ratingA = a.rating?.average ?? -1;
                        const ratingB = b.rating?.average ?? -1;

                        return ratingB - ratingA;
                    })
            });
        });

        showByGenres.value = showsByGenreArray.filter((itm) => itm.shows.length > 6)
    }

    function populateHomepageData() {
        if (dataIsPopulated.value) {
            console.log('homepageStore data is already populated')
            return;
        }

        console.log('going to call service in homepageStore')

        getAllShows().then(shows => {
            populateShowByGenres(shows);
            populateTopShows(shows);

            dataIsPopulated.value = true;
        });
    }

    return {
        topShows,
        showByGenres,
        populateHomepageData
    }
})