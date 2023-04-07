import { useReducer, useEffect } from 'react'
import axios from 'axios'
import VirtualizedAutocomplete from './VirtualComboBox'
import AutocompleteBox from './AutocompleteBox'
import DownloadButton from './DownloadButton'
import Stack from '@mui/material/Stack'

function App() {
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  console.log(BACKEND_URL)
  const initialState = {
    loading: false,
    filename: '',
    compoundIdOptions: [],
    compoundIdInputValue: ['FT002787'],
    croOptions: [],
    croInputValue: 'Pharmaron',
    cellIncubationHrOptions: [],
    cellIncubationHrInputValue: '1',
    cellAssayTypeOptions: [],
    cellAssayTypeInputValue: 'HTRF',
    pctSerumOptions: [],
    pctSerumInputValue: '10',
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'filename':
        return { ...state, filename: action.payload }
      case 'loading':
        return { ...state, loading: action.payload }
      case 'compoundIdInputValue':
        return { ...state, compoundIdInputValue: action.payload }
      case 'compoundIdOptions':
        return { ...state, compoundIdOptions: action.payload }
      case 'croOptions':
        return { ...state, croOptions: action.payload }
      case 'croInputValue':
        return { ...state, croInputValue: action.payload }
      case 'cellIncubationHrOptions':
        return { ...state, cellIncubationHrOptions: action.payload }
      case 'cellIncubationHrInputValue':
        return { ...state, cellIncubationHrInputValue: action.payload }
      case 'cellAssayTypeOptions':
        return { ...state, cellAssayTypeOptions: action.payload }
      case 'cellAssayTypeInputValue':
        return { ...state, cellAssayTypeInputValue: action.payload }
      case 'pctSerumOptions':
        return { ...state, pctSerumOptions: action.payload }
      case 'pctSerumInputValue':
        return { ...state, pctSerumInputValue: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSelectChange = (event, value, type) => {
    dispatch({ type: type, payload: value })
  }

  const fetchData = async () => {
    dispatch({ type: 'loading', payload: true })
    try {
      const url = [
        BACKEND_URL,
        '/v1/fetch-data?compound_id=',
        state.compoundIdInputValue,
        '&cro=',
        state.croInputValue,
        '&cell_incubation_hr=',
        state.cellIncubationHrInputValue,
        '&assay_type=',
        state.cellAssayTypeInputValue,
        state.pctSerumInputValue
          ? `&pct_serum=${state.pctSerumInputValue}`
          : '',
        '&type=gmean_cmpr&sql_type=get',
      ].join('')
      console.log(url)
      const response = await axios.get(url)
      let filename = state.compoundIdInputValue.join('_')
      if (state.compoundIdInputValue.length > 1) filename += '_compare_'
      filename += 'output.csv'
      dispatch({ type: 'filename', payload: filename })
      return { data: response.data }
    } catch (error) {
      console.error(error)
    } finally {
      dispatch({ type: 'loading', payload: false })
    }
  }

  const fetchAutocompleteOptions = (url, type) => async () => {
    try {
      await axios.get(url).then((res) => {
        // console.log(res)
        dispatch({
          type: type,
          payload: res.data.data || [],
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAutocompleteOptions(
      `${BACKEND_URL}/compound_ids`,
      'compoundIdOptions'
    )()
    fetchAutocompleteOptions(`${BACKEND_URL}/cros`, 'croOptions')()
    fetchAutocompleteOptions(
      `${BACKEND_URL}/cell_incubation_hr`,
      'cellIncubationHrOptions'
    )()
    fetchAutocompleteOptions(
      `${BACKEND_URL}/cell_assay_type`,
      'cellAssayTypeOptions'
    )()
    fetchAutocompleteOptions(`${BACKEND_URL}/pct_serum`, 'pctSerumOptions')()
  }, [])

  return (
    <Stack
      spacing={4}
      sx={{
        backgroundColor: '#FAFAFA',
        marginTop: '15px',
        padding: '5px',
        borderRadius: '10px',
        marginLeft: '10px',
        width: 500,
      }}
    >
      <VirtualizedAutocomplete
        options={state.compoundIdOptions}
        handleSelectChange={handleSelectChange}
        defaultValue={state.compoundIdInputValue}
        fieldName={'compoundIdInputValue'}
      />
      <AutocompleteBox
        options={state.croOptions}
        handleSelectChange={handleSelectChange}
        defaultValue={state.croInputValue}
        fieldName={'croInputValue'}
      />
      <AutocompleteBox
        options={state.cellIncubationHrOptions}
        handleSelectChange={handleSelectChange}
        defaultValue={state.cellIncubationHrInputValue}
        fieldName={'cellIncubationHrInputValue'}
      />
      <AutocompleteBox
        options={state.cellAssayTypeOptions}
        handleSelectChange={handleSelectChange}
        defaultValue={state.cellAssayTypeInputValue}
        fieldName={'cellAssayTypeInputValue'}
      />
      <AutocompleteBox
        options={state.pctSerumOptions}
        handleSelectChange={handleSelectChange}
        defaultValue={state.pctSerumInputValue}
        fieldName={'pctSerumInputValue'}
      />
      <DownloadButton
        fetchData={fetchData}
        loading={state.loading}
        filename={state.filename}
      />
    </Stack>
  )
}

export default App
