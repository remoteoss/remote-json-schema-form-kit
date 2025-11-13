import { differenceInMonths } from 'date-fns'

/**
 * Returns the difference in months between two dates in "YYYY-MM-DD" format.
 * @param a - The first date in "YYYY-MM-DD" format.
 * @param b - The second date in "YYYY-MM-DD" format.
 * @returns The difference in months between the two dates.
 */
export function dateDifferenceInMonths(a: string, b: string): number {
  return differenceInMonths(new Date(a), new Date(b))
};
