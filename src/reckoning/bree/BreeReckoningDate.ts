import {ReckoningDate} from "../ReckoningDate";
import {BreeMonth} from "./BreeMonth";
import {Reckoning} from "../Reckoning";
import {DayOfWeek} from "../DayOfWeek";
import {STEWARDS_RECKONING_START} from "../stewards/StewardsReckoning";
import {BREE_RECKONING_START_IN_STEWARDS} from "../Reckonings";
import {BreeLocalization} from "./BreeLocalization";
import {breeReckoning, SHIRE_REFORM_YEAR_IN_BREE} from "./BreeReckoning";

export class BreeReckoningDate extends ReckoningDate<BreeMonth> {

    constructor(reckoning: Reckoning<BreeMonth>, year: number, month: BreeMonth, day: number, language?: string) {
        if (year < 1) {
            throw new RangeError(`Year ${year} is before the Year 1, when Shire-Reckoning started`)
        }

        super(reckoning, year, month, day, language)
    }

    getDayOfWeek(): DayOfWeek {
        if (this.year < (STEWARDS_RECKONING_START - BREE_RECKONING_START_IN_STEWARDS)) {
            const daysAfterReckoningStart = breeReckoning.getDaysBetween(this.reckoning.newDate(1, BreeMonth.YULE2, 1), this)
            return (daysAfterReckoningStart + 6) % 7 // First day of first Bree year is 7th day of week (like in King's Reckoning for this date)
        } else if (this.year < SHIRE_REFORM_YEAR_IN_BREE) {
            const daysAfterReckoningStart = breeReckoning.getDaysBetween(this.reckoning.newDate(STEWARDS_RECKONING_START - BREE_RECKONING_START_IN_STEWARDS, BreeMonth.YULE2, 1), this)
            return (daysAfterReckoningStart) % 7 // In year 761 (2060) Steward's Calendar started and Yestare/2 Yule was reset to 1st day of week
        } else {
            const dayOfYear = this.getDayOfYear();
            if (dayOfYear <= 182) {
                return (dayOfYear - 1) % 7
            } else if (this.month == BreeMonth.SUMMERDAYS) {
                if (this.day <= 2) {
                    return DayOfWeek.D7
                } else {
                    return DayOfWeek.D1
                }
            } else {
                const lastSummerday = breeReckoning.getYearData(this.year).monthDays[BreeMonth.SUMMERDAYS][1];
                return (dayOfYear - lastSummerday) % 7
            }
        }
    }

    toString(language?: string): string {
        const yearData = breeReckoning.getYearData(this.year);

        if (yearData.monthDays[this.month][1] > yearData.monthDays[this.month][0]) {
            return `${this.day} ${BreeLocalization.forMonth(this.month).bree} ${this.year}`
        } else {
            return `${BreeLocalization.forMonth(this.month).bree} ${this.year}`
        }
    }

    toDayOfWeekString(language?: string): string {
        return BreeLocalization.forDayOfWeek(this.getDayOfWeek()).bree
    }

    toMonthString(language?: string): string {
        return BreeLocalization.forMonth(this.month).bree
    }
}
