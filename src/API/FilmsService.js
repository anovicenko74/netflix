import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://kinopoiskapiunofficial.tech/api/v2.2/films/'
})

export default class FilmsService {
    static async getTop(page, settings = {}) {
        const res = await api
            .get(
                '/top',
                {
                    params: {
                        'type': 'TOP_100_POPULAR_FILMS',
                        page,
                        ...settings,
                    },
                    headers: {
                        'X-API-KEY': '7e579f51-ec0f-40c8-9324-7f0fba2a9813',
                        'Content-Type': 'application/json',
                    },
                }
            )
        return res.data
    }

    static async getFilmById(id, settings = {}) {
        const res = await api
            .get(
                `/${id}`,
                {
                    params: {
                        ...settings,
                    },
                    headers: {
                        'X-API-KEY': '7e579f51-ec0f-40c8-9324-7f0fba2a9813',
                        'Content-Type': 'application/json',
                    },
                }
            )
        return res.data
    }

    static async getFilms(settings) {
        const res = await api
            .get(
                '',
                {
                    params: {
                        ...settings,
                    },
                    headers: {
                        'X-API-KEY': '7e579f51-ec0f-40c8-9324-7f0fba2a9813',
                        'Content-Type': 'application/json',
                    },
                }
            )
        return res.data

    }
    static async getFilters(settings) {
        const res = await api
            .get(
                '/filters',
                {
                    params: {
                        ...settings,
                    },
                    headers: {
                        'X-API-KEY': '7e579f51-ec0f-40c8-9324-7f0fba2a9813',
                        'Content-Type': 'application/json',
                    },
                }
            )
        return res.data

    }
}