import { useState, useEffect, useRef } from 'react'
import useFetching from './useFetching'

const useInfiniteScroll = (fetchApi, targetRef, observerOptions) => {
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [filmList, setFilmList] = useState([])

  const [fetchList, isLoading, error] = useFetching(async () => {
    const data = await fetchApi(page)
    setFilmList([...filmList, ...data.films])
    setHasNextPage(Boolean(data.films.length)) 
  }, [page])

  const intObserver = useRef()
  useEffect(() => {
    const infiniteScrollFetch = (entries, observer) => {
      if (isLoading) return
      const [entry] = entries
      if (entry.isIntersecting && hasNextPage) {
        setPage(p => ++p)
      }
    }

    if (intObserver.current) intObserver.current.disconnect()

    intObserver.current = new IntersectionObserver(infiniteScrollFetch, observerOptions)
    if (targetRef.current) intObserver.current.observe(targetRef.current)

  }, [targetRef, observerOptions, hasNextPage, isLoading])

  useEffect(() => {
    fetchList()
  }, [fetchList])

  return [filmList, isLoading, error]
}

export default useInfiniteScroll