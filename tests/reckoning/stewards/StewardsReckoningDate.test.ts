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
    test("Should not allow year before 2060", () => expect(() => stewardsReckoning.newDate(2059,StewardsMonth.I1, 1)).toThrow(RangeError))
    test("Should not allow leap intercalary I3L in non-leap year", () => expect(() => stewardsReckoning.newDate(2061,StewardsMonth.I3L, 1)).toThrow(RangeError))
    test("Should not allow common intercalary I3 in leap year", () => expect(() => stewardsReckoning.newDate(2064,StewardsMonth.I3, 1)).toThrow(RangeError))
    test("Should not allow common intercalary I3 in millennial year", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.I3, 1)).toThrow(RangeError))

    test("Should not allow day 0", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.M1, 0)).toThrow(RangeError))
    test("Should not allow negative day", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.M1, -1)).toThrow(RangeError))
    test("Should not allow day 31 in a month", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.M1, 31)).toThrow(RangeError))

    test("Should not allow day 2 in I3 in regular year", () => expect(() => stewardsReckoning.newDate(2063,StewardsMonth.I3, 2)).toThrow(RangeError))

    test("Should allow day 2 in I3L in leap year", () => expect(stewardsReckoning.newDate(2064,StewardsMonth.I3L, 2)).toBeTruthy())
    test("Should not allow day 3 in I3L in leap year", () => expect(() => stewardsReckoning.newDate(2064,StewardsMonth.I3L, 3)).toThrow(RangeError))

    test("Should allow day 3 in I3L in millennial year", () => expect(stewardsReckoning.newDate(2360,StewardsMonth.I3L, 3)).toBeTruthy())
    test("Should not allow day 4 in I3L in millennial year", () => expect(() => stewardsReckoning.newDate(2360,StewardsMonth.I3L, 4)).toThrow(RangeError))
})

describe('testing StewardsReckoningDate.getDayOwWeek', () => {
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

function testDayOfWeek(date: ReckoningDate<StewardsMonth>, expected: number) {
    test(`${date.toString("quenya")} is ${expected}`, () => expect(date.getDayOfWeek()).toBe(expected))
}
