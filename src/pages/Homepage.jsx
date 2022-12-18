import PosterCaroosel from '../components/PosterCaroosel'
import Loader from '../components/UI/Loader'
import { useState, useEffect } from 'react'
import useFetching from '../hooks/useFetching'
import FilmsService from '../API/FilmsService';
import InfiniteScroll from '../components/FilmsList/InfiniteScroll';

function Homepage() {
    const [actual, setActual] = useState([])

    const [fetchActual, isActualLoading, loadingActualError] = useFetching(async () => {
        const data = await FilmsService.getTop()
        setActual(data.films)
        console.log(data.films)
    }, [])

    useEffect(() => {
        fetchActual()
    }, [fetchActual])

    if (loadingActualError) {
        throw new Error(loadingActualError)
    }

    return (
        <>
            {isActualLoading
                ? <Loader />
                :
                <div>
                    <PosterCaroosel films={actual}></PosterCaroosel>
                </div>
            }
            <InfiniteScroll />
        </>
    )
}

export default Homepage