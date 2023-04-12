import {ShireMonth} from "./ShireMonth";
import {YearType} from "../YearType";
import {reckonings} from "../Reckonings";
import {MONTH_NAMES} from "./ShireLocalization";
import {YearData} from "../YearData";
import {ReckoningDate} from "../ReckoningDate";
import {Reckoning} from "../Reckoning";
import {ShireReckoningDate} from "./ShireReckoningDate";
import {stewardsReckoning} from "../stewards/StewardsReckoning";

export const SHIRE_REFORM_YEAR = 1103

class ShireReckoning extends Reckoning<ShireMonth> {

    getName(): string {
        return "shire";
    }

    getYearType(year: number): YearType {
        const stewardsYear = reckonings.yearToReckoning(this.getName(), "stewards", year)
        return stewardsReckoning.getYearType(stewardsYear)
    }

    isLeapYear(year: number): boolean {
        const stewardsYear = reckonings.yearToReckoning(this.getName(), "stewards", year)
        return stewardsReckoning.isLeapYear(stewardsYear)
    }

    getYearData(year: number): YearData<ShireMonth> {
        return YEAR_DATA[this.getYearType(year)]
    }

    getDate(year: number, dayOfYear: number, language?: string): ReckoningDate<ShireMonth> {
        if (year < 1) {
            throw new RangeError(`Year ${year} is before the Year 1, when Shire-Reckoning started`)
        }

        return super.getDate(year, dayOfYear, language)
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
                if (`${rawDay} ${rawMonth}` == monthLocalization.shire) {
                    month = m as keyof typeof MONTH_NAMES
                    rawDay = null
                    break
                } else if (rawMonth == monthLocalization.shire) {
                    month = m as keyof typeof MONTH_NAMES
                    break
                }
            }

            if (month) {
                if (rawDay) {
                    return this.newDate(year, month, parseInt(rawDay))

                } else {
                    const monthDays = this.getYearData(year).monthDays[month];
                    if (monthDays[0] == monthDays[1]) {
                        return this.newDate(year, month, 1)
                    }
                }
            }
        }

        throw new Error(`Unable to parse '${date}' as date of Shire reckoning`)
    }

    newDate(year: number, month: ShireMonth, day: number, language?: string): ReckoningDate<ShireMonth> {
        return new ShireReckoningDate(this, year, month, day, language)
    }

    hasKnownMonth(date: string) {
        for (let m in ShireMonth) {
            const monthLocalization = MONTH_NAMES[m as keyof typeof MONTH_NAMES]
            if (date.includes(monthLocalization.shire)) {
                return true
            }
        }
        return false
    }
}

export const shireReckoning: ShireReckoning = new ShireReckoning()

const YEAR_DATA: Record<YearType, YearData<ShireMonth>> = {
    [YearType.REGULAR]: new YearData<ShireMonth>({
        type: YearType.REGULAR,
        length: 365,
        monthSequence: [
            ShireMonth.YULE2,
            ShireMonth.AFTERYULE, ShireMonth.SOLMATH, ShireMonth.RETHE,
            ShireMonth.ASTRON, ShireMonth.THRIMIDGE, ShireMonth.FORELITHE,
            ShireMonth.LITHE1,
            ShireMonth.MIDYEAR,
            ShireMonth.LITHE2,
            ShireMonth.AFTERLITHE, ShireMonth.WEDMATH, ShireMonth.HALIMATH,
            ShireMonth.WINTERFILTH, ShireMonth.BLOMATH, ShireMonth.FOREYULE,
            ShireMonth.YULE1],
        monthDays: {
            [ShireMonth.YULE2]: [1, 1],
            [ShireMonth.AFTERYULE]: [2, 31],
            [ShireMonth.SOLMATH]: [32, 61],
            [ShireMonth.RETHE]: [62, 91],
            [ShireMonth.ASTRON]: [92, 121],
            [ShireMonth.THRIMIDGE]: [122, 151],
            [ShireMonth.FORELITHE]: [152, 181],
            [ShireMonth.LITHE1]: [182, 182],
            [ShireMonth.OVERLITHE_MILLENNIAL]: [-1, -1],
            [ShireMonth.MIDYEAR]: [183, 183],
            [ShireMonth.OVERLITHE]: [-1, -1],
            [ShireMonth.LITHE2]: [184, 184],
            [ShireMonth.AFTERLITHE]: [185, 214],
            [ShireMonth.WEDMATH]: [215, 244],
            [ShireMonth.HALIMATH]: [245, 274],
            [ShireMonth.WINTERFILTH]: [275, 304],
            [ShireMonth.BLOMATH]: [305, 334],
            [ShireMonth.FOREYULE]: [335, 364],
            [ShireMonth.YULE1]: [365, 365]
        }
    }),
    [YearType.LEAP]: new YearData<ShireMonth>({
        type: YearType.LEAP,
        length: 366,
        monthSequence: [
            ShireMonth.YULE2,
            ShireMonth.AFTERYULE, ShireMonth.SOLMATH, ShireMonth.RETHE,
            ShireMonth.ASTRON, ShireMonth.THRIMIDGE, ShireMonth.FORELITHE,
            ShireMonth.LITHE1,
            ShireMonth.MIDYEAR,
            ShireMonth.OVERLITHE,
            ShireMonth.LITHE2,
            ShireMonth.AFTERLITHE, ShireMonth.WEDMATH, ShireMonth.HALIMATH,
            ShireMonth.WINTERFILTH, ShireMonth.BLOMATH, ShireMonth.FOREYULE,
            ShireMonth.YULE1],
        monthDays: {
            [ShireMonth.YULE2]: [1, 1],
            [ShireMonth.AFTERYULE]: [2, 31],
            [ShireMonth.SOLMATH]: [32, 61],
            [ShireMonth.RETHE]: [62, 91],
            [ShireMonth.ASTRON]: [92, 121],
            [ShireMonth.THRIMIDGE]: [122, 151],
            [ShireMonth.FORELITHE]: [152, 181],
            [ShireMonth.LITHE1]: [182, 182],
            [ShireMonth.OVERLITHE_MILLENNIAL]: [-1, -1],
            [ShireMonth.MIDYEAR]: [183, 183],
            [ShireMonth.OVERLITHE]: [184, 184],
            [ShireMonth.LITHE2]: [185, 185],
            [ShireMonth.AFTERLITHE]: [186, 215],
            [ShireMonth.WEDMATH]: [216, 245],
            [ShireMonth.HALIMATH]: [246, 275],
            [ShireMonth.WINTERFILTH]: [276, 305],
            [ShireMonth.BLOMATH]: [306, 335],
            [ShireMonth.FOREYULE]: [336, 365],
            [ShireMonth.YULE1]: [366, 366]
        }
    }),
    [YearType.MILLENNIAL]: new YearData<ShireMonth>({
        type: YearType.MILLENNIAL,
        length: 367,
        monthSequence: [
            ShireMonth.YULE2,
            ShireMonth.AFTERYULE, ShireMonth.SOLMATH, ShireMonth.RETHE,
            ShireMonth.ASTRON, ShireMonth.THRIMIDGE, ShireMonth.FORELITHE,
            ShireMonth.LITHE1,
            ShireMonth.OVERLITHE_MILLENNIAL,
            ShireMonth.MIDYEAR,
            ShireMonth.OVERLITHE,
            ShireMonth.LITHE2,
            ShireMonth.AFTERLITHE, ShireMonth.WEDMATH, ShireMonth.HALIMATH,
            ShireMonth.WINTERFILTH, ShireMonth.BLOMATH, ShireMonth.FOREYULE,
            ShireMonth.YULE1],
        monthDays: {
            [ShireMonth.YULE2]: [1, 1],
            [ShireMonth.AFTERYULE]: [2, 31],
            [ShireMonth.SOLMATH]: [32, 61],
            [ShireMonth.RETHE]: [62, 91],
            [ShireMonth.ASTRON]: [92, 121],
            [ShireMonth.THRIMIDGE]: [122, 151],
            [ShireMonth.FORELITHE]: [152, 181],
            [ShireMonth.LITHE1]: [182, 182],
            [ShireMonth.OVERLITHE_MILLENNIAL]: [183, 183],
            [ShireMonth.MIDYEAR]: [184, 184],
            [ShireMonth.OVERLITHE]: [185, 185],
            [ShireMonth.LITHE2]: [186, 186],
            [ShireMonth.AFTERLITHE]: [187, 216],
            [ShireMonth.WEDMATH]: [217, 246],
            [ShireMonth.HALIMATH]: [247, 276],
            [ShireMonth.WINTERFILTH]: [277, 306],
            [ShireMonth.BLOMATH]: [307, 336],
            [ShireMonth.FOREYULE]: [337, 366],
            [ShireMonth.YULE1]: [367, 367]
        }
    })
}
