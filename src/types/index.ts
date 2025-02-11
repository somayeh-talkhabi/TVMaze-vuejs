export interface Show {
    id: number
    name?: string
    type?: string
    genres?: string[]
    status?: string
    runtime?: number
    ended?: string
    officialSite?: string
    schedule?: Schedule
    rating?: Rating
    image?: Image
    summary?: string,
    _embedded?: Embedded
}

export interface Schedule {
    time: string
    days: string[]
}

export interface Rating {
    average: number

}

export interface Image {
    medium: string
    original: string
}

export interface Genre {
    title: string
    shows: Show[]
}

export interface ShowsByGenre {
    genre: string
    shows: Show[]
}

export interface Embedded {
    cast: Cast[]
}

export interface Cast {
    person: Person
    character: Character
}

export interface Person {
    id: number
    url: string
    name: string
    country: Country
    birthday: string
    deathday: string | null
    image: Image
    gender: string
}

export interface Country {
    name: string
    code: string
    timezone: string
}

export interface Character {
    id: number
    url: string
    name: string
    image: Image
}

export interface SearchResult {
    score?: number
    show: Show
}

export interface SearchCache {
    executionDate: Date
    searchResults: SearchResult[]
}