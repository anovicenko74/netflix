import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useFetching from '../hooks/useFetching';
import useObjectParams from '../hooks/useObjectParams';
import FilmItem from '../components/FilmsList/FilmItem'
import Loader from '../components/UI/Loader'
import Pagination from '../components/UI/Pagination'
import SearchPanel from '../components/SearchPanel'
import { Box, Container } from '@mui/material';
import FilmsService from '../API/FilmsService';

function Moviespage() {
  const [films, setFilms] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParams = useObjectParams(searchParams)

  const [fetchFilms, isLoading, loadingError] = useFetching(async () => {
    const data = await FilmsService.getFilms(queryParams)

    setTotalPages(data.totalPages)
    setFilms(data.items)
  }, [searchParams])

  const handleChangePage = (event, newPage) => {
    if (newPage === queryParams.page) return
    setSearchParams({ ...queryParams, 'page': +newPage })
  }

  useEffect(() => {
    fetchFilms()
  }, [fetchFilms])

  if (loadingError) {
    throw loadingError
  }

  return (
    <>

      <Container
        sx={{
          padding: '15px 0 0 0'
        }}
      >
        <SearchPanel />
        {
          isLoading
            ? <Loader></Loader>
            :
            !films.length
              ? 'Фильмов по данному запросу не найдено'
              : <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: { sm: '0 -7px', md: '0 -10px', }
                  }}
                >
                  {films.map((film) =>
                    <Box
                      key={film.filmId}
                      sx={{
                        flex: { xs: '0 0 100%', sm: '0 0 50%', md: '0 0 33.333%' },
                        padding: { xs: '5px 0', sm: '7px', md: '7px 10px', }
                      }}>
                      <FilmItem
                        film={film}
                        style={{ height: '100%' }}
                      />
                    </Box>
                  )}
                </Box>
                <Pagination
                  count={totalPages}
                  page={+queryParams.page || 1}
                  onChange={handleChangePage}
                >
                </Pagination>
              </Box>
        }
      </Container>
    </>

  )
}

export default Moviespage