import {BREE_RECKONING_START_IN_STEWARDS, SHIRE_RECKONING_START_IN_STEWARDS, stewardsReckoning} from "./stewards/StewardsReckoning";
import {shireReckoning} from "./shire/ShireReckoning";
import {ReckoningDate} from "./ReckoningDate";
import {StewardsMonth} from "./stewards/StewardsMonth";
import {ShireMonth} from "./shire/ShireMonth";
import {Reckoning} from "./Reckoning";
import {breeReckoning} from "./bree/BreeReckoning";
import {BreeMonth} from "./bree/BreeMonth";

export const allReckonings: ReadonlyMap<string, Reckoning<any>> = new Map<string, Reckoning<any>>([
    ["stewards", stewardsReckoning],
    ["shire", shireReckoning],
    ["bree", breeReckoning]
]) as ReadonlyMap<string, Reckoning<any>>

const reckoningAliases: Map<string, string> = new Map<string, string>([
    ["steward", "stewards"],
    ["steward's", "stewards"],
    ["king's", "stewards"],
    ["kings", "stewards"],
    ["king", "stewards"],
])

const conversionPossible: Map<string, (year: number) => boolean> = new Map<string, (year: number) => boolean>([
    ["stewards->stewards", () => true],
    ["shire->shire", () => true],
    ["bree->bree", () => true],
    ["stewards->shire", (year) => convertStewardsToShireYear(year) > 0],
    ["shire->stewards", () => true],
    ["stewards->bree", year => convertStewardsToBreeYear(year) > 0],
    ["bree->stewards", () => true],
    ["shire->bree", year => convertStewardsToBreeYear(convertShireToStewardsYear(year)) > 0],
    ["bree->shire", year => convertStewardsToShireYear(convertBreeToStewardsYear(year)) > 0],
])

const yearConversions: Map<string, (year: number) => number> = new Map<string, (year: number) => number>([
    ["stewards->stewards", conversionNotRequired],
    ["shire->shire", conversionNotRequired],
    ["bree->bree", conversionNotRequired],
    ["stewards->shire", convertStewardsToShireYear],
    ["shire->stewards", convertShireToStewardsYear],
    ["stewards->bree", convertStewardsToBreeYear],
    ["bree->stewards", convertBreeToStewardsYear],
    ["shire->bree", d => convertStewardsToBreeYear(convertShireToStewardsYear(d))],
    ["bree->shire", d => convertStewardsToShireYear(convertBreeToStewardsYear(d))],
])

const conversions: Map<string, (date: ReckoningDate<any>) => ReckoningDate<any>> = new Map<string, (date: ReckoningDate<any>) => ReckoningDate<any>>([
    ["stewards->stewards", conversionNotRequired],
    ["shire->shire", conversionNotRequired],
    ["bree->bree", conversionNotRequired],
    ["stewards->shire", convertStewardsToShireReckoning],
    ["shire->stewards", convertShireToStewardsReckoning],
    ["stewards->bree", convertStewardsToBreeReckoning],
    ["bree->stewards", convertBreeToStewardsReckoning],
    ["shire->bree", d => convertStewardsToBreeReckoning(convertShireToStewardsReckoning(d))],
    ["bree->shire", d => convertStewardsToShireReckoning(convertBreeToStewardsReckoning(d))],
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

    isConversionPossible(fromReckoning: string, targetReckoning: string, year: number): boolean {
        const exactTargetName = reckoningAliases.has(targetReckoning.toLowerCase()) ? reckoningAliases.get(targetReckoning.toLowerCase()) : targetReckoning.toLowerCase()

        const conversion = conversionPossible.get(`${fromReckoning}->${exactTargetName || ""}`);
        if (conversion) {
            return conversion(year)
        } else {
            return false
        }
    },

    convertIfPossible(targetReckoning: string, date: ReckoningDate<any>): ReckoningDate<any> | null {
        if (this.isConversionPossible(date.reckoningName, targetReckoning, date.year)) {
            return this.toReckoning(targetReckoning, date)
        } else {
            return null
        }
    },

    yearToReckoning(fromReckoning: string, targetReckoning: string, year: number): number {
        const exactTargetName = reckoningAliases.has(targetReckoning.toLowerCase()) ? reckoningAliases.get(targetReckoning.toLowerCase()) : targetReckoning.toLowerCase()

        const conversion = yearConversions.get(`${fromReckoning}->${exactTargetName || ""}`);
        if (conversion) {
            return conversion(year)
        } else {
            throw new Error(`Unknown conversion: "${fromReckoning}" to "${targetReckoning}"`)
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

function convertShireToStewardsYear(year: number): number {
    return year + SHIRE_RECKONING_START_IN_STEWARDS

}

function convertStewardsToShireYear(year: number): number {
    return year - SHIRE_RECKONING_START_IN_STEWARDS

}

function convertBreeToStewardsYear(year: number): number {
    return year + BREE_RECKONING_START_IN_STEWARDS

}

function convertStewardsToBreeYear(year: number): number {
    return year - BREE_RECKONING_START_IN_STEWARDS

}

function convertStewardsToShireReckoning(date: ReckoningDate<StewardsMonth>): ReckoningDate<ShireMonth> {
    return shireReckoning.getDate(convertStewardsToShireYear(date.year), date.getDayOfYear())

}

function convertStewardsToBreeReckoning(date: ReckoningDate<StewardsMonth>): ReckoningDate<BreeMonth> {
    return breeReckoning.getDate(convertStewardsToBreeYear(date.year), date.getDayOfYear())

}

function convertShireToStewardsReckoning(date: ReckoningDate<ShireMonth>): ReckoningDate<StewardsMonth> {
    return stewardsReckoning.getDate(convertShireToStewardsYear(date.year), date.getDayOfYear())


}

function convertBreeToStewardsReckoning(date: ReckoningDate<BreeMonth>): ReckoningDate<StewardsMonth> {
    return stewardsReckoning.getDate(convertBreeToStewardsYear(date.year), date.getDayOfYear())


}

// function yearConversionNotRequired<M extends number | string>(date: ReckoningDate<M>): ReckoningDate<M> {
//     return date

// }
function conversionNotRequired<T>(date: T): T {
    return date

}
