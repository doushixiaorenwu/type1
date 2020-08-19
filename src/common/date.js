export function dateFormat (val) {
  const dt = new Date(val)
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  return `${m}-${d}`
}
