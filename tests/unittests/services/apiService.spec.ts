
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { search, getAllShows, getShowById } from '@/services/apiService.ts'
import type { SearchResult, Show } from '@/types';

const mockAxios = new MockAdapter(axios);
const baseURL = 'https://api.tvmaze.com/';

describe('showService', () => {
    beforeEach(() => {
        mockAxios.reset();
    });

    describe('search', () => {
        it('when the request is successful then return search results ', async () => {
            const mockQuery = 'test';
            const mockResponse: SearchResult[] = [
                { show: { id: 1, name: 'Test Show 1' } },
                { show: { id: 2, name: 'Test Show 2' } },
            ];

            mockAxios.onGet(`${baseURL}search/shows?q=${mockQuery}`).reply(200, mockResponse);

            const result = await search(mockQuery);
            expect(result).toEqual(mockResponse);
        });

        it('when the request fails then throw an error ', async () => {
            const mockQuery = 'test';

            mockAxios.onGet(`${baseURL}search/shows?q=${mockQuery}`).reply(500);

            await expect(search(mockQuery)).rejects.toThrow('failed to fetch showes');
        });
    });

    describe('getAllShows', () => {
        it('when the request is successful then return all shows ', async () => {
            const mockResponse: Show[] = [
                { id: 1, name: 'Show 1' },
                { id: 2, name: 'Show 2' },
            ];

            mockAxios.onGet(`${baseURL}shows`).reply(200, mockResponse);

            const result = await getAllShows();
            expect(result).toEqual(mockResponse);
        });

        it('when the request fails then throw an error ', async () => {
            mockAxios.onGet(`${baseURL}shows`).reply(500);

            await expect(getAllShows()).rejects.toThrow('failed to fetch showes');
        });
    });

    describe('getShowById', () => {
        it('when the request is successful then return a show by id', async () => {
            const mockId = 1;
            const mockResponse: Show = { id: mockId, name: 'Test Show' };

            mockAxios.onGet(`${baseURL}shows/${mockId}?embed=cast`).reply(200, mockResponse);

            const result = await getShowById(mockId);
            expect(result).toEqual(mockResponse);
        });

        it('when the request fails then throw an error ', async () => {
            const mockId = 1;

            mockAxios.onGet(`${baseURL}shows/${mockId}?embed=cast`).reply(500);

            await expect(getShowById(mockId)).rejects.toThrow('failed to fetch showes');
        });
    });
});