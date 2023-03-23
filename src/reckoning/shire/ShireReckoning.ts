import {ShireMonth} from "./ShireMonth";
import {YearType} from "../YearType";
import {HADORS_MILLENNIAL_YEAR, STEWARDS_RECKONING_START} from "../stewards/StewardsReckoning";
import {SHIRE_RECKONING_START_IN_STEWARDS} from "../Reckonings";
import {MONTH_NAMES} from "./ShireLocalization";
import {YearData} from "../YearData";
import {ReckoningDate} from "../ReckoningDate";
import {Reckoning} from "../Reckoning";
import {ShireReckoningDate} from "./ShireReckoningDate";

export const SHIRE_REFORM_YEAR = 1103

class ShireReckoning extends Reckoning<ShireMonth> {

    getName(): string {
        return "shire";
    }

    getYearType(year: number): YearType {
        if (year == HADORS_MILLENNIAL_YEAR - SHIRE_RECKONING_START_IN_STEWARDS || year == STEWARDS_RECKONING_START - SHIRE_RECKONING_START_IN_STEWARDS - 1) {
            return YearType.MILLENNIAL
        } else if (this.isLeapYear(year)) {
            return YearType.LEAP
        } else {
            return YearType.REGULAR
        }
    }

    getYearData(year: number): YearData<ShireMonth> {
        return YEAR_DATA[this.getYearType(year)]
    }

    getDate(year: number, dayOfYear: number): ReckoningDate<ShireMonth> {
        if (year < 1) {
            throw new RangeError(`Year ${year} is before the Year 1, when Shire-Reckoning started`)
        }

        return super.getDate(year, dayOfYear)
    }

    parseDate(date: string, language?: string): ReckoningDate<ShireMonth> {
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
                if (`${rawDay} ${rawMonth}` == (language?.toLowerCase() == "bree" ? monthLocalization.bree : monthLocalization.shire)) {
                    month = m as keyof typeof MONTH_NAMES
                    rawDay = null
                    break
                } else if (rawMonth == (language?.toLowerCase() == "bree" ? monthLocalization.bree : monthLocalization.shire)) {
                    month = m as keyof typeof MONTH_NAMES
                    break
                }
            }

            if (month) {
                if (rawDay) {

                    if (language?.toLowerCase() == "bree" && month == ShireMonth.LITHE1) {
                        const summerday = parseInt(rawDay)
                        const yearData = this.getYearData(year);
                        const yearDay = yearData.monthDays[ShireMonth.LITHE1][0] + summerday - 1
                        for (let m in ShireMonth) {
                            if (yearData.monthDays[m as keyof typeof MONTH_NAMES][0] >= yearDay && yearDay <= yearData.monthDays[m as keyof typeof MONTH_NAMES][1]) {
                                month = m as keyof typeof MONTH_NAMES
                                break
                            }
                        }
                        return this.newDate(year, month, 1)
                    }

                    return this.newDate(year, month, parseInt(rawDay))

                } else {
                    const monthDays = this.getYearData(year).monthDays[month];
                    if (monthDays[0] == monthDays[1]) {
                        return this.newDate(year, month, 1)
                    }
                }
            }
        }

        throw new Error(`Unable to parse '${date}' as date`)
    }

    newDate(year: number, month: ShireMonth, day: number): ReckoningDate<ShireMonth> {
        return new ShireReckoningDate(this, year, month, day)
    }
}

export const shireReckoning: ShireReckoning = new ShireReckoning()

const YEAR_DATA: Record<YearType, YearData<ShireMonth>> = {
    [YearType.REGULAR]: new YearData<ShireMonth>({
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
    }),
    [YearType.LEAP]: new YearData<ShireMonth>({
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
    }),
    [YearType.MILLENNIAL]: new YearData<ShireMonth>({
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
    })
}
