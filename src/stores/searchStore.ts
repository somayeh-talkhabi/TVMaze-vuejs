import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { SearchResult, SearchCache } from '@/types'
import { search } from '@/services/apiService';

export const searchStore = defineStore('search', () => {
    const CACHE_DURATION = 10 * 60 * 1000; // 10 min

    const searchCache = ref<Map<string, SearchCache>>(new Map());
    const searchQuery = ref<string>('');
    const searchResults = ref<SearchResult[]>([]);

    function clearExpiredSearchResultFromCache() {
        const now = Date.now();
        searchCache.value.forEach((value, key) => {
            if (now - new Date(value.executionDate).getTime() >= CACHE_DURATION) {
                searchCache.value.delete(key);
            }
        });
    }

    function tryGetResultFromCache(q: string): SearchResult[] | null {
        const cachedResult = searchCache.value.get(q);

        if (cachedResult) {
            searchCache.value.set(q, { executionDate: new Date(), searchResults: cachedResult.searchResults });
            return cachedResult.searchResults;
        }

        return null;
    }

    function searchShows(q: string) {
        //console.dir(searchCache.value);
        q = q.trim();

        if (searchQuery.value == q || q.length == 0) {
            return;
        }

        searchQuery.value = q;

        clearExpiredSearchResultFromCache();

        const cachedSearchResult = tryGetResultFromCache(q);
        if (cachedSearchResult) {
            //console.log('search result found in cache in searchStore')
            searchResults.value = cachedSearchResult;
            return;
        }

        search(q).then(result => {
            //console.log('calling the service in searchStore')
            searchResults.value = result;
            searchCache.value.set(q, { executionDate: new Date(), searchResults: result });
        });
    }

    return {
        searchQuery,
        searchResults,
        searchShows
    }
})