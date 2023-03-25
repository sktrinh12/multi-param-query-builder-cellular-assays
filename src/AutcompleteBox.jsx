import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

export default function AutocompleteBox({
  options,
  fieldName,
  defaultValue,
  handleSelectChange,
}) {
  const sortedOptions = [...options].sort()
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
