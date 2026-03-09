export function dateWithoutTimezoneOffset(date: Date | string) {
  const d = date instanceof Date ? date : new Date(date)

  const timezoneOffsetMilliseconds = d.getTimezoneOffset() * 60 * 1000
  const dateWithoutTimeOffset = new Date(d.getTime() + timezoneOffsetMilliseconds)
  return new Date(dateWithoutTimeOffset)
}
