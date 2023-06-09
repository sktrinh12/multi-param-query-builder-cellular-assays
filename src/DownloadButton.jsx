import Button from '@mui/joy/Button'
import { useRef, useState } from 'react'
import { createCSV } from './createCSV'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemDecorator from '@mui/joy/ListItemDecorator'

const DownloadButton = ({ fetchData, loading, filename }) => {
  const ref = useRef(null)
  const [fileUrl, setFileUrl] = useState()

  const handleDownloadClick = async () => {
    const { data } = await fetchData()
    const csvData = createCSV(data)
    const blob = new Blob([csvData], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    setFileUrl(url)
    setTimeout(() => {
      ref.current?.click()
      URL.revokeObjectURL(url)
    }, 100)
  }

  return (
    <>
      <Button variant='solid' loading={loading} onClick={handleDownloadClick}>
        Submit
      </Button>
      {filename && (
        <List
          aria-labelledby='filename'
          sx={{ '--ListItemDecorator-size': '32px' }}
        >
          <ListItem>
            <ListItemDecorator>📄</ListItemDecorator> {filename}
          </ListItem>
        </List>
      )}
      <a
        href={fileUrl}
        download={filename}
        style={{ display: 'none' }}
        ref={ref}
      />
    </>
  )
}

export default DownloadButton
