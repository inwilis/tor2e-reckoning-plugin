import {ReckoningDate} from "../ReckoningDate";
import {StewardsMonth} from "./StewardsMonth";
import {Reckoning} from "../Reckoning";
import {DayOfWeek} from "../DayOfWeek";
import {StewardsLocalization} from "./StewardsLocalization";

export class StewardsReckoningDate extends ReckoningDate<StewardsMonth> {
    constructor(reckoning: Reckoning<StewardsMonth>, year: number, month: StewardsMonth, day: number, language?: string) {
        if (year < 1) {
            throw new RangeError(`Year ${year} is before the Year 1 of the Third Age`)
        }

        super(reckoning, year, month, day, language)
    }

    getDayOfWeek(): DayOfWeek {
        const daysAfterReckoningStart = this.reckoning.getDaysBetween(this.reckoning.newDate(1, StewardsMonth.I1, 1), this);
        return (daysAfterReckoningStart + 3) % 7;
    }

    toString(language?: string): string {
        const targetLanguage = (language || this.language).toLowerCase()

        if (this.month.toString().startsWith("M") || this.month == StewardsMonth.I3L) {
            return `${this.day} ${StewardsLocalization.forMonthOfLanguage(this.month, targetLanguage)} ${this.year}`
        } else {
            return `${StewardsLocalization.forMonthOfLanguage(this.month, targetLanguage)} ${this.year}`
        }
    }

    toDayOfWeekString(language?: string): string {
        const targetLanguage = (language || this.language).toLowerCase()

        if (targetLanguage.toLowerCase() == "sindarin") {
            return StewardsLocalization.forDayOfWeek(this.getDayOfWeek()).sindarin

        } else {
            return StewardsLocalization.forDayOfWeek(this.getDayOfWeek()).quenya
        }
    }

    toMonthString(language?: string | undefined): string {
        const targetLanguage = (language || this.language).toLowerCase()

        return StewardsLocalization.forMonthOfLanguage(this.month, targetLanguage)
    }

    toDayAndMonthString(language?: string): string {
        const targetLanguage = (language || this.language).toLowerCase()

        if (this.month.toString().startsWith("M") || this.month == StewardsMonth.I3L) {
            return `${this.day} ${StewardsLocalization.forMonthOfLanguage(this.month, targetLanguage)}`
        } else {
            return `${StewardsLocalization.forMonthOfLanguage(this.month, targetLanguage)}`
        }
    }
}
