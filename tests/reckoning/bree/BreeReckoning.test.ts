import {describe, expect, test} from "@jest/globals";
import {BreeMonth} from "../../../src/reckoning/bree/BreeMonth";
import {breeReckoning} from "../../../src/reckoning/bree/BreeReckoning";

describe('testing breeReckoning.isLeapYear()', () => {
    test('year 5 is a leap year', () => expect(breeReckoning.isLeapYear(5)).toBeTruthy())
    test('year 1 is not a leap year', () => expect(breeReckoning.isLeapYear(1)).toBeFalsy())
    test('year 1061 (2360 StR) is a leap year', () => expect(breeReckoning.isLeapYear(1061)).toBeTruthy())
    test('year 400 is not a leap year', () => expect(breeReckoning.isLeapYear(400)).toBeFalsy())
    test('year 2000 is not a leap year)', () => expect(breeReckoning.isLeapYear(2000)).toBeFalsy())
})

describe('testing breeReckoning.daysInYear', () => {
    test('year 5 is a leap year', () => expect(breeReckoning.daysInYear(5)).toBe(366))
    test('year 1 is not a leap year', () => expect(breeReckoning.daysInYear(1)).toBe(365))
    test('year 400 is not leap year', () => expect(breeReckoning.daysInYear(400)).toBe(365))
    test('year 1061 (2360 StR) is a leap year with extra day', () => expect(breeReckoning.daysInYear(1061)).toBe(367))
    test('year 2000 is not a leap year', () => expect(breeReckoning.daysInYear(2000)).toBe(365))
})

describe('testing breeReckoning.nextMonth for regular year', () => {
    [
        [BreeMonth.YULE2, BreeMonth.FRERY],
        [BreeMonth.FRERY, BreeMonth.SOLMATH], [BreeMonth.SOLMATH, BreeMonth.RETHE], [BreeMonth.RETHE, BreeMonth.CHITHING],
        [BreeMonth.CHITHING, BreeMonth.THRIMIDGE], [BreeMonth.THRIMIDGE, BreeMonth.LITHE], [BreeMonth.LITHE, BreeMonth.SUMMERDAYS],
        [BreeMonth.SUMMERDAYS, BreeMonth.MEDE],
        [BreeMonth.MEDE, BreeMonth.WEDMATH], [BreeMonth.WEDMATH, BreeMonth.HARVESTMATH], [BreeMonth.HARVESTMATH, BreeMonth.WINTRING],
        [BreeMonth.WINTRING, BreeMonth.BLOOTING], [BreeMonth.BLOOTING, BreeMonth.YULEMATH], [BreeMonth.YULEMATH, BreeMonth.YULE1],
        [BreeMonth.YULE1, BreeMonth.YULE2]
    ].forEach(tuple =>
        test(`${tuple[0]} is followed by ${tuple[1]}`, () => expect(breeReckoning.nextMonth(tuple[0], 2100)).toBe(tuple[1])))
})

describe('testing breeReckoning.nextMonth for leap year', () => {
    [
        [BreeMonth.YULE2, BreeMonth.FRERY],
        [BreeMonth.FRERY, BreeMonth.SOLMATH], [BreeMonth.SOLMATH, BreeMonth.RETHE], [BreeMonth.RETHE, BreeMonth.CHITHING],
        [BreeMonth.CHITHING, BreeMonth.THRIMIDGE], [BreeMonth.THRIMIDGE, BreeMonth.LITHE], [BreeMonth.LITHE, BreeMonth.SUMMERDAYS],
        [BreeMonth.SUMMERDAYS, BreeMonth.MEDE],
        [BreeMonth.MEDE, BreeMonth.WEDMATH], [BreeMonth.WEDMATH, BreeMonth.HARVESTMATH], [BreeMonth.HARVESTMATH, BreeMonth.WINTRING],
        [BreeMonth.WINTRING, BreeMonth.BLOOTING], [BreeMonth.BLOOTING, BreeMonth.YULEMATH], [BreeMonth.YULEMATH, BreeMonth.YULE1],
        [BreeMonth.YULE1, BreeMonth.YULE2]
    ].forEach(tuple =>
        test(`${tuple[0]} is followed by ${tuple[1]}`, () => expect(breeReckoning.nextMonth(tuple[0], 2104)).toBe(tuple[1])))
})

describe('testing breeReckoning.nextMonth for millennial leap year', () => {
    [
        [BreeMonth.YULE2, BreeMonth.FRERY],
        [BreeMonth.FRERY, BreeMonth.SOLMATH], [BreeMonth.SOLMATH, BreeMonth.RETHE], [BreeMonth.RETHE, BreeMonth.CHITHING],
        [BreeMonth.CHITHING, BreeMonth.THRIMIDGE], [BreeMonth.THRIMIDGE, BreeMonth.LITHE], [BreeMonth.LITHE, BreeMonth.SUMMERDAYS],
        [BreeMonth.SUMMERDAYS, BreeMonth.MEDE],
        [BreeMonth.MEDE, BreeMonth.WEDMATH], [BreeMonth.WEDMATH, BreeMonth.HARVESTMATH], [BreeMonth.HARVESTMATH, BreeMonth.WINTRING],
        [BreeMonth.WINTRING, BreeMonth.BLOOTING], [BreeMonth.BLOOTING, BreeMonth.YULEMATH], [BreeMonth.YULEMATH, BreeMonth.YULE1],
        [BreeMonth.YULE1, BreeMonth.YULE2]
    ].forEach(tuple =>
        test(`${tuple[0]} is followed by ${tuple[1]}`, () => expect(breeReckoning.nextMonth(tuple[0], 760)).toBe(tuple[1])))
})

describe('testing breeReckoning.getDate', () => {
    test("Year before start of Shire-Reckoning causes an error", () => expect(() => breeReckoning.getDate(0, 0)).toThrow(RangeError))
    test("Day 0 causes an error", () => expect(() => breeReckoning.getDate(2100, 0)).toThrow(RangeError))

    test("Day 1 of regular year", () => expect(breeReckoning.getDate(1, 1)).toMatchObject({month: BreeMonth.YULE2, day: 1}))
    test("Day 2 of regular year", () => expect(breeReckoning.getDate(1, 2)).toMatchObject({month: BreeMonth.FRERY, day: 1}))
    test("Day 31 of regular year", () => expect(breeReckoning.getDate(1, 31)).toMatchObject({month: BreeMonth.FRERY, day: 30}))
    test("Day 182 of regular year", () => expect(breeReckoning.getDate(1, 182)).toMatchObject({month: BreeMonth.SUMMERDAYS, day: 1}))
    test("Day 183 of regular year", () => expect(breeReckoning.getDate(1, 183)).toMatchObject({month: BreeMonth.SUMMERDAYS, day: 2}))
    test("Day 184 of regular year", () => expect(breeReckoning.getDate(1, 184)).toMatchObject({month: BreeMonth.SUMMERDAYS, day: 3}))
    test("Day 320 of regular year", () => expect(breeReckoning.getDate(1, 320)).toMatchObject({month: BreeMonth.BLOOTING, day: 16}))
    test("Day 365 of regular year", () => expect(breeReckoning.getDate(1, 365)).toMatchObject({month: BreeMonth.YULE1, day: 1}))
    test("Day 366 of regular year causes an error", () => expect(() => breeReckoning.getDate(1, 366)).toThrow(RangeError))


    test("Day 1 of leap year", () => expect(breeReckoning.getDate(5, 1)).toMatchObject({month: BreeMonth.YULE2, day: 1}))
    test("Day 2 of leap year", () => expect(breeReckoning.getDate(5, 2)).toMatchObject({month: BreeMonth.FRERY, day: 1}))
    test("Day 31 of leap year", () => expect(breeReckoning.getDate(5, 31)).toMatchObject({month: BreeMonth.FRERY, day: 30}))
    test("Day 182 of leap year", () => expect(breeReckoning.getDate(5, 182)).toMatchObject({month: BreeMonth.SUMMERDAYS, day: 1}))
    test("Day 183 of leap year", () => expect(breeReckoning.getDate(5, 183)).toMatchObject({month: BreeMonth.SUMMERDAYS, day: 2}))
    test("Day 184 of leap year", () => expect(breeReckoning.getDate(5, 184)).toMatchObject({month: BreeMonth.SUMMERDAYS, day: 3}))
    test("Day 185 of leap year", () => expect(breeReckoning.getDate(5, 185)).toMatchObject({month: BreeMonth.SUMMERDAYS, day: 4}))
    test("Day 320 of leap year", () => expect(breeReckoning.getDate(5, 320)).toMatchObject({month: BreeMonth.BLOOTING, day: 15}))
    test("Day 365 of leap year", () => expect(breeReckoning.getDate(5, 365)).toMatchObject({month: BreeMonth.YULEMATH, day: 30}))
    test("Day 366 of leap year", () => expect(breeReckoning.getDate(5, 366)).toMatchObject({month: BreeMonth.YULE1, day: 1}))
    test("Day 367 of leap year causes an error", () => expect(() => breeReckoning.getDate(5, 367)).toThrow(RangeError))

    test("Day 1 of millennial year", () => expect(breeReckoning.getDate(1061, 1)).toMatchObject({month: BreeMonth.YULE2, day: 1}))
    test("Day 2 of millennial year", () => expect(breeReckoning.getDate(1061, 2)).toMatchObject({month: BreeMonth.FRERY, day: 1}))
    test("Day 31 of millennial year", () => expect(breeReckoning.getDate(1061, 31)).toMatchObject({month: BreeMonth.FRERY, day: 30}))
    test("Day 182 of millennial year", () => expect(breeReckoning.getDate(1061, 182)).toMatchObject({month: BreeMonth.SUMMERDAYS, day: 1}))
    test("Day 183 of millennial year", () => expect(breeReckoning.getDate(1061, 183)).toMatchObject({month: BreeMonth.SUMMERDAYS, day: 2}))
    test("Day 184 of millennial year", () => expect(breeReckoning.getDate(1061, 184)).toMatchObject({month: BreeMonth.SUMMERDAYS, day: 3}))
    test("Day 185 of millennial year", () => expect(breeReckoning.getDate(1061, 185)).toMatchObject({month: BreeMonth.SUMMERDAYS, day: 4}))
    test("Day 186 of millennial year", () => expect(breeReckoning.getDate(1061, 186)).toMatchObject({month: BreeMonth.SUMMERDAYS, day: 5}))
    test("Day 320 of millennial year", () => expect(breeReckoning.getDate(1061, 320)).toMatchObject({month: BreeMonth.BLOOTING, day: 14}))
    test("Day 366 of millennial year", () => expect(breeReckoning.getDate(1061, 366)).toMatchObject({month: BreeMonth.YULEMATH, day: 30}))
    test("Day 367 of millennial year", () => expect(breeReckoning.getDate(1061, 367)).toMatchObject({month: BreeMonth.YULE1, day: 1}))
    test("Day 368 of millennial year causes an error", () => expect(() => breeReckoning.getDate(1061, 368)).toThrow(RangeError))
})

describe('testing breeReckoning.getDate.toString', () => {

    test("Day 1 of regular year", () => expect(breeReckoning.getDate(1, 1).toString()).toBe("2 Yule 1"))
    test("Day 2 of regular year", () => expect(breeReckoning.getDate(1, 2).toString()).toBe("1 Frery 1"))
    test("Day 31 of regular year", () => expect(breeReckoning.getDate(1, 31).toString()).toBe("30 Frery 1"))
    test("Day 182 of regular year", () => expect(breeReckoning.getDate(1, 182).toString()).toBe("1 Summerdays 1"))
    test("Day 183 of regular year", () => expect(breeReckoning.getDate(1, 183).toString()).toBe("2 Summerdays 1"))
    test("Day 184 of regular year", () => expect(breeReckoning.getDate(1, 184).toString()).toBe("3 Summerdays 1"))
    test("Day 320 of regular year", () => expect(breeReckoning.getDate(1, 320).toString()).toBe("16 Blooting 1"))
    test("Day 365 of regular year", () => expect(breeReckoning.getDate(1, 365).toString()).toBe("1 Yule 1"))


    test("Day 1 of leap year", () => expect(breeReckoning.getDate(5, 1).toString()).toBe("2 Yule 5"))
    test("Day 2 of leap year", () => expect(breeReckoning.getDate(5, 2).toString()).toBe("1 Frery 5"))
    test("Day 31 of leap year", () => expect(breeReckoning.getDate(5, 31).toString()).toBe("30 Frery 5"))
    test("Day 182 of leap year", () => expect(breeReckoning.getDate(5, 182).toString()).toBe("1 Summerdays 5"))
    test("Day 183 of leap year", () => expect(breeReckoning.getDate(5, 183).toString()).toBe("2 Summerdays 5"))
    test("Day 184 of leap year", () => expect(breeReckoning.getDate(5, 184).toString()).toBe("3 Summerdays 5"))
    test("Day 185 of leap year", () => expect(breeReckoning.getDate(5, 185).toString()).toBe("4 Summerdays 5"))
    test("Day 320 of leap year", () => expect(breeReckoning.getDate(5, 320).toString()).toBe("15 Blooting 5"))
    test("Day 366 of leap year", () => expect(breeReckoning.getDate(5, 366).toString()).toBe("1 Yule 5"))

    test("Day 1 of millennial year", () => expect(breeReckoning.getDate(1061, 1).toString()).toBe("2 Yule 1061"))
    test("Day 2 of millennial year", () => expect(breeReckoning.getDate(1061, 2).toString()).toBe("1 Frery 1061"))
    test("Day 31 of millennial year", () => expect(breeReckoning.getDate(1061, 31).toString()).toBe("30 Frery 1061"))
    test("Day 182 of millennial year", () => expect(breeReckoning.getDate(1061, 182).toString()).toBe("1 Summerdays 1061"))
    test("Day 183 of millennial year", () => expect(breeReckoning.getDate(1061, 183).toString()).toBe("2 Summerdays 1061"))
    test("Day 184 of millennial year", () => expect(breeReckoning.getDate(1061, 184).toString()).toBe("3 Summerdays 1061"))
    test("Day 185 of millennial year", () => expect(breeReckoning.getDate(1061, 185).toString()).toBe("4 Summerdays 1061"))
    test("Day 186 of millennial year", () => expect(breeReckoning.getDate(1061, 186).toString()).toBe("5 Summerdays 1061"))
    test("Day 320 of millennial year", () => expect(breeReckoning.getDate(1061, 320).toString()).toBe("14 Blooting 1061"))
    test("Day 367 of millennial year", () => expect(breeReckoning.getDate(1061, 367).toString()).toBe("1 Yule 1061"))
})

describe('testing breeReckoning.getDaysBetween', () => {

    test("Days between 3M1 1 and 15M2 1", () => expect(breeReckoning.getDaysBetween(
        breeReckoning.newDate(1, BreeMonth.FRERY, 3),
        breeReckoning.newDate(1, BreeMonth.SOLMATH, 15))).toBe(42))

    test("Days between 3M1 1 and 15M2 2", () => expect(breeReckoning.getDaysBetween(
        breeReckoning.newDate(1, BreeMonth.FRERY, 3),
        breeReckoning.newDate(2, BreeMonth.SOLMATH, 15))).toBe(42 + 365))

    test("Days between 3M6 1 and 15M7 1", () => expect(breeReckoning.getDaysBetween(
        breeReckoning.newDate(1, BreeMonth.LITHE, 3),
        breeReckoning.newDate(1, BreeMonth.MEDE, 15))).toBe(45))

    test("Days between 3M6 5 and 15M7 6", () => expect(breeReckoning.getDaysBetween(
        breeReckoning.newDate(5, BreeMonth.LITHE, 3),
        breeReckoning.newDate(6, BreeMonth.MEDE, 15))).toBe(45 + 366))

})


describe('testing breeReckoning.parseDate', () => {
    test("Should not parse Yule 2100", () => expect(() => breeReckoning.parseDate("Yule 2100")).toThrow(new Error("Unable to parse 'Yule 2100' as date of Bree reckoning")))
    test("Should parse 1 Yule 2100", () => expect(breeReckoning.parseDate("1 Yule 2100")).toMatchObject({year: 2100, month: BreeMonth.YULE1, day: 1}))
    test("Should parse 2 Yule 2100", () => expect(breeReckoning.parseDate("2 Yule 2100")).toMatchObject({year: 2100, month: BreeMonth.YULE2, day: 1}))

    test("Should not parse Lithe 2100", () => expect(() => breeReckoning.parseDate("Lithe 2100")).toThrow(new Error("Unable to parse 'Lithe 2100' as date of Bree reckoning")))
    test("Should parse 1 Lithe 2100", () => expect(breeReckoning.parseDate("1 Lithe 2100")).toMatchObject({year: 2100, month: BreeMonth.LITHE, day: 1}))
    test("Should parse 2 Lithe 2100", () => expect(breeReckoning.parseDate("2 Lithe 2100")).toMatchObject({year: 2100, month: BreeMonth.LITHE, day: 2}))
    test("Should parse 5 Lithe 2100", () => expect(breeReckoning.parseDate("5 Lithe 2100")).toMatchObject({year: 2100, month: BreeMonth.LITHE, day: 5}))

    test("Should not parse Rethe 2100", () => expect(() => breeReckoning.parseDate("Rethe 2100")).toThrow(new Error("Unable to parse 'Rethe 2100' as date of Bree reckoning")))
    test("Should parse 1 Rethe 2100", () => expect(breeReckoning.parseDate("1 Rethe 2100")).toMatchObject({year: 2100, month: BreeMonth.RETHE, day: 1}))

    test("Should parse 1 Summerdays 1", () => expect(breeReckoning.parseDate("1 Summerdays 1")).toMatchObject({
        year: 1,
        month: BreeMonth.SUMMERDAYS,
        day: 1
    }))
    test("Should parse 2 Summerdays 1", () => expect(breeReckoning.parseDate("2 Summerdays 1")).toMatchObject({
        year: 1,
        month: BreeMonth.SUMMERDAYS,
        day: 2
    }))
    test("Should parse 3 Summerdays 1", () => expect(breeReckoning.parseDate("3 Summerdays 1")).toMatchObject({
        year: 1,
        month: BreeMonth.SUMMERDAYS,
        day: 3
    }))

    test("Should parse 1 Summerdays 5", () => expect(breeReckoning.parseDate("1 Summerdays 5")).toMatchObject({
        year: 5,
        month: BreeMonth.SUMMERDAYS,
        day: 1
    }))
    test("Should parse 2 Summerdays 5", () => expect(breeReckoning.parseDate("2 Summerdays 5")).toMatchObject({
        year:5,
        month: BreeMonth.SUMMERDAYS,
        day: 2
    }))
    test("Should parse 3 Summerdays 5", () => expect(breeReckoning.parseDate("3 Summerdays 5")).toMatchObject({
        year: 5,
        month: BreeMonth.SUMMERDAYS,
        day: 3
    }))
    test("Should parse 4 Summerdays 5", () => expect(breeReckoning.parseDate("4 Summerdays 5")).toMatchObject({
        year: 5,
        month: BreeMonth.SUMMERDAYS,
        day: 4
    }))

    test("Should parse 1 Summerdays 1061", () => expect(breeReckoning.parseDate("1 Summerdays 1061")).toMatchObject({
        year: 1061,
        month: BreeMonth.SUMMERDAYS,
        day: 1
    }))
    test("Should parse 2 Summerdays 1061", () => expect(breeReckoning.parseDate("2 Summerdays 1061")).toMatchObject({
        year: 1061,
        month: BreeMonth.SUMMERDAYS,
        day: 2
    }))
    test("Should parse 3 Summerdays 1061", () => expect(breeReckoning.parseDate("3 Summerdays 1061")).toMatchObject({
        year: 1061,
        month: BreeMonth.SUMMERDAYS,
        day: 3
    }))
    test("Should parse 4 Summerdays 1061", () => expect(breeReckoning.parseDate("4 Summerdays 1061")).toMatchObject({
        year: 1061,
        month: BreeMonth.SUMMERDAYS,
        day: 4
    }))
    test("Should parse 5 Summerdays 1061", () => expect(breeReckoning.parseDate("5 Summerdays 1061")).toMatchObject({
        year: 1061,
        month: BreeMonth.SUMMERDAYS,
        day: 5
    }))

    test("Should parse representations for regular year", () => {
        for (let i = 1; i <= 365; i++) {
            const date = breeReckoning.getDate(1, i);
            expect(breeReckoning.parseDate(date.toString())).toMatchObject({year: date.year, month: date.month, day: date.day})
        }
    })

    test("Should parse representations for leap year", () => {
        for (let i = 1; i <= 366; i++) {
            const date = breeReckoning.getDate(5, i);
            expect(breeReckoning.parseDate(date.toString())).toMatchObject({year: date.year, month: date.month, day: date.day})
        }
    })

    test("Should parse representations for millennial year", () => {
        for (let i = 1; i <= 367; i++) {
            const date = breeReckoning.getDate(1061, i);
            expect(breeReckoning.parseDate(date.toString())).toMatchObject({year: date.year, month: date.month, day: date.day})
        }
    })
})
