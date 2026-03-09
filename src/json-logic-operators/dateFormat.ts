import { format } from 'date-fns'

import { dateWithoutTimezoneOffset } from '../utils'

/**
 * Formats the given date to the specified format.
 * @param date - The date to format.
 * @param formatStr - The format string.
 * @returns The formatted date.
 */
export function dateFormat(date: string, formatStr: string): string {
  return format(dateWithoutTimezoneOffset(date), formatStr)
}
