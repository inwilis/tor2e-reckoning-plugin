import {DayOfWeek} from "./DayOfWeek";
import {Reckoning} from "./Reckoning";
import {YearData} from "./YearData";

export abstract class ReckoningDate<M extends number | string> {
    readonly reckoningName: string
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
        this.reckoningName = reckoning.getName()
        this.language = language && reckoning.getSupportedLanguages().includes(language) ? language : reckoning.getDefaultLanguage()
    }

    isBefore(other: typeof this) {
        return (this.year < other.year) || (this.year == other.year && this.getDayOfYear() < other.getDayOfYear())
    }

    isAfter(other: typeof this) {
        return (this.year > other.year) || (this.year == other.year && this.getDayOfYear() > other.getDayOfYear())
    }

    isEqual(other: typeof this) {
        return this.reckoning.getName() == other.reckoning.getName() && this.year == other.year && this.month == other.month && this.day == other.day
    }

    getDayOfYear(): number {
        return this.reckoning.getYearData(this.year).getFirstDay(this.month) + this.day - 1;
    }

    getYearData(): YearData<M> {
        return this.reckoning.getYearData(this.year)
    }

    plusDays(days: number): ReckoningDate<M> {
        if (days == 0) {
            return this
        }

        if (days < 0) {
            return this.minusDays(Math.abs(days))
        }


        let newDayOfYear = this.getDayOfYear() + days
        let newYear = this.year

        let yearData = this.reckoning.getYearData(newYear)

        while (newDayOfYear > yearData.length) {
            newDayOfYear -= yearData.length
            newYear += 1
            yearData = this.reckoning.getYearData(newYear);
        }

        return this.reckoning.getDate(newYear, newDayOfYear, this.language)
    }

    minusDays(days: number): ReckoningDate<M> {
        if (days == 0) {
            return this
        }

        if (days < 0) {
            return this.minusDays(Math.abs(days))
        }

        let newDayOfYear = this.getDayOfYear() - days
        let newYear = this.year

        while (newDayOfYear < 1) {
            newYear -= 1
            if (newYear < 1) {
                return this
            }
            const yearData = this.reckoning.getYearData(newYear)
            newDayOfYear += yearData.length
        }

        return this.reckoning.getDate(newYear, newDayOfYear, this.language)
    }

    plusMonths(months: number): ReckoningDate<M> {
        if (months == 0) {
            return this
        }

        if (months < 0) {
            return this.minusMonths(Math.abs(months))
        }

        let newYear = this.year
        let newMonth = this.month
        let yearData = this.reckoning.getYearData(newYear)

        for (let i = 0; i < Math.abs(months); i++) {
            if (newMonth == yearData.getLastMonth()) {
                // last month of year, moving forward
                newYear += 1
                yearData = this.reckoning.getYearData(newYear)
                newMonth = yearData.getFirstMonth()

            } else {
                newMonth = yearData.monthSequence[yearData.monthSequence.indexOf(newMonth) + 1]
            }
        }

        let newDay = this.day
        if (newDay > yearData.getDaysInMonth(newMonth)) {
            newDay = yearData.getDaysInMonth(newMonth)
        }

        return this.reckoning.newDate(newYear, newMonth, newDay, this.language)
    }

    minusMonths(months: number): ReckoningDate<M> {
        if (months == 0) {
            return this
        }

        if (months < 0) {
            return this.plusMonths(Math.abs(months))
        }

        let newYear = this.year
        let newMonth = this.month
        let yearData = this.reckoning.getYearData(newYear)

        for (let i = 0; i < Math.abs(months); i++) {
            if (newMonth == yearData.getFirstMonth()) {
                // first month of year, moving backwards
                newYear -= 1

                if (newYear < 1) {
                    return this
                }

                yearData = this.reckoning.getYearData(newYear)
                newMonth = yearData.getLastMonth()

            } else {
                newMonth = yearData.monthSequence[yearData.monthSequence.indexOf(newMonth) - 1]
            }
        }


        let newDay = this.day
        if (newDay > yearData.getDaysInMonth(newMonth)) {
            newDay = yearData.getDaysInMonth(newMonth)
        }

        return this.reckoning.newDate(newYear, newMonth, newDay, this.language)
    }


    plusYears(years: number): ReckoningDate<M> {
        if (years == 0) {
            return this
        }

        const newYear = this.year + years;

        if (newYear > 0) {
            return this.reckoning.getDate(newYear, Math.min(Math.max(this.getDayOfYear(), 1), this.reckoning.daysInYear(newYear)), this.language)
        } else {
            return this
        }
    }

    withLanguage(language: string) {
        return this.reckoning.newDate(this.year, this.month, this.day, language)
    }

    abstract getDayOfWeek(): DayOfWeek

    abstract toString(language?: string): string

    toDayOfWeekString(language?: string): string {
        const targetLanguage = (language || this.language).toLowerCase()
        return this.reckoning.getDayOfWeekString(this.getDayOfWeek(), targetLanguage)
    }

    toDayString(language?: string) {
        const yearData = this.reckoning.getYearData(this.year);

        if (yearData.monthDays[this.month][1] > yearData.monthDays[this.month][0]) {
            return this.day.toString()
        } else {
            return this.toMonthString(language)
        }
    }

    abstract toMonthString(language?: string): string

    abstract toDayAndMonthString(language?: string): string

    abstract getSpecialEvent(): string

    copy(): ReckoningDate<M> {
        return this.reckoning.newDate(this.year, this.month, this.day, this.language)
    }
}
