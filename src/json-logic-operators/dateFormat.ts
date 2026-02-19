import { format } from 'date-fns'

/**
 * Formats the given date to the specified format.
 * @param date - The date to format.
 * @param formatStr - The format string.
 * @returns The formatted date.
 */
export function dateFormat(date: string | number | Date, formatStr: string): string {
  return format(date, formatStr)
}
