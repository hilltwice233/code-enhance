export function formatTime(timestamp: number) {
  const time = new Date(timestamp)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate()
  const weekday = time.getDay()
  const hours = time.getHours()
  const minutes = format2(time.getMinutes())
  return `${year}.${month}.${date}(${weekday}) ${hours}:${minutes}`
}

function format2(raw: number) {
  if (raw < 10) return `0${raw}`
  else return raw.toString()
}
