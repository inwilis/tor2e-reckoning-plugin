import {stewardsReckoning} from "./stewards/StewardsReckoning";
import {shireReckoning} from "./shire/ShireReckoning";
import {ReckoningDate} from "./ReckoningDate";
import {StewardsMonth} from "./stewards/StewardsMonth";
import {ShireMonth} from "./shire/ShireMonth";
import {Reckoning} from "./Reckoning";

export const SHIRE_RECKONING_START_IN_STEWARDS = 1600

export const allReckonings: ReadonlyMap<string, Reckoning<any>> = new Map<string, Reckoning<any>>([
    [stewardsReckoning.getName(), stewardsReckoning],
    [shireReckoning.getName(), shireReckoning]
]) as ReadonlyMap<string, Reckoning<any>>

const reckoningAliases: Map<string, string> = new Map<string, string>([
    ["steward", "stewards"],
    ["steward's", "stewards"],
])

const conversions: Map<string, (date: ReckoningDate<any>) => ReckoningDate<any>> = new Map<string, (date: ReckoningDate<any>) => ReckoningDate<any>>([
    ["stewards->shire", convertStewardsToShireReckoning],
    ["shire->stewards", convertShireToStewardsReckoning],
])

export const reckonings = {

    getReckoning(name: string): Reckoning<any> {
        const exactName = reckoningAliases.has(name.toLowerCase()) ? reckoningAliases.get(name.toLowerCase()) : name.toLowerCase()
        const reckoning = allReckonings.get(exactName || "")
        if (reckoning) {
            return reckoning
        } else {
            throw new Error(`Unknown reckoning: "${name}"`)
        }
    },

    toReckoning(targetReckoning: string, date: ReckoningDate<any>): ReckoningDate<any> {
        const exactTargetName = reckoningAliases.has(targetReckoning.toLowerCase()) ? reckoningAliases.get(targetReckoning.toLowerCase()) : targetReckoning.toLowerCase()

        const conversion = conversions.get(`${date.reckoning.getName()}->${exactTargetName || ""}`);
        if (conversion) {
            return conversion(date)
        } else {
            throw new Error(`Unknown conversion: "${date.reckoning.getName()}" to "${targetReckoning}"`)
        }
    },
}

function convertStewardsToShireReckoning(date: ReckoningDate<StewardsMonth>): ReckoningDate<ShireMonth> {
    const shireYear = date.year - SHIRE_RECKONING_START_IN_STEWARDS

    return shireReckoning.getDate(shireYear, date.getDayOfYear())
}

function convertShireToStewardsReckoning(date: ReckoningDate<ShireMonth>): ReckoningDate<StewardsMonth> {
    const stewardsYear = date.year + SHIRE_RECKONING_START_IN_STEWARDS

    return stewardsReckoning.getDate(stewardsYear, date.getDayOfYear())
}
