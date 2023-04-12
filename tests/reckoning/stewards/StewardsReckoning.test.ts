import {stewardsReckoning} from "../../../src/reckoning/stewards/StewardsReckoning";
import {describe, expect, test} from "@jest/globals";
import {StewardsMonth} from "../../../src/reckoning/stewards/StewardsMonth";

describe('testing stewardsReckoning.isLeapYear()', () => {
    test('year 2064 is a leap year', () => expect(stewardsReckoning.isLeapYear(2064)).toBeTruthy())
    test('year 2100 is not a leap year', () => expect(stewardsReckoning.isLeapYear(2100)).toBeFalsy())
    test('year 2360 is a leap year', () => expect(stewardsReckoning.isLeapYear(2360)).toBeTruthy())
    test('year 2400 is not a leap year', () => expect(stewardsReckoning.isLeapYear(2400)).toBeFalsy())
    test('year 3000 is not a leap year)', () => expect(stewardsReckoning.isLeapYear(3000)).toBeFalsy())
})

describe('testing stewardsReckoning.daysInYear', () => {
    test('year 2064 is a leap year', () => expect(stewardsReckoning.daysInYear(2064)).toBe(366))
    test('year 2100 is not a leap year', () => expect(stewardsReckoning.daysInYear(2100)).toBe(365))
    test('year 2400 is not leap year', () => expect(stewardsReckoning.daysInYear(2400)).toBe(365))
    test('year 2360 is a leap year with extra day', () => expect(stewardsReckoning.daysInYear(2360)).toBe(367))
    test('year 3000 is not a leap year', () => expect(stewardsReckoning.daysInYear(3000)).toBe(365))
})

describe('testing stewardsReckoning.nextMonth for regular year', () => {
    [
        [StewardsMonth.YESTARE, StewardsMonth.NARVINYE], [StewardsMonth.NARVINYE, StewardsMonth.NENIME], [StewardsMonth.NENIME, StewardsMonth.SULIME], [StewardsMonth.SULIME, StewardsMonth.TUILERE],
        [StewardsMonth.TUILERE, StewardsMonth.VIRESSE], [StewardsMonth.VIRESSE, StewardsMonth.LOTESSE], [StewardsMonth.LOTESSE, StewardsMonth.NARIE], [StewardsMonth.NARIE, StewardsMonth.LOENDE],
        [StewardsMonth.LOENDE, StewardsMonth.CERMIE], [StewardsMonth.CERMIE, StewardsMonth.URIME], [StewardsMonth.URIME, StewardsMonth.YAVANNIE], [StewardsMonth.YAVANNIE, StewardsMonth.YAVIERE],
        [StewardsMonth.YAVIERE, StewardsMonth.NARQUELIE], [StewardsMonth.NARQUELIE, StewardsMonth.HISIME], [StewardsMonth.HISIME, StewardsMonth.RINGARE], [StewardsMonth.RINGARE, StewardsMonth.METTARE],
        [StewardsMonth.METTARE, StewardsMonth.YESTARE]
    ].forEach(tuple =>
        test(`${tuple[0]} is followed by ${tuple[1]}`, () => expect(stewardsReckoning.nextMonth(tuple[0], 2100)).toBe(tuple[1])))
})

describe('testing stewardsReckoning.nextMonth for leap year', () => {
    [
        [StewardsMonth.YESTARE, StewardsMonth.NARVINYE], [StewardsMonth.NARVINYE, StewardsMonth.NENIME], [StewardsMonth.NENIME, StewardsMonth.SULIME], [StewardsMonth.SULIME, StewardsMonth.TUILERE],
        [StewardsMonth.TUILERE, StewardsMonth.VIRESSE], [StewardsMonth.VIRESSE, StewardsMonth.LOTESSE], [StewardsMonth.LOTESSE, StewardsMonth.NARIE], [StewardsMonth.NARIE, StewardsMonth.ENDERE],
        [StewardsMonth.ENDERE, StewardsMonth.CERMIE], [StewardsMonth.CERMIE, StewardsMonth.URIME], [StewardsMonth.URIME, StewardsMonth.YAVANNIE], [StewardsMonth.YAVANNIE, StewardsMonth.YAVIERE],
        [StewardsMonth.YAVIERE, StewardsMonth.NARQUELIE], [StewardsMonth.NARQUELIE, StewardsMonth.HISIME], [StewardsMonth.HISIME, StewardsMonth.RINGARE], [StewardsMonth.RINGARE, StewardsMonth.METTARE],
        [StewardsMonth.METTARE, StewardsMonth.YESTARE]
    ].forEach(tuple =>
        test(`${tuple[0]} is followed by ${tuple[1]}`, () => expect(stewardsReckoning.nextMonth(tuple[0], 2104)).toBe(tuple[1])))
})

describe('testing stewardsReckoning.getDate', () => {
    test("Year before start of Steward's Reckoning causes an error", () => expect(() => stewardsReckoning.getDate(2059, 0)).toThrow(RangeError))
    test("Day 0 causes an error", () => expect(() => stewardsReckoning.getDate(2100, 0)).toThrow(RangeError))

    test("Day 1 of regular year", () => expect(stewardsReckoning.getDate(2100, 1)).toMatchObject({month: StewardsMonth.YESTARE, day: 1}))
    test("Day 2 of regular year", () => expect(stewardsReckoning.getDate(2100, 2)).toMatchObject({month: StewardsMonth.NARVINYE, day: 1}))
    test("Day 31 of regular year", () => expect(stewardsReckoning.getDate(2100, 31)).toMatchObject({month: StewardsMonth.NARVINYE, day: 30}))
    test("Day 183 of regular year", () => expect(stewardsReckoning.getDate(2100, 183)).toMatchObject({month: StewardsMonth.LOENDE, day: 1}))
    test("Day 320 of regular year", () => expect(stewardsReckoning.getDate(2100, 320)).toMatchObject({month: StewardsMonth.HISIME, day: 16}))
    test("Day 365 of regular year", () => expect(stewardsReckoning.getDate(2100, 365)).toMatchObject({month: StewardsMonth.METTARE, day: 1}))
    test("Day 366 of regular year causes an error", () => expect(() => stewardsReckoning.getDate(2100, 366)).toThrow(RangeError))


    test("Day 1 of leap year", () => expect(stewardsReckoning.getDate(2104, 1)).toMatchObject({month: StewardsMonth.YESTARE, day: 1}))
    test("Day 2 of leap year", () => expect(stewardsReckoning.getDate(2104, 2)).toMatchObject({month: StewardsMonth.NARVINYE, day: 1}))
    test("Day 31 of leap year", () => expect(stewardsReckoning.getDate(2104, 31)).toMatchObject({month: StewardsMonth.NARVINYE, day: 30}))
    test("Day 183 of leap year", () => expect(stewardsReckoning.getDate(2104, 183)).toMatchObject({month: StewardsMonth.ENDERE, day: 1}))
    test("Day 184 of leap year", () => expect(stewardsReckoning.getDate(2104, 184)).toMatchObject({month: StewardsMonth.ENDERE, day: 2}))
    test("Day 320 of leap year", () => expect(stewardsReckoning.getDate(2104, 320)).toMatchObject({month: StewardsMonth.HISIME, day: 15}))
    test("Day 366 of leap year", () => expect(stewardsReckoning.getDate(2104, 366)).toMatchObject({month: StewardsMonth.METTARE, day: 1}))
    test("Day 367 of leap year causes an error", () => expect(() => stewardsReckoning.getDate(2104, 367)).toThrow(RangeError))

    test("Day 1 of millennial year", () => expect(stewardsReckoning.getDate(2360, 1)).toMatchObject({month: StewardsMonth.YESTARE, day: 1}))
    test("Day 2 of millennial year", () => expect(stewardsReckoning.getDate(2360, 2)).toMatchObject({month: StewardsMonth.NARVINYE, day: 1}))
    test("Day 31 of millennial year", () => expect(stewardsReckoning.getDate(2360, 31)).toMatchObject({month: StewardsMonth.NARVINYE, day: 30}))
    test("Day 183 of millennial year", () => expect(stewardsReckoning.getDate(2360, 183)).toMatchObject({month: StewardsMonth.ENDERE, day: 1}))
    test("Day 184 of millennial year", () => expect(stewardsReckoning.getDate(2360, 184)).toMatchObject({month: StewardsMonth.ENDERE, day: 2}))
    test("Day 185 of millennial year", () => expect(stewardsReckoning.getDate(2360, 185)).toMatchObject({month: StewardsMonth.ENDERE, day: 3}))
    test("Day 320 of millennial year", () => expect(stewardsReckoning.getDate(2360, 320)).toMatchObject({month: StewardsMonth.HISIME, day: 14}))
    test("Day 367 of millennial year", () => expect(stewardsReckoning.getDate(2360, 367)).toMatchObject({month: StewardsMonth.METTARE, day: 1}))
    test("Day 368 of millennial year causes an error", () => expect(() => stewardsReckoning.getDate(2360, 368)).toThrow(RangeError))
})

describe('testing stewardsReckoning.getDate.toQuenya', () => {

    test("Day 1 of regular year", () => expect(stewardsReckoning.getDate(2100, 1).toString("quenya")).toBe("Yestarë 2100"))
    test("Day 2 of regular year", () => expect(stewardsReckoning.getDate(2100, 2).toString("quenya")).toBe("1 Narvinyë 2100"))
    test("Day 31 of regular year", () => expect(stewardsReckoning.getDate(2100, 31).toString("quenya")).toBe("30 Narvinyë 2100"))
    test("Day 183 of regular year", () => expect(stewardsReckoning.getDate(2100, 183).toString("quenya")).toBe("Loëndë 2100"))
    test("Day 320 of regular year", () => expect(stewardsReckoning.getDate(2100, 320).toString("quenya")).toBe("16 Hísimë 2100"))
    test("Day 365 of regular year", () => expect(stewardsReckoning.getDate(2100, 365).toString("quenya")).toBe("Mettarë 2100"))


    test("Day 1 of leap year", () => expect(stewardsReckoning.getDate(2104, 1).toString("quenya")).toBe("Yestarë 2104"))
    test("Day 2 of leap year", () => expect(stewardsReckoning.getDate(2104, 2).toString("quenya")).toBe("1 Narvinyë 2104"))
    test("Day 31 of leap year", () => expect(stewardsReckoning.getDate(2104, 31).toString("quenya")).toBe("30 Narvinyë 2104"))
    test("Day 183 of leap year", () => expect(stewardsReckoning.getDate(2104, 183).toString("quenya")).toBe("1 Enderë 2104"))
    test("Day 184 of leap year", () => expect(stewardsReckoning.getDate(2104, 184).toString("quenya")).toBe("2 Enderë 2104"))
    test("Day 320 of leap year", () => expect(stewardsReckoning.getDate(2104, 320).toString("quenya")).toBe("15 Hísimë 2104"))
    test("Day 366 of leap year", () => expect(stewardsReckoning.getDate(2104, 366).toString("quenya")).toBe("Mettarë 2104"))

    test("Day 1 of millennial year", () => expect(stewardsReckoning.getDate(2360, 1).toString("quenya")).toBe("Yestarë 2360"))
    test("Day 2 of millennial year", () => expect(stewardsReckoning.getDate(2360, 2).toString("quenya")).toBe("1 Narvinyë 2360"))
    test("Day 31 of millennial year", () => expect(stewardsReckoning.getDate(2360, 31).toString("quenya")).toBe("30 Narvinyë 2360"))
    test("Day 183 of millennial year", () => expect(stewardsReckoning.getDate(2360, 183).toString("quenya")).toBe("1 Enderë 2360"))
    test("Day 184 of millennial year", () => expect(stewardsReckoning.getDate(2360, 184).toString("quenya")).toBe("2 Enderë 2360"))
    test("Day 185 of millennial year", () => expect(stewardsReckoning.getDate(2360, 185).toString("quenya")).toBe("3 Enderë 2360"))
    test("Day 320 of millennial year", () => expect(stewardsReckoning.getDate(2360, 320).toString("quenya")).toBe("14 Hísimë 2360"))
    test("Day 367 of millennial year", () => expect(stewardsReckoning.getDate(2360, 367).toString("quenya")).toBe("Mettarë 2360"))
})


describe('testing stewardsReckoning.getDaysBetween', () => {

    test("Days between 3M1 2365 and 15M2 3265", () => expect(stewardsReckoning.getDaysBetween(
        stewardsReckoning.newDate(2365, StewardsMonth.NARVINYE, 3),
        stewardsReckoning.newDate(2365, StewardsMonth.NENIME, 15))).toBe(42))

    test("Days between 3M1 2365 and 15M2 3266", () => expect(stewardsReckoning.getDaysBetween(
        stewardsReckoning.newDate(2365, StewardsMonth.NARVINYE, 3),
        stewardsReckoning.newDate(2366, StewardsMonth.NENIME, 15))).toBe(42 + 365))

    test("Days between 3M6 2365 and 15M7 2365", () => expect(stewardsReckoning.getDaysBetween(
        stewardsReckoning.newDate(2365, StewardsMonth.NARIE, 3),
        stewardsReckoning.newDate(2365, StewardsMonth.CERMIE, 15))).toBe(43))

    test("Days between 3M6 2364 and 15M7 2365", () => expect(stewardsReckoning.getDaysBetween(
        stewardsReckoning.newDate(2364, StewardsMonth.NARIE, 3),
        stewardsReckoning.newDate(2365, StewardsMonth.CERMIE, 15))).toBe(43 + 366))

})



describe('testing stewardsReckoning.parseDate', () => {
    test("Should parse Yestarë 2100", () => expect(stewardsReckoning.parseDate("Yestarë 2100")).toMatchObject({year: 2100, month: StewardsMonth.YESTARE, day: 1}))
    test("Should parse 1 Yestarë 2100", () => expect(stewardsReckoning.parseDate("Yestarë 2100")).toMatchObject({year: 2100, month: StewardsMonth.YESTARE, day: 1}))

    test("Should not parse Norui 2100", () => expect(() => stewardsReckoning.parseDate("Norui 2100")).toThrow(new Error("Unable to parse 'Norui 2100' as date of Steward's reckoning")))
    test("Should parse 1 Norui 2100", () => expect(stewardsReckoning.parseDate("1 Norui 2100")).toMatchObject({year: 2100, month: StewardsMonth.NARIE, day: 1}))

    test("Should parse Loende 2100", () => expect(stewardsReckoning.parseDate("Loende 2100")).toMatchObject({year: 2100, month: StewardsMonth.LOENDE, day: 1}))
    test("Should parse 1 Endere 2104", () => expect(stewardsReckoning.parseDate("1 Endere 2104")).toMatchObject({year: 2104, month: StewardsMonth.ENDERE, day: 1}))
    test("Should not parse Loende 2104", () => expect(() => stewardsReckoning.parseDate("Loende 2104")).toThrow(new RangeError("leap year 2104 has no month LOENDE")))

    test("Should parse representations for regular year", () => {
        for (let i = 1; i <= 365; i++) {
            const date = stewardsReckoning.getDate(3200, i);
            expect(stewardsReckoning.parseDate(date.toString("quenya"))).toMatchObject({year: date.year, month: date.month, day: date.day})
            expect(stewardsReckoning.parseDate(date.toString("sindarin"))).toMatchObject({year: date.year, month: date.month, day: date.day})
        }
    })

    test("Should parse representations for leap year", () => {
        for (let i = 1; i <= 366; i++) {
            const date = stewardsReckoning.getDate(2060, i);
            expect(stewardsReckoning.parseDate(date.toString("quenya"))).toMatchObject({year: date.year, month: date.month, day: date.day})
            expect(stewardsReckoning.parseDate(date.toString("sindarin"))).toMatchObject({year: date.year, month: date.month, day: date.day})
        }
    })

    test("Should parse representations for millennial year", () => {
        for (let i = 1; i <= 367; i++) {
            const date = stewardsReckoning.getDate(2360, i);
            expect(stewardsReckoning.parseDate(date.toString("quenya"))).toMatchObject({year: date.year, month: date.month, day: date.day})
            expect(stewardsReckoning.parseDate(date.toString("sindarin"))).toMatchObject({year: date.year, month: date.month, day: date.day})
        }
    })
})

describe("testing language detection", () => {
    test("should auto-detect quenya language", () => expect(stewardsReckoning.parseDate("1 Viresse 2100").language).toBe("quenya"))
    test("should auto-detect sindarin language", () => expect(stewardsReckoning.parseDate("1 Gwirith 2100").language).toBe("sindarin"))
})
