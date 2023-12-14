import {describe, expect, test} from "@jest/globals";
import {reckonings} from "../../src/reckoning/Reckonings";
import {stewardsReckoning} from "../../src/reckoning/stewards/StewardsReckoning";
import {shireReckoning} from "../../src/reckoning/shire/ShireReckoning";
import {breeReckoning} from "../../src/reckoning/bree/BreeReckoning";
import {calendarDecorations} from "../../src/calendar/CalendarDecorations";

describe("testing conversion from Steward's to Shire-reckoning", () => {

    test("Start of Shire-reckoning", () => {
        const shireDate = shireReckoning.parseDate("2 Yule 1");
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("Yestare 1601"))).toMatchObject({
            year: shireDate.year,
            month: shireDate.month,
            day: shireDate.day
        })
    })

    test("battle of the Pellenor", () => {
        const shireDate = shireReckoning.parseDate("15 Rethe 1419");
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("15 Gwaeron 3019"))).toMatchObject({
            year: shireDate.year,
            month: shireDate.month,
            day: shireDate.day
        })
    })

    test("council of Elrond", () => {
        const shireDate = shireReckoning.parseDate("25 Winterfilth 1418");
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("25 Narbeleth 3018"))).toMatchObject({
            year: shireDate.year,
            month: shireDate.month,
            day: shireDate.day
        })
    })

    test("meeting of Gandalf and Radagast", () => {
        const shireDate = shireReckoning.parseDate("Mid-Year's Day 1418");
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("Lawenedh 3018"))).toMatchObject({
            year: shireDate.year,
            month: shireDate.month,
            day: shireDate.day
        })
    })

    test("Iestor 3018", () => {
        const shireDate = shireReckoning.parseDate("2 Yule 1418");
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("Iestor 3018"))).toMatchObject({
            year: shireDate.year,
            month: shireDate.month,
            day: shireDate.day
        })
    })

    test("1 Gwirith 2360", () => {
        const shireDate = shireReckoning.parseDate("2 Astron 760");
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("1 Gwirith 2360"))).toMatchObject({
            year: shireDate.year,
            month: shireDate.month,
            day: shireDate.day
        })
    })

    test("1 Enedhor 2360", () => {
        const shireDate = shireReckoning.parseDate("Leap Overlithe 760");
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("1 Enedhor 2360"))).toMatchObject({
            year: shireDate.year,
            month: shireDate.month,
            day: shireDate.day
        })
    })
})

describe("testing conversion from Shire-reckoning to Steward's", () => {

    test("Start of Shire-reckoning", () => {
        const stewardsDate = stewardsReckoning.parseDate("Yestare 1601");
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("2 Yule 1"))).toMatchObject({
            year: stewardsDate.year,
            month: stewardsDate.month,
            day: stewardsDate.day
        })
    })

    test("battle of the Pellenor", () => {
        const stewardsDate = stewardsReckoning.parseDate("15 Gwaeron 3019");
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("15 Rethe 1419"))).toMatchObject({
            year: stewardsDate.year,
            month: stewardsDate.month,
            day: stewardsDate.day
        })
    })

    test("council of Elrond", () => {
        const stewardsDate = stewardsReckoning.parseDate("25 Narbeleth 3018");
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("25 Winterfilth 1418"))).toMatchObject({
            year: stewardsDate.year,
            month: stewardsDate.month,
            day: stewardsDate.day
        })
    })

    test("meeting of Gandalf and Radagast", () => {
        const stewardsDate = stewardsReckoning.parseDate("Lawenedh 3018");
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("Mid-Year's Day 1418"))).toMatchObject({
            year: stewardsDate.year,
            month: stewardsDate.month,
            day: stewardsDate.day
        })
    })

    test("Iestor 3018", () => {
        const stewardsDate = stewardsReckoning.parseDate("Iestor 3018");
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("2 Yule 1418"))).toMatchObject({
            year: stewardsDate.year,
            month: stewardsDate.month,
            day: stewardsDate.day
        })
    })

    test("1 Gwirith 2360", () => {
        const stewardsDate = stewardsReckoning.parseDate("1 Gwirith 2360");
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("2 Astron 760"))).toMatchObject({
            year: stewardsDate.year,
            month: stewardsDate.month,
            day: stewardsDate.day
        })
    })

    test("1 Enedhor 2360", () => {
        const stewardsDate = stewardsReckoning.parseDate("1 Enedhor 2360");
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("Leap Overlithe 760"))).toMatchObject({
            year: stewardsDate.year,
            month: stewardsDate.month,
            day: stewardsDate.day
        })
    })
})

describe("testing conversion from Steward's to Bree-reckoning", () => {

    test("Start of Bree-reckoning", () => {
        const breeDate = breeReckoning.parseDate("2 Yule 1");
        expect(reckonings.toReckoning("bree", stewardsReckoning.parseDate("Yestare 1300"))).toMatchObject({
            year: breeDate.year,
            month: breeDate.month,
            day: breeDate.day
        })
    })


    test("battle of the Pellenor", () => {
        const breeDate = breeReckoning.parseDate("15 Rethe 1720");
        expect(reckonings.toReckoning("bree", stewardsReckoning.parseDate("15 Gwaeron 3019"))).toMatchObject({
            year: breeDate.year,
            month: breeDate.month,
            day: breeDate.day
        })
    })
})

describe("testing conversion from Shire-reckoning to Bree-reckoning", () => {

    test("Start of Shire-reckoning", () => {
        const breeDate = breeReckoning.parseDate("2 Yule 302");
        expect(reckonings.toReckoning("bree", shireReckoning.parseDate("2 Yule 1"))).toMatchObject({
            year: breeDate.year,
            month: breeDate.month,
            day: breeDate.day
        })
    })


    test("battle of the Pellenor", () => {
        const breeDate = breeReckoning.parseDate("15 Rethe 1720");
        expect(reckonings.toReckoning("bree", shireReckoning.parseDate("15 Rethe 1419"))).toMatchObject({
            year: breeDate.year,
            month: breeDate.month,
            day: breeDate.day
        })
    })
})

describe("testing conversion from Bree-reckoning to Shire-reckoning", () => {

    test("Start of Shire-reckoning", () => {
        const shireDate = shireReckoning.parseDate("2 Yule 1");
        expect(reckonings.toReckoning("shire", breeReckoning.parseDate("2 Yule 302"))).toMatchObject({
            year: shireDate.year,
            month: shireDate.month,
            day: shireDate.day
        })
    })

    test("battle of the Pellenor", () => {
        const shireDate = shireReckoning.parseDate("15 Rethe 1419");
        expect(reckonings.toReckoning("shire", breeReckoning.parseDate("15 Rethe 1720"))).toMatchObject({
            year: shireDate.year,
            month: shireDate.month,
            day: shireDate.day
        })
    })
})

describe("testing conversion from Bree-reckoning to Steward's reckoning", () => {

    test("Start of Bree-reckoning", () => {
        const stewardsDate = stewardsReckoning.parseDate("Yestare 1300");
        expect(reckonings.toReckoning("stewards", breeReckoning.parseDate("2 Yule 1"))).toMatchObject({
            year: stewardsDate.year,
            month: stewardsDate.month,
            day: stewardsDate.day
        })
    })

    test("battle of the Pellenor", () => {
        const stewardsDate = stewardsReckoning.parseDate("15 Gwaeron 3019");
        expect(reckonings.toReckoning("stewards", breeReckoning.parseDate("15 Rethe 1720"))).toMatchObject({
            year: stewardsDate.year,
            month: stewardsDate.month,
            day: stewardsDate.day
        })
    })
})

describe("testing reckoning detection", () => {
    test("should return Steward's reckoning by unknown name", () => expect(reckonings.detectReckoning("", "unknown")).toBe("stewards"))
    test("should return Steward's reckoning by missing name", () => expect(reckonings.detectReckoning("", undefined)).toBe("stewards"))

    test("should detect Steward's reckoning by name", () => expect(reckonings.detectReckoning("", "stewards")).toBe("stewards"))
    test("should detect Steward's reckoning by alias", () => expect(reckonings.detectReckoning("", "steward")).toBe("stewards"))

    test("should detect Shire reckoning by name", () => expect(reckonings.detectReckoning("", "shire")).toBe("shire"))

    test("should detect Steward's reckoning by quenya language", () => expect(reckonings.detectReckoning("", undefined, "quenya")).toBe("stewards"))
    test("should detect Steward's reckoning by sindarin language", () => expect(reckonings.detectReckoning("", undefined, "sindarin")).toBe("stewards"))
})

describe("testing date conversion to all possible locales", () => {
    test("should convert to all locales except stewards sindarin", () =>
        expect(reckonings.convertToEveryReckoningAndLanguagePossible(stewardsReckoning.parseDate("15 Gwaeron 3019"))
                .map(d => calendarDecorations.getLocaleDescription(d)))
            .toEqual(["q. Steward's", "Shire", "Bree"]));

    test("should convert to all locales except stewards quenya", () =>
        expect(reckonings.convertToEveryReckoningAndLanguagePossible(stewardsReckoning.parseDate("15 Sulime 3019"))
            .map(d => calendarDecorations.getLocaleDescription(d)))
            .toEqual(["sind. Steward's", "Shire", "Bree"]));

    test("should convert to all locales except shire", () =>
        expect(reckonings.convertToEveryReckoningAndLanguagePossible(shireReckoning.parseDate("15 Rethe 1419"))
            .map(d => calendarDecorations.getLocaleDescription(d)))
            .toEqual(["q. Steward's", "sind. Steward's", "Bree"]));

    test("should convert to all locales except bree", () =>
        expect(reckonings.convertToEveryReckoningAndLanguagePossible(breeReckoning.parseDate("15 Rethe 1720"))
            .map(d => calendarDecorations.getLocaleDescription(d)))
            .toEqual(["q. Steward's", "sind. Steward's", "Shire"]));
})
