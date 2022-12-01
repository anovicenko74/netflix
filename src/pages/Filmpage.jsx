import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetching from '../hooks/useFetching'
import FilmsService from '../API/FilmsService'
import Loader from '../components/UI/Loader'

function Filmpage() {
    let [film, setFilm] = useState(null)
    const { id } = useParams()

    let [fetchFilm, isLoading, loadingError] = useFetching(async () => {
        const data = await FilmsService.getFilmById(id)
        setFilm(data)
    }, [id])

    useEffect(() => {
        fetchFilm()
    }, [fetchFilm])

    if (loadingError) {
        throw loadingError
    }

    return (
        <>
            {
                isLoading
                    ? <Loader />
                    : <div style={{
                        color: 'white'
                    }}>
                        <div> {film.nameRu}</div>
                    </div>
            }
        </>
    )
}

export default Filmpage