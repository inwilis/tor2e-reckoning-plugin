import {describe, expect, test} from "@jest/globals";
import {reckonings} from "../../src/reckoning/Reckonings";
import {stewardsReckoning} from "../../src/reckoning/stewards/StewardsReckoning";
import {shireReckoning} from "../../src/reckoning/shire/ShireReckoning";

describe("testing conversion from Steward's to Shire-reckoning", () => {

    test("battle of the Pellenor", () => {
        const shireDate = shireReckoning.parseDate("15 Rethe 1419");
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("15 Gwaeron 3019"))).toMatchObject({year: shireDate.year, month: shireDate.month, day: shireDate.day})
    })

    test("council of Elrond", () => {
        const shireDate = shireReckoning.parseDate("25 Winterfilth 1418");
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("25 Narbeleth 3018"))).toMatchObject({year: shireDate.year, month: shireDate.month, day: shireDate.day})
    })

    test("meeting of Gandalf and Radagast", () => {
        const shireDate = shireReckoning.parseDate("Mid-Year's Day 1418");
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("Lawenedh 3018"))).toMatchObject({year: shireDate.year, month: shireDate.month, day: shireDate.day})
    })

    test("Iestor 3018", () => {
        const shireDate = shireReckoning.parseDate("2 Yule 1418");
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("Iestor 3018"))).toMatchObject({year: shireDate.year, month: shireDate.month, day: shireDate.day})
    })

    test("1 Gwirith 2360", () => {
        const shireDate = shireReckoning.parseDate("2 Astron 760");
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("1 Gwirith 2360"))).toMatchObject({year: shireDate.year, month: shireDate.month, day: shireDate.day})
    })

    test("1 Enedhor 2360", () => {
        const shireDate = shireReckoning.parseDate("Leap Overlithe 760");
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("1 Enedhor 2360"))).toMatchObject({year: shireDate.year, month: shireDate.month, day: shireDate.day})
    })
})

describe("testing conversion from Shire-reckoning to Steward's", () => {

    test("battle of the Pellenor", () => {
        const stewardsDate = stewardsReckoning.parseDate("15 Gwaeron 3019");
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("15 Rethe 1419"))).toMatchObject({year: stewardsDate.year, month: stewardsDate.month, day: stewardsDate.day})
    })

    test("council of Elrond", () => {
        const stewardsDate = stewardsReckoning.parseDate("25 Narbeleth 3018");
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("25 Winterfilth 1418"))).toMatchObject({year: stewardsDate.year, month: stewardsDate.month, day: stewardsDate.day})
    })

    test("meeting of Gandalf and Radagast", () => {
        const stewardsDate = stewardsReckoning.parseDate("Lawenedh 3018");
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("Mid-Year's Day 1418"))).toMatchObject({year: stewardsDate.year, month: stewardsDate.month, day: stewardsDate.day})
    })

    test("Iestor 3018", () => {
        const stewardsDate = stewardsReckoning.parseDate("Iestor 3018");
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("2 Yule 1418"))).toMatchObject({year: stewardsDate.year, month: stewardsDate.month, day: stewardsDate.day})
    })

    test("1 Gwirith 2360", () => {
        const stewardsDate = stewardsReckoning.parseDate("1 Gwirith 2360");
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("2 Astron 760"))).toMatchObject({year: stewardsDate.year, month: stewardsDate.month, day: stewardsDate.day})
    })

    test("1 Enedhor 2360", () => {
        const stewardsDate = stewardsReckoning.parseDate("1 Enedhor 2360");
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("Leap Overlithe 760"))).toMatchObject({year: stewardsDate.year, month: stewardsDate.month, day: stewardsDate.day})
    })
})

describe("testing reckoning detection", () => {
    test("should return Steward's reckoning by unknown name", () => expect(reckonings.detectReckoning("","unknown")).toBe("stewards"))
    test("should return Steward's reckoning by missing name", () => expect(reckonings.detectReckoning("",undefined)).toBe("stewards"))

    test("should detect Steward's reckoning by name", () => expect(reckonings.detectReckoning("","stewards")).toBe("stewards"))
    test("should detect Steward's reckoning by alias", () => expect(reckonings.detectReckoning("","steward")).toBe("stewards"))

    test("should detect Shire reckoning by name", () => expect(reckonings.detectReckoning("","shire")).toBe("shire"))

    test("should detect Steward's reckoning by quenya language", () => expect(reckonings.detectReckoning("",undefined, "quenya")).toBe("stewards"))
    test("should detect Steward's reckoning by sindarin language", () => expect(reckonings.detectReckoning("",undefined, "sindarin")).toBe("stewards"))

    test("should detect Shire reckoning by shire language", () => expect(reckonings.detectReckoning("",undefined, "shire")).toBe("shire"))
    test("should detect Shire reckoning by bree language", () => expect(reckonings.detectReckoning("",undefined, "bree")).toBe("shire"))

    test("should detect Shire reckoning by date content", () => expect(reckonings.detectReckoning("25 Winterfilth 1418",undefined, undefined)).toBe("shire"))

    test("should detect Shire reckoning by name and date", () => expect(reckonings.detectReckoning("25 Winterfilth 1418","shire")).toBe("shire"))
})

