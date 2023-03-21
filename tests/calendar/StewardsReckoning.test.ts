import {Month, StewardsReckoning, StewardsReckoningDate} from "../../src/calendar/stewards/StewardsReckoning";
import {describe, expect, test} from "@jest/globals";
import {DayOfWeek} from "../../src/calendar/stewards/DayOfWeek";

describe('testing StewardsReckoning.isLeapYear()', () => {
    test('year 2064 is a leap year', () => expect(StewardsReckoning.isLeapYear(2064)).toBeTruthy())
    test('year 2100 is not a leap year', () => expect(StewardsReckoning.isLeapYear(2100)).toBeFalsy())
    test('year 2360 is a leap year', () => expect(StewardsReckoning.isLeapYear(2360)).toBeTruthy())
    test('year 2400 is not a leap year', () => expect(StewardsReckoning.isLeapYear(2400)).toBeFalsy())
    test('year 3000 is not a leap year)', () => expect(StewardsReckoning.isLeapYear(3000)).toBeFalsy())
})

describe('testing StewardsReckoning.daysInYear', () => {
    test('year 2064 is a leap year', () => expect(StewardsReckoning.daysInYear(2064)).toBe(366))
    test('year 2100 is not a leap year', () => expect(StewardsReckoning.daysInYear(2100)).toBe(365))
    test('year 2400 is not leap year', () => expect(StewardsReckoning.daysInYear(2400)).toBe(365))
    test('year 2360 is a leap year with extra day', () => expect(StewardsReckoning.daysInYear(2360)).toBe(367))
    test('year 3000 is not a leap year', () => expect(StewardsReckoning.daysInYear(3000)).toBe(365))
})

describe('testing StewardsReckoning.nextMonth for regular year', () => {
    [
        [Month.I1, Month.M1], [Month.M1, Month.M2], [Month.M2, Month.M3], [Month.M3, Month.I2],
        [Month.I2, Month.M4], [Month.M4, Month.M5], [Month.M5, Month.M6], [Month.M6, Month.I3],
        [Month.I3, Month.M7], [Month.M7, Month.M8], [Month.M8, Month.M9], [Month.M9, Month.I4],
        [Month.I4, Month.M10], [Month.M10, Month.M11], [Month.M11, Month.M12], [Month.M12, Month.I5],
        [Month.I5, Month.I1]
    ].forEach(tuple =>
        test(`${tuple[0]} is followed by ${tuple[1]}`, () => expect(StewardsReckoning.nextMonth(tuple[0], 2100)).toBe(tuple[1])))
})

describe('testing StewardsReckoning.nextMonth for leap year', () => {
    [
        [Month.I1, Month.M1], [Month.M1, Month.M2], [Month.M2, Month.M3], [Month.M3, Month.I2],
        [Month.I2, Month.M4], [Month.M4, Month.M5], [Month.M5, Month.M6], [Month.M6, Month.I3L],
        [Month.I3L, Month.M7], [Month.M7, Month.M8], [Month.M8, Month.M9], [Month.M9, Month.I4],
        [Month.I4, Month.M10], [Month.M10, Month.M11], [Month.M11, Month.M12], [Month.M12, Month.I5],
        [Month.I5, Month.I1]
    ].forEach(tuple =>
        test(`${tuple[0]} is followed by ${tuple[1]}`, () => expect(StewardsReckoning.nextMonth(tuple[0], 2104)).toBe(tuple[1])))
})

describe('testing StewardsReckoning.getDate', () => {
    test("Year before start of Steward's Reckoning causes an error", () => expect(() => StewardsReckoning.getDate(2059, 0)).toThrow(RangeError))
    test("Day 0 causes an error", () => expect(() => StewardsReckoning.getDate(2100, 0)).toThrow(RangeError))

    test("Day 1 of regular year", () => expect(StewardsReckoning.getDate(2100, 1)).toMatchObject({month: Month.I1, day: 1}))
    test("Day 2 of regular year", () => expect(StewardsReckoning.getDate(2100, 2)).toMatchObject({month: Month.M1, day: 1}))
    test("Day 31 of regular year", () => expect(StewardsReckoning.getDate(2100, 31)).toMatchObject({month: Month.M1, day: 30}))
    test("Day 183 of regular year", () => expect(StewardsReckoning.getDate(2100, 183)).toMatchObject({month: Month.I3, day: 1}))
    test("Day 320 of regular year", () => expect(StewardsReckoning.getDate(2100, 320)).toMatchObject({month: Month.M11, day: 16}))
    test("Day 365 of regular year", () => expect(StewardsReckoning.getDate(2100, 365)).toMatchObject({month: Month.I5, day: 1}))
    test("Day 366 of regular year causes an error", () => expect(() => StewardsReckoning.getDate(2100, 366)).toThrow(RangeError))


    test("Day 1 of leap year", () => expect(StewardsReckoning.getDate(2104, 1)).toMatchObject({month: Month.I1, day: 1}))
    test("Day 2 of leap year", () => expect(StewardsReckoning.getDate(2104, 2)).toMatchObject({month: Month.M1, day: 1}))
    test("Day 31 of leap year", () => expect(StewardsReckoning.getDate(2104, 31)).toMatchObject({month: Month.M1, day: 30}))
    test("Day 183 of leap year", () => expect(StewardsReckoning.getDate(2104, 183)).toMatchObject({month: Month.I3L, day: 1}))
    test("Day 184 of leap year", () => expect(StewardsReckoning.getDate(2104, 184)).toMatchObject({month: Month.I3L, day: 2}))
    test("Day 320 of leap year", () => expect(StewardsReckoning.getDate(2104, 320)).toMatchObject({month: Month.M11, day: 15}))
    test("Day 366 of leap year", () => expect(StewardsReckoning.getDate(2104, 366)).toMatchObject({month: Month.I5, day: 1}))
    test("Day 367 of leap year causes an error", () => expect(() => StewardsReckoning.getDate(2104, 367)).toThrow(RangeError))

    test("Day 1 of millennial year", () => expect(StewardsReckoning.getDate(2360, 1)).toMatchObject({month: Month.I1, day: 1}))
    test("Day 2 of millennial year", () => expect(StewardsReckoning.getDate(2360, 2)).toMatchObject({month: Month.M1, day: 1}))
    test("Day 31 of millennial year", () => expect(StewardsReckoning.getDate(2360, 31)).toMatchObject({month: Month.M1, day: 30}))
    test("Day 183 of millennial year", () => expect(StewardsReckoning.getDate(2360, 183)).toMatchObject({month: Month.I3L, day: 1}))
    test("Day 184 of millennial year", () => expect(StewardsReckoning.getDate(2360, 184)).toMatchObject({month: Month.I3L, day: 2}))
    test("Day 185 of millennial year", () => expect(StewardsReckoning.getDate(2360, 185)).toMatchObject({month: Month.I3L, day: 3}))
    test("Day 320 of millennial year", () => expect(StewardsReckoning.getDate(2360, 320)).toMatchObject({month: Month.M11, day: 14}))
    test("Day 367 of millennial year", () => expect(StewardsReckoning.getDate(2360, 367)).toMatchObject({month: Month.I5, day: 1}))
    test("Day 368 of millennial year causes an error", () => expect(() => StewardsReckoning.getDate(2360, 368)).toThrow(RangeError))
})

describe('testing StewardsReckoning.getDate.toQuenya', () => {

    test("Day 1 of regular year", () => expect(StewardsReckoning.getDate(2100, 1).toQuenya()).toBe("Yestarë 2100"))
    test("Day 2 of regular year", () => expect(StewardsReckoning.getDate(2100, 2).toQuenya()).toBe("1 Narvinyë 2100"))
    test("Day 31 of regular year", () => expect(StewardsReckoning.getDate(2100, 31).toQuenya()).toBe("30 Narvinyë 2100"))
    test("Day 183 of regular year", () => expect(StewardsReckoning.getDate(2100, 183).toQuenya()).toBe("Loëndë 2100"))
    test("Day 320 of regular year", () => expect(StewardsReckoning.getDate(2100, 320).toQuenya()).toBe("16 Hísimë 2100"))
    test("Day 365 of regular year", () => expect(StewardsReckoning.getDate(2100, 365).toQuenya()).toBe("Mettarë 2100"))


    test("Day 1 of leap year", () => expect(StewardsReckoning.getDate(2104, 1).toQuenya()).toBe("Yestarë 2104"))
    test("Day 2 of leap year", () => expect(StewardsReckoning.getDate(2104, 2).toQuenya()).toBe("1 Narvinyë 2104"))
    test("Day 31 of leap year", () => expect(StewardsReckoning.getDate(2104, 31).toQuenya()).toBe("30 Narvinyë 2104"))
    test("Day 183 of leap year", () => expect(StewardsReckoning.getDate(2104, 183).toQuenya()).toBe("1 Enderë 2104"))
    test("Day 184 of leap year", () => expect(StewardsReckoning.getDate(2104, 184).toQuenya()).toBe("2 Enderë 2104"))
    test("Day 320 of leap year", () => expect(StewardsReckoning.getDate(2104, 320).toQuenya()).toBe("15 Hísimë 2104"))
    test("Day 366 of leap year", () => expect(StewardsReckoning.getDate(2104, 366).toQuenya()).toBe("Mettarë 2104"))

    test("Day 1 of millennial year", () => expect(StewardsReckoning.getDate(2360, 1).toQuenya()).toBe("Yestarë 2360"))
    test("Day 2 of millennial year", () => expect(StewardsReckoning.getDate(2360, 2).toQuenya()).toBe("1 Narvinyë 2360"))
    test("Day 31 of millennial year", () => expect(StewardsReckoning.getDate(2360, 31).toQuenya()).toBe("30 Narvinyë 2360"))
    test("Day 183 of millennial year", () => expect(StewardsReckoning.getDate(2360, 183).toQuenya()).toBe("1 Enderë 2360"))
    test("Day 184 of millennial year", () => expect(StewardsReckoning.getDate(2360, 184).toQuenya()).toBe("2 Enderë 2360"))
    test("Day 185 of millennial year", () => expect(StewardsReckoning.getDate(2360, 185).toQuenya()).toBe("3 Enderë 2360"))
    test("Day 320 of millennial year", () => expect(StewardsReckoning.getDate(2360, 320).toQuenya()).toBe("14 Hísimë 2360"))
    test("Day 367 of millennial year", () => expect(StewardsReckoning.getDate(2360, 367).toQuenya()).toBe("Mettarë 2360"))
})

describe('testing StewardsReckoningDate.getDayOfYear', () => {

    test(`Days of regular year`, () => {
        for (let i = 1; i <= 365; i++) {
            expect(StewardsReckoning.getDate(2100, i).getDayOfYear()).toBe(i)
        }
    })

    test(`Days of leap year`, () => {
        for (let i = 1; i <= 366; i++) {
            expect(StewardsReckoning.getDate(2104, i).getDayOfYear()).toBe(i)
        }
    })

    test(`Days of millennial year`, () => {
        for (let i = 1; i <= 367; i++) {
            expect(StewardsReckoning.getDate(2360, i).getDayOfYear()).toBe(i)
        }
    })

})

describe('testing StewardsReckoningDate.isBefore and isEqual', () => {

    test(`Days of regular year`, () => {
        for (let i = 1; i <= 364; i++) {
            const today: StewardsReckoningDate = StewardsReckoning.getDate(2100, i)
            const tomorrow: StewardsReckoningDate = StewardsReckoning.getDate(2100, i + 1)
            expect(today.isBefore(tomorrow)).toBeTruthy()
            expect(today.isBefore(today)).toBeFalsy()
            expect(tomorrow.isBefore(today)).toBeFalsy()

            expect(today.isEqual(tomorrow)).toBeFalsy()
            expect(today.isEqual(today)).toBeTruthy()
            expect(tomorrow.isEqual(today)).toBeFalsy()
        }
    })
})

describe('testing StewardsReckoning.getDaysBetween', () => {

    test("Days between 3M1 2365 and 15M2 3265", () => expect(StewardsReckoning.getDaysBetween(
        new StewardsReckoningDate(2365, Month.M1, 3),
        new StewardsReckoningDate(2365, Month.M2, 15))).toBe(42))

    test("Days between 3M1 2365 and 15M2 3266", () => expect(StewardsReckoning.getDaysBetween(
        new StewardsReckoningDate(2365, Month.M1, 3),
        new StewardsReckoningDate(2366, Month.M2, 15))).toBe(42 + 365))

    test("Days between 3M6 2365 and 15M7 2365", () => expect(StewardsReckoning.getDaysBetween(
        new StewardsReckoningDate(2365, Month.M6, 3),
        new StewardsReckoningDate(2365, Month.M7, 15))).toBe(43))

    test("Days between 3M6 2364 and 15M7 2365", () => expect(StewardsReckoning.getDaysBetween(
        new StewardsReckoningDate(2364, Month.M6, 3),
        new StewardsReckoningDate(2365, Month.M7, 15))).toBe(43 + 366))

})

describe('testing StewardsReckoningDate.getDayOwWeek', () => {
    testDayOfWeek(new StewardsReckoningDate(2060, Month.I1, 1), DayOfWeek.D1)
    testDayOfWeek(new StewardsReckoningDate(2060, Month.M1, 1), DayOfWeek.D2)
    testDayOfWeek(new StewardsReckoningDate(2060, Month.M1, 2), DayOfWeek.D3)
    testDayOfWeek(new StewardsReckoningDate(2060, Month.M1, 3), DayOfWeek.D4)
    testDayOfWeek(new StewardsReckoningDate(2060, Month.M1, 4), DayOfWeek.D5)
    testDayOfWeek(new StewardsReckoningDate(2060, Month.M1, 5), DayOfWeek.D6)
    testDayOfWeek(new StewardsReckoningDate(2060, Month.M1, 6), DayOfWeek.D7)
    testDayOfWeek(new StewardsReckoningDate(2060, Month.M1, 7), DayOfWeek.D1)

    testDayOfWeek(new StewardsReckoningDate(2060, Month.M1, 14), DayOfWeek.D1)
    testDayOfWeek(new StewardsReckoningDate(2060, Month.M1, 21), DayOfWeek.D1)
    testDayOfWeek(new StewardsReckoningDate(2060, Month.M1, 28), DayOfWeek.D1)

    testDayOfWeek(new StewardsReckoningDate(2060, Month.M3, 3), DayOfWeek.D1)

    testDayOfWeek(new StewardsReckoningDate(2061, Month.I1, 1), DayOfWeek.D3)
    testDayOfWeek(new StewardsReckoningDate(2062, Month.I1, 1), DayOfWeek.D4)
    testDayOfWeek(new StewardsReckoningDate(2063, Month.I1, 1), DayOfWeek.D5)
    testDayOfWeek(new StewardsReckoningDate(2064, Month.I1, 1), DayOfWeek.D6)
    testDayOfWeek(new StewardsReckoningDate(2065, Month.I1, 1), DayOfWeek.D1)
    testDayOfWeek(new StewardsReckoningDate(2348, Month.I1, 1), DayOfWeek.D1)
    testDayOfWeek(new StewardsReckoningDate(2360, Month.I1, 1), DayOfWeek.D2)
    testDayOfWeek(new StewardsReckoningDate(2361, Month.I1, 1), DayOfWeek.D5)

    testDayOfWeek(new StewardsReckoningDate(2364, Month.I1, 1), DayOfWeek.D1)
    testDayOfWeek(new StewardsReckoningDate(2369, Month.I1, 1), DayOfWeek.D1)
    testDayOfWeek(new StewardsReckoningDate(2375, Month.I1, 1), DayOfWeek.D1)
    testDayOfWeek(new StewardsReckoningDate(2386, Month.I1, 1), DayOfWeek.D1)
    testDayOfWeek(new StewardsReckoningDate(2392, Month.I1, 1), DayOfWeek.D1)

    testDayOfWeek(new StewardsReckoningDate(2397, Month.I1, 1), DayOfWeek.D1)
    testDayOfWeek(new StewardsReckoningDate(2398, Month.I1, 1), DayOfWeek.D2)
    testDayOfWeek(new StewardsReckoningDate(2399, Month.I1, 1), DayOfWeek.D3)
    testDayOfWeek(new StewardsReckoningDate(2400, Month.I1, 1), DayOfWeek.D4)
    testDayOfWeek(new StewardsReckoningDate(2401, Month.I1, 1), DayOfWeek.D5)
    testDayOfWeek(new StewardsReckoningDate(2402, Month.I1, 1), DayOfWeek.D6)
    testDayOfWeek(new StewardsReckoningDate(2403, Month.I1, 1), DayOfWeek.D7)

    testDayOfWeek(new StewardsReckoningDate(2404, Month.I1, 1), DayOfWeek.D1)

    testDayOfWeek(new StewardsReckoningDate(2443, Month.I1, 1), DayOfWeek.D1)
    testDayOfWeek(new StewardsReckoningDate(2539, Month.I1, 1), DayOfWeek.D1)
    testDayOfWeek(new StewardsReckoningDate(2561, Month.I1, 1), DayOfWeek.D1)

    testDayOfWeek(new StewardsReckoningDate(2556, Month.I1, 1), DayOfWeek.D1)
    testDayOfWeek(new StewardsReckoningDate(3019, Month.M3, 15), DayOfWeek.D6)
})

describe('testing StewardsReckoningDate.constructor', () => {
    test("Should not allow year before 2060", () => expect(() => new StewardsReckoningDate(2059,Month.I1, 1)).toThrow(RangeError))
    test("Should not allow leap intercalary I3L in non-leap year", () => expect(() => new StewardsReckoningDate(2061,Month.I3L, 1)).toThrow(RangeError))
    test("Should not allow common intercalary I3 in leap year", () => expect(() => new StewardsReckoningDate(2064,Month.I3, 1)).toThrow(RangeError))
    test("Should not allow common intercalary I3 in millennial year", () => expect(() => new StewardsReckoningDate(2360,Month.I3, 1)).toThrow(RangeError))

    test("Should not allow day 0", () => expect(() => new StewardsReckoningDate(2360,Month.M1, 0)).toThrow(RangeError))
    test("Should not allow negative day", () => expect(() => new StewardsReckoningDate(2360,Month.M1, -1)).toThrow(RangeError))
    test("Should not allow day 31 in a month", () => expect(() => new StewardsReckoningDate(2360,Month.M1, 31)).toThrow(RangeError))

    test("Should not allow day 2 in I3 in regular year", () => expect(() => new StewardsReckoningDate(2063,Month.I3, 2)).toThrow(RangeError))

    test("Should allow day 2 in I3L in leap year", () => expect(new StewardsReckoningDate(2064,Month.I3L, 2)).toBeTruthy())
    test("Should not allow day 3 in I3L in leap year", () => expect(() => new StewardsReckoningDate(2064,Month.I3L, 3)).toThrow(RangeError))

    test("Should allow day 3 in I3L in millennial year", () => expect(new StewardsReckoningDate(2360,Month.I3L, 3)).toBeTruthy())
    test("Should not allow day 4 in I3L in millennial year", () => expect(() => new StewardsReckoningDate(2360,Month.I3L, 4)).toThrow(RangeError))
})

describe('testing StewardsReckoning.parseDate', () => {
    test("Should parse Yestarë 2100", () => expect(StewardsReckoning.parseDate("Yestarë 2100")).toMatchObject({year: 2100, month: Month.I1, day: 1}))
    test("Should parse 1 Yestarë 2100", () => expect(StewardsReckoning.parseDate("Yestarë 2100")).toMatchObject({year: 2100, month: Month.I1, day: 1}))

    test("Should not parse Norui 2100", () => expect(StewardsReckoning.parseDate("Norui 2100")).toEqual("Unable to parse 'Norui 2100' as date"))
    test("Should parse 1 Norui 2100", () => expect(StewardsReckoning.parseDate("1 Norui 2100")).toMatchObject({year: 2100, month: Month.M6, day: 1}))

    test("Should parse Loende 2100", () => expect(StewardsReckoning.parseDate("Loende 2100")).toMatchObject({year: 2100, month: Month.I3, day: 1}))
    test("Should parse 1 Endere 2104", () => expect(StewardsReckoning.parseDate("1 Endere 2104")).toMatchObject({year: 2104, month: Month.I3L, day: 1}))
    test("Should not parse Loende 2104", () => expect(StewardsReckoning.parseDate("Loende 2104")).toEqual("RangeError: leap year 2104 has no month I3"))

    test("Should parse representations for regular year", () => {
        for (let i = 1; i <=365; i++) {
            const date = StewardsReckoning.getDate(3200, i);
            expect(StewardsReckoning.parseDate(date.toQuenya())).toEqual(date)
            expect(StewardsReckoning.parseDate(date.toSindarin())).toEqual(date)
        }
    })

    test("Should parse representations for leap year", () => {
        for (let i = 1; i <=366; i++) {
            const date = StewardsReckoning.getDate(2060, i);
            expect(StewardsReckoning.parseDate(date.toQuenya())).toEqual(date)
            expect(StewardsReckoning.parseDate(date.toSindarin())).toEqual(date)
        }
    })

    test("Should parse representations for millennial year", () => {
        for (let i = 1; i <=367; i++) {
            const date = StewardsReckoning.getDate(2360, i);
            expect(StewardsReckoning.parseDate(date.toQuenya())).toEqual(date)
            expect(StewardsReckoning.parseDate(date.toSindarin())).toEqual(date)
        }
    })
})
function testDayOfWeek(date: StewardsReckoningDate, expected: number) {
    test(`${date.toQuenya()} is ${expected}`, () => expect(date.getDayOfWeek()).toBe(expected))
}
