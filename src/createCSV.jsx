export function createCSV(objArray) {
  let csv = ''
  let headers = ''
  const headerLength = Object.keys(objArray[0]).length

  for (let i = 0; i < parseInt((headerLength - 6) / 2); i++) {
    headers += `COMPOUND_ID_${i + 1},GEO_NM_${i + 1},`
  }

  csv += `${headers}CRO,ASSAY_TYPE,CELL,VARIANT,INC_HR,PCT_SERUM\r\n`
  objArray.forEach((row) => {
    csv += row.join(',')
    csv += '\n'
  })
  return csv
}
