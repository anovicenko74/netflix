import React from 'react'
import Select from './UI/Select'
import { useSearchParams } from 'react-router-dom';
import useObjectParams from '../hooks/useObjectParams';

const genreSettings = {
  title: 'Страна',
  items: [
    { value: 1, name: 'США' },
    { value: 14, name: 'Канада' },
    { value: 33, name: 'СССР' },
    { value: 9, name: 'Германия' },
  ]
}
const countrySettings = {
  title: 'Страна',
  items: [
    { value: 1, name: 'Триллер' },
    { value: 2, name: 'Драма' },
    { value: 3, name: 'Криминал' },
    { value: 11, name: 'Боевик' },
  ]
}

function SearchPanel() {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParams = useObjectParams(searchParams)

  const handleGenreChange = (e) => {
    const updatedParam = e.target.value
    setSearchParams({ ...queryParams, 'countries': [updatedParam], page: 1 })
  }

  const handleCountryChange = (e) => {
    const updatedParam = e.target.value
    setSearchParams({ ...queryParams, 'genres': [updatedParam], page: 1 })
  }

  return (
    <>
      <Select
        settings={countrySettings}
        onChange={handleCountryChange}
      ></Select>
      <Select
        settings={genreSettings}
        onChange={handleGenreChange}
      ></Select>
    </>
  )
}

export default SearchPanel