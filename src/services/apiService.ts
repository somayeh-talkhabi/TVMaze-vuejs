import type { SearchResult, Show } from '@/types'
import axios from 'axios'

const baseURL = 'https://api.tvmaze.com/';

export const search = async (q: string): Promise<SearchResult[]> => {
    try {
        const response = await axios.get(`${baseURL}search/shows?q=${q}`)
        return response.data;
    }
    catch {
        throw new Error('failed to fetch showes')
    }
}

export const getAllShows = async (): Promise<Show[]> => {
    try {
        const response = await axios.get(`${baseURL}shows`)
        return response.data;
    }
    catch {
        throw new Error('failed to fetch showes')
    }
}

export const getShowById = async (id: number): Promise<Show> => {
    try {
        const response = await axios.get(`${baseURL}shows/${id}?embed=cast`)
        return response.data;
    }
    catch {
        throw new Error('failed to fetch showes')
    }
}