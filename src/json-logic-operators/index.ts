import { dateAddDays } from './dateAddDays'
import { dateAddMonths } from './dateAddMonths'
import { dateDifferenceInMonths } from './dateDifferenceInMonths'
import { dateFormat } from './dateFormat'

export const operators = {
  date_add_days: dateAddDays,
  date_add_months: dateAddMonths,
  date_difference_in_months: dateDifferenceInMonths,
  date_format: dateFormat,
}
