import {describe, expect, test} from "@jest/globals";
import {ReckoningConversion} from "../../src/reckoning/ReckoningConversion";
import {StewardsReckoning} from "../../src/reckoning/stewards/StewardsReckoning";
import {ShireReckoning} from "../../src/reckoning/shire/ShireReckoning";

describe("testing ReckoningConversion.toShireReckoning", () => {

    test("battle of the Pellenor", () => {
        expect(ReckoningConversion.toShireReckoning(StewardsReckoning.parseDate("15 Gwaeron 3019"))).toStrictEqual(ShireReckoning.parseDate("15 Rethe 1419"))
    })

    test("council of Elrond", () => {
        expect(ReckoningConversion.toShireReckoning(StewardsReckoning.parseDate("25 Narbeleth 3018"))).toStrictEqual(ShireReckoning.parseDate("25 Winterfilth 1418"))
    })

    test("meeting of Gandalf and Radagast", () => {
        expect(ReckoningConversion.toShireReckoning(StewardsReckoning.parseDate("Lawenedh 3018"))).toStrictEqual(ShireReckoning.parseDate("Mid-Year's Day 1418"))
    })

    test("Iestor 3018", () => {
        expect(ReckoningConversion.toShireReckoning(StewardsReckoning.parseDate("Iestor 3018"))).toStrictEqual(ShireReckoning.parseDate("2 Yule 1418"))
    })

    test("1 Gwirith 2360", () => {
        expect(ReckoningConversion.toShireReckoning(StewardsReckoning.parseDate("1 Gwirith 2360"))).toStrictEqual(ShireReckoning.parseDate("2 Astron 760"))
    })

    test("1 Enedhor 2360", () => {
        expect(ReckoningConversion.toShireReckoning(StewardsReckoning.parseDate("1 Enedhor 2360"))).toStrictEqual(ShireReckoning.parseDate("Leap Overlithe 760"))
    })
})

describe("testing ReckoningConversion.toStewardsReckoning", () => {

    test("battle of the Pellenor", () => {
        expect(ReckoningConversion.toStewardsReckoning(ShireReckoning.parseDate("15 Rethe 1419"))).toStrictEqual(StewardsReckoning.parseDate("15 Gwaeron 3019"))
    })

    test("council of Elrond", () => {
        expect(ReckoningConversion.toStewardsReckoning(ShireReckoning.parseDate("25 Winterfilth 1418"))).toStrictEqual(StewardsReckoning.parseDate("25 Narbeleth 3018"))
    })

    test("meeting of Gandalf and Radagast", () => {
        expect(ReckoningConversion.toStewardsReckoning(ShireReckoning.parseDate("Mid-Year's Day 1418"))).toStrictEqual(StewardsReckoning.parseDate("Lawenedh 3018"))
    })

    test("Iestor 3018", () => {
        expect(ReckoningConversion.toStewardsReckoning(ShireReckoning.parseDate("2 Yule 1418"))).toStrictEqual(StewardsReckoning.parseDate("Iestor 3018"))
    })

    test("1 Gwirith 2360", () => {
        expect(ReckoningConversion.toStewardsReckoning(ShireReckoning.parseDate("2 Astron 760"))).toStrictEqual(StewardsReckoning.parseDate("1 Gwirith 2360"))
    })

    test("1 Enedhor 2360", () => {
        expect(ReckoningConversion.toStewardsReckoning(ShireReckoning.parseDate("Leap Overlithe 760"))).toStrictEqual(StewardsReckoning.parseDate("1 Enedhor 2360"))
    })
})
