import {
    TextField,
    Box,
    Typography
} from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom'
import Loader from './UI/Loader';
import { useTheme } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';
import useFetching from '../hooks/useFetching'
import useDebounce from '../hooks/useDebounce'
import { getFilmPath } from './Routes'
import FilmsService from '../API/FilmsService';

function Serch() {
    const theme = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchList, setSearchList] = useState([])
    const [keyword, setKeyword] = useState('')
    const debouncedKeyword = useDebounce(keyword, 400)

    const inputRef = useRef()

    const [fetchFilms, isLoading, loadingError] = useFetching(async (keyword, signal) => {
        const data = await FilmsService.getFilms({ keyword, signal })
        if (!signal.aborted) {
            setSearchList(data.items)
        }
    }, [])

    useEffect(() => {
        if (!debouncedKeyword) return

        const abortController = new AbortController()
        const signal = abortController.signal
        fetchFilms(debouncedKeyword, signal)

        return () => {
            abortController.abort()
        }
    }, [debouncedKeyword, fetchFilms])

    useEffect(() => {

    }, [])

    const inputHandler = (e) => {
        const value = e.target.value
        setKeyword(value)
        if (!value) {
            setIsMenuOpen(false)
        } else {
            setIsMenuOpen(true)
        }
    }

    const handleCloseMenu = () => {
        setIsMenuOpen(null);
    };

    const handleFocus = () => {
        if (!keyword) return
        setIsMenuOpen(true)
    }

    const handleBlur = () => {
        setIsMenuOpen(false)
    }

    return (
        <Box
            sx={{
                position: 'relative',
            }}
        >
            <TextField
                ref={inputRef}
                value={keyword}
                onInput={inputHandler}
                onFocus={handleFocus}
                onBlur={handleBlur}
                sx={{
                    'input': {
                        color: theme.palette.secondary.main,
                        borderRadius: '1px',
                    },
                    '& .MuiInputBase-input': {
                    },
                    'fieldset': {
                        borderColor: theme.palette.secondary.main,
                        borderRadius: '50px',
                    },
                    'fieldset:hover': {
                        borderColor: theme.palette.third.main,
                    },
                    'label': {
                        color: theme.palette.secondary.main,
                    },
                    '& label.Mui-focused': {
                        color: theme.palette.secondary.main,
                    },
                    '& .MuiInputBase-root.Mui-focused > fieldset': {
                        borderColor: theme.palette.third.main,
                    },

                }}
                label="search"
                variant="outlined"
                size="small"
            />
            <CSSTransition
                in={isMenuOpen}
                timeout={200}
                classNames="searchMenu"
                unmountOnExit
            >
                <div
                    className='searchMenu'
                >
                    {
                        loadingError
                            ? <Typography sx={{ padding: '15px' }}> Ошибка загрузки</Typography>
                            : isLoading
                                ? <Loader />
                                : !searchList?.length
                                    ? <Typography sx={{ padding: '15px' }} > Ничего не найдено</Typography>
                                    : searchList.map((film) =>
                                        <Link to={getFilmPath(film.kinopoiskId)}>
                                            <Box
                                                sx={{
                                                    ':hover': {
                                                        background: theme.palette.secondary.main,
                                                        boxShadow: `0px 0px 10px 10px ${theme.palette.secondary.main}`
                                                    }
                                                }}
                                            >
                                                <Typography>{film.nameRu}</Typography>
                                                <Typography> {film.year}</Typography>
                                            </Box>
                                        </Link>
                                    )
                    }
                </div>
            </CSSTransition>
        </Box>
    )
}

export default Serch