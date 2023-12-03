import {describe, expect, test} from "@jest/globals";
import {approximateGregorianYear} from "../../../src/reckoning/gregorian/ApproximateGregorianYear";
import {YearType} from "../../../src/reckoning/YearType";

describe('testing ApproximateGregorianYear.getMonthString', () => {

    describe('regular year', () => {

        test('Normal days of year', () => {
            expect(approximateGregorianYear.getMonthString(1, YearType.REGULAR)).toBe("January");
            expect(approximateGregorianYear.getMonthString(15, YearType.REGULAR)).toBe("January");
            expect(approximateGregorianYear.getMonthString(31, YearType.MILLENNIAL)).toBe("January");

            expect(approximateGregorianYear.getMonthString(152, YearType.REGULAR)).toBe("June");
            expect(approximateGregorianYear.getMonthString(180, YearType.REGULAR)).toBe("June");
            expect(approximateGregorianYear.getMonthString(181, YearType.REGULAR)).toBe("June");

            expect(approximateGregorianYear.getMonthString(335, YearType.REGULAR)).toBe("December");
            expect(approximateGregorianYear.getMonthString(350, YearType.REGULAR)).toBe("December");
            expect(approximateGregorianYear.getMonthString(365, YearType.REGULAR)).toBe("December");
        })

        test("Should not allow day 0", () => expect(() => approximateGregorianYear.getMonthString(0, YearType.REGULAR)).toThrow(RangeError))
        test("Should not allow negative day", () => expect(() => approximateGregorianYear.getMonthString(-1, YearType.REGULAR)).toThrow(RangeError))
        test("Should not allow day 366", () => expect(() => approximateGregorianYear.getMonthString(366, YearType.REGULAR)).toThrow(RangeError))
    })

    describe('leap year', () => {

        test('Normal days of year', () => {
            expect(approximateGregorianYear.getMonthString(1, YearType.LEAP)).toBe("January");
            expect(approximateGregorianYear.getMonthString(15, YearType.LEAP)).toBe("January");
            expect(approximateGregorianYear.getMonthString(31, YearType.LEAP)).toBe("January");

            expect(approximateGregorianYear.getMonthString(152, YearType.LEAP)).toBe("June");
            expect(approximateGregorianYear.getMonthString(180, YearType.LEAP)).toBe("June");
            expect(approximateGregorianYear.getMonthString(182, YearType.LEAP)).toBe("June");

            expect(approximateGregorianYear.getMonthString(336, YearType.LEAP)).toBe("December");
            expect(approximateGregorianYear.getMonthString(350, YearType.LEAP)).toBe("December");
            expect(approximateGregorianYear.getMonthString(366, YearType.LEAP)).toBe("December");
        })

        test("Should not allow day 0", () => expect(() => approximateGregorianYear.getMonthString(0, YearType.LEAP)).toThrow(RangeError))
        test("Should not allow negative day", () => expect(() => approximateGregorianYear.getMonthString(-1, YearType.LEAP)).toThrow(RangeError))
        test("Should not allow day 367", () => expect(() => approximateGregorianYear.getMonthString(367, YearType.LEAP)).toThrow(RangeError))
    })

    describe('Millennial year', () => {

        test('Normal days of year', () => {
            expect(approximateGregorianYear.getMonthString(1, YearType.MILLENNIAL)).toBe("January");
            expect(approximateGregorianYear.getMonthString(15, YearType.MILLENNIAL)).toBe("January");
            expect(approximateGregorianYear.getMonthString(31, YearType.MILLENNIAL)).toBe("January");

            expect(approximateGregorianYear.getMonthString(152, YearType.MILLENNIAL)).toBe("June");
            expect(approximateGregorianYear.getMonthString(180, YearType.MILLENNIAL)).toBe("June");
            expect(approximateGregorianYear.getMonthString(183, YearType.MILLENNIAL)).toBe("June");

            expect(approximateGregorianYear.getMonthString(337, YearType.MILLENNIAL)).toBe("December");
            expect(approximateGregorianYear.getMonthString(350, YearType.MILLENNIAL)).toBe("December");
            expect(approximateGregorianYear.getMonthString(367, YearType.MILLENNIAL)).toBe("December");
        })

        test("Should not allow day 0", () => expect(() => approximateGregorianYear.getMonthString(0, YearType.MILLENNIAL)).toThrow(RangeError))
        test("Should not allow negative day", () => expect(() => approximateGregorianYear.getMonthString(-1, YearType.MILLENNIAL)).toThrow(RangeError))
        test("Should not allow day 368", () => expect(() => approximateGregorianYear.getMonthString(368, YearType.MILLENNIAL)).toThrow(RangeError))
    })
})

describe('testing ApproximateGregorianYear.getDayOfMonth', () => {

    describe('regular year', () => {

        test('Normal days of year', () => {
            expect(approximateGregorianYear.getDayOfMonth(1, YearType.REGULAR)).toBe(1);
            expect(approximateGregorianYear.getDayOfMonth(15, YearType.REGULAR)).toBe(15);
            expect(approximateGregorianYear.getDayOfMonth(31, YearType.REGULAR)).toBe(31);

            expect(approximateGregorianYear.getDayOfMonth(182, YearType.REGULAR)).toBe(1);
            expect(approximateGregorianYear.getDayOfMonth(200, YearType.REGULAR)).toBe(19);
            expect(approximateGregorianYear.getDayOfMonth(212, YearType.REGULAR)).toBe(31);

            expect(approximateGregorianYear.getDayOfMonth(365, YearType.REGULAR)).toBe(31);
        })

        test("Should not allow day 0", () => expect(() => approximateGregorianYear.getDayOfMonth(0, YearType.REGULAR)).toThrow(RangeError))
        test("Should not allow negative day", () => expect(() => approximateGregorianYear.getDayOfMonth(-1, YearType.REGULAR)).toThrow(RangeError))
        test("Should not allow day 366", () => expect(() => approximateGregorianYear.getDayOfMonth(366, YearType.REGULAR)).toThrow(RangeError))
    })

    describe('leap year', () => {

        test('Normal days of year', () => {
            expect(approximateGregorianYear.getDayOfMonth(1, YearType.LEAP)).toBe(1);
            expect(approximateGregorianYear.getDayOfMonth(15, YearType.LEAP)).toBe(15);
            expect(approximateGregorianYear.getDayOfMonth(31, YearType.LEAP)).toBe(31);

            expect(approximateGregorianYear.getDayOfMonth(152, YearType.LEAP)).toBe(1);
            expect(approximateGregorianYear.getDayOfMonth(160, YearType.LEAP)).toBe(9);
            expect(approximateGregorianYear.getDayOfMonth(182, YearType.LEAP)).toBe(31);

            expect(approximateGregorianYear.getDayOfMonth(366, YearType.LEAP)).toBe(31);
        })

        test("Should not allow day 0", () => expect(() => approximateGregorianYear.getDayOfMonth(0, YearType.LEAP)).toThrow(RangeError))
        test("Should not allow negative day", () => expect(() => approximateGregorianYear.getDayOfMonth(-1, YearType.LEAP)).toThrow(RangeError))
        test("Should not allow day 367", () => expect(() => approximateGregorianYear.getDayOfMonth(367, YearType.LEAP)).toThrow(RangeError))
    })

    describe('millennial year', () => {

        test('Normal days of year', () => {
            expect(approximateGregorianYear.getDayOfMonth(1, YearType.MILLENNIAL)).toBe(1);
            expect(approximateGregorianYear.getDayOfMonth(15, YearType.MILLENNIAL)).toBe(15);
            expect(approximateGregorianYear.getDayOfMonth(31, YearType.MILLENNIAL)).toBe(31);

            expect(approximateGregorianYear.getDayOfMonth(152, YearType.MILLENNIAL)).toBe(1);
            expect(approximateGregorianYear.getDayOfMonth(160, YearType.MILLENNIAL)).toBe(9);
            expect(approximateGregorianYear.getDayOfMonth(183, YearType.MILLENNIAL)).toBe(32);

            expect(approximateGregorianYear.getDayOfMonth(367, YearType.MILLENNIAL)).toBe(31);
        })

        test("Should not allow day 0", () => expect(() => approximateGregorianYear.getDayOfMonth(0, YearType.MILLENNIAL)).toThrow(RangeError))
        test("Should not allow negative day", () => expect(() => approximateGregorianYear.getDayOfMonth(-1, YearType.MILLENNIAL)).toThrow(RangeError))
        test("Should not allow day 368", () => expect(() => approximateGregorianYear.getDayOfMonth(368, YearType.MILLENNIAL)).toThrow(RangeError))
    })
})
