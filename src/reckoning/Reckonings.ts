import {stewardsReckoning} from "./stewards/StewardsReckoning";
import {shireReckoning} from "./shire/ShireReckoning";
import {ReckoningDate} from "./ReckoningDate";
import {StewardsMonth} from "./stewards/StewardsMonth";
import {ShireMonth} from "./shire/ShireMonth";
import {Reckoning} from "./Reckoning";
import {breeReckoning} from "./bree/BreeReckoning";
import {BreeMonth} from "./bree/BreeMonth";

export const SHIRE_RECKONING_START_IN_STEWARDS = 1600

export const BREE_RECKONING_START_IN_STEWARDS = 1299

export const allReckonings: ReadonlyMap<string, Reckoning<any>> = new Map<string, Reckoning<any>>([
    ["stewards", stewardsReckoning],
    ["shire", shireReckoning],
    ["bree", breeReckoning]
]) as ReadonlyMap<string, Reckoning<any>>

export const reckoningTitles: ReadonlyMap<string, string> = new Map<string, string>([
    ["stewards", "Steward's Reckoning"],
    ["shire", "Shire Reckoning"],
    ["bree", "Bree Reckoning"]
])

const reckoningAliases: Map<string, string> = new Map<string, string>([
    ["steward", "stewards"],
    ["steward's", "stewards"],
])

const conversions: Map<string, (date: ReckoningDate<any>) => ReckoningDate<any>> = new Map<string, (date: ReckoningDate<any>) => ReckoningDate<any>>([
    ["stewards->stewards", conversionNotRequired],
    ["shire->shire", conversionNotRequired],
    ["bree->bree", conversionNotRequired],
    ["stewards->shire", convertStewardsToShireReckoning],
    ["stewards->bree", convertStewardsToBreeReckoning],
    ["shire->stewards", convertShireToStewardsReckoning],
    ["shire->bree", convertShireToBreeReckoning],
    ["bree->stewards", convertBreeToStewardsReckoning],
    ["bree->shire", convertBreeToShireReckoning],
])

export const reckonings = {

    getReckoning(name: string): Reckoning<any> {
        const reckoning = getReckoning(name)
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

    detectReckoning(date: string, reckoning?: string, language?: string): string {
        if (reckoning) {
            return getReckoning(reckoning)?.getName() || "stewards"
        }

        if (language) {
            for (let reckoning of allReckonings.values()) {
                if (reckoning.getSupportedLanguages().includes(language)) {
                    return reckoning.getName()
                }
            }
        }

        return "stewards"
    }
}

function getReckoning(name: string): Reckoning<any> | undefined {
    const exactName = reckoningAliases.has(name.toLowerCase()) ? reckoningAliases.get(name.toLowerCase()) : name.toLowerCase()
    return allReckonings.get(exactName || "")
}

function convertStewardsToShireReckoning(date: ReckoningDate<StewardsMonth>): ReckoningDate<ShireMonth> {
    const shireYear = date.year - SHIRE_RECKONING_START_IN_STEWARDS

    return shireReckoning.getDate(shireYear, date.getDayOfYear())
}

function convertStewardsToBreeReckoning(date: ReckoningDate<StewardsMonth>): ReckoningDate<BreeMonth> {
    const shireYear = date.year - BREE_RECKONING_START_IN_STEWARDS

    return breeReckoning.getDate(shireYear, date.getDayOfYear())
}

function convertShireToStewardsReckoning(date: ReckoningDate<ShireMonth>): ReckoningDate<StewardsMonth> {
    const stewardsYear = date.year + SHIRE_RECKONING_START_IN_STEWARDS

    return stewardsReckoning.getDate(stewardsYear, date.getDayOfYear())
}

function convertShireToBreeReckoning(date: ReckoningDate<ShireMonth>): ReckoningDate<BreeMonth> {
    const stewardsYear = date.year + SHIRE_RECKONING_START_IN_STEWARDS - BREE_RECKONING_START_IN_STEWARDS

    return breeReckoning.getDate(stewardsYear, date.getDayOfYear())
}

function convertBreeToStewardsReckoning(date: ReckoningDate<BreeMonth>): ReckoningDate<StewardsMonth> {
    const shireYear = date.year + BREE_RECKONING_START_IN_STEWARDS

    return stewardsReckoning.getDate(shireYear, date.getDayOfYear())
}

function convertBreeToShireReckoning(date: ReckoningDate<BreeMonth>): ReckoningDate<ShireMonth> {
    const shireYear = date.year - SHIRE_RECKONING_START_IN_STEWARDS + BREE_RECKONING_START_IN_STEWARDS

    return shireReckoning.getDate(shireYear, date.getDayOfYear())
}

function conversionNotRequired<M extends number | string>(date: ReckoningDate<M>): ReckoningDate<M> {
    return date
}
