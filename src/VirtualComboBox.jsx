import React from 'react'
import { VariableSizeList } from 'react-window'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { formatLabel } from './formatLabel'

const LISTBOX_PADDING = 8 // px
const WIDTH_SIZE = 500

function renderRow(props) {
  const { data, index, style } = props
  const dataSet = data[index]
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  }

  return (
    <Typography component='li' {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1]}
    </Typography>
  )
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(data) {
  const ref = React.useRef(null)
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const { children, ...other } = props
  const itemData = []
  children.forEach((item) => {
    itemData.push(item)
    itemData.push(...(item.children || []))
  })
  const itemCount = itemData.length
  // console.log(itemCount)
  const itemSize = 50

  const gridRef = useResetCache(itemCount)

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={itemSize * 8 + 2 * LISTBOX_PADDING}
          width={WIDTH_SIZE}
          overscanCount={5}
          ref={gridRef}
          outerElementType={OuterElementType}
          itemCount={itemCount}
          itemSize={(index) => itemSize}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})

export default function VirtualizedAutocomplete({
  options,
  fieldName,
  defaultValue,
  handleSelectChange,
}) {
  const sortedOptions = [...options].sort()
  const formattedLabel = formatLabel(fieldName)
  return (
    <Autocomplete
      id={`${fieldName}-virtual`}
      style={{ width: WIDTH_SIZE }}
      disableListWrap
      multiple
      ListboxComponent={ListboxComponent}
      options={sortedOptions}
      value={defaultValue}
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
      renderOption={(props, option, state) => [props, option, state.index]}
    />
  )
}
