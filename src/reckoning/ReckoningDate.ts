import {DayOfWeek} from "./DayOfWeek";
import {Reckoning} from "./Reckoning";

export abstract class ReckoningDate<M extends number | string> {

    readonly language: string

    protected constructor(readonly reckoning: Reckoning<M>, readonly year: number, readonly month: M, readonly day: number, language?: string) {
        const yearData = reckoning.getYearData(year);

        if (!yearData.hasMonth(month)) {
            throw new RangeError(`${yearData.type} year ${year} has no month ${month}`)
        }

        if (day < 1) {
            throw new RangeError(`Incorrect day of month: ${day}`)
        }

        const daysInMonth = yearData.getDaysInMonth(month)
        if (day > daysInMonth) {
            throw new RangeError(`Incorrect day of month: ${day}. ${month} has only ${daysInMonth} days`)
        }

        this.year = year;
        this.month = month;
        this.day = day;

        this.language = language || reckoning.getDefaultLanguage()
    }

    isBefore(other: typeof this) {
        return (this.year < other.year) || (this.year == other.year && this.getDayOfYear() < other.getDayOfYear())
    }

    isEqual(other: typeof this) {
        return this.year == other.year && this.month == other.month && this.day == other.day
    }

    getDayOfYear(): number {
        return this.reckoning.getYearData(this.year).getFirstDay(this.month) + this.day - 1;
    }


    abstract getDayOfWeek(): DayOfWeek

    abstract toString(language?: string): string

    abstract toDayOfWeekString(language?: string): string
}
