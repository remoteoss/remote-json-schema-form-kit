import { differenceInWeeks } from 'date-fns'

import { dateWithoutTimezoneOffset } from '../utils'

/**
 * Returns the difference in weeks between two dates in "YYYY-MM-DD" format.
 * @param a - The first date in "YYYY-MM-DD" format.
 * @param b - The second date in "YYYY-MM-DD" format.
 * @returns The difference in weeks between the two dates.
 */
export function dateDifferenceInWeeks(a: string, b: string): number {
  return differenceInWeeks(dateWithoutTimezoneOffset(a), dateWithoutTimezoneOffset(b))
}
