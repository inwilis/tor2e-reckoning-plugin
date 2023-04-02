import {stewardsReckoning} from "./stewards/StewardsReckoning";
import {shireReckoning} from "./shire/ShireReckoning";
import {ReckoningDate} from "./ReckoningDate";
import {StewardsMonth} from "./stewards/StewardsMonth";
import {ShireMonth} from "./shire/ShireMonth";
import {Reckoning} from "./Reckoning";

export const SHIRE_RECKONING_START_IN_STEWARDS = 1600

export const allReckonings: ReadonlyMap<string, Reckoning<any>> = new Map<string, Reckoning<any>>([
    ["stewards", stewardsReckoning],
    ["shire", shireReckoning]
]) as ReadonlyMap<string, Reckoning<any>>

export const reckoningTitles: ReadonlyMap<string, string> = new Map<string, string>([
    ["stewards", "Steward's Reckoning"],
    ["shire", "Shire Reckoning"],
])

const reckoningAliases: Map<string, string> = new Map<string, string>([
    ["steward", "stewards"],
    ["steward's", "stewards"],
])

const conversions: Map<string, (date: ReckoningDate<any>) => ReckoningDate<any>> = new Map<string, (date: ReckoningDate<any>) => ReckoningDate<any>>([
    ["stewards->stewards", conversionNotRequired],
    ["shire->shire", conversionNotRequired],
    ["stewards->shire", convertStewardsToShireReckoning],
    ["shire->stewards", convertShireToStewardsReckoning],
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

        if (date && shireReckoning.hasKnownMonth(date)) {
            return shireReckoning.getName()
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

function convertShireToStewardsReckoning(date: ReckoningDate<ShireMonth>): ReckoningDate<StewardsMonth> {
    const stewardsYear = date.year + SHIRE_RECKONING_START_IN_STEWARDS

    return stewardsReckoning.getDate(stewardsYear, date.getDayOfYear())
}

function conversionNotRequired<M extends number | string>(date: ReckoningDate<M>): ReckoningDate<M> {
    return date
}
