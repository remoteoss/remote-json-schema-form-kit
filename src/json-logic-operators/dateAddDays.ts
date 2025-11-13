import { addDays } from 'date-fns'

/**
 * Adds the specified number of days to the given date.
 * @param a - The date to subtract days from in "YYYY-MM-DD" format.
 * @param b - The number of days to add.
 * @returns The new date.
 */
export function dateAddDays(a: string, b: number): Date {
  return addDays(new Date(a), b)
}
