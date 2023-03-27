import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { formatLabel } from './formatLabel'

export default function AutocompleteBox({
  options,
  fieldName,
  defaultValue,
  handleSelectChange,
}) {
  const hasNonNumericValues = options.some((option) => isNaN(option))
  let sortedOptions
  if (hasNonNumericValues) {
    sortedOptions = [...options].sort()
  } else {
    sortedOptions = [...options].sort((a, b) => a - b)
  }
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
