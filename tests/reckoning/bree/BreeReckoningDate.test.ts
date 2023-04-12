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

    test("Should not allow day 0", () => expect(() => breeReckoning.newDate(760, BreeMonth.FRERY, 0)).toThrow(RangeError))
    test("Should not allow negative day", () => expect(() => breeReckoning.newDate(760, BreeMonth.FRERY, -1)).toThrow(RangeError))
    test("Should not allow day 31 in a month", () => expect(() => breeReckoning.newDate(760, BreeMonth.FRERY, 31)).toThrow(RangeError))

    test("Should allow 4 Summerdays in leap year", () => expect(breeReckoning.newDate(5, BreeMonth.SUMMERDAYS, 4)).toBeTruthy())
    test("Should not allow 5 Summerdays in leap year", () => expect(() => breeReckoning.newDate(5, BreeMonth.SUMMERDAYS, 5)).toThrow(RangeError))

    test("Should allow 4 Summerdays in millennial year", () => expect(breeReckoning.newDate(1061, BreeMonth.SUMMERDAYS, 4)).toBeTruthy())
    test("Should allow 5 Summerdays in millennial year", () => expect(breeReckoning.newDate(1061, BreeMonth.SUMMERDAYS, 5)).toBeTruthy())

})

describe('testing breeReckoning.getDate.toBree', () => {

    test("Day 1 of regular year", () => expect(breeReckoning.getDate(2100, 1).toString()).toBe("2 Yule 2100"))
    test("Day 2 of regular year", () => expect(breeReckoning.getDate(2100, 2).toString()).toBe("1 Frery 2100"))
    test("Day 31 of regular year", () => expect(breeReckoning.getDate(2100, 31).toString()).toBe("30 Frery 2100"))
    test("Day 182 of regular year", () => expect(breeReckoning.getDate(2100, 182).toString()).toBe("1 Summerdays 2100"))
    test("Day 183 of regular year", () => expect(breeReckoning.getDate(2100, 183).toString()).toBe("2 Summerdays 2100"))
    test("Day 184 of regular year", () => expect(breeReckoning.getDate(2100, 184).toString()).toBe("3 Summerdays 2100"))
    test("Day 320 of regular year", () => expect(breeReckoning.getDate(2100, 320).toString()).toBe("16 Blooting 2100"))
    test("Day 365 of regular year", () => expect(breeReckoning.getDate(2100, 365).toString()).toBe("1 Yule 2100"))


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

function testDayOfWeek(date: ReckoningDate<BreeMonth>, expected: number) {
    test(`${date.toString("shire")} is ${expected}`, () => expect(date.getDayOfWeek()).toBe(expected))
}
