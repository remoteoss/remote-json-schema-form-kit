import { differenceInMonths } from 'date-fns'

import { dateWithoutTimezoneOffset } from '../utils'

/**
 * Returns the difference in months between two dates in "YYYY-MM-DD" format.
 * @param a - The first date in "YYYY-MM-DD" format.
 * @param b - The second date in "YYYY-MM-DD" format.
 * @returns The difference in months between the two dates.
 */
export function dateDifferenceInMonths(a: string, b: string): number {
  return differenceInMonths(dateWithoutTimezoneOffset(a), dateWithoutTimezoneOffset(b))
}
