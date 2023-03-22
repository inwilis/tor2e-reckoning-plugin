import {describe, expect, test} from "@jest/globals";
import {DayOfWeek, ShireMonth, ShireReckoning, ShireReckoningDate} from "../../src/reckoning/shire/ShireReckoning";

describe('testing ShireReckoning.isLeapYear()', () => {
    test('year 4 is a leap year', () => expect(ShireReckoning.isLeapYear(4)).toBeTruthy())
    test('year 1 is not a leap year', () => expect(ShireReckoning.isLeapYear(1)).toBeFalsy())
    test('year 760 (2360 StR) is a leap year', () => expect(ShireReckoning.isLeapYear(760)).toBeTruthy())
    test('year 400 is not a leap year', () => expect(ShireReckoning.isLeapYear(400)).toBeFalsy())
    test('year 2000 is not a leap year)', () => expect(ShireReckoning.isLeapYear(2000)).toBeFalsy())
})

describe('testing ShireReckoning.daysInYear', () => {
    test('year 4 is a leap year', () => expect(ShireReckoning.daysInYear(4)).toBe(366))
    test('year 1 is not a leap year', () => expect(ShireReckoning.daysInYear(1)).toBe(365))
    test('year 400 is not leap year', () => expect(ShireReckoning.daysInYear(400)).toBe(365))
    test('year 760 (2360 StR) is a leap year with extra day', () => expect(ShireReckoning.daysInYear(760)).toBe(367))
    test('year 2000 is not a leap year', () => expect(ShireReckoning.daysInYear(2000)).toBe(365))
})

describe('testing ShireReckoning.nextMonth for regular year', () => {
    [
        [ShireMonth.YULE2, ShireMonth.M1],
        [ShireMonth.M1, ShireMonth.M2], [ShireMonth.M2, ShireMonth.M3], [ShireMonth.M3, ShireMonth.M4],
        [ShireMonth.M4, ShireMonth.M5], [ShireMonth.M5, ShireMonth.M6], [ShireMonth.M6, ShireMonth.LITHE1],
        [ShireMonth.LITHE1, ShireMonth.MIDYEAR],
        [ShireMonth.MIDYEAR, ShireMonth.LITHE2],
        [ShireMonth.LITHE2, ShireMonth.M7],
        [ShireMonth.M7, ShireMonth.M8], [ShireMonth.M8, ShireMonth.M9], [ShireMonth.M9, ShireMonth.M10],
        [ShireMonth.M10, ShireMonth.M11], [ShireMonth.M11, ShireMonth.M12], [ShireMonth.M12, ShireMonth.YULE1],
        [ShireMonth.YULE1, ShireMonth.YULE2]
    ].forEach(tuple =>
        test(`${tuple[0]} is followed by ${tuple[1]}`, () => expect(ShireReckoning.nextMonth(tuple[0], 2100)).toBe(tuple[1])))
})

describe('testing ShireReckoning.nextMonth for leap year', () => {
    [
        [ShireMonth.YULE2, ShireMonth.M1],
        [ShireMonth.M1, ShireMonth.M2], [ShireMonth.M2, ShireMonth.M3], [ShireMonth.M3, ShireMonth.M4],
        [ShireMonth.M4, ShireMonth.M5], [ShireMonth.M5, ShireMonth.M6], [ShireMonth.M6, ShireMonth.LITHE1],
        [ShireMonth.LITHE1, ShireMonth.MIDYEAR],
        [ShireMonth.MIDYEAR, ShireMonth.OVERLITHE],
        [ShireMonth.OVERLITHE, ShireMonth.LITHE2],
        [ShireMonth.LITHE2, ShireMonth.M7],
        [ShireMonth.M7, ShireMonth.M8], [ShireMonth.M8, ShireMonth.M9], [ShireMonth.M9, ShireMonth.M10],
        [ShireMonth.M10, ShireMonth.M11], [ShireMonth.M11, ShireMonth.M12], [ShireMonth.M12, ShireMonth.YULE1],
        [ShireMonth.YULE1, ShireMonth.YULE2]
    ].forEach(tuple =>
        test(`${tuple[0]} is followed by ${tuple[1]}`, () => expect(ShireReckoning.nextMonth(tuple[0], 2104)).toBe(tuple[1])))
})

describe('testing ShireReckoning.nextMonth for millennial leap year', () => {
    [
        [ShireMonth.YULE2, ShireMonth.M1],
        [ShireMonth.M1, ShireMonth.M2], [ShireMonth.M2, ShireMonth.M3], [ShireMonth.M3, ShireMonth.M4],
        [ShireMonth.M4, ShireMonth.M5], [ShireMonth.M5, ShireMonth.M6], [ShireMonth.M6, ShireMonth.LITHE1],
        [ShireMonth.LITHE1, ShireMonth.OVERLITHE_MILLENNIAL],
        [ShireMonth.OVERLITHE_MILLENNIAL, ShireMonth.MIDYEAR],
        [ShireMonth.MIDYEAR, ShireMonth.OVERLITHE],
        [ShireMonth.OVERLITHE, ShireMonth.LITHE2],
        [ShireMonth.LITHE2, ShireMonth.M7],
        [ShireMonth.M7, ShireMonth.M8], [ShireMonth.M8, ShireMonth.M9], [ShireMonth.M9, ShireMonth.M10],
        [ShireMonth.M10, ShireMonth.M11], [ShireMonth.M11, ShireMonth.M12], [ShireMonth.M12, ShireMonth.YULE1],
        [ShireMonth.YULE1, ShireMonth.YULE2]
    ].forEach(tuple =>
        test(`${tuple[0]} is followed by ${tuple[1]}`, () => expect(ShireReckoning.nextMonth(tuple[0], 760)).toBe(tuple[1])))
})

describe('testing ShireReckoning.getDate', () => {
    test("Year before start of Shire-Reckoning causes an error", () => expect(() => ShireReckoning.getDate(0, 0)).toThrow(RangeError))
    test("Day 0 causes an error", () => expect(() => ShireReckoning.getDate(2100, 0)).toThrow(RangeError))

    test("Day 1 of regular year", () => expect(ShireReckoning.getDate(2100, 1)).toMatchObject({month: ShireMonth.YULE2, day: 1}))
    test("Day 2 of regular year", () => expect(ShireReckoning.getDate(2100, 2)).toMatchObject({month: ShireMonth.M1, day: 1}))
    test("Day 31 of regular year", () => expect(ShireReckoning.getDate(2100, 31)).toMatchObject({month: ShireMonth.M1, day: 30}))
    test("Day 183 of regular year", () => expect(ShireReckoning.getDate(2100, 183)).toMatchObject({month: ShireMonth.MIDYEAR, day: 1}))
    test("Day 320 of regular year", () => expect(ShireReckoning.getDate(2100, 320)).toMatchObject({month: ShireMonth.M11, day: 16}))
    test("Day 365 of regular year", () => expect(ShireReckoning.getDate(2100, 365)).toMatchObject({month: ShireMonth.YULE1, day: 1}))
    test("Day 366 of regular year causes an error", () => expect(() => ShireReckoning.getDate(2100, 366)).toThrow(RangeError))


    test("Day 1 of leap year", () => expect(ShireReckoning.getDate(2104, 1)).toMatchObject({month: ShireMonth.YULE2, day: 1}))
    test("Day 2 of leap year", () => expect(ShireReckoning.getDate(2104, 2)).toMatchObject({month: ShireMonth.M1, day: 1}))
    test("Day 31 of leap year", () => expect(ShireReckoning.getDate(2104, 31)).toMatchObject({month: ShireMonth.M1, day: 30}))
    test("Day 183 of leap year", () => expect(ShireReckoning.getDate(2104, 183)).toMatchObject({month: ShireMonth.MIDYEAR, day: 1}))
    test("Day 184 of leap year", () => expect(ShireReckoning.getDate(2104, 184)).toMatchObject({month: ShireMonth.OVERLITHE, day: 1}))
    test("Day 320 of leap year", () => expect(ShireReckoning.getDate(2104, 320)).toMatchObject({month: ShireMonth.M11, day: 15}))
    test("Day 365 of leap year", () => expect(ShireReckoning.getDate(2104, 365)).toMatchObject({month: ShireMonth.M12, day: 30}))
    test("Day 366 of leap year", () => expect(ShireReckoning.getDate(2104, 366)).toMatchObject({month: ShireMonth.YULE1, day: 1}))
    test("Day 367 of leap year causes an error", () => expect(() => ShireReckoning.getDate(2104, 367)).toThrow(RangeError))

    test("Day 1 of millennial year", () => expect(ShireReckoning.getDate(760, 1)).toMatchObject({month: ShireMonth.YULE2, day: 1}))
    test("Day 2 of millennial year", () => expect(ShireReckoning.getDate(760, 2)).toMatchObject({month: ShireMonth.M1, day: 1}))
    test("Day 31 of millennial year", () => expect(ShireReckoning.getDate(760, 31)).toMatchObject({month: ShireMonth.M1, day: 30}))
    test("Day 183 of millennial year", () => expect(ShireReckoning.getDate(760, 183)).toMatchObject({month: ShireMonth.OVERLITHE_MILLENNIAL, day: 1}))
    test("Day 184 of millennial year", () => expect(ShireReckoning.getDate(760, 184)).toMatchObject({month: ShireMonth.MIDYEAR, day: 1}))
    test("Day 185 of millennial year", () => expect(ShireReckoning.getDate(760, 185)).toMatchObject({month: ShireMonth.OVERLITHE, day: 1}))
    test("Day 320 of millennial year", () => expect(ShireReckoning.getDate(760, 320)).toMatchObject({month: ShireMonth.M11, day: 14}))
    test("Day 366 of millennial year", () => expect(ShireReckoning.getDate(760, 366)).toMatchObject({month: ShireMonth.M12, day: 30}))
    test("Day 367 of millennial year", () => expect(ShireReckoning.getDate(760, 367)).toMatchObject({month: ShireMonth.YULE1, day: 1}))
    test("Day 368 of millennial year causes an error", () => expect(() => ShireReckoning.getDate(760, 368)).toThrow(RangeError))
})

describe('testing ShireReckoning.getDate.toShire', () => {

    test("Day 1 of regular year", () => expect(ShireReckoning.getDate(2100, 1).toShire()).toBe("2 Yule 2100"))
    test("Day 2 of regular year", () => expect(ShireReckoning.getDate(2100, 2).toShire()).toBe("1 Afteryule 2100"))
    test("Day 31 of regular year", () => expect(ShireReckoning.getDate(2100, 31).toShire()).toBe("30 Afteryule 2100"))
    test("Day 182 of regular year", () => expect(ShireReckoning.getDate(2100, 182).toShire()).toBe("1 Lithe 2100"))
    test("Day 183 of regular year", () => expect(ShireReckoning.getDate(2100, 183).toShire()).toBe("Mid-Year's Day 2100"))
    test("Day 184 of regular year", () => expect(ShireReckoning.getDate(2100, 184).toShire()).toBe("2 Lithe 2100"))
    test("Day 320 of regular year", () => expect(ShireReckoning.getDate(2100, 320).toShire()).toBe("16 Blomath 2100"))
    test("Day 365 of regular year", () => expect(ShireReckoning.getDate(2100, 365).toShire()).toBe("1 Yule 2100"))


    test("Day 1 of leap year", () => expect(ShireReckoning.getDate(2104, 1).toShire()).toBe("2 Yule 2104"))
    test("Day 2 of leap year", () => expect(ShireReckoning.getDate(2104, 2).toShire()).toBe("1 Afteryule 2104"))
    test("Day 31 of leap year", () => expect(ShireReckoning.getDate(2104, 31).toShire()).toBe("30 Afteryule 2104"))
    test("Day 182 of leap year", () => expect(ShireReckoning.getDate(2104, 182).toShire()).toBe("1 Lithe 2104"))
    test("Day 183 of leap year", () => expect(ShireReckoning.getDate(2104, 183).toShire()).toBe("Mid-Year's Day 2104"))
    test("Day 184 of leap year", () => expect(ShireReckoning.getDate(2104, 184).toShire()).toBe("Overlithe 2104"))
    test("Day 185 of leap year", () => expect(ShireReckoning.getDate(2104, 185).toShire()).toBe("2 Lithe 2104"))
    test("Day 320 of leap year", () => expect(ShireReckoning.getDate(2104, 320).toShire()).toBe("15 Blomath 2104"))
    test("Day 366 of leap year", () => expect(ShireReckoning.getDate(2104, 366).toShire()).toBe("1 Yule 2104"))

    test("Day 1 of millennial year", () => expect(ShireReckoning.getDate(760, 1).toShire()).toBe("2 Yule 760"))
    test("Day 2 of millennial year", () => expect(ShireReckoning.getDate(760, 2).toShire()).toBe("1 Afteryule 760"))
    test("Day 31 of millennial year", () => expect(ShireReckoning.getDate(760, 31).toShire()).toBe("30 Afteryule 760"))
    test("Day 182 of millennial year", () => expect(ShireReckoning.getDate(760, 182).toShire()).toBe("1 Lithe 760"))
    test("Day 183 of millennial year", () => expect(ShireReckoning.getDate(760, 183).toShire()).toBe("Leap Overlithe 760"))
    test("Day 184 of millennial year", () => expect(ShireReckoning.getDate(760, 184).toShire()).toBe("Mid-Year's Day 760"))
    test("Day 185 of millennial year", () => expect(ShireReckoning.getDate(760, 185).toShire()).toBe("Overlithe 760"))
    test("Day 186 of millennial year", () => expect(ShireReckoning.getDate(760, 186).toShire()).toBe("2 Lithe 760"))
    test("Day 320 of millennial year", () => expect(ShireReckoning.getDate(760, 320).toShire()).toBe("14 Blomath 760"))
    test("Day 367 of millennial year", () => expect(ShireReckoning.getDate(760, 367).toShire()).toBe("1 Yule 760"))
})

describe('testing ShireReckoning.getDate.toBree', () => {

    test("Day 1 of regular year", () => expect(ShireReckoning.getDate(2100, 1).toBree()).toBe("2 Yule 2100"))
    test("Day 2 of regular year", () => expect(ShireReckoning.getDate(2100, 2).toBree()).toBe("1 Frery 2100"))
    test("Day 31 of regular year", () => expect(ShireReckoning.getDate(2100, 31).toBree()).toBe("30 Frery 2100"))
    test("Day 182 of regular year", () => expect(ShireReckoning.getDate(2100, 182).toBree()).toBe("1 Summerday 2100"))
    test("Day 183 of regular year", () => expect(ShireReckoning.getDate(2100, 183).toBree()).toBe("2 Summerday 2100"))
    test("Day 184 of regular year", () => expect(ShireReckoning.getDate(2100, 184).toBree()).toBe("3 Summerday 2100"))
    test("Day 320 of regular year", () => expect(ShireReckoning.getDate(2100, 320).toBree()).toBe("16 Blooting 2100"))
    test("Day 365 of regular year", () => expect(ShireReckoning.getDate(2100, 365).toBree()).toBe("1 Yule 2100"))


    test("Day 1 of leap year", () => expect(ShireReckoning.getDate(2104, 1).toBree()).toBe("2 Yule 2104"))
    test("Day 2 of leap year", () => expect(ShireReckoning.getDate(2104, 2).toBree()).toBe("1 Frery 2104"))
    test("Day 31 of leap year", () => expect(ShireReckoning.getDate(2104, 31).toBree()).toBe("30 Frery 2104"))
    test("Day 182 of leap year", () => expect(ShireReckoning.getDate(2104, 182).toBree()).toBe("1 Summerday 2104"))
    test("Day 183 of leap year", () => expect(ShireReckoning.getDate(2104, 183).toBree()).toBe("2 Summerday 2104"))
    test("Day 184 of leap year", () => expect(ShireReckoning.getDate(2104, 184).toBree()).toBe("3 Summerday 2104"))
    test("Day 185 of leap year", () => expect(ShireReckoning.getDate(2104, 185).toBree()).toBe("4 Summerday 2104"))
    test("Day 320 of leap year", () => expect(ShireReckoning.getDate(2104, 320).toBree()).toBe("15 Blooting 2104"))
    test("Day 366 of leap year", () => expect(ShireReckoning.getDate(2104, 366).toBree()).toBe("1 Yule 2104"))

    test("Day 1 of millennial year", () => expect(ShireReckoning.getDate(760, 1).toBree()).toBe("2 Yule 760"))
    test("Day 2 of millennial year", () => expect(ShireReckoning.getDate(760, 2).toBree()).toBe("1 Frery 760"))
    test("Day 31 of millennial year", () => expect(ShireReckoning.getDate(760, 31).toBree()).toBe("30 Frery 760"))
    test("Day 182 of millennial year", () => expect(ShireReckoning.getDate(760, 182).toBree()).toBe("1 Summerday 760"))
    test("Day 183 of millennial year", () => expect(ShireReckoning.getDate(760, 183).toBree()).toBe("2 Summerday 760"))
    test("Day 184 of millennial year", () => expect(ShireReckoning.getDate(760, 184).toBree()).toBe("3 Summerday 760"))
    test("Day 185 of millennial year", () => expect(ShireReckoning.getDate(760, 185).toBree()).toBe("4 Summerday 760"))
    test("Day 186 of millennial year", () => expect(ShireReckoning.getDate(760, 186).toBree()).toBe("5 Summerday 760"))
    test("Day 320 of millennial year", () => expect(ShireReckoning.getDate(760, 320).toBree()).toBe("14 Blooting 760"))
    test("Day 367 of millennial year", () => expect(ShireReckoning.getDate(760, 367).toBree()).toBe("1 Yule 760"))
})

describe('testing ShireReckoningDate.getDayOfYear', () => {

    test(`Days of regular year`, () => {
        for (let i = 1; i <= 365; i++) {
            expect(ShireReckoning.getDate(2100, i).getDayOfYear()).toBe(i)
        }
    })

    test(`Days of leap year`, () => {
        for (let i = 1; i <= 366; i++) {
            expect(ShireReckoning.getDate(2104, i).getDayOfYear()).toBe(i)
        }
    })

    test(`Days of millennial year`, () => {
        for (let i = 1; i <= 367; i++) {
            expect(ShireReckoning.getDate(760, i).getDayOfYear()).toBe(i)
        }
    })

})

describe('testing ShireReckoningDate.isBefore and isEqual', () => {

    test(`Days of regular year`, () => {
        for (let i = 1; i <= 364; i++) {
            const today: ShireReckoningDate = ShireReckoning.getDate(2100, i)
            const tomorrow: ShireReckoningDate = ShireReckoning.getDate(2100, i + 1)
            expect(today.isBefore(tomorrow)).toBeTruthy()
            expect(today.isBefore(today)).toBeFalsy()
            expect(tomorrow.isBefore(today)).toBeFalsy()

            expect(today.isEqual(tomorrow)).toBeFalsy()
            expect(today.isEqual(today)).toBeTruthy()
            expect(tomorrow.isEqual(today)).toBeFalsy()
        }
    })
})

describe('testing ShireReckoning.getDaysBetween', () => {

    test("Days between 3M1 2365 and 15M2 3265", () => expect(ShireReckoning.getDaysBetween(
        new ShireReckoningDate(2365, ShireMonth.M1, 3),
        new ShireReckoningDate(2365, ShireMonth.M2, 15))).toBe(42))

    test("Days between 3M1 2365 and 15M2 3266", () => expect(ShireReckoning.getDaysBetween(
        new ShireReckoningDate(2365, ShireMonth.M1, 3),
        new ShireReckoningDate(2366, ShireMonth.M2, 15))).toBe(42 + 365))

    test("Days between 3M6 2365 and 15M7 2365", () => expect(ShireReckoning.getDaysBetween(
        new ShireReckoningDate(2365, ShireMonth.M6, 3),
        new ShireReckoningDate(2365, ShireMonth.M7, 15))).toBe(45))

    test("Days between 3M6 2364 and 15M7 2365", () => expect(ShireReckoning.getDaysBetween(
        new ShireReckoningDate(2364, ShireMonth.M6, 3),
        new ShireReckoningDate(2365, ShireMonth.M7, 15))).toBe(45 + 366))

})

describe('testing ShireReckoningDate.getDayOwWeek', () => {
    testDayOfWeek(new ShireReckoningDate(1, ShireMonth.YULE2, 1), DayOfWeek.D2)
    testDayOfWeek(new ShireReckoningDate(1, ShireMonth.MIDYEAR, 1), DayOfWeek.D2)
    testDayOfWeek(new ShireReckoningDate(1, ShireMonth.YULE1, 1), DayOfWeek.D2)

    testDayOfWeek(new ShireReckoningDate(460, ShireMonth.YULE2, 1), DayOfWeek.D1)
    testDayOfWeek(new ShireReckoningDate(460, ShireMonth.MIDYEAR, 1), DayOfWeek.D1)
    testDayOfWeek(new ShireReckoningDate(460, ShireMonth.YULE1, 1), DayOfWeek.D2)

    testDayOfWeek(new ShireReckoningDate(760, ShireMonth.YULE2, 1), DayOfWeek.D2)
    testDayOfWeek(new ShireReckoningDate(760, ShireMonth.OVERLITHE_MILLENNIAL, 1), DayOfWeek.D2)
    testDayOfWeek(new ShireReckoningDate(760, ShireMonth.MIDYEAR, 1), DayOfWeek.D3)
    testDayOfWeek(new ShireReckoningDate(760, ShireMonth.OVERLITHE, 1), DayOfWeek.D4)
    testDayOfWeek(new ShireReckoningDate(760, ShireMonth.YULE1, 1), DayOfWeek.D4)

    testDayOfWeek(new ShireReckoningDate(1102, ShireMonth.YULE2, 1), DayOfWeek.D7)
    testDayOfWeek(new ShireReckoningDate(1102, ShireMonth.MIDYEAR, 1), DayOfWeek.D7)
    testDayOfWeek(new ShireReckoningDate(1102, ShireMonth.YULE1, 1), DayOfWeek.D7)

    testDayOfWeek(new ShireReckoningDate(1103, ShireMonth.YULE2, 1), DayOfWeek.D1)
    testDayOfWeek(new ShireReckoningDate(1103, ShireMonth.M1, 1), DayOfWeek.D2)
    testDayOfWeek(new ShireReckoningDate(1103, ShireMonth.M1, 2), DayOfWeek.D3)
    testDayOfWeek(new ShireReckoningDate(1103, ShireMonth.M1, 3), DayOfWeek.D4)
    testDayOfWeek(new ShireReckoningDate(1103, ShireMonth.M1, 4), DayOfWeek.D5)
    testDayOfWeek(new ShireReckoningDate(1103, ShireMonth.M1, 5), DayOfWeek.D6)
    testDayOfWeek(new ShireReckoningDate(1103, ShireMonth.M1, 6), DayOfWeek.D7)
    testDayOfWeek(new ShireReckoningDate(1103, ShireMonth.M1, 7), DayOfWeek.D1)

    testDayOfWeek(new ShireReckoningDate(1103, ShireMonth.LITHE1, 1), DayOfWeek.D7)
    testDayOfWeek(new ShireReckoningDate(1103, ShireMonth.MIDYEAR, 1), DayOfWeek.D7)
    testDayOfWeek(new ShireReckoningDate(1103, ShireMonth.LITHE2, 1), DayOfWeek.D1)

    testDayOfWeek(new ShireReckoningDate(1103, ShireMonth.YULE1, 1), DayOfWeek.D7)

    testDayOfWeek(new ShireReckoningDate(1104, ShireMonth.LITHE1, 1), DayOfWeek.D7)
    testDayOfWeek(new ShireReckoningDate(1104, ShireMonth.MIDYEAR, 1), DayOfWeek.D7)
    testDayOfWeek(new ShireReckoningDate(1104, ShireMonth.OVERLITHE, 1), DayOfWeek.D1)
    testDayOfWeek(new ShireReckoningDate(1104, ShireMonth.LITHE2, 1), DayOfWeek.D1)
})

describe('testing ShireReckoningDate.constructor', () => {
    test("Should not allow year before 1", () => expect(() => new ShireReckoningDate(0, ShireMonth.YULE2, 1)).toThrow(RangeError))
    test("Should not allow Overlithe in non-leap year", () => expect(() => new ShireReckoningDate(2061, ShireMonth.OVERLITHE, 1)).toThrow(RangeError))
    test("Should not allow Millennial Overlithe in non-leap year", () => expect(() => new ShireReckoningDate(2061, ShireMonth.OVERLITHE_MILLENNIAL, 1)).toThrow(RangeError))

    test("Should not allow day 0", () => expect(() => new ShireReckoningDate(760, ShireMonth.M1, 0)).toThrow(RangeError))
    test("Should not allow negative day", () => expect(() => new ShireReckoningDate(760, ShireMonth.M1, -1)).toThrow(RangeError))
    test("Should not allow day 31 in a month", () => expect(() => new ShireReckoningDate(760, ShireMonth.M1, 31)).toThrow(RangeError))

    test("Should not allow day 2 in MIDYEAR in regular year", () => expect(() => new ShireReckoningDate(2063, ShireMonth.MIDYEAR, 2)).toThrow(RangeError))

    test("Should allow Overlithe in leap year", () => expect(new ShireReckoningDate(2064, ShireMonth.OVERLITHE, 1)).toBeTruthy())
    test("Should not allow Millennial Overlithe in leap year", () => expect(() => new ShireReckoningDate(2064, ShireMonth.OVERLITHE_MILLENNIAL, 1)).toThrow(RangeError))

    test("Should allow Overlithe in millennial year", () => expect(new ShireReckoningDate(760, ShireMonth.OVERLITHE, 1)).toBeTruthy())
    test("Should allow Millennial Overlithe in millennial year", () => expect(new ShireReckoningDate(760, ShireMonth.OVERLITHE_MILLENNIAL, 1)).toBeTruthy())

})

describe('testing ShireReckoning.parseShireDate', () => {
    test("Should not parse Yule 2100", () => expect(ShireReckoning.parseDate("Yule 2100")).toEqual("Unable to parse 'Yule 2100' as date"))
    test("Should parse 1 Yule 2100", () => expect(ShireReckoning.parseDate("1 Yule 2100")).toMatchObject({year: 2100, month: ShireMonth.YULE1, day: 1}))
    test("Should parse 2 Yule 2100", () => expect(ShireReckoning.parseDate("2 Yule 2100")).toMatchObject({year: 2100, month: ShireMonth.YULE2, day: 1}))

    test("Should not parse Lithe 2100", () => expect(ShireReckoning.parseDate("Lithe 2100")).toEqual("Unable to parse 'Lithe 2100' as date"))
    test("Should parse 1 Lithe 2100", () => expect(ShireReckoning.parseDate("1 Lithe 2100")).toMatchObject({year: 2100, month: ShireMonth.LITHE1, day: 1}))
    test("Should parse 2 Lithe 2100", () => expect(ShireReckoning.parseDate("2 Lithe 2100")).toMatchObject({year: 2100, month: ShireMonth.LITHE2, day: 1}))

    test("Should not parse Rethe 2100", () => expect(ShireReckoning.parseDate("Rethe 2100")).toEqual("Unable to parse 'Rethe 2100' as date"))
    test("Should parse 1 Rethe 2100", () => expect(ShireReckoning.parseDate("1 Rethe 2100")).toMatchObject({year: 2100, month: ShireMonth.M3, day: 1}))

    test("Should parse Mid-Year's Day 2100", () => expect(ShireReckoning.parseDate("Mid-Year's Day 2100")).toMatchObject({year: 2100, month: ShireMonth.MIDYEAR, day: 1}))

    test("Should parse Overlithe 2104", () => expect(ShireReckoning.parseDate("Overlithe 2104")).toMatchObject({year: 2104, month: ShireMonth.OVERLITHE, day: 1}))

    test("Should parse Leap Overlithe 760", () => expect(ShireReckoning.parseDate("Leap Overlithe 760")).toMatchObject({year: 760, month: ShireMonth.OVERLITHE_MILLENNIAL, day: 1}))

    test("Should parse representations for regular year", () => {
        for (let i = 1; i <= 365; i++) {
            const date = ShireReckoning.getDate(3200, i);
            expect(ShireReckoning.parseDate(date.toShire())).toEqual(date)
        }
    })

    test("Should parse representations for leap year", () => {
        for (let i = 1; i <= 366; i++) {
            const date = ShireReckoning.getDate(2060, i);
            expect(ShireReckoning.parseDate(date.toShire())).toEqual(date)
        }
    })

    test("Should parse representations for millennial year", () => {
        for (let i = 1; i <= 367; i++) {
            const date = ShireReckoning.getDate(760, i);
            expect(ShireReckoning.parseDate(date.toShire())).toEqual(date)
        }
    })
})

describe('testing ShireReckoning.parseBreeDate', () => {
    test("Should not parse Yule 2100", () => expect(ShireReckoning.parseDate("Yule 2100", true)).toEqual("Unable to parse 'Yule 2100' as date"))
    test("Should parse 1 Yule 2100", () => expect(ShireReckoning.parseDate("1 Yule 2100", true)).toMatchObject({year: 2100, month: ShireMonth.YULE1, day: 1}))
    test("Should parse 2 Yule 2100", () => expect(ShireReckoning.parseDate("2 Yule 2100", true)).toMatchObject({year: 2100, month: ShireMonth.YULE2, day: 1}))

    test("Should not parse Lithe 2100", () => expect(ShireReckoning.parseDate("Lithe 2100", true)).toEqual("Unable to parse 'Lithe 2100' as date"))
    test("Should parse 1 Lithe 2100", () => expect(ShireReckoning.parseDate("1 Lithe 2100", true)).toMatchObject({year: 2100, month: ShireMonth.M6, day: 1}))
    test("Should parse 2 Lithe 2100", () => expect(ShireReckoning.parseDate("2 Lithe 2100", true)).toMatchObject({year: 2100, month: ShireMonth.M6, day: 2}))
    test("Should parse 5 Lithe 2100", () => expect(ShireReckoning.parseDate("5 Lithe 2100", true)).toMatchObject({year: 2100, month: ShireMonth.M6, day: 5}))

    test("Should not parse Rethe 2100", () => expect(ShireReckoning.parseDate("Rethe 2100", true)).toEqual("Unable to parse 'Rethe 2100' as date"))
    test("Should parse 1 Rethe 2100", () => expect(ShireReckoning.parseDate("1 Rethe 2100", true)).toMatchObject({year: 2100, month: ShireMonth.M3, day: 1}))

    test("Should parse 1 Summerday 2100", () => expect(ShireReckoning.parseDate("1 Summerday 2100", true)).toMatchObject({year: 2100, month: ShireMonth.LITHE1, day: 1}))
    test("Should parse 2 Summerday 2100", () => expect(ShireReckoning.parseDate("2 Summerday 2100", true)).toMatchObject({year: 2100, month: ShireMonth.MIDYEAR, day: 1}))
    test("Should parse 3 Summerday 2100", () => expect(ShireReckoning.parseDate("3 Summerday 2100", true)).toMatchObject({year: 2100, month: ShireMonth.LITHE2, day: 1}))

    test("Should parse 1 Summerday 2104", () => expect(ShireReckoning.parseDate("1 Summerday 2104", true)).toMatchObject({year: 2104, month: ShireMonth.LITHE1, day: 1}))
    test("Should parse 2 Summerday 2104", () => expect(ShireReckoning.parseDate("2 Summerday 2104", true)).toMatchObject({year: 2104, month: ShireMonth.MIDYEAR, day: 1}))
    test("Should parse 3 Summerday 2104", () => expect(ShireReckoning.parseDate("3 Summerday 2104", true)).toMatchObject({year: 2104, month: ShireMonth.OVERLITHE, day: 1}))
    test("Should parse 4 Summerday 2104", () => expect(ShireReckoning.parseDate("4 Summerday 2104", true)).toMatchObject({year: 2104, month: ShireMonth.LITHE2, day: 1}))

    test("Should parse 1 Summerday 760", () => expect(ShireReckoning.parseDate("1 Summerday 760", true)).toMatchObject({year: 760, month: ShireMonth.LITHE1, day: 1}))
    test("Should parse 2 Summerday 760", () => expect(ShireReckoning.parseDate("2 Summerday 760", true)).toMatchObject({year: 760, month: ShireMonth.OVERLITHE_MILLENNIAL, day: 1}))
    test("Should parse 3 Summerday 760", () => expect(ShireReckoning.parseDate("3 Summerday 760", true)).toMatchObject({year: 760, month: ShireMonth.MIDYEAR, day: 1}))
    test("Should parse 4 Summerday 760", () => expect(ShireReckoning.parseDate("4 Summerday 760", true)).toMatchObject({year: 760, month: ShireMonth.OVERLITHE, day: 1}))
    test("Should parse 5 Summerday 760", () => expect(ShireReckoning.parseDate("5 Summerday 760", true)).toMatchObject({year: 760, month: ShireMonth.LITHE2, day: 1}))

    test("Should parse representations for regular year", () => {
        for (let i = 1; i <= 365; i++) {
            const date = ShireReckoning.getDate(3200, i);
            expect(ShireReckoning.parseDate(date.toBree(), true)).toEqual(date)
        }
    })

    test("Should parse representations for leap year", () => {
        for (let i = 1; i <= 366; i++) {
            const date = ShireReckoning.getDate(2060, i);
            expect(ShireReckoning.parseDate(date.toBree(), true)).toEqual(date)
        }
    })

    test("Should parse representations for millennial year", () => {
        for (let i = 1; i <= 367; i++) {
            const date = ShireReckoning.getDate(760, i);
            expect(ShireReckoning.parseDate(date.toBree(), true)).toEqual(date)
        }
    })
})

function testDayOfWeek(date: ShireReckoningDate, expected: number) {
    test(`${date.toShire()} is ${expected}`, () => expect(date.getDayOfWeek()).toBe(expected))
}
