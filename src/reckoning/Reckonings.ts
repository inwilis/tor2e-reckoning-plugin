import {stewardsReckoning} from "./stewards/StewardsReckoning";
import {shireReckoning} from "./shire/ShireReckoning";
import {ReckoningDate} from "./ReckoningDate";
import {StewardsMonth} from "./stewards/StewardsMonth";
import {ShireMonth} from "./shire/ShireMonth";
import {Reckoning} from "./Reckoning";

export const SHIRE_RECKONING_START_IN_STEWARDS = 1600

export const Reckonings = {

    getReckoning(reckoning: string): Reckoning<any> {
        if (reckoning.toLowerCase() == "stewards" || reckoning.toLowerCase() == "steward's" || reckoning.toLowerCase() == "steward") {
            return stewardsReckoning
        } else if (reckoning.toLowerCase() == "shire") {
            return shireReckoning
        } else {
            throw new Error(`Unknown reckoning: "${reckoning}"`)
        }
    },

    toReckoning(reckoning: string, date: ReckoningDate<any>): ReckoningDate<any> {
        if (reckoning.toLowerCase() == "stewards" || reckoning.toLowerCase() == "steward's" || reckoning.toLowerCase() == "steward") {
            if (date.reckoning.getName() == "shire") {
                return this.convertShireToStewardsReckoning(date)
            }

            throw new Error(`Unknown conversion: "${date.reckoning.getName()}" to "${reckoning}"`)

        } else if (reckoning.toLowerCase() == "shire") {
            if (date.reckoning.getName() == "stewards") {
                return this.convertStewardsToShireReckoning(date)
            }

            throw new Error(`Unknown conversion: "${date.reckoning.getName()}" to "${reckoning}"`)

        } else {
            throw new Error(`Unknown reckoning: "${reckoning}"`)
        }
    },

    convertStewardsToShireReckoning(date: ReckoningDate<StewardsMonth>): ReckoningDate<ShireMonth> {
        const shireYear = date.year - SHIRE_RECKONING_START_IN_STEWARDS

        return shireReckoning.getDate(shireYear, date.getDayOfYear())
    },

    convertShireToStewardsReckoning(date: ReckoningDate<ShireMonth>): ReckoningDate<StewardsMonth> {
        const stewardsYear = date.year + SHIRE_RECKONING_START_IN_STEWARDS

        return stewardsReckoning.getDate(stewardsYear, date.getDayOfYear())
    }

}
