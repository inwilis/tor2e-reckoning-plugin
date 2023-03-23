import {ShireMonth} from "./ShireMonth";
import {DayOfWeek} from "../DayOfWeek";
import {YearType} from "../YearType";
import {HADORS_MILLENNIAL_YEAR, STEWARDS_RECKONING_START} from "../stewards/StewardsReckoning";
import {SHIRE_RECKONING_START_IN_STEWARDS} from "../ReckoningConversion";
import {MONTH_NAMES, ShireLocalization} from "./ShireLocalization";

export const SHIRE_REFORM_YEAR = 1103

export class ShireReckoningDate {
    constructor(year: number, month: ShireMonth, day: number) {
        if (year < 1) {
            throw new RangeError(`Year ${year} is before the Year 1, when Shire-Reckoning started`)
        }

        const yearData = ShireReckoning.getYearData(year);

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
    month: ShireMonth
    day: number

    getDayOfYear(): number {
        return ShireReckoning.getYearData(this.year).monthDays[this.month][0] + this.day - 1;
    }

    isBefore(other: ShireReckoningDate) {
        return (this.year < other.year) || (this.year == other.year && this.getDayOfYear() < other.getDayOfYear())
    }

    isEqual(other: ShireReckoningDate) {
        return this.year == other.year && this.month == other.month && this.day == other.day
    }

    getDayOfWeek(): DayOfWeek {
        if (this.year < (STEWARDS_RECKONING_START - SHIRE_RECKONING_START_IN_STEWARDS)) {
            const daysAfterReckoningStart = ShireReckoning.getDaysBetween(new ShireReckoningDate(1, ShireMonth.YULE2, 1), this)
            return (daysAfterReckoningStart + 1) % 7 // First day of first Shire year is 2d day of week (like in King's Reckoning for this date)
        } else if (this.year < SHIRE_REFORM_YEAR) {
            const daysAfterReckoningStart = ShireReckoning.getDaysBetween(new ShireReckoningDate(STEWARDS_RECKONING_START - SHIRE_RECKONING_START_IN_STEWARDS, ShireMonth.YULE2, 1), this)
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
                const lithe2Day = ShireReckoning.getYearData(this.year).monthDays[ShireMonth.LITHE2][0];
                return (dayOfYear - lithe2Day) % 7
            }
        }
    }

    toShire(): string {
        const yearData = ShireReckoning.getYearData(this.year);

        if (yearData.monthDays[this.month][1] > yearData.monthDays[this.month][0]) {
            return `${this.day} ${ShireLocalization.forMonth(this.month).shire} ${this.year}`
        } else {
            return `${ShireLocalization.forMonth(this.month).shire} ${this.year}`
        }
    }

    toBree(): string {
        const yearData = ShireReckoning.getYearData(this.year);

        if (this.month == ShireMonth.LITHE1 || this.month == ShireMonth.OVERLITHE_MILLENNIAL || this.month == ShireMonth.MIDYEAR || this.month == ShireMonth.OVERLITHE || this.month == ShireMonth.LITHE2) {

            const lithe1Day = yearData.monthDays[ShireMonth.LITHE1][0]
            const summerday = this.getDayOfYear() - lithe1Day + 1

            return `${summerday} ${ShireLocalization.forMonth(this.month).bree} ${this.year}`

        } else if (yearData.monthDays[this.month][1] > yearData.monthDays[this.month][0]) {
            return `${this.day} ${ShireLocalization.forMonth(this.month).bree} ${this.year}`
        } else {
            return `${ShireLocalization.forMonth(this.month).bree} ${this.year}`
        }
    }

    toShireDayOfWeek(): string {
        return ShireLocalization.forDayOfWeek(this.getDayOfWeek()).shire
    }

    toBreeDayOfWeek(): string {
        return ShireLocalization.forDayOfWeek(this.getDayOfWeek()).bree
    }
}

export const ShireReckoning = {
    isLeapYear(year: number): boolean {
        return !(year % 4 || !(year % 100))
    },

    getYearType(year: number): YearType {
        if (year == HADORS_MILLENNIAL_YEAR - SHIRE_RECKONING_START_IN_STEWARDS || year == STEWARDS_RECKONING_START - SHIRE_RECKONING_START_IN_STEWARDS - 1) {
            return YearType.MILLENNIAL
        } else if (ShireReckoning.isLeapYear(year)) {
            return YearType.LEAP
        } else {
            return YearType.REGULAR
        }
    },

    getYearData(year: number): ShireYearData {
        return YEAR_DATA[ShireReckoning.getYearType(year)]
    },

    daysInYear(year: number): number {
        return ShireReckoning.getYearData(year).length;
    },

    nextMonth(month: ShireMonth, year: number): ShireMonth {
        if (month == ShireMonth.YULE1) {
            return ShireMonth.YULE2
        } else {
            const monthSequence = ShireReckoning.getYearData(year).monthSequence;
            return monthSequence[monthSequence.indexOf(month) + 1]
        }
    },

    getDate(year: number, dayOfYear: number): ShireReckoningDate {
        if (year < 1) {
            throw new RangeError(`Year ${year} is before the Year 1, when Shire-Reckoning started`)
        }

        if (dayOfYear < 0) {
            throw new RangeError(`Day of year must start from 1, got ${dayOfYear} instead`)
        }

        const yearType = ShireReckoning.getYearType(year);
        const yearDatum = YEAR_DATA[yearType];
        const monthDays = yearDatum.monthDays;

        for (let month of yearDatum.monthSequence) {
            if (monthDays[month][0] <= dayOfYear && dayOfYear <= monthDays[month][1]) {
                return new ShireReckoningDate(year, month, dayOfYear - monthDays[month][0] + 1)
            }
        }

        throw new RangeError(`Unable to find a correct month for day ${dayOfYear} of ${yearType} year ${year}`)
    },

    getDaysBetween(first: ShireReckoningDate, second: ShireReckoningDate): number {
        if (first.isEqual(second)) {
            return 0
        } else if (second.isBefore(first)) {
            return ShireReckoning.getDaysBetween(second, first)
        } else {
            let days: number = 0
            for (let year = first.year; year < second.year; year++) {
                days += ShireReckoning.getYearData(year).length
            }
            days -= first.getDayOfYear()
            days += second.getDayOfYear()

            return days
        }
    },

    parseDate: function (date: string, breeDate: boolean = false): ShireReckoningDate {
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
            throw new Error(`Unable to parse '${date}' as date`)
        }

        let year = parseInt(rawYear)

        if (year) {
            let month: ShireMonth | undefined

            for (let m in ShireMonth) {
                const monthLocalization = MONTH_NAMES[m as keyof typeof MONTH_NAMES];
                if (`${rawDay} ${rawMonth}` == (breeDate ? monthLocalization.bree : monthLocalization.shire)) {
                    month = m as keyof typeof MONTH_NAMES
                    rawDay = null
                    break
                } else if (rawMonth == (breeDate ? monthLocalization.bree : monthLocalization.shire)) {
                    month = m as keyof typeof MONTH_NAMES
                    break
                }
            }

            if (month) {
                if (rawDay) {

                    if (breeDate && month == ShireMonth.LITHE1) {
                        const summerday = parseInt(rawDay)
                        const yearData = ShireReckoning.getYearData(year);
                        const yearDay = yearData.monthDays[ShireMonth.LITHE1][0] + summerday - 1
                        for (let m in ShireMonth) {
                            if (yearData.monthDays[m as keyof typeof MONTH_NAMES][0] >= yearDay && yearDay <= yearData.monthDays[m as keyof typeof MONTH_NAMES][1]) {
                                month = m as keyof typeof MONTH_NAMES
                                break
                            }
                        }
                        return new ShireReckoningDate(year, month, 1)
                    }

                    try {
                        return new ShireReckoningDate(year, month, parseInt(rawDay))
                    } catch (e) {
                        return e.toString()
                    }
                } else {
                    const monthDays = ShireReckoning.getYearData(year).monthDays[month];
                    if (monthDays[0] == monthDays[1]) {
                        return new ShireReckoningDate(year, month, 1)
                    }
                }
            }
        }

        throw new Error(`Unable to parse '${date}' as date`)
    }
}

export interface ShireYearData {
    type: YearType
    length: number
    monthSequence: ShireMonth[]
    monthDays: Record<ShireMonth, [number, number]>
}

const YEAR_DATA: Record<YearType, ShireYearData> = {
    [YearType.REGULAR]: {
        type: YearType.REGULAR,
        length: 365,
        monthSequence: [
            ShireMonth.YULE2,
            ShireMonth.M1, ShireMonth.M2, ShireMonth.M3,
            ShireMonth.M4, ShireMonth.M5, ShireMonth.M6,
            ShireMonth.LITHE1,
            ShireMonth.MIDYEAR,
            ShireMonth.LITHE2,
            ShireMonth.M7, ShireMonth.M8, ShireMonth.M9,
            ShireMonth.M10, ShireMonth.M11, ShireMonth.M12,
            ShireMonth.YULE1],
        monthDays: {
            YULE2: [1, 1],
            M1: [2, 31],
            M2: [32, 61],
            M3: [62, 91],
            M4: [92, 121],
            M5: [122, 151],
            M6: [152, 181],
            LITHE1: [182, 182],
            OVERLITHE_MILLENNIAL: [-1, -1],
            MIDYEAR: [183, 183],
            OVERLITHE: [-1, -1],
            LITHE2: [184, 184],
            M7: [185, 214],
            M8: [215, 244],
            M9: [245, 274],
            M10: [275, 304],
            M11: [305, 334],
            M12: [335, 364],
            YULE1: [365, 365]
        }
    },
    [YearType.LEAP]: {
        type: YearType.LEAP,
        length: 366,
        monthSequence: [
            ShireMonth.YULE2,
            ShireMonth.M1, ShireMonth.M2, ShireMonth.M3,
            ShireMonth.M4, ShireMonth.M5, ShireMonth.M6,
            ShireMonth.LITHE1,
            ShireMonth.MIDYEAR,
            ShireMonth.OVERLITHE,
            ShireMonth.LITHE2,
            ShireMonth.M7, ShireMonth.M8, ShireMonth.M9,
            ShireMonth.M10, ShireMonth.M11, ShireMonth.M12,
            ShireMonth.YULE1],
        monthDays: {
            YULE2: [1, 1],
            M1: [2, 31],
            M2: [32, 61],
            M3: [62, 91],
            M4: [92, 121],
            M5: [122, 151],
            M6: [152, 181],
            LITHE1: [182, 182],
            OVERLITHE_MILLENNIAL: [-1, -1],
            MIDYEAR: [183, 183],
            OVERLITHE: [184, 184],
            LITHE2: [185, 185],
            M7: [186, 215],
            M8: [216, 245],
            M9: [246, 275],
            M10: [276, 305],
            M11: [306, 335],
            M12: [336, 365],
            YULE1: [366, 366]
        }
    },
    [YearType.MILLENNIAL]: {
        type: YearType.MILLENNIAL,
        length: 367,
        monthSequence: [
            ShireMonth.YULE2,
            ShireMonth.M1, ShireMonth.M2, ShireMonth.M3,
            ShireMonth.M4, ShireMonth.M5, ShireMonth.M6,
            ShireMonth.LITHE1,
            ShireMonth.OVERLITHE_MILLENNIAL,
            ShireMonth.MIDYEAR,
            ShireMonth.OVERLITHE,
            ShireMonth.LITHE2,
            ShireMonth.M7, ShireMonth.M8, ShireMonth.M9,
            ShireMonth.M10, ShireMonth.M11, ShireMonth.M12,
            ShireMonth.YULE1],
        monthDays: {
            YULE2: [1, 1],
            M1: [2, 31],
            M2: [32, 61],
            M3: [62, 91],
            M4: [92, 121],
            M5: [122, 151],
            M6: [152, 181],
            LITHE1: [182, 182],
            OVERLITHE_MILLENNIAL: [183, 183],
            MIDYEAR: [184, 184],
            OVERLITHE: [185, 185],
            LITHE2: [186, 186],
            M7: [187, 216],
            M8: [217, 246],
            M9: [247, 276],
            M10: [277, 306],
            M11: [307, 336],
            M12: [337, 366],
            YULE1: [367, 367]
        }
    }
}
