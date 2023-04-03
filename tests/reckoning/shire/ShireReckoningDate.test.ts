import {describe, expect, test} from "@jest/globals";
import {shireReckoning} from "../../../src/reckoning/shire/ShireReckoning";
import {ReckoningDate} from "../../../src/reckoning/ReckoningDate";
import {ShireMonth} from "../../../src/reckoning/shire/ShireMonth";
import {DayOfWeek} from "../../../src/reckoning/DayOfWeek";

describe('testing ShireReckoningDate.getDayOfYear', () => {

    test(`Days of regular year`, () => {
        for (let i = 1; i <= 365; i++) {
            expect(shireReckoning.getDate(2100, i).getDayOfYear()).toBe(i)
        }
    })

    test(`Days of leap year`, () => {
        for (let i = 1; i <= 366; i++) {
            expect(shireReckoning.getDate(2104, i).getDayOfYear()).toBe(i)
        }
    })

    test(`Days of millennial year`, () => {
        for (let i = 1; i <= 367; i++) {
            expect(shireReckoning.getDate(760, i).getDayOfYear()).toBe(i)
        }
    })

})

describe('testing ShireReckoningDate.isBefore and isEqual', () => {

    test(`Days of regular year`, () => {
        for (let i = 1; i <= 364; i++) {
            const today: ReckoningDate<ShireMonth> = shireReckoning.getDate(2100, i)
            const tomorrow: ReckoningDate<ShireMonth> = shireReckoning.getDate(2100, i + 1)
            expect(today.isBefore(tomorrow)).toBeTruthy()
            expect(today.isBefore(today)).toBeFalsy()
            expect(tomorrow.isBefore(today)).toBeFalsy()

            expect(today.isEqual(tomorrow)).toBeFalsy()
            expect(today.isEqual(today)).toBeTruthy()
            expect(tomorrow.isEqual(today)).toBeFalsy()
        }
    })
})

describe('testing ShireReckoningDate.getDayOwWeek', () => {
    testDayOfWeek(shireReckoning.newDate(1, ShireMonth.YULE2, 1), DayOfWeek.D2)
    testDayOfWeek(shireReckoning.newDate(1, ShireMonth.MIDYEAR, 1), DayOfWeek.D2)
    testDayOfWeek(shireReckoning.newDate(1, ShireMonth.YULE1, 1), DayOfWeek.D2)

    testDayOfWeek(shireReckoning.newDate(400, ShireMonth.YULE2, 1), DayOfWeek.D7)
    testDayOfWeek(shireReckoning.newDate(400, ShireMonth.MIDYEAR, 1), DayOfWeek.D1)
    testDayOfWeek(shireReckoning.newDate(400, ShireMonth.YULE1, 1), DayOfWeek.D2)

    testDayOfWeek(shireReckoning.newDate(460, ShireMonth.YULE2, 1), DayOfWeek.D1)
    testDayOfWeek(shireReckoning.newDate(460, ShireMonth.MIDYEAR, 1), DayOfWeek.D1)
    testDayOfWeek(shireReckoning.newDate(460, ShireMonth.YULE1, 1), DayOfWeek.D2)

    testDayOfWeek(shireReckoning.newDate(760, ShireMonth.YULE2, 1), DayOfWeek.D2)
    testDayOfWeek(shireReckoning.newDate(760, ShireMonth.OVERLITHE_MILLENNIAL, 1), DayOfWeek.D2)
    testDayOfWeek(shireReckoning.newDate(760, ShireMonth.MIDYEAR, 1), DayOfWeek.D3)
    testDayOfWeek(shireReckoning.newDate(760, ShireMonth.OVERLITHE, 1), DayOfWeek.D4)
    testDayOfWeek(shireReckoning.newDate(760, ShireMonth.YULE1, 1), DayOfWeek.D4)

    testDayOfWeek(shireReckoning.newDate(1102, ShireMonth.YULE2, 1), DayOfWeek.D7)
    testDayOfWeek(shireReckoning.newDate(1102, ShireMonth.MIDYEAR, 1), DayOfWeek.D7)
    testDayOfWeek(shireReckoning.newDate(1102, ShireMonth.YULE1, 1), DayOfWeek.D7)

    testDayOfWeek(shireReckoning.newDate(1103, ShireMonth.YULE2, 1), DayOfWeek.D1)
    testDayOfWeek(shireReckoning.newDate(1103, ShireMonth.M1, 1), DayOfWeek.D2)
    testDayOfWeek(shireReckoning.newDate(1103, ShireMonth.M1, 2), DayOfWeek.D3)
    testDayOfWeek(shireReckoning.newDate(1103, ShireMonth.M1, 3), DayOfWeek.D4)
    testDayOfWeek(shireReckoning.newDate(1103, ShireMonth.M1, 4), DayOfWeek.D5)
    testDayOfWeek(shireReckoning.newDate(1103, ShireMonth.M1, 5), DayOfWeek.D6)
    testDayOfWeek(shireReckoning.newDate(1103, ShireMonth.M1, 6), DayOfWeek.D7)
    testDayOfWeek(shireReckoning.newDate(1103, ShireMonth.M1, 7), DayOfWeek.D1)

    testDayOfWeek(shireReckoning.newDate(1103, ShireMonth.LITHE1, 1), DayOfWeek.D7)
    testDayOfWeek(shireReckoning.newDate(1103, ShireMonth.MIDYEAR, 1), DayOfWeek.D7)
    testDayOfWeek(shireReckoning.newDate(1103, ShireMonth.LITHE2, 1), DayOfWeek.D1)

    testDayOfWeek(shireReckoning.newDate(1103, ShireMonth.YULE1, 1), DayOfWeek.D7)

    testDayOfWeek(shireReckoning.newDate(1104, ShireMonth.LITHE1, 1), DayOfWeek.D7)
    testDayOfWeek(shireReckoning.newDate(1104, ShireMonth.MIDYEAR, 1), DayOfWeek.D7)
    testDayOfWeek(shireReckoning.newDate(1104, ShireMonth.OVERLITHE, 1), DayOfWeek.D1)
    testDayOfWeek(shireReckoning.newDate(1104, ShireMonth.LITHE2, 1), DayOfWeek.D1)
})

describe('testing ShireReckoningDate.constructor', () => {
    test("Should not allow year before 1", () => expect(() => shireReckoning.newDate(0, ShireMonth.YULE2, 1)).toThrow(RangeError))
    test("Should not allow Overlithe in non-leap year", () => expect(() => shireReckoning.newDate(2061, ShireMonth.OVERLITHE, 1)).toThrow(RangeError))
    test("Should not allow Millennial Overlithe in non-leap year", () => expect(() => shireReckoning.newDate(2061, ShireMonth.OVERLITHE_MILLENNIAL, 1)).toThrow(RangeError))

    test("Should not allow day 0", () => expect(() => shireReckoning.newDate(760, ShireMonth.M1, 0)).toThrow(RangeError))
    test("Should not allow negative day", () => expect(() => shireReckoning.newDate(760, ShireMonth.M1, -1)).toThrow(RangeError))
    test("Should not allow day 31 in a month", () => expect(() => shireReckoning.newDate(760, ShireMonth.M1, 31)).toThrow(RangeError))

    test("Should not allow day 2 in MIDYEAR in regular year", () => expect(() => shireReckoning.newDate(2063, ShireMonth.MIDYEAR, 2)).toThrow(RangeError))

    test("Should allow Overlithe in leap year", () => expect(shireReckoning.newDate(2064, ShireMonth.OVERLITHE, 1)).toBeTruthy())
    test("Should not allow Millennial Overlithe in leap year", () => expect(() => shireReckoning.newDate(2064, ShireMonth.OVERLITHE_MILLENNIAL, 1)).toThrow(RangeError))

    test("Should allow Overlithe in millennial year", () => expect(shireReckoning.newDate(760, ShireMonth.OVERLITHE, 1)).toBeTruthy())
    test("Should allow Millennial Overlithe in millennial year", () => expect(shireReckoning.newDate(760, ShireMonth.OVERLITHE_MILLENNIAL, 1)).toBeTruthy())

})

function testDayOfWeek(date: ReckoningDate<ShireMonth>, expected: number) {
    test(`${date.toString("shire")} is ${expected}`, () => expect(date.getDayOfWeek()).toBe(expected))
}
