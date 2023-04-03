import {describe, expect, test} from "@jest/globals";
import {shireReckoning} from "../../../src/reckoning/shire/ShireReckoning";
import {ShireMonth} from "../../../src/reckoning/shire/ShireMonth";

describe('testing shireReckoning.isLeapYear()', () => {
    test('year 4 is a leap year', () => expect(shireReckoning.isLeapYear(4)).toBeTruthy())
    test('year 1 is not a leap year', () => expect(shireReckoning.isLeapYear(1)).toBeFalsy())
    test('year 760 (2360 StR) is a leap year', () => expect(shireReckoning.isLeapYear(760)).toBeTruthy())
    test('year 400 is not a leap year', () => expect(shireReckoning.isLeapYear(400)).toBeFalsy())
    test('year 2000 is not a leap year)', () => expect(shireReckoning.isLeapYear(2000)).toBeFalsy())
})

describe('testing shireReckoning.daysInYear', () => {
    test('year 4 is a leap year', () => expect(shireReckoning.daysInYear(4)).toBe(366))
    test('year 1 is not a leap year', () => expect(shireReckoning.daysInYear(1)).toBe(365))
    test('year 400 is not leap year', () => expect(shireReckoning.daysInYear(400)).toBe(365))
    test('year 760 (2360 StR) is a leap year with extra day', () => expect(shireReckoning.daysInYear(760)).toBe(367))
    test('year 2000 is not a leap year', () => expect(shireReckoning.daysInYear(2000)).toBe(365))
})

describe('testing shireReckoning.nextMonth for regular year', () => {
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
        test(`${tuple[0]} is followed by ${tuple[1]}`, () => expect(shireReckoning.nextMonth(tuple[0], 2100)).toBe(tuple[1])))
})

describe('testing shireReckoning.nextMonth for leap year', () => {
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
        test(`${tuple[0]} is followed by ${tuple[1]}`, () => expect(shireReckoning.nextMonth(tuple[0], 2104)).toBe(tuple[1])))
})

describe('testing shireReckoning.nextMonth for millennial leap year', () => {
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
        test(`${tuple[0]} is followed by ${tuple[1]}`, () => expect(shireReckoning.nextMonth(tuple[0], 760)).toBe(tuple[1])))
})

describe('testing shireReckoning.getDate', () => {
    test("Year before start of Shire-Reckoning causes an error", () => expect(() => shireReckoning.getDate(0, 0)).toThrow(RangeError))
    test("Day 0 causes an error", () => expect(() => shireReckoning.getDate(2100, 0)).toThrow(RangeError))

    test("Day 1 of regular year", () => expect(shireReckoning.getDate(2100, 1)).toMatchObject({month: ShireMonth.YULE2, day: 1}))
    test("Day 2 of regular year", () => expect(shireReckoning.getDate(2100, 2)).toMatchObject({month: ShireMonth.M1, day: 1}))
    test("Day 31 of regular year", () => expect(shireReckoning.getDate(2100, 31)).toMatchObject({month: ShireMonth.M1, day: 30}))
    test("Day 183 of regular year", () => expect(shireReckoning.getDate(2100, 183)).toMatchObject({month: ShireMonth.MIDYEAR, day: 1}))
    test("Day 320 of regular year", () => expect(shireReckoning.getDate(2100, 320)).toMatchObject({month: ShireMonth.M11, day: 16}))
    test("Day 365 of regular year", () => expect(shireReckoning.getDate(2100, 365)).toMatchObject({month: ShireMonth.YULE1, day: 1}))
    test("Day 366 of regular year causes an error", () => expect(() => shireReckoning.getDate(2100, 366)).toThrow(RangeError))


    test("Day 1 of leap year", () => expect(shireReckoning.getDate(2104, 1)).toMatchObject({month: ShireMonth.YULE2, day: 1}))
    test("Day 2 of leap year", () => expect(shireReckoning.getDate(2104, 2)).toMatchObject({month: ShireMonth.M1, day: 1}))
    test("Day 31 of leap year", () => expect(shireReckoning.getDate(2104, 31)).toMatchObject({month: ShireMonth.M1, day: 30}))
    test("Day 183 of leap year", () => expect(shireReckoning.getDate(2104, 183)).toMatchObject({month: ShireMonth.MIDYEAR, day: 1}))
    test("Day 184 of leap year", () => expect(shireReckoning.getDate(2104, 184)).toMatchObject({month: ShireMonth.OVERLITHE, day: 1}))
    test("Day 320 of leap year", () => expect(shireReckoning.getDate(2104, 320)).toMatchObject({month: ShireMonth.M11, day: 15}))
    test("Day 365 of leap year", () => expect(shireReckoning.getDate(2104, 365)).toMatchObject({month: ShireMonth.M12, day: 30}))
    test("Day 366 of leap year", () => expect(shireReckoning.getDate(2104, 366)).toMatchObject({month: ShireMonth.YULE1, day: 1}))
    test("Day 367 of leap year causes an error", () => expect(() => shireReckoning.getDate(2104, 367)).toThrow(RangeError))

    test("Day 1 of millennial year", () => expect(shireReckoning.getDate(760, 1)).toMatchObject({month: ShireMonth.YULE2, day: 1}))
    test("Day 2 of millennial year", () => expect(shireReckoning.getDate(760, 2)).toMatchObject({month: ShireMonth.M1, day: 1}))
    test("Day 31 of millennial year", () => expect(shireReckoning.getDate(760, 31)).toMatchObject({month: ShireMonth.M1, day: 30}))
    test("Day 183 of millennial year", () => expect(shireReckoning.getDate(760, 183)).toMatchObject({month: ShireMonth.OVERLITHE_MILLENNIAL, day: 1}))
    test("Day 184 of millennial year", () => expect(shireReckoning.getDate(760, 184)).toMatchObject({month: ShireMonth.MIDYEAR, day: 1}))
    test("Day 185 of millennial year", () => expect(shireReckoning.getDate(760, 185)).toMatchObject({month: ShireMonth.OVERLITHE, day: 1}))
    test("Day 320 of millennial year", () => expect(shireReckoning.getDate(760, 320)).toMatchObject({month: ShireMonth.M11, day: 14}))
    test("Day 366 of millennial year", () => expect(shireReckoning.getDate(760, 366)).toMatchObject({month: ShireMonth.M12, day: 30}))
    test("Day 367 of millennial year", () => expect(shireReckoning.getDate(760, 367)).toMatchObject({month: ShireMonth.YULE1, day: 1}))
    test("Day 368 of millennial year causes an error", () => expect(() => shireReckoning.getDate(760, 368)).toThrow(RangeError))
})

describe('testing shireReckoning.getDate.toShire', () => {

    test("Day 1 of regular year", () => expect(shireReckoning.getDate(2100, 1).toString("shire")).toBe("2 Yule 2100"))
    test("Day 2 of regular year", () => expect(shireReckoning.getDate(2100, 2).toString("shire")).toBe("1 Afteryule 2100"))
    test("Day 31 of regular year", () => expect(shireReckoning.getDate(2100, 31).toString("shire")).toBe("30 Afteryule 2100"))
    test("Day 182 of regular year", () => expect(shireReckoning.getDate(2100, 182).toString("shire")).toBe("1 Lithe 2100"))
    test("Day 183 of regular year", () => expect(shireReckoning.getDate(2100, 183).toString("shire")).toBe("Mid-Year's Day 2100"))
    test("Day 184 of regular year", () => expect(shireReckoning.getDate(2100, 184).toString("shire")).toBe("2 Lithe 2100"))
    test("Day 320 of regular year", () => expect(shireReckoning.getDate(2100, 320).toString("shire")).toBe("16 Blomath 2100"))
    test("Day 365 of regular year", () => expect(shireReckoning.getDate(2100, 365).toString("shire")).toBe("1 Yule 2100"))


    test("Day 1 of leap year", () => expect(shireReckoning.getDate(2104, 1).toString("shire")).toBe("2 Yule 2104"))
    test("Day 2 of leap year", () => expect(shireReckoning.getDate(2104, 2).toString("shire")).toBe("1 Afteryule 2104"))
    test("Day 31 of leap year", () => expect(shireReckoning.getDate(2104, 31).toString("shire")).toBe("30 Afteryule 2104"))
    test("Day 182 of leap year", () => expect(shireReckoning.getDate(2104, 182).toString("shire")).toBe("1 Lithe 2104"))
    test("Day 183 of leap year", () => expect(shireReckoning.getDate(2104, 183).toString("shire")).toBe("Mid-Year's Day 2104"))
    test("Day 184 of leap year", () => expect(shireReckoning.getDate(2104, 184).toString("shire")).toBe("Overlithe 2104"))
    test("Day 185 of leap year", () => expect(shireReckoning.getDate(2104, 185).toString("shire")).toBe("2 Lithe 2104"))
    test("Day 320 of leap year", () => expect(shireReckoning.getDate(2104, 320).toString("shire")).toBe("15 Blomath 2104"))
    test("Day 366 of leap year", () => expect(shireReckoning.getDate(2104, 366).toString("shire")).toBe("1 Yule 2104"))

    test("Day 1 of millennial year", () => expect(shireReckoning.getDate(760, 1).toString("shire")).toBe("2 Yule 760"))
    test("Day 2 of millennial year", () => expect(shireReckoning.getDate(760, 2).toString("shire")).toBe("1 Afteryule 760"))
    test("Day 31 of millennial year", () => expect(shireReckoning.getDate(760, 31).toString("shire")).toBe("30 Afteryule 760"))
    test("Day 182 of millennial year", () => expect(shireReckoning.getDate(760, 182).toString("shire")).toBe("1 Lithe 760"))
    test("Day 183 of millennial year", () => expect(shireReckoning.getDate(760, 183).toString("shire")).toBe("Leap Overlithe 760"))
    test("Day 184 of millennial year", () => expect(shireReckoning.getDate(760, 184).toString("shire")).toBe("Mid-Year's Day 760"))
    test("Day 185 of millennial year", () => expect(shireReckoning.getDate(760, 185).toString("shire")).toBe("Overlithe 760"))
    test("Day 186 of millennial year", () => expect(shireReckoning.getDate(760, 186).toString("shire")).toBe("2 Lithe 760"))
    test("Day 320 of millennial year", () => expect(shireReckoning.getDate(760, 320).toString("shire")).toBe("14 Blomath 760"))
    test("Day 367 of millennial year", () => expect(shireReckoning.getDate(760, 367).toString("shire")).toBe("1 Yule 760"))
})

describe('testing shireReckoning.getDaysBetween', () => {

    test("Days between 3M1 2365 and 15M2 3265", () => expect(shireReckoning.getDaysBetween(
        shireReckoning.newDate(2365, ShireMonth.M1, 3),
        shireReckoning.newDate(2365, ShireMonth.M2, 15))).toBe(42))

    test("Days between 3M1 2365 and 15M2 3266", () => expect(shireReckoning.getDaysBetween(
        shireReckoning.newDate(2365, ShireMonth.M1, 3),
        shireReckoning.newDate(2366, ShireMonth.M2, 15))).toBe(42 + 365))

    test("Days between 3M6 2365 and 15M7 2365", () => expect(shireReckoning.getDaysBetween(
        shireReckoning.newDate(2365, ShireMonth.M6, 3),
        shireReckoning.newDate(2365, ShireMonth.M7, 15))).toBe(45))

    test("Days between 3M6 2364 and 15M7 2365", () => expect(shireReckoning.getDaysBetween(
        shireReckoning.newDate(2364, ShireMonth.M6, 3),
        shireReckoning.newDate(2365, ShireMonth.M7, 15))).toBe(45 + 366))

})


describe('testing shireReckoning.parseShireDate', () => {
    test("Should not parse Yule 2100", () => expect(() => shireReckoning.parseDate("Yule 2100")).toThrow(new Error("Unable to parse 'Yule 2100' as date of Shire reckoning")))
    test("Should parse 1 Yule 2100", () => expect(shireReckoning.parseDate("1 Yule 2100")).toMatchObject({year: 2100, month: ShireMonth.YULE1, day: 1}))
    test("Should parse 2 Yule 2100", () => expect(shireReckoning.parseDate("2 Yule 2100")).toMatchObject({year: 2100, month: ShireMonth.YULE2, day: 1}))

    test("Should not parse Lithe 2100", () => expect(() =>shireReckoning.parseDate("Lithe 2100")).toThrow(new Error("Unable to parse 'Lithe 2100' as date of Shire reckoning")))
    test("Should parse 1 Lithe 2100", () => expect(shireReckoning.parseDate("1 Lithe 2100")).toMatchObject({year: 2100, month: ShireMonth.LITHE1, day: 1}))
    test("Should parse 2 Lithe 2100", () => expect(shireReckoning.parseDate("2 Lithe 2100")).toMatchObject({year: 2100, month: ShireMonth.LITHE2, day: 1}))

    test("Should not parse Rethe 2100", () => expect(()=>shireReckoning.parseDate("Rethe 2100")).toThrow(new Error("Unable to parse 'Rethe 2100' as date of Shire reckoning")))
    test("Should parse 1 Rethe 2100", () => expect(shireReckoning.parseDate("1 Rethe 2100")).toMatchObject({year: 2100, month: ShireMonth.M3, day: 1}))

    test("Should parse Mid-Year's Day 2100", () => expect(shireReckoning.parseDate("Mid-Year's Day 2100")).toMatchObject({year: 2100, month: ShireMonth.MIDYEAR, day: 1}))

    test("Should parse Overlithe 2104", () => expect(shireReckoning.parseDate("Overlithe 2104")).toMatchObject({year: 2104, month: ShireMonth.OVERLITHE, day: 1}))

    test("Should parse Leap Overlithe 760", () => expect(shireReckoning.parseDate("Leap Overlithe 760")).toMatchObject({year: 760, month: ShireMonth.OVERLITHE_MILLENNIAL, day: 1}))

    test("Should parse representations for regular year", () => {
        for (let i = 1; i <= 365; i++) {
            const date = shireReckoning.getDate(3200, i);
            expect(shireReckoning.parseDate(date.toString("shire"))).toEqual(date)
        }
    })

    test("Should parse representations for leap year", () => {
        for (let i = 1; i <= 366; i++) {
            const date = shireReckoning.getDate(2060, i);
            expect(shireReckoning.parseDate(date.toString("shire"))).toEqual(date)
        }
    })

    test("Should parse representations for millennial year", () => {
        for (let i = 1; i <= 367; i++) {
            const date = shireReckoning.getDate(760, i);
            expect(shireReckoning.parseDate(date.toString("shire"))).toEqual(date)
        }
    })
})

describe("testing language detection", () => {
    test("should auto-detect shire language", () => expect(shireReckoning.parseDate("1 Lithe 2100").language).toBe("shire"))
})
