import {describe, expect, test} from "@jest/globals";
import {ReckoningDate} from "../../../src/reckoning/ReckoningDate";
import {BreeMonth} from "../../../src/reckoning/bree/BreeMonth";
import {breeReckoning} from "../../../src/reckoning/bree/BreeReckoning";
import {DayOfWeek} from "../../../src/reckoning/DayOfWeek";

describe('testing breeReckoningDate.getDayOfYear', () => {

    test(`Days of regular year`, () => {
        for (let i = 1; i <= 365; i++) {
            expect(breeReckoning.getDate(1, i).getDayOfYear()).toBe(i)
        }
    })

    test(`Days of leap year`, () => {
        for (let i = 1; i <= 366; i++) {
            expect(breeReckoning.getDate(5, i).getDayOfYear()).toBe(i)
        }
    })

    test(`Days of millennial year`, () => {
        for (let i = 1; i <= 367; i++) {
            expect(breeReckoning.getDate(1061, i).getDayOfYear()).toBe(i)
        }
    })

})

describe('testing breeReckoningDate.isBefore, isAfter and isEqual', () => {

    test(`Days of regular year`, () => {
        for (let i = 1; i <= 364; i++) {
            const today: ReckoningDate<BreeMonth> = breeReckoning.getDate(1, i)
            const tomorrow: ReckoningDate<BreeMonth> = breeReckoning.getDate(1, i + 1)
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

describe('testing breeReckoningDate.getDayOwWeek', () => {
    testDayOfWeek(breeReckoning.newDate(1, BreeMonth.YULE2, 1), DayOfWeek.D7)
    testDayOfWeek(breeReckoning.newDate(1, BreeMonth.SUMMERDAYS, 1), DayOfWeek.D6)
    testDayOfWeek(breeReckoning.newDate(1, BreeMonth.YULE1, 1), DayOfWeek.D7)

    testDayOfWeek(breeReckoning.newDate(5, BreeMonth.YULE2, 1), DayOfWeek.D4)
    testDayOfWeek(breeReckoning.newDate(5, BreeMonth.SUMMERDAYS, 1), DayOfWeek.D3)
    testDayOfWeek(breeReckoning.newDate(5, BreeMonth.YULE1, 1), DayOfWeek.D5)

    testDayOfWeek(breeReckoning.newDate(761, BreeMonth.YULE2, 1), DayOfWeek.D1)
    testDayOfWeek(breeReckoning.newDate(761, BreeMonth.SUMMERDAYS, 1), DayOfWeek.D7)
    testDayOfWeek(breeReckoning.newDate(761, BreeMonth.YULE1, 1), DayOfWeek.D2)

    testDayOfWeek(breeReckoning.newDate(1061, BreeMonth.YULE2, 1), DayOfWeek.D2)
    testDayOfWeek(breeReckoning.newDate(1061, BreeMonth.SUMMERDAYS, 1), DayOfWeek.D1)
    testDayOfWeek(breeReckoning.newDate(1061, BreeMonth.SUMMERDAYS, 3), DayOfWeek.D3)
    testDayOfWeek(breeReckoning.newDate(1061, BreeMonth.SUMMERDAYS, 5), DayOfWeek.D5)
    testDayOfWeek(breeReckoning.newDate(1061, BreeMonth.YULE1, 1), DayOfWeek.D4)

    testDayOfWeek(breeReckoning.newDate(1403, BreeMonth.YULE2, 1), DayOfWeek.D7)
    testDayOfWeek(breeReckoning.newDate(1403, BreeMonth.SUMMERDAYS, 2), DayOfWeek.D7)
    testDayOfWeek(breeReckoning.newDate(1403, BreeMonth.YULE1, 1), DayOfWeek.D7)

    testDayOfWeek(breeReckoning.newDate(1404, BreeMonth.YULE2, 1), DayOfWeek.D1)
    testDayOfWeek(breeReckoning.newDate(1404, BreeMonth.SUMMERDAYS, 1), DayOfWeek.D7)
    testDayOfWeek(breeReckoning.newDate(1404, BreeMonth.SUMMERDAYS, 2), DayOfWeek.D7)
    testDayOfWeek(breeReckoning.newDate(1404, BreeMonth.SUMMERDAYS, 3), DayOfWeek.D1)
    testDayOfWeek(breeReckoning.newDate(1404, BreeMonth.YULE1, 1), DayOfWeek.D7)

    testDayOfWeek(breeReckoning.newDate(1405, BreeMonth.YULE2, 1), DayOfWeek.D1)
    testDayOfWeek(breeReckoning.newDate(1405, BreeMonth.SUMMERDAYS, 1), DayOfWeek.D7)
    testDayOfWeek(breeReckoning.newDate(1405, BreeMonth.SUMMERDAYS, 2), DayOfWeek.D7)
    testDayOfWeek(breeReckoning.newDate(1405, BreeMonth.SUMMERDAYS, 3), DayOfWeek.D1)
    testDayOfWeek(breeReckoning.newDate(1405, BreeMonth.SUMMERDAYS, 4), DayOfWeek.D1)
    testDayOfWeek(breeReckoning.newDate(1404, BreeMonth.YULE1, 1), DayOfWeek.D7)
})

describe('testing breeReckoningDate.constructor', () => {
    test("Should not allow year before 1", () => expect(() => breeReckoning.newDate(0, BreeMonth.YULE2, 1)).toThrow(RangeError))
    test("Should not allow 4 Summerdays in non-leap year", () => expect(() => breeReckoning.newDate(1, BreeMonth.SUMMERDAYS, 4)).toThrow(RangeError))
    test("Should not allow 5 Summerdays in non-leap year", () => expect(() => breeReckoning.newDate(1, BreeMonth.SUMMERDAYS, 5)).toThrow(RangeError))

    test("Should not allow day 0", () => expect(() => breeReckoning.newDate(760, BreeMonth.M1, 0)).toThrow(RangeError))
    test("Should not allow negative day", () => expect(() => breeReckoning.newDate(760, BreeMonth.M1, -1)).toThrow(RangeError))
    test("Should not allow day 31 in a month", () => expect(() => breeReckoning.newDate(760, BreeMonth.M1, 31)).toThrow(RangeError))

    test("Should allow 4 Summerdays in leap year", () => expect(breeReckoning.newDate(5, BreeMonth.SUMMERDAYS, 4)).toBeTruthy())
    test("Should not allow 5 Summerdays in leap year", () => expect(() => breeReckoning.newDate(5, BreeMonth.SUMMERDAYS, 5)).toThrow(RangeError))

    test("Should allow 4 Summerdays in millennial year", () => expect(breeReckoning.newDate(1061, BreeMonth.SUMMERDAYS, 4)).toBeTruthy())
    test("Should allow 5 Summerdays in millennial year", () => expect(breeReckoning.newDate(1061, BreeMonth.SUMMERDAYS, 5)).toBeTruthy())

})

function testDayOfWeek(date: ReckoningDate<BreeMonth>, expected: number) {
    test(`${date.toString("shire")} is ${expected}`, () => expect(date.getDayOfWeek()).toBe(expected))
}
