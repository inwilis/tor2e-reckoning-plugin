import {YearType} from "./YearType";
import {YearData} from "./YearData";
import {ReckoningDate} from "./ReckoningDate";
import {Localization} from "./Localization";

export abstract class Reckoning<M extends number | string> {

    abstract getName(): string

    abstract getYearType(year: number): YearType

    abstract getYearData(year: number): YearData<M>

    abstract newDate(year: number, month: M, day: number, language?: string): ReckoningDate<M>

    getSupportedLanguages(): string[] {
        return [this.getName()]
    }

    getDefaultLanguage(): string {
        return this.getName()
    }

    abstract getLocalization(): Localization<M>

    abstract parseDate(date: string, language?: string): ReckoningDate<M>

    abstract isLeapYear(year: number): boolean

    daysInYear(year: number): number {
        return this.getYearData(year).length;
    }

    nextMonth(month: M, year: number): M {
        return this.getYearData(year).getNextMonth(month)
    }

    getDate(year: number, dayOfYear: number, language?: string): ReckoningDate<M> {
        if (dayOfYear < 0) {
            throw new RangeError(`Day of year must start from 1, got ${dayOfYear} instead`)
        }

        const yearDatum = this.getYearData(year);
        const month = yearDatum.getMonthForDayOfYear(dayOfYear);

        return this.newDate(year, month, dayOfYear - yearDatum.getFirstDay(month) + 1, language)
    }

    getDaysBetween(first: ReckoningDate<M>, second: ReckoningDate<M>): number {
        if (first.isEqual(second)) {
            return 0
        } else if (second.isBefore(first)) {
            return this.getDaysBetween(second, first)
        } else {
            let days: number = 0
            for (let year = first.year; year < second.year; year++) {
                days += this.getYearData(year).length
            }
            days -= first.getDayOfYear()
            days += second.getDayOfYear()

            return days
        }
    }

}
