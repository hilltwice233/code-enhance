export namespace format {
  export function duration(milliseconds: number) {
    if (milliseconds < 1000) return `${milliseconds}ms`
    milliseconds = Math.floor(milliseconds / 1000)
    if (milliseconds < 60) return `${milliseconds}s`
    milliseconds = Math.floor(milliseconds / 60)
    if (milliseconds < 60) return `${milliseconds}min`
    milliseconds = Math.floor(milliseconds / 60)
    if (milliseconds < 24) return `${milliseconds}hours`
    milliseconds = Math.floor(milliseconds / 24)
    if (milliseconds < 31) return `${milliseconds}days`
    milliseconds = Math.floor(milliseconds / 30.5)
    if (milliseconds < 12) return `${milliseconds}months`
    milliseconds = Math.floor(milliseconds / 12)
    return `${milliseconds}years`
  }

  export function timestamp(timestamp: number) {
    const time = new Date(timestamp)
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    const date = time.getDate()
    const weekday = time.getDay()
    const hours = time.getHours()
    const minutes = time.getMinutes().toString().padStart(2, "0")
    return `${year}.${month}.${date}(${weekday}) ${hours}:${minutes}`
  }
}
