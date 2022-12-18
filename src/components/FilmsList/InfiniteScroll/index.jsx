import React from 'react'
import { Box, Container } from '@mui/system'
import Loader from '../../UI/Loader';
import { useRef } from 'react'
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import FilmItem from '../FilmItem/index';
import FilmsService from '../../../API/FilmsService';

function InfiniteScroll(fetchApi) {
  const targetRef = useRef(null)
  const [filmList, isLoading, loadingError] = useInfiniteScroll(
    FilmsService.getTop,
    targetRef,
    {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    },
  )

  if (loadingError) {
    throw new Error(loadingError)
  }

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: { sm: '0 -7px', md: '0 -10px', }
        }}>
        {
          filmList.map((film) =>
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
          )
        }
      </Box>
      <div ref={targetRef}></div>

      {
        isLoading && <Loader />
      }
    </Container>
  )
}

export default InfiniteScroll