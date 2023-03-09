export class DateTimeUtil {
  /**
   * Check if a date is between a date range (from, to)
   *
   * @param date {@link Date} Date to check
   * @param from {@link Date} From date
   * @param to {@link Date} To Date
   */
  static isBetween(date: Date, from?: Date, to?: Date): boolean {
    if (from && to) {
      return date.getTime() >= from.getTime() && date.getTime() <= to.getTime();
    } else if (from && !to) {
      return date.getTime() >= from.getTime();
    } else if (to && !from) {
      return date.getTime() <= to.getTime();
    }
    return false;
  }

  /**
   * Check if two Date objects are equal
   *
   * @param date1 First date object to compare
   * @param date2 Second date object to compare
   * @return true|false
   */
  static isEqualDates(date1: Date, date2: Date): boolean {
    return this.compareDates(date1, date2) === 0;
  }

  /**
   * Compares two Date objects and returns e number value that represents
   * The result:
   * <br\> -> 0 if the two dates are equal.
   * <br\> -> 1 if the first date is greater than second.
   * <br\> -> -1 if the first date is less than second.
   * <br\> -> null if one of them is null.
   *
   * @param date1 First date object to compare
   * @param date2 Second date object to compare
   * @return 0|1|-1|null
   */
  static compareDates(date1: Date, date2: Date): number {
    if (!date1 && !date2) {
      return 0;
    }

    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
    const d1 = date1 ? new Date(date1) : null;
    const d2 = date2 ? new Date(date2) : null;

    if (d1 && d2) {
      // Check if the dates are equal
      if (d1.getTime() === d2.getTime()) return 0;

      // Check if the first is greater than second
      if (d1 > d2) return 1;

      // Check if the first is less than second
      if (d1 < d2) return -1;
    }

    return null;
  }

  /**
   * Get quarter that the date is belonged
   * @param date {@link Date}
   * @return number 1|2|3|4
   */
  static getQuarter(date: Date) {
    date = date || new Date();
    const q = Math.floor(date.getMonth() / 3) + 1; // NOSONAR

    return q > 4 ? q - 4 : q;
  }

  /**
   * Get:
   * <ul>
   *   <li>The beginning date of first month, second month, third month of this period</li>
   *   <li>The last date of this period</li>
   * </ul>
   * @param date {@link Date}
   */
  static getQuarterPeriod(date: string | Date): {
    first: Date;
    second: Date;
    third: Date;
    max: Date;
  } {
    date = typeof date === 'string' ? new Date(date) : date;
    const quarter = DateTimeUtil.getQuarter(date);
    const year = date.getUTCFullYear();
    let first: string;
    let second: string;
    let third: string;
    let max: string;

    switch (quarter) {
      case 1:
        first = '01-01';
        second = '02-01';
        third = '03-01';
        max = '03-31';
        break;

      case 2:
        first = '04-01';
        second = '05-01';
        third = '06-01';
        max = '06-30';
        break;

      case 3:
        first = '07-01';
        second = '08-01';
        third = '09-01';
        max = '09-30';
        break;

      case 4:
      default:
        first = '10-01';
        second = '11-01';
        third = '12-01';
        max = '12-31';
        break;
    }

    return {
      first: new Date(year + '-' + first),
      second: new Date(year + '-' + second),
      third: new Date(year + '-' + third),
      max: new Date(year + '-' + max),
    };
  }
}
