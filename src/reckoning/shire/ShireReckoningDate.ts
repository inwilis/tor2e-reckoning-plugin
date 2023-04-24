import {ReckoningDate} from "../ReckoningDate";
import {ShireMonth} from "./ShireMonth";
import {Reckoning} from "../Reckoning";
import {DayOfWeek} from "../DayOfWeek";
import {ShireLocalization} from "./ShireLocalization";
import {SHIRE_REFORM_YEAR, shireReckoning} from "./ShireReckoning";
import {SHIRE_RECKONING_START_IN_STEWARDS, STEWARDS_RECKONING_START} from "../stewards/StewardsReckoning";

export class ShireReckoningDate extends ReckoningDate<ShireMonth> {

    constructor(reckoning: Reckoning<ShireMonth>, year: number, month: ShireMonth, day: number, language?: string) {
        if (year < 1) {
            throw new RangeError(`Year ${year} is before the Year 1, when Shire-reckoning started`)
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
        if (this.getYearData().getDaysInMonth(this.month) > 1) {
            return `${this.day} ${ShireLocalization.forMonth(this.month).shire} ${this.year}`
        } else {
            return `${ShireLocalization.forMonth(this.month).shire} ${this.year}`
        }
    }

    toMonthString(language?: string): string {
        return ShireLocalization.forMonth(this.month).shire
    }

    toDayAndMonthString(language?: string): string {
        if (this.getYearData().getDaysInMonth(this.month) > 1) {
            return `${this.day} ${ShireLocalization.forMonth(this.month).shire}`
        } else {
            return `${ShireLocalization.forMonth(this.month).shire}`
        }
    }

    getSpecialEvent(): string {
        if (this.month == ShireMonth.YULE2) {
            return "New Year's day"
        } else if (this.month == ShireMonth.ASTRON && this.day == 1) {
            return "Mid-spring day"
        } else if (this.month == ShireMonth.LITHE1) {
            return "Midsummer's Eve"
        } else if (this.month == ShireMonth.OVERLITHE_MILLENNIAL) {
            return "Millennial Leap day"
        } else if (this.month == ShireMonth.MIDYEAR) {
            return "Midsummer day"
        } else if (this.month == ShireMonth.OVERLITHE) {
            return "Leap day"
        } else if (this.month == ShireMonth.LITHE2) {
            return "Day after Midsummer"
        } else if (this.month == ShireMonth.HALIMATH && this.day == 30) {
            return "Mid-autumn day"
        } else if (this.month == ShireMonth.YULE1) {
            return "New Year's Eve"
        }
        return ""
    }
}
