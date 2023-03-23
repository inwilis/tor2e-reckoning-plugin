import {StewardsReckoning, StewardsReckoningDate} from "./stewards/StewardsReckoning";
import {ShireReckoning, ShireReckoningDate} from "./shire/ShireReckoning";

export const SHIRE_RECKONING_START_IN_STEWARDS = 1600

export const ReckoningConversion = {

    toShireReckoning(date: StewardsReckoningDate): ShireReckoningDate {
        const shireYear = date.year - SHIRE_RECKONING_START_IN_STEWARDS

        return ShireReckoning.getDate(shireYear, date.getDayOfYear())
    },

    toStewardsReckoning(date: ShireReckoningDate): StewardsReckoningDate {
        const stewardsYear = date.year + SHIRE_RECKONING_START_IN_STEWARDS

        return StewardsReckoning.getDate(stewardsYear, date.getDayOfYear())
    }

}
