import React from 'react'
import Select from './UI/Select'
import { useSearchParams } from 'react-router-dom';
import useObjectParams from '../hooks/useObjectParams';
import { useTheme } from '@emotion/react';

const settings = [
  {
    title: 'Страна',
    items: [
      { value: 1, name: 'США' },
      { value: 14, name: 'Канада' },
      { value: 33, name: 'СССР' },
      { value: 9, name: 'Германия' },
    ]
  },
  {
    title: 'Жанр',
    items: [
      { value: 1, name: 'Триллер' },
      { value: 2, name: 'Драма' },
      { value: 3, name: 'Криминал' },
      { value: 11, name: 'Боевик' },
    ]
  }
]

function SearchPanel() {
  const theme = useTheme()

  const [searchParams, setSearchParams] = useSearchParams()
  const queryParams = useObjectParams(searchParams)

  const handleSelectChange = (e, setting) => {
    const updatedParam = e.target.value
    setSearchParams({ ...queryParams, [setting.name]: [updatedParam], page: 1 })
  }

  return (
    <>
      {
        settings.map(setting =>
          <Select
            sx={{
              color: theme.palette.third.main,
              minWidth: '200px',
              border: `1px solid ${theme.palette.third.main} `,
              '& .MuiSvgIcon-root': {
                color: theme.palette.third.main,
              },
              '& label.MuiFormLabel-root.MuiInputLabel-root': {
                color: theme.palette.third.main,
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: theme.palette.third.main
              }
            }}
            settings={setting}
            onChange={handleSelectChange}
          />
        )
      }
    </>
  )
}

export default SearchPanel