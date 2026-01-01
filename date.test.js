"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('sdate', function () {
    describe('constructor', function () {
        it('should create a date object with the current date if no date string is provided', function () {
            var today = new index_1.default();
            var now = new Date();
            var year = now.getFullYear();
            var month = String(now.getMonth() + 1).padStart(2, '0');
            var day = String(now.getDate()).padStart(2, '0');
            expect(today.toString()).toBe("".concat(year, "-").concat(month, "-").concat(day));
        });
        it('should create a date object with the provided date string', function () {
            var d = new index_1.default('2023-10-26');
            expect(d.toString()).toBe('2023-10-26');
        });
        it('should throw an error for an invalid date format', function () {
            expect(function () { return new index_1.default('26-10-2023'); }).toThrow('Invalid date format. Please use YYYY-MM-DD.');
        });
        it('should create a date object from a Date object', function () {
            var d = new Date('2023-10-26');
            var sd = new index_1.default(d);
            expect(sd.toString()).toBe('2023-10-26');
        });
    });
    describe('manipulation', function () {
        it('should add days to the date', function () {
            var d = new index_1.default('2023-10-26');
            expect(d.addDays(5).toString()).toBe('2023-10-31');
        });
        it('should add months to the date', function () {
            var d = new index_1.default('2023-10-26');
            expect(d.addMonths(2).toString()).toBe('2023-12-26');
        });
        it('should add years to the date', function () {
            var d = new index_1.default('2023-10-26');
            expect(d.addYears(1).toString()).toBe('2024-10-26');
        });
    });
    describe('formatting', function () {
        it('should format the date as DD/MM/YYYY', function () {
            var d = new index_1.default('2023-10-26');
            expect(d.fDate()).toBe('26/10/2023');
        });
        it('should return the year of the date', function () {
            var d = new index_1.default('2023-10-26');
            expect(d.year()).toBe(2023);
        });
        it('should return the short year of the date', function () {
            var d = new index_1.default('2023-10-26');
            expect(d.yearShort()).toBe('23');
        });
        it('should return the month of the date', function () {
            var d = new index_1.default('2023-10-26');
            expect(d.month()).toBe(10);
        });
        it('should return the padded month of the date', function () {
            var d = new index_1.default('2023-01-26');
            expect(d.monthPad()).toBe('01');
        });
        it('should return the day of the date', function () {
            var d = new index_1.default('2023-10-26');
            expect(d.date()).toBe(26);
        });
        it('should return the padded day of the date', function () {
            var d = new index_1.default('2023-10-01');
            expect(d.datePad()).toBe('01');
        });
        it('should return the day of the week', function () {
            var d = new index_1.default('2023-10-26'); // Thursday
            expect(d.day()).toBe(4);
        });
        it('should return the year, month, and day of the date', function () {
            var d = new index_1.default('2023-10-26');
            expect(d.ymd()).toEqual({ year: 2023, month: 10, date: 26 });
        });
        it('should return the year, month, day, day of the week of the date', function () {
            var d = new index_1.default('2023-10-26');
            expect(d.ymddt()).toEqual({
                year: 2023,
                month: 10,
                date: 26,
                day: 4,
            });
        });
    });
    describe('comparison', function () {
        it('should calculate the difference in days between two dates', function () {
            var d1 = new index_1.default('2023-10-26');
            var d2 = new index_1.default('2023-10-31');
            expect(d1.difference(d2)).toBe(5);
        });
        it('should check if two date objects are equal', function () {
            var d1 = new index_1.default('2023-10-26');
            var d2 = new index_1.default('2023-10-26');
            var d3 = new index_1.default('2023-10-31');
            expect(d1.equals(d2)).toBe(true);
            expect(d1.equals(d3)).toBe(false);
        });
        it('should check if a date is in an array of dates', function () {
            var d1 = new index_1.default('2023-10-26');
            var d2 = new index_1.default('2023-10-27');
            var d3 = new index_1.default('2023-10-28');
            var dateArray = [d1, d2, d3];
            var d4 = new index_1.default('2023-10-26');
            var d5 = new index_1.default('2023-10-29');
            expect(d4.isInArray(dateArray)).toBe(true);
            expect(d5.isInArray(dateArray)).toBe(false);
            var da = [
                new Date('2023-10-26'),
                new Date('2023-10-27'),
                new Date('2023-10-28'),
            ];
            expect(d4.isInArray(da)).toBe(true);
            expect(d5.isInArray(da)).toBe(false);
            var da2 = ['2023-10-26', '2023-10-27', '2023-10-28'];
            expect(d4.isInArray(da2)).toBe(true);
            expect(d5.isInArray(da2)).toBe(false);
        });
        it('should check if a date is in a given month', function () {
            var d1 = new index_1.default('2023-10-26');
            expect(d1.inMonth(2023, 10)).toBe(true);
            expect(d1.inMonth()).toBe(true);
            var d2 = new index_1.default();
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            expect(d2.inMonth(year, month)).toBe(true);
            expect(d2.inMonth()).toBe(true);
            var d3 = new index_1.default('2023-10-26');
            expect(d3.inMonth(2023, 11)).toBe(false);
        });
        it('should check if a date is today', function () {
            var today = new index_1.default();
            expect(today.isToday()).toBe(true);
            var notToday = new index_1.default('2023-10-26');
            expect(notToday.isToday()).toBe(false);
        });
    });
    describe('week and month', function () {
        it('should return the start of the week (Monday) for a given date', function () {
            var d1 = new index_1.default('2023-10-26'); // Thursday
            expect(d1.startOfWeek().toString()).toBe('2023-10-23');
            var d2 = new index_1.default('2023-10-23'); // Monday
            expect(d2.startOfWeek().toString()).toBe('2023-10-23');
            var d3 = new index_1.default('2023-10-29'); // Sunday
            expect(d3.startOfWeek().toString()).toBe('2023-10-23');
        });
        it('should return an array of all days in the week', function () {
            var d = new index_1.default('2023-10-26'); // Thursday
            var days = d.daysInWeek();
            expect(days.length).toBe(7);
            expect(days[0].toString()).toBe('2023-10-23'); // Monday
            expect(days[6].toString()).toBe('2023-10-29'); // Sunday
        });
        it('should return the start of the month', function () {
            var d = new index_1.default('2023-10-26');
            expect(d.startOfMonth().toString()).toBe('2023-10-01');
        });
        it('should return the end of the month', function () {
            var d = new index_1.default('2023-10-26');
            expect(d.endOfMonth().toString()).toBe('2023-10-31');
        });
        it('should return an array of all days in the month', function () {
            var d = new index_1.default('2023-02-15');
            var days = d.daysInMonth();
            expect(days.length).toBe(28);
            expect(days[0].toString()).toBe('2023-02-01');
            expect(days[27].toString()).toBe('2023-02-28');
        });
    });
});
