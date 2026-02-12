import { addMonths } from 'date-fns'

/**
 * Adds the specified number of months to the given date.
 * @param a - The date to add months to in "YYYY-MM-DD" format.
 * @param b - The number of months to add.
 * @returns The new date.
 */
export function dateAddMonths(a: string, b: number): Date {
  return addMonths(new Date(a), b)
}
