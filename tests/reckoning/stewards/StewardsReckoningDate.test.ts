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

describe('testing StewardsReckoningDate.isBefore and isEqual', () => {

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
        }
    })
})

describe('testing StewardsReckoningDate.constructor', () => {
    test("Should not allow leap intercalary I3L in non-leap year", () => expect(() => stewardsReckoning.newDate(2061,StewardsMonth.I3L, 1)).toThrow(RangeError))
    test("Should not allow common intercalary I3 in leap year", () => expect(() => stewardsReckoning.newDate(2064,StewardsMonth.I3, 1)).toThrow(RangeError))
    test("Should not allow common intercalary I3 in millennial year", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.I3, 1)).toThrow(RangeError))

    test("Should not allow day 0", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.M1, 0)).toThrow(RangeError))
    test("Should not allow negative day", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.M1, -1)).toThrow(RangeError))
    test("Should not allow day 31 in a month of Steward's year", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.M1, 31)).toThrow(RangeError))

    test("Should not allow day 2 in I3 in regular year", () => expect(() => stewardsReckoning.newDate(2063,StewardsMonth.I3, 2)).toThrow(RangeError))

    test("Should allow day 2 in I3L in leap year", () => expect(stewardsReckoning.newDate(2064,StewardsMonth.I3L, 2)).toBeTruthy())
    test("Should not allow day 3 in I3L in leap year", () => expect(() => stewardsReckoning.newDate(2064,StewardsMonth.I3L, 3)).toThrow(RangeError))

    test("Should allow day 3 in I3L in millennial year", () => expect(stewardsReckoning.newDate(2360,StewardsMonth.I3L, 3)).toBeTruthy())
    test("Should not allow day 4 in I3L in millennial year", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.I3L, 4)).toThrow(RangeError))
})

describe('testing StewardsReckoningDate.getDayOwWeek', () => {
    testDayOfWeek(stewardsReckoning.newDate(1, StewardsMonth.I1, 1), DayOfWeek.D4)

    testDayOfWeek(stewardsReckoning.newDate(999, StewardsMonth.I1, 1), DayOfWeek.D3)
    testDayOfWeek(stewardsReckoning.newDate(999, StewardsMonth.I5, 1), DayOfWeek.D3)

    testDayOfWeek(stewardsReckoning.newDate(1000, StewardsMonth.I1, 1), DayOfWeek.D4)
    testDayOfWeek(stewardsReckoning.newDate(1000, StewardsMonth.M6, 31), DayOfWeek.D3)
    testDayOfWeek(stewardsReckoning.newDate(1000, StewardsMonth.I3L, 1), DayOfWeek.D4)
    testDayOfWeek(stewardsReckoning.newDate(1000, StewardsMonth.M7, 31), DayOfWeek.D2)
    testDayOfWeek(stewardsReckoning.newDate(1000, StewardsMonth.I5, 1), DayOfWeek.D6)

    testDayOfWeek(stewardsReckoning.newDate(1999, StewardsMonth.I1, 1), DayOfWeek.D6)
    testDayOfWeek(stewardsReckoning.newDate(1999, StewardsMonth.I5, 1), DayOfWeek.D6)

    testDayOfWeek(stewardsReckoning.newDate(2000, StewardsMonth.I1, 1), DayOfWeek.D7)
    testDayOfWeek(stewardsReckoning.newDate(2000, StewardsMonth.I5, 1), DayOfWeek.D2)

    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.I1, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.M1, 1), DayOfWeek.D2)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.M1, 2), DayOfWeek.D3)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.M1, 3), DayOfWeek.D4)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.M1, 4), DayOfWeek.D5)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.M1, 5), DayOfWeek.D6)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.M1, 6), DayOfWeek.D7)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.M1, 7), DayOfWeek.D1)

    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.M1, 14), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.M1, 21), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.M1, 28), DayOfWeek.D1)

    testDayOfWeek(stewardsReckoning.newDate(2060, StewardsMonth.M3, 3), DayOfWeek.D1)

    testDayOfWeek(stewardsReckoning.newDate(2061, StewardsMonth.I1, 1), DayOfWeek.D3)
    testDayOfWeek(stewardsReckoning.newDate(2062, StewardsMonth.I1, 1), DayOfWeek.D4)
    testDayOfWeek(stewardsReckoning.newDate(2063, StewardsMonth.I1, 1), DayOfWeek.D5)
    testDayOfWeek(stewardsReckoning.newDate(2064, StewardsMonth.I1, 1), DayOfWeek.D6)
    testDayOfWeek(stewardsReckoning.newDate(2065, StewardsMonth.I1, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2348, StewardsMonth.I1, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2360, StewardsMonth.I1, 1), DayOfWeek.D2)
    testDayOfWeek(stewardsReckoning.newDate(2361, StewardsMonth.I1, 1), DayOfWeek.D5)

    testDayOfWeek(stewardsReckoning.newDate(2364, StewardsMonth.I1, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2369, StewardsMonth.I1, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2375, StewardsMonth.I1, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2386, StewardsMonth.I1, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2392, StewardsMonth.I1, 1), DayOfWeek.D1)

    testDayOfWeek(stewardsReckoning.newDate(2397, StewardsMonth.I1, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2398, StewardsMonth.I1, 1), DayOfWeek.D2)
    testDayOfWeek(stewardsReckoning.newDate(2399, StewardsMonth.I1, 1), DayOfWeek.D3)
    testDayOfWeek(stewardsReckoning.newDate(2400, StewardsMonth.I1, 1), DayOfWeek.D4)
    testDayOfWeek(stewardsReckoning.newDate(2401, StewardsMonth.I1, 1), DayOfWeek.D5)
    testDayOfWeek(stewardsReckoning.newDate(2402, StewardsMonth.I1, 1), DayOfWeek.D6)
    testDayOfWeek(stewardsReckoning.newDate(2403, StewardsMonth.I1, 1), DayOfWeek.D7)

    testDayOfWeek(stewardsReckoning.newDate(2404, StewardsMonth.I1, 1), DayOfWeek.D1)

    testDayOfWeek(stewardsReckoning.newDate(2443, StewardsMonth.I1, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2539, StewardsMonth.I1, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(2561, StewardsMonth.I1, 1), DayOfWeek.D1)

    testDayOfWeek(stewardsReckoning.newDate(2556, StewardsMonth.I1, 1), DayOfWeek.D1)
    testDayOfWeek(stewardsReckoning.newDate(3019, StewardsMonth.M3, 15), DayOfWeek.D6)
})

describe('testing StewardsReckoningDate.plusDays', () => {
    test("should add a zero to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 1).plusDays(0)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.M2, 1)))

    test("should add a day to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 1).plusDays(1)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.M2, 2)))

    test("should roll a month", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 1).plusDays(30)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.M3, 1)))

    test("should roll a year", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 1).plusDays(365)).toEqual(stewardsReckoning.newDate(2444, StewardsMonth.M2, 1)))

    test("should roll a year and a leap year", () =>
        expect(stewardsReckoning.newDate(2103, StewardsMonth.M2, 1).plusDays(365+366)).toEqual(stewardsReckoning.newDate(2105, StewardsMonth.M2, 1)))

    test("should add a -zero to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 1).plusDays(-0)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.M2, 1)))

    test("should subtract a day from date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 1).plusDays(-1)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.M1, 30)))

    test("should roll a month when subtracting", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 1).plusDays(-30)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.M1, 1)))

    test("should roll a year when subtracting", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 1).plusDays(-365)).toEqual(stewardsReckoning.newDate(2442, StewardsMonth.M2, 1)))

    test("should roll a year and a leap year when subtracting", () =>
        expect(stewardsReckoning.newDate(2105, StewardsMonth.M2, 1).plusDays(-365-366)).toEqual(stewardsReckoning.newDate(2103, StewardsMonth.M2, 1)))

    test("should not roll a year lower then 1 when subtracting", () =>
        expect(stewardsReckoning.newDate(1, StewardsMonth.M1, 1).plusDays(-31)).toEqual(stewardsReckoning.newDate(1, StewardsMonth.M1, 1)))
})

describe('testing StewardsReckoningDate.plusMonths', () => {
    test("should add a zero months to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 10).plusMonths(0)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.M2, 10)))

    test("should add 1 month to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 10, "sindarin").plusMonths(1)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.M3, 10, "sindarin")))

    test("should add 2 months to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 10).plusMonths(2)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.I2, 1)))

    test("should add 1 month to intercalary date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.I2, 1).plusMonths(1)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.M4, 1)))

    test("should roll forward over the year", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.I2, 1).plusMonths(13)).toEqual(stewardsReckoning.newDate(2444, StewardsMonth.I1, 1)))

    test("should subtract 1 month from date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 10).plusMonths(-1)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.M1, 10)))

    test("should subtract 2 months from date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 10).plusMonths(-2)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.I1, 1)))

    test("should subtract 1 month, ending in intercalary date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M4, 10).plusMonths(-1)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.I2, 1)))

    test("should roll backwards over the year", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 10).plusMonths(-4)).toEqual(stewardsReckoning.newDate(2442, StewardsMonth.M12, 10)))

    test("should not roll a year lower then 1 when subtracting", () =>
        expect(stewardsReckoning.newDate(1, StewardsMonth.I1, 1).plusMonths(-1)).toEqual(stewardsReckoning.newDate(1, StewardsMonth.I1, 1)))
})

describe('testing StewardsReckoningDate.plusYears', () => {
    test("should add a zero years to date", () =>
        expect(stewardsReckoning.newDate(2443, StewardsMonth.M2, 10).plusYears(0)).toEqual(stewardsReckoning.newDate(2443, StewardsMonth.M2, 10)))

    test("should add 1 year to date", () =>
        expect(stewardsReckoning.getDate(2443, 105, "sindarin").plusYears(1)).toEqual(stewardsReckoning.getDate(2444, 105, "sindarin")))

    test("should add 2 years to date", () =>
        expect(stewardsReckoning.getDate(2444, 366).plusYears(2)).toEqual(stewardsReckoning.getDate(2446, 365)))

    test("should subtract 1 year from date", () =>
        expect(stewardsReckoning.getDate(2443, 105).plusYears(-1)).toEqual(stewardsReckoning.getDate(2442, 105)))

    test("should subtract 2 years from date", () =>
        expect(stewardsReckoning.getDate(2444, 366).plusYears(-2)).toEqual(stewardsReckoning.getDate(2442, 365)))

    test("should not roll a year lower then 1 when subtracting", () =>
        expect(stewardsReckoning.newDate(1, StewardsMonth.M1, 1).plusYears(-1)).toEqual(stewardsReckoning.newDate(1, StewardsMonth.M1, 1)))
})

function testDayOfWeek(date: ReckoningDate<StewardsMonth>, expected: number) {
    test(`${date.toString("quenya")} is ${expected}`, () => expect(date.getDayOfWeek()).toBe(expected))
}
