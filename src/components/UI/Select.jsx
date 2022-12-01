import { FormControl, Select as MuiSelect, MenuItem, InputLabel } from '@mui/material'

import React, { useEffect } from 'react'

function Select({ settings, ...selectProps }) {

  return (
    <FormControl>
      <InputLabel>{settings.title}</InputLabel>
      <MuiSelect
        sx={{
          minWidth: '120px',
          color: 'red'
        }}
        {...selectProps}
      >
        {
          settings.items.map((item) =>
            <MenuItem
              key={item.value}
              value={item.value}
            >
              {item.name}
            </MenuItem>
          )
        }
      </MuiSelect>
    </FormControl >
  )
}

export default Select