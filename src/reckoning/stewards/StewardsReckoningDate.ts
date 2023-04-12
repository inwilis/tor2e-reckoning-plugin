import {ReckoningDate} from "../ReckoningDate";
import {StewardsMonth} from "./StewardsMonth";
import {Reckoning} from "../Reckoning";
import {DayOfWeek} from "../DayOfWeek";
import {StewardsLocalization} from "./StewardsLocalization";
import {STEWARDS_RECKONING_START} from "./StewardsReckoning";

export class StewardsReckoningDate extends ReckoningDate<StewardsMonth> {
    constructor(reckoning: Reckoning<StewardsMonth>, year: number, month: StewardsMonth, day: number, language?: string) {
        if (year < 1) {
            throw new RangeError(`Year ${year} is before the Year 1 of the Third Age`)
        }

        super(reckoning, year, month, day, language)
    }

    getDayOfWeek(): DayOfWeek {
        const daysAfterReckoningStart = this.reckoning.getDaysBetween(this.reckoning.newDate(1, StewardsMonth.YESTARE, 1), this);
        return (daysAfterReckoningStart + 3) % 7;
    }

    toString(language?: string): string {
        const targetLanguage = (language || this.language).toLowerCase()

        if (this.getYearData().getDaysInMonth(this.month) > 1) {
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

        if (this.getYearData().getDaysInMonth(this.month) > 1) {
            return `${this.day} ${StewardsLocalization.forMonthOfLanguage(this.month, targetLanguage)}`
        } else {
            return `${StewardsLocalization.forMonthOfLanguage(this.month, targetLanguage)}`
        }
    }

    getSpecialEvent(): string {
        if (this.month == StewardsMonth.YESTARE) {
            return "New Year's day"
        } else if (this.month == StewardsMonth.TUILERE || (this.year < STEWARDS_RECKONING_START && this.month == StewardsMonth.VIRESSE && this.day == 1)) {
            return "Mid-spring day"
        } else if (this.month == StewardsMonth.LOENDE) {
            return "Midsummer day"
        } else if (this.month == StewardsMonth.ENDERE) {
            const yearData = this.getYearData()
            if (this.day == yearData.getLastDay(this.month) - 1) {
                return "Midsummer day"
            } else {
                return "Middle-day"
            }
        } else if (this.month == StewardsMonth.YAVIERE || (this.year < STEWARDS_RECKONING_START && this.month == StewardsMonth.YAVANNIE && this.day == 30)) {
            return "Mid-autumn day"
        } else if (this.month == StewardsMonth.METTARE) {
            return "New Year's Eve"
        }
        return ""
    }
}
