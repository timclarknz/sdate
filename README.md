# sdate

A simple and immutable date library for TypeScript/JavaScript.

`sdate` provides a straightforward and chainable API for common date manipulations, ensuring that you always work with predictable and immutable date objects.

## Installation

```bash
npm install @timclark/sdate
```

## Usage

Import the `sdate` class and create a new instance.

```typescript
import sdate from '@timclark/sdate';

// Create a date object for today
const today = new sdate();

// Create a date object for a specific date
const specificDate = new sdate('2023-10-27');

// The sdate object is immutable. All manipulation methods return a new sdate instance.
const nextWeek = specificDate.addDays(7);

console.log(specificDate.toString()); // Output: 2023-10-27
console.log(nextWeek.toString());     // Output: 2023-11-03
```

## API Reference

### `constructor(dateString?: string | Date)`

Creates a new `sdate` instance.
- If no argument is provided, it initializes with the current date.
- `dateString`: An optional string in `YYYY-MM-DD` format or a `Date` object.

---

### `addDays(days: number): sdate`
Adds a specified number of days to the date. Returns a new `sdate` instance.

---

### `addMonths(months: number): sdate`
Adds a specified number of months to the date. Returns a new `sdate` instance.

---

### `addYears(years: number): sdate`
Adds a specified number of years to the date. Returns a new `sdate` instance.

---

### `difference(anotherDate: sdate): number`
Calculates the difference in days between the `sdate` instance and another.

---

### `fDate(): string`
Formats the date as `DD/MM/YYYY`.

---

### `equals(anotherDate: sdate | Date): boolean`
Checks if the `sdate` instance is equal to another `sdate` or `Date` object.

---

### `toString(): string`
Returns the date as a string in `YYYY-MM-DD` format.

---

### `year(): number`
Returns the four-digit year.

---

### `yearShort(): string`
Returns the last two digits of the year.

---

### `month(): number`
Returns the month (1-12).

---

### `monthPad(): string`
Returns the month, padded with a leading zero if necessary (e.g., `01`, `12`).

---

### `date(): number`
Returns the day of the month (1-31).

---

### `datePad(): string`
Returns the day of the month, padded with a leading zero if necessary.

---

### `day(): number`
Returns the day of the week (0 for Sunday, 1 for Monday, etc.).

---

### `ymd(): { year: number, month: number, date: number }`
Returns an object containing the year, month, and day.

---

### `ymddt(): { year: number, month: number, date: number, day: number }`
Returns an object containing the year, month, day, and day of the week.

---

### `startOfWeek(): sdate`
Returns a new `sdate` instance for the start of the week (Monday).

---

### `daysInWeek(): sdate[]`
Returns an array of `sdate` objects for the entire week (Monday to Sunday).

---

### `isInArray(arrayToCheck: (string | sdate | Date)[]): boolean`
Checks if the `sdate` instance exists in an array of dates.

---

### `inMonth(year?: number, month?: number): boolean`
Checks if the date is in a specific month. Defaults to the current month if no arguments are provided.

---

### `isToday(): boolean`
Checks if the date is today.

---

### `startOfMonth(): sdate`
Returns a new `sdate` instance for the first day of the month.

---

### `endOfMonth(): sdate`
Returns a new `sdate` instance for the last day of the month.

---

### `daysInMonth(): sdate[]`
Returns an array of `sdate` objects for every day in the month.

## Running Tests

To run the test suite, use the following command:

```bash
npm test
```
