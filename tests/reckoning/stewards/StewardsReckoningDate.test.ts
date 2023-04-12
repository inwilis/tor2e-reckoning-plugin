import {describe, expect, test} from "@jest/globals";
import {stewardsReckoning} from "../../../src/reckoning/stewards/StewardsReckoning";
import {ReckoningDate} from "../../../src/reckoning/ReckoningDate";
import {StewardsMonth} from "../../../src/reckoning/stewards/StewardsMonth";
import {DayOfWeek} from "../../../src/reckoning/DayOfWeek";

describe('testing StewardsReckoningDate.getDayOfYear', () => {

    test(`Days of regular year`, () => {
        for (let i = 1; i <= 365; i++) {
            expect(stewardsReckoning.getDate(2100, i).getDayOfYear()).toBe(i)
        }
    })

    test(`Days of leap year`, () => {
        for (let i = 1; i <= 366; i++) {
            expect(stewardsReckoning.getDate(2104, i).getDayOfYear()).toBe(i)
        }
    })

    test(`Days of millennial year`, () => {
        for (let i = 1; i <= 367; i++) {
            expect(stewardsReckoning.getDate(2360, i).getDayOfYear()).toBe(i)
        }
    })

})

describe('testing StewardsReckoningDate.isBefore, isAfter and isEqual', () => {

    test(`Days of regular year`, () => {
        for (let i = 1; i <= 364; i++) {
            const today: ReckoningDate<StewardsMonth> = stewardsReckoning.getDate(2100, i)
            const tomorrow: ReckoningDate<StewardsMonth> = stewardsReckoning.getDate(2100, i + 1)
            expect(today.isBefore(tomorrow)).toBeTruthy()
            expect(today.isBefore(today)).toBeFalsy()
            expect(tomorrow.isBefore(today)).toBeFalsy()

            expect(today.isEqual(tomorrow)).toBeFalsy()
            expect(today.isEqual(today)).toBeTruthy()
            expect(tomorrow.isEqual(today)).toBeFalsy()

            expect(today.isAfter(tomorrow)).toBeFalsy()
            expect(today.isAfter(today)).toBeFalsy()
            expect(tomorrow.isAfter(today)).toBeTruthy()
        }
    })
})

describe('testing StewardsReckoningDate.constructor', () => {
    test("Should not allow leap intercalary ENDERE in non-leap year", () => expect(() => stewardsReckoning.newDate(2061,StewardsMonth.ENDERE, 1)).toThrow(RangeError))
    test("Should not allow common intercalary LOENDE in leap year", () => expect(() => stewardsReckoning.newDate(2064,StewardsMonth.LOENDE, 1)).toThrow(RangeError))
    test("Should not allow common intercalary LOENDE in millennial year", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.LOENDE, 1)).toThrow(RangeError))

    test("Should not allow day 0", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.NARVINYE, 0)).toThrow(RangeError))
    test("Should not allow negative day", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.NARVINYE, -1)).toThrow(RangeError))
    test("Should not allow day 31 in a month of Steward's year", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.NARVINYE, 31)).toThrow(RangeError))

    test("Should not allow day 2 in LOENDE in regular year", () => expect(() => stewardsReckoning.newDate(2063,StewardsMonth.LOENDE, 2)).toThrow(RangeError))

    test("Should allow day 2 in ENDERE in leap year", () => expect(stewardsReckoning.newDate(2064,StewardsMonth.ENDERE, 2)).toBeTruthy())
    test("Should not allow day 3 in ENDERE in leap year", () => expect(() => stewardsReckoning.newDate(2064,StewardsMonth.ENDERE, 3)).toThrow(RangeError))

    test("Should allow day 3 in ENDERE in millennial year", () => expect(stewardsReckoning.newDate(2360,StewardsMonth.ENDERE, 3)).toBeTruthy())
    test("Should not allow day 4 in ENDERE in millennial year", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.ENDERE, 4)).toThrow(RangeError))
})

describe('testing StewardsReckoningDate.getDayOwWeek', () => {
    testDayOfWeek(stewardsReckoning.newDate(1, StewardsMonth.YESTARE, 1), DayOfWeek.D4)

    testDayOfWeek(stewardsReckoning.newDate(999, StewardsMonth.YESTARE, 1), DayOfWeek.D3)
    testDayOfWeek(stewardsReckoning.newDate(999, StewardsMonth.METTARE, 1), DayOfWeek.D3)

    testDayOfWeek(stewardsReckoning.newDate(1000, StewardsMonth.YESTARE, 1), DayOfWeek.D4)
    testDayOfWeek(stewardsReckoning.newDate(1000, StewardsMonth.NARIE, 31), DayOfWeek.D3)
    testDayOfWeek(stewardsReckoning.newDate(1000, StewardsMonth.ENDERE, 1), DayOfWeek.D4)
    testDayOfWeek(stewardsReckoning.newDate(1000, StewardsMonth.CERMIE, 31), DayOfWeek.D2)
    testDayOfWeek(stewardsReckoning.newDate(1000, StewardsMonth.METTARE, 1), DayOfWeek.D6)

    testDayOfWeek(stewardsReckoning.newDate(1999, StewardsMonth.YESTARE, 1), DayOfWeek.D6)
    testDayOfWeek(stewardsReckoning.newDate(1999, StewardsMonth.METTARE, 1), DayOfWeek.D6)

    testDayOfWeek(stewardsReckoning.newDate(2000, StewardsMonth.YESTARE, 1), DayOfWeek.D7)
    testDayOfWeek(stewardsReckoning.newDate(2000, StewardsMonth.METTARE, 1), DayOfWeek.D2)

    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.YESTARE, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.NARVINYE, 1), DayOfWeek.D2)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.NARVINYE, 2), DayOfWeek.D3)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.NARVINYE, 3), DayOfWeek.D4)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.NARVINYE, 4), DayOfWeek.D5)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.NARVINYE, 5), DayOfWeek.D6)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.NARVINYE, 6), DayOfWeek.D7)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.NARVINYE, 7), DayOfWeek.D1)

    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.NARVINYE, 14), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.NARVINYE, 21), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.NARVINYE, 28), DayOfWeek.D1)

    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.SULIME, 3), DayOfWeek.D1)

    testDayOfWeek(stewardsReckoning.newDate(2061, StewardsMonth.YESTARE, 1), DayOfWeek.D3)
    testDayOfWeek(stewardsReckoning.newDate(2062, StewardsMonth.YESTARE, 1), DayOfWeek.D4)
    testDayOfWeek(stewardsReckoning.newDate(2063, StewardsMonth.YESTARE, 1), DayOfWeek.D5)
    testDayOfWeek(stewardsReckoning.newDate(2064, StewardsMonth.YESTARE, 1), DayOfWeek.D6)
    testDayOfWeek(stewardsReckoning.newDate(2065, StewardsMonth.YESTARE, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2348, StewardsMonth.YESTARE, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2360, StewardsMonth.YESTARE, 1), DayOfWeek.D2)
    testDayOfWeek(stewardsReckoning.newDate(2361, StewardsMonth.YESTARE, 1), DayOfWeek.D5)

    testDayOfWeek(stewardsReckoning.newDate(2364, StewardsMonth.YESTARE, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2369, StewardsMonth.YESTARE, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2375, StewardsMonth.YESTARE, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2386, StewardsMonth.YESTARE, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2392, StewardsMonth.YESTARE, 1), DayOfWeek.D1)

    testDayOfWeek(stewardsReckoning.newDate(2397, StewardsMonth.YESTARE, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2398, StewardsMonth.YESTARE, 1), DayOfWeek.D2)
    testDayOfWeek(stewardsReckoning.newDate(2399, StewardsMonth.YESTARE, 1), DayOfWeek.D3)
    testDayOfWeek(stewardsReckoning.newDate(2400, StewardsMonth.YESTARE, 1), DayOfWeek.D4)
    testDayOfWeek(stewardsReckoning.newDate(2401, StewardsMonth.YESTARE, 1), DayOfWeek.D5)
    testDayOfWeek(stewardsReckoning.newDate(2402, StewardsMonth.YESTARE, 1), DayOfWeek.D6)
    testDayOfWeek(stewardsReckoning.newDate(2403, StewardsMonth.YESTARE, 1), DayOfWeek.D7)

    testDayOfWeek(stewardsReckoning.newDate(2404, StewardsMonth.YESTARE, 1), DayOfWeek.D1)

    testDayOfWeek(stewardsReckoning.newDate(2443, StewardsMonth.YESTARE, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2539, StewardsMonth.YESTARE, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2561, StewardsMonth.YESTARE, 1), DayOfWeek.D1)

    testDayOfWeek(stewardsReckoning.newDate(2556, StewardsMonth.YESTARE, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(3019, StewardsMonth.SULIME, 15), DayOfWeek.D6)
})

describe('testing StewardsReckoningDate.plusDays', () => {
    test("should add a zero to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 1).plusDays(0)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 1)))

    test("should add a day to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 1).plusDays(1)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 2)))

    test("should roll a month", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 1).plusDays(30)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.SULIME, 1)))

    test("should roll a year", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 1).plusDays(365)).toEqual(stewardsReckoning.newDate(2444, StewardsMonth.NENIME, 1)))

    test("should roll a year and a leap year", () =>
        expect(stewardsReckoning.newDate(2103, StewardsMonth.NENIME, 1).plusDays(365+366)).toEqual(stewardsReckoning.newDate(2105, StewardsMonth.NENIME, 1)))

    test("should add a -zero to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 1).plusDays(-0)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 1)))

    test("should subtract a day from date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 1).plusDays(-1)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.NARVINYE, 30)))

    test("should roll a month when subtracting", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 1).plusDays(-30)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.NARVINYE, 1)))

    test("should roll a year when subtracting", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 1).plusDays(-365)).toEqual(stewardsReckoning.newDate(2442, StewardsMonth.NENIME, 1)))

    test("should roll a year from YESTARE when subtracting", () =>
        expect(stewardsReckoning.newDate(2972, StewardsMonth.YESTARE, 1).plusDays(-1)).toEqual(stewardsReckoning.newDate(2971, StewardsMonth.METTARE, 1)))

    test("should roll a year and a leap year when subtracting", () =>
        expect(stewardsReckoning.newDate(2105, StewardsMonth.NENIME, 1).plusDays(-365-366)).toEqual(stewardsReckoning.newDate(2103, StewardsMonth.NENIME, 1)))

    test("should not roll a year lower then 1 when subtracting", () =>
        expect(stewardsReckoning.newDate(1, StewardsMonth.NARVINYE, 1).plusDays(-31)).toEqual(stewardsReckoning.newDate(1, StewardsMonth.NARVINYE, 1)))
})

describe('testing StewardsReckoningDate.plusMonths', () => {
    test("should add a zero months to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 10).plusMonths(0)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 10)))

    test("should add 1 month to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 10, "sindarin").plusMonths(1)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.SULIME, 10, "sindarin")))

    test("should add 2 months to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 10).plusMonths(2)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.TUILERE, 1)))

    test("should add 1 month to intercalary date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.TUILERE, 1).plusMonths(1)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.VIRESSE, 1)))

    test("should roll forward over the year", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.TUILERE, 1).plusMonths(13)).toEqual(stewardsReckoning.newDate(2444, StewardsMonth.YESTARE, 1)))

    test("should subtract 1 month from date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 10).plusMonths(-1)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.NARVINYE, 10)))

    test("should subtract 2 months from date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 10).plusMonths(-2)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.YESTARE, 1)))

    test("should subtract 1 month, ending in intercalary date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.VIRESSE, 10).plusMonths(-1)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.TUILERE, 1)))

    test("should roll backwards over the year", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 10).plusMonths(-4)).toEqual(stewardsReckoning.newDate(2442, StewardsMonth.RINGARE, 10)))

    test("should not roll a year lower then 1 when subtracting", () =>
        expect(stewardsReckoning.newDate(1, StewardsMonth.YESTARE, 1).plusMonths(-1)).toEqual(stewardsReckoning.newDate(1, StewardsMonth.YESTARE, 1)))
})

describe('testing StewardsReckoningDate.plusYears', () => {
    test("should add a zero years to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 10).plusYears(0)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.NENIME, 10)))

    test("should add 1 year to date", () =>
        expect(stewardsReckoning.getDate(2443, 105, "sindarin").plusYears(1)).toEqual(stewardsReckoning.getDate(2444, 105, "sindarin")))

    test("should add 2 years to date", () =>
        expect(stewardsReckoning.getDate(2444, 366).plusYears(2)).toEqual(stewardsReckoning.getDate(2446, 365)))

    test("should subtract 1 year from date", () =>
        expect(stewardsReckoning.getDate(2443, 105).plusYears(-1)).toEqual(stewardsReckoning.getDate(2442, 105)))

    test("should subtract 2 years from date", () =>
        expect(stewardsReckoning.getDate(2444, 366).plusYears(-2)).toEqual(stewardsReckoning.getDate(2442, 365)))

    test("should not roll a year lower then 1 when subtracting", () =>
        expect(stewardsReckoning.newDate(1, StewardsMonth.NARVINYE, 1).plusYears(-1)).toEqual(stewardsReckoning.newDate(1, StewardsMonth.NARVINYE, 1)))
})

function testDayOfWeek(date: ReckoningDate<StewardsMonth>, expected: number) {
    test(`${date.toString("quenya")} is ${expected}`, () => expect(date.getDayOfWeek()).toBe(expected))
}
