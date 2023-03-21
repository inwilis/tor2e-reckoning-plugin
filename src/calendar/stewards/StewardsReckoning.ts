import {YearType} from "./YearType";
import {Month} from "./Month";
import {DayOfWeek} from "./DayOfWeek";
import {Localization, MONTH_NAMES} from "./Localization";

const STEWARDS_RECKONING_START = 2060
const HADORS_MILLENNIAL_YEAR = 2360

class StewardsReckoningDate {
    constructor(year: number, month: Month, day: number) {
        if (year < STEWARDS_RECKONING_START) {
            throw new RangeError(`Year ${year} is before the ${STEWARDS_RECKONING_START}, when Steward's Reckoning started`)
        }

        const yearData = StewardsReckoning.getYearData(year);

        if (yearData.monthSequence.indexOf(month) < 0) {
            throw new RangeError(`${yearData.type} year ${year} has no month ${month}`)
        }

        if (day < 1) {
            throw new RangeError(`Incorrect day of month: ${day}`)
        }

        const daysInMonth = yearData.monthDays[month][1] - yearData.monthDays[month][0] + 1;
        if (day > daysInMonth) {
            throw new RangeError(`Incorrect day of month: ${day}. ${month} has only ${daysInMonth} days`)
        }

        this.year = year;
        this.month = month;
        this.day = day;
    }

    year: number
    month: Month
    day: number

    getDayOfYear(): number {
        return StewardsReckoning.getYearData(this.year).monthDays[this.month][0] + this.day - 1;
    }

    isBefore(other: StewardsReckoningDate) {
        return (this.year < other.year) || (this.year == other.year && this.getDayOfYear() < other.getDayOfYear())
    }

    isEqual(other: StewardsReckoningDate) {
        return this.year == other.year && this.month == other.month && this.day == other.day
    }

    getDayOfWeek(): DayOfWeek {
        const daysAfterReckoningStart = StewardsReckoning.getDaysBetween(new StewardsReckoningDate(2060, Month.I1, 1), this);
        return daysAfterReckoningStart % 7;
    }

    toQuenya(): string {
        if (this.month.toString().startsWith("M") || this.month == Month.I3L) {
            return `${this.day} ${Localization.forMonth(this.month).quenya} ${this.year}`
        } else {
            return `${Localization.forMonth(this.month).quenya} ${this.year}`
        }
    }

    toSindarin(): string {
        if (this.month.toString().startsWith("M") || this.month == Month.I3L) {
            return `${this.day} ${Localization.forMonth(this.month).sindarin} ${this.year}`
        } else {
            return `${Localization.forMonth(this.month).sindarin} ${this.year}`
        }
    }

    toQuenyaDayOfWeek(): string {
        return Localization.forDayOfWeek(this.getDayOfWeek()).quenya
    }

    toSindarinDayOfWeek(): string {
        return Localization.forDayOfWeek(this.getDayOfWeek()).sindarin
    }
}

const StewardsReckoning = {
    isLeapYear(year: number): boolean {
        return !(year % 4 || !(year % 100))
    },

    getYearType(year: number): YearType {
        if (year == HADORS_MILLENNIAL_YEAR) {
            return YearType.MILLENNIAL
        } else if (StewardsReckoning.isLeapYear(year)) {
            return YearType.LEAP
        } else {
            return YearType.REGULAR
        }
    },

    getYearData(year: number): YearData {
        return YEAR_DATA[StewardsReckoning.getYearType(year)]
    },

    daysInYear(year: number): number {
        return StewardsReckoning.getYearData(year).length;
    },

    nextMonth(month: Month, year: number): Month {
        if (month == Month.I5) {
            return Month.I1
        } else {
            const monthSequence = StewardsReckoning.getYearData(year).monthSequence;
            return monthSequence[monthSequence.indexOf(month) + 1]
        }
    },

    getDate(year: number, dayOfYear: number): StewardsReckoningDate {
        if (year < STEWARDS_RECKONING_START) {
            throw new RangeError(`Year ${year} is before the ${STEWARDS_RECKONING_START}, when Steward's Reckoning started`)
        }

        if (dayOfYear < 0) {
            throw new RangeError(`Day of year must start from 1, got ${dayOfYear} instead`)
        }

        const yearType = StewardsReckoning.getYearType(year);
        const yearDatum = YEAR_DATA[yearType];
        const monthDays = yearDatum.monthDays;

        for (let month of yearDatum.monthSequence) {
            if (monthDays[month][0] <= dayOfYear && dayOfYear <= monthDays[month][1]) {
                return new StewardsReckoningDate(year, month, dayOfYear - monthDays[month][0] + 1)
            }
        }

        throw new RangeError(`Unable to find a correct month for day ${dayOfYear} of ${yearType} year ${year}`)
    },

    getDaysBetween(first: StewardsReckoningDate, second: StewardsReckoningDate): number {
        if (first.isEqual(second)) {
            return 0
        } else if (second.isBefore(first)) {
            return StewardsReckoning.getDaysBetween(second, first)
        } else {
            let days: number = 0
            for (let year = first.year; year < second.year; year++) {
                days += StewardsReckoning.getYearData(year).length
            }
            days -= first.getDayOfYear()
            days += second.getDayOfYear()

            return days
        }
    },

    parseDate(date: string): StewardsReckoningDate | string {
        const found = date.split(" ", 3)

        let rawDay
        let rawMonth
        let rawYear

        if (found.length == 2) {
            rawMonth = found[0]
            rawYear = found[1]
        } else if (found.length == 3) {
            rawDay = found[0]
            rawMonth = found[1]
            rawYear = found[2]
        } else {
            return `Unable to parse '${date}' as date`
        }


        let year = parseInt(rawYear)

        if (year) {
            let month: Month | undefined

            for (let m in Month) {
                const monthLocalization = MONTH_NAMES[m as keyof typeof MONTH_NAMES];
                for (let k in monthLocalization) {
                    if (rawMonth == monthLocalization[k as keyof typeof monthLocalization]) {
                        month = m as keyof typeof MONTH_NAMES
                    }
                }
            }

            if (month) {
                if (rawDay) {
                    try {
                        return new StewardsReckoningDate(year, month, parseInt(rawDay))
                    } catch (e) {
                        return e.toString()
                    }
                } else {
                    const monthDays = StewardsReckoning.getYearData(year).monthDays[month];
                    if (monthDays[0] == monthDays[1]) {
                        try {
                            return new StewardsReckoningDate(year, month, 1)
                        } catch (e) {
                            return e.toString()
                        }
                    }
                }
            }
        }

        return `Unable to parse '${date}' as date`
    }
}

interface YearData {
    type: YearType
    length: number
    monthSequence: Month[]
    monthDays: Record<Month, [number, number]>
}

const YEAR_DATA: Record<YearType, YearData> = {
    [YearType.REGULAR]: {
        type: YearType.REGULAR,
        length: 365,
        monthSequence: [
            Month.I1,
            Month.M1, Month.M2, Month.M3,
            Month.I2,
            Month.M4, Month.M5, Month.M6,
            Month.I3,
            Month.M7, Month.M8, Month.M9,
            Month.I4,
            Month.M10, Month.M11, Month.M12,
            Month.I5],
        monthDays: {
            I1: [1, 1],
            M1: [2, 31],
            M2: [32, 61],
            M3: [62, 91],
            I2: [92, 92],
            M4: [93, 122],
            M5: [123, 152],
            M6: [153, 182],
            I3: [183, 183],
            I3L: [-1, -1],
            M7: [184, 213],
            M8: [214, 243],
            M9: [244, 273],
            I4: [274, 274],
            M10: [275, 304],
            M11: [305, 334],
            M12: [335, 364],
            I5: [365, 365]
        }
    },
    [YearType.LEAP]: {
        type: YearType.LEAP,
        length: 366,
        monthSequence: [
            Month.I1,
            Month.M1, Month.M2, Month.M3,
            Month.I2,
            Month.M4, Month.M5, Month.M6,
            Month.I3L,
            Month.M7, Month.M8, Month.M9,
            Month.I4,
            Month.M10, Month.M11, Month.M12,
            Month.I5],
        monthDays: {
            I1: [1, 1],
            M1: [2, 31],
            M2: [32, 61],
            M3: [62, 91],
            I2: [92, 92],
            M4: [93, 122],
            M5: [123, 152],
            M6: [153, 182],
            I3: [-1, -1],
            I3L: [183, 184],
            M7: [185, 214],
            M8: [215, 244],
            M9: [245, 274],
            I4: [275, 275],
            M10: [276, 305],
            M11: [306, 335],
            M12: [336, 365],
            I5: [366, 366]
        }
    },
    [YearType.MILLENNIAL]: {
        type: YearType.MILLENNIAL,
        length: 367,
        monthSequence: [
            Month.I1,
            Month.M1, Month.M2, Month.M3,
            Month.I2,
            Month.M4, Month.M5, Month.M6,
            Month.I3L,
            Month.M7, Month.M8, Month.M9,
            Month.I4,
            Month.M10, Month.M11, Month.M12,
            Month.I5],
        monthDays: {
            I1: [1, 1],
            M1: [2, 31],
            M2: [32, 61],
            M3: [62, 91],
            I2: [92, 92],
            M4: [93, 122],
            M5: [123, 152],
            M6: [153, 182],
            I3: [-1, -1],
            I3L: [183, 185],
            M7: [186, 215],
            M8: [216, 245],
            M9: [246, 275],
            I4: [276, 276],
            M10: [277, 306],
            M11: [307, 336],
            M12: [337, 366],
            I5: [367, 367]
        }
    }
}

export {
    StewardsReckoning,
    StewardsReckoningDate,
    YearType,
    Month,
    DayOfWeek
}
