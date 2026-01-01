export default class sdate {
  #date: string;

  /**
   * Creates a new date object.
   * @param {string} [dateString] - A date string in YYYY-MM-DD format. If not provided, the current date is used.
   */
  constructor(dateString?: string | Date) {
    if (dateString && typeof dateString === "string") {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        throw new Error("Invalid date format. Please use YYYY-MM-DD.");
      }
      this.#date = dateString;
      return;
    }
    if (dateString && dateString instanceof Date) {
      const date = dateString;
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.#date = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      return;
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.#date = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  }

  /**
   * Adds a specified number of days to the date.
   * @param {number} days - The number of days to add.
   * @returns {string} The new date in YYYY-MM-DD format.
   */
  addDays(days: number): sdate {
    const dateObj = new Date(this.#date + 'T00:00:00Z');
    dateObj.setUTCDate(dateObj.getUTCDate() + days);
    return new sdate(makeTDate(dateObj));
  }

  /**
   * Adds a specified number of months to the date.
   * @param {number} months - The number of months to add.
   * @returns {string} The new date in YYYY-MM-DD format.
   */
  addMonths(months: number): sdate {
    const dateObj = new Date(this.#date + 'T00:00:00Z');
    dateObj.setUTCMonth(dateObj.getUTCMonth() + months);
    return new sdate(makeTDate(dateObj));
  }

  /**
   * Adds a specified number of years to the date.
   * @param {number} years - The number of years to add.
   * @returns {string} The new date in YYYY-MM-DD format.
   */
  addYears(years: number): sdate {
    const dateObj = new Date(this.#date + 'T00:00:00Z');
    dateObj.setUTCFullYear(dateObj.getUTCFullYear() + years);
    return new sdate(makeTDate(dateObj));
  }

  /**
   * Calculates the difference in days between two dates.
   * @param {sdate} anotherDate - The date to compare to.
   * @returns {number} The difference in days.
   */
  difference(anotherDate: sdate): number {
    const date1 = new Date(this.#date + 'T00:00:00Z');
    const date2 = new Date(anotherDate.toString() + 'T00:00:00Z');
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Formats the date as DD/MM/YYYY.
   * @returns {string} The formatted date.
   */
  fDate(): string {
    const [year, month, day] = this.#date.split("-");
    return `${day}/${month}/${year}`;
  }

  /**
   * Checks if two date objects are equal.
   * @param {sdate | Date} anotherDate - The date to compare to.
   * @returns {boolean} True if the dates are equal, false otherwise.
   */
  equals(anotherDate: sdate | Date): boolean {
    if (anotherDate instanceof Date) {
      return makeTDate(anotherDate) === this.toString();
    }
    return this.toString() === anotherDate.toString();
  }

  /**
   * Returns the date as a string in YYYY-MM-DD format.
   * @returns {string} The date string.
   */
  toString(): string {
    return this.#date;
  }

  /**
   * Returns the year of the date.
   * @returns {number} The year.
   */
  year(): number {
    return new Date(this.#date).getUTCFullYear();
  }

  /**
   * Returns the last two digits of the year.
   * @returns {string} The short year.
   */
  yearShort(): string {
    return String(this.year()).slice(-2);
  }

  /**
   * Returns the month of the date.
   * @returns {number} The month.
   */
  month(): number {
    return new Date(this.#date).getMonth() + 1;
  }

  /**
   * Returns the month of the date, padded with a leading zero if necessary.
   * @returns {string} The padded month.
   */
  monthPad(): string {
    return String(this.month()).padStart(2, "0");
  }

  /**
   * Returns the day of the month.
   * @returns {number} The day.
   */
  date(): number {
    return new Date(this.#date).getDate();
  }

  /**
   * Returns the day of the month, padded with a leading zero if necessary.
   * @returns {string} The padded day.
   */
  datePad(): string {
    return String(this.date()).padStart(2, "0");
  }

  /**
   * Returns the day of the week (0 for Sunday, 1 for Monday, etc.).
   * @returns {number} The day of the week.
   */
  /**
   * Returns the day of the week (0 for Sunday, 1 for Monday, etc.).
   * @returns {number} The day of the week.
   */
  day(): number {
    return new Date(this.#date + 'T00:00:00Z').getUTCDay();
  }

  /**
   * Returns an object with the year, month, and day of the date.
   * @returns {{year: number, month: number, day: number}} The year, month, and day.
   */
  ymd(): { year: number; month: number; date: number } {
    return {
      year: this.year(),
      month: this.month(),
      date: this.date(),
    };
  }

  /**
   * Returns an object with the year, month, day, day of the week
   * @returns {{year: number, month: number, date: number, day: number}} The date information.
   */
  ymddt(): {
    year: number;
    month: number;
    date: number;
    day: number;
  } {
    return {
      year: this.year(),
      month: this.month(),
      date: this.date(),
      day: this.day(),
    };
  }

  /**
   * Returns the date of the start of the week (Monday) for the given date.
   * @returns {sdate} The date of the start of the week.
   */
  startOfWeek(): sdate {
    const dateObj = new Date(this.#date + 'T00:00:00Z');
    const day = dateObj.getUTCDay();
    const diff = dateObj.getUTCDate() - day + (day === 0 ? -6 : 1);
    return new sdate(makeTDate(new Date(dateObj.setUTCDate(diff))));
  }

  /**
   * Returns an array of sdates for the week the sdate is in.
   * @returns {sdate[]} An array of sdates for the week.
   */
  daysInWeek(): sdate[] {
    const dates: sdate[] = [];
    let dt = this.startOfWeek();
    for (let i = 0; i < 7; i++) {
      dates.push(dt);
      dt = dt.addDays(1);
    }
    return dates;
  }

  /**
   * Checks to see if the sdate is in an Array of dates
   * @param {string[] | sdate[] | Date[]} arrayToCheck the array of dates to check
   * @returns {boolean} true if the date is in the array
   */
  isInArray(arrayToCheck: string[] | sdate[] | Date[]): boolean {
    if (arrayToCheck.length === 0) return false;
    const first = arrayToCheck[0];
    if (typeof first === "string") {
      return (arrayToCheck as string[]).includes(this.toString());
    }
    if (first instanceof Date) {
      return (arrayToCheck as Date[]).some(
        (d) => makeTDate(d) === this.toString()
      );
    }
    if (first instanceof sdate) {
      return (arrayToCheck as sdate[]).some(
        (e) => e.toString() === this.toString()
      );
    }
    return false;
  }

  /**
   * Checks to see if the date is in this month or a given month, if no year or month are given it will default to the current month
   * @param {number} year optional, the year to check
   * @param {number} month optional, the month to check
   * @returns {boolean} true if the date is in month
   */
  inMonth(
    year: number = this.year(),
    month: number = this.month()
  ): boolean {
    let [y, m, d] = this.#date.split("-");
    if (parseInt(y) === year && parseInt(m) === month) return true;
    return false;
  }
  /**
   * Checks to see if the date is today
   * @returns {boolean} true if the date is today
   */
  isToday(): boolean {
    if (this.#date === new sdate().toString()) return true;
    return false;
  }

  
  startOfMonth(): sdate {
    return new sdate(
      `${this.year()}-${String(this.month()).padStart(2, "0")}-01`
    );
  }

  endOfMonth(): sdate {
    const date = new Date(this.#date);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return new sdate(
      `${endOfMonth.getFullYear()}-${String(endOfMonth.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(endOfMonth.getDate()).padStart(2, "0")}`
    );
  }

  daysInMonth(): sdate[] {
    const dates = [];
    let dt = new sdate(this.startOfMonth().toString());
    while (dt.inMonth(this.year(), this.month())) {
      dates.push(dt);
      dt = dt.addDays(1);
    }
    return dates;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
}

function makeTDate(dt:Date):string {
    const year = dt.getUTCFullYear();
    const month = String(dt.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dt.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`
}
