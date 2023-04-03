import {ReckoningDate} from "../ReckoningDate";
import {ShireMonth} from "./ShireMonth";
import {Reckoning} from "../Reckoning";
import {DayOfWeek} from "../DayOfWeek";
import {STEWARDS_RECKONING_START} from "../stewards/StewardsReckoning";
import {SHIRE_RECKONING_START_IN_STEWARDS} from "../Reckonings";
import {ShireLocalization} from "./ShireLocalization";
import {SHIRE_REFORM_YEAR, shireReckoning} from "./ShireReckoning";

export class ShireReckoningDate extends ReckoningDate<ShireMonth> {

    constructor(reckoning: Reckoning<ShireMonth>, year: number, month: ShireMonth, day: number, language?: string) {
        if (year < 1) {
            throw new RangeError(`Year ${year} is before the Year 1, when Shire-Reckoning started`)
        }

        super(reckoning, year, month, day, language)
    }

    getDayOfWeek(): DayOfWeek {
        if (this.year < (STEWARDS_RECKONING_START - SHIRE_RECKONING_START_IN_STEWARDS)) {
            const daysAfterReckoningStart = shireReckoning.getDaysBetween(this.reckoning.newDate(1, ShireMonth.YULE2, 1), this)
            return (daysAfterReckoningStart + 1) % 7 // First day of first Shire year is 2d day of week (like in King's Reckoning for this date)
        } else if (this.year < SHIRE_REFORM_YEAR) {
            const daysAfterReckoningStart = shireReckoning.getDaysBetween(this.reckoning.newDate(STEWARDS_RECKONING_START - SHIRE_RECKONING_START_IN_STEWARDS, ShireMonth.YULE2, 1), this)
            return (daysAfterReckoningStart) % 7 // In year 460 (2060) Steward's Calendar started and Yestare/2 Yule was reset to 1st day of week
        } else {
            const dayOfYear = this.getDayOfYear();
            if (dayOfYear <= 182) {
                return (dayOfYear - 1) % 7
            } else if (this.month == ShireMonth.MIDYEAR) {
                return DayOfWeek.D7
            } else if (this.month == ShireMonth.OVERLITHE) {
                return DayOfWeek.D1
            } else {
                const lithe2Day = shireReckoning.getYearData(this.year).monthDays[ShireMonth.LITHE2][0];
                return (dayOfYear - lithe2Day) % 7
            }
        }
    }

    toString(language?: string): string {
        const yearData = shireReckoning.getYearData(this.year);

        if (yearData.monthDays[this.month][1] > yearData.monthDays[this.month][0]) {
            return `${this.day} ${ShireLocalization.forMonth(this.month).shire} ${this.year}`
        } else {
            return `${ShireLocalization.forMonth(this.month).shire} ${this.year}`
        }
    }

    toDayOfWeekString(language?: string): string {
        return ShireLocalization.forDayOfWeek(this.getDayOfWeek()).shire
    }

    toMonthString(language?: string | undefined): string {
        return ShireLocalization.forMonth(this.month).shire
    }
}
