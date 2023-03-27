import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { formatLabel } from './formatLabel'

export default function AutocompleteBox({
  options,
  fieldName,
  defaultValue,
  handleSelectChange,
}) {
  const sortedOptions = [...options].sort()
  const formattedLabel = formatLabel(fieldName)
  return (
    <Autocomplete
      id={`${fieldName}-autocomplete`}
      options={sortedOptions}
      defaultValue={defaultValue}
      onChange={(event, value) => handleSelectChange(event, value, fieldName)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='standard'
          label={formattedLabel}
          fullWidth
          required
        />
      )}
    />
  )
}
