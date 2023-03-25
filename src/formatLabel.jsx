export function formatLabel(fieldName) {
  const str = fieldName.replace('InputValue', '')
  const label =
    str[0].toUpperCase() +
    str
      .slice(1)
      .replace(/([A-Z])/g, ' $1')
      .trim()
  return label
}
