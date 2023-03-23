import {describe, expect, test} from "@jest/globals";
import {reckonings} from "../../src/reckoning/Reckonings";
import {stewardsReckoning} from "../../src/reckoning/stewards/StewardsReckoning";
import {shireReckoning} from "../../src/reckoning/shire/ShireReckoning";

describe("testing conversion from Steward's to Shire-reckoning", () => {

    test("battle of the Pellenor", () => {
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("15 Gwaeron 3019"))).toStrictEqual(shireReckoning.parseDate("15 Rethe 1419"))
    })

    test("council of Elrond", () => {
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("25 Narbeleth 3018"))).toStrictEqual(shireReckoning.parseDate("25 Winterfilth 1418"))
    })

    test("meeting of Gandalf and Radagast", () => {
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("Lawenedh 3018"))).toStrictEqual(shireReckoning.parseDate("Mid-Year's Day 1418"))
    })

    test("Iestor 3018", () => {
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("Iestor 3018"))).toStrictEqual(shireReckoning.parseDate("2 Yule 1418"))
    })

    test("1 Gwirith 2360", () => {
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("1 Gwirith 2360"))).toStrictEqual(shireReckoning.parseDate("2 Astron 760"))
    })

    test("1 Enedhor 2360", () => {
        expect(reckonings.toReckoning("shire", stewardsReckoning.parseDate("1 Enedhor 2360"))).toStrictEqual(shireReckoning.parseDate("Leap Overlithe 760"))
    })
})

describe("testing conversion from Shire-reckoning to Steward's", () => {

    test("battle of the Pellenor", () => {
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("15 Rethe 1419"))).toStrictEqual(stewardsReckoning.parseDate("15 Gwaeron 3019"))
    })

    test("council of Elrond", () => {
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("25 Winterfilth 1418"))).toStrictEqual(stewardsReckoning.parseDate("25 Narbeleth 3018"))
    })

    test("meeting of Gandalf and Radagast", () => {
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("Mid-Year's Day 1418"))).toStrictEqual(stewardsReckoning.parseDate("Lawenedh 3018"))
    })

    test("Iestor 3018", () => {
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("2 Yule 1418"))).toStrictEqual(stewardsReckoning.parseDate("Iestor 3018"))
    })

    test("1 Gwirith 2360", () => {
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("2 Astron 760"))).toStrictEqual(stewardsReckoning.parseDate("1 Gwirith 2360"))
    })

    test("1 Enedhor 2360", () => {
        expect(reckonings.toReckoning("stewards", shireReckoning.parseDate("Leap Overlithe 760"))).toStrictEqual(stewardsReckoning.parseDate("1 Enedhor 2360"))
    })
})
