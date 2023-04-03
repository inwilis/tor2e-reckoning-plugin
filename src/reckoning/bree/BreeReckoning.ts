import {BreeMonth} from "./BreeMonth";
import {YearType} from "../YearType";
import {HADORS_MILLENNIAL_YEAR, STEWARDS_RECKONING_START} from "../stewards/StewardsReckoning";
import {BREE_RECKONING_START_IN_STEWARDS, SHIRE_RECKONING_START_IN_STEWARDS} from "../Reckonings";
import {MONTH_NAMES} from "./BreeLocalization";
import {YearData} from "../YearData";
import {ReckoningDate} from "../ReckoningDate";
import {Reckoning} from "../Reckoning";
import {BreeReckoningDate} from "./BreeReckoningDate";
import {SHIRE_REFORM_YEAR} from "../shire/ShireReckoning";

export const SHIRE_REFORM_YEAR_IN_BREE = SHIRE_REFORM_YEAR + SHIRE_RECKONING_START_IN_STEWARDS - BREE_RECKONING_START_IN_STEWARDS

class BreeReckoning extends Reckoning<BreeMonth> {

    getName(): string {
        return "bree";
    }

    getYearType(year: number): YearType {
        if (year == HADORS_MILLENNIAL_YEAR - BREE_RECKONING_START_IN_STEWARDS || year == STEWARDS_RECKONING_START - BREE_RECKONING_START_IN_STEWARDS - 1) {
            return YearType.MILLENNIAL
        } else if (this.isLeapYear(year)) {
            return YearType.LEAP
        } else {
            return YearType.REGULAR
        }
    }

    isLeapYear(year: number): boolean {
        const stewardsYear = year + BREE_RECKONING_START_IN_STEWARDS
        return !(stewardsYear % 4 || !(stewardsYear % 100))
    }

    getYearData(year: number): YearData<BreeMonth> {
        return YEAR_DATA[this.getYearType(year)]
    }

    getDate(year: number, dayOfYear: number, language?: string): ReckoningDate<BreeMonth> {
        if (year < 1) {
            throw new RangeError(`Year ${year} is before the Year 1, when Bree-Reckoning started`)
        }

        return super.getDate(year, dayOfYear, language)
    }

    getSupportedLanguages(): string[] {
        return ["bree"]
    }

    getDefaultLanguage(): string {
        return "bree"
    }

    parseDate(date: string, language?: string): ReckoningDate<BreeMonth> {
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

            let month: BreeMonth | undefined

            for (let m in BreeMonth) {
                const monthLocalization = MONTH_NAMES[m as keyof typeof MONTH_NAMES];
                if (`${rawDay} ${rawMonth}` == monthLocalization.bree) {
                    month = m as keyof typeof MONTH_NAMES
                    rawDay = null
                    break
                } else if (rawMonth == monthLocalization.bree) {
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
            } else {
                if (!language) {
                    throw new Error(`Unable to parse '${date}' as date of Bree reckoning`)
                }
            }
        }

        throw new Error(`Unable to parse '${date}' as date of Bree reckoning`)
    }


    newDate(year: number, month: BreeMonth, day: number, language?: string): ReckoningDate<BreeMonth> {
        return new BreeReckoningDate(this, year, month, day, language)
    }

    hasKnownMonth(date: string) {
        for (let m in BreeMonth) {
            const monthLocalization = MONTH_NAMES[m as keyof typeof MONTH_NAMES]
            if (date.includes(monthLocalization.bree)) {
                return true
            }
        }
        return false
    }
}

export const breeReckoning: BreeReckoning = new BreeReckoning()

const YEAR_DATA: Record<YearType, YearData<BreeMonth>> = {
    [YearType.REGULAR]: new YearData<BreeMonth>({
        type: YearType.REGULAR,
        length: 365,
        monthSequence: [
            BreeMonth.YULE2,
            BreeMonth.M1, BreeMonth.M2, BreeMonth.M3,
            BreeMonth.M4, BreeMonth.M5, BreeMonth.M6,
            BreeMonth.SUMMERDAYS,
            BreeMonth.M7, BreeMonth.M8, BreeMonth.M9,
            BreeMonth.M10, BreeMonth.M11, BreeMonth.M12,
            BreeMonth.YULE1],
        monthDays: {
            YULE2: [1, 1],
            M1: [2, 31],
            M2: [32, 61],
            M3: [62, 91],
            M4: [92, 121],
            M5: [122, 151],
            M6: [152, 181],
            SUMMERDAYS: [182, 184],
            M7: [185, 214],
            M8: [215, 244],
            M9: [245, 274],
            M10: [275, 304],
            M11: [305, 334],
            M12: [335, 364],
            YULE1: [365, 365]
        }
    }),
    [YearType.LEAP]: new YearData<BreeMonth>({
        type: YearType.LEAP,
        length: 366,
        monthSequence: [
            BreeMonth.YULE2,
            BreeMonth.M1, BreeMonth.M2, BreeMonth.M3,
            BreeMonth.M4, BreeMonth.M5, BreeMonth.M6,
            BreeMonth.SUMMERDAYS,
            BreeMonth.M7, BreeMonth.M8, BreeMonth.M9,
            BreeMonth.M10, BreeMonth.M11, BreeMonth.M12,
            BreeMonth.YULE1],
        monthDays: {
            YULE2: [1, 1],
            M1: [2, 31],
            M2: [32, 61],
            M3: [62, 91],
            M4: [92, 121],
            M5: [122, 151],
            M6: [152, 181],
            SUMMERDAYS: [182, 185],
            M7: [186, 215],
            M8: [216, 245],
            M9: [246, 275],
            M10: [276, 305],
            M11: [306, 335],
            M12: [336, 365],
            YULE1: [366, 366]
        }
    }),
    [YearType.MILLENNIAL]: new YearData<BreeMonth>({
        type: YearType.MILLENNIAL,
        length: 367,
        monthSequence: [
            BreeMonth.YULE2,
            BreeMonth.M1, BreeMonth.M2, BreeMonth.M3,
            BreeMonth.M4, BreeMonth.M5, BreeMonth.M6,
            BreeMonth.SUMMERDAYS,
            BreeMonth.M7, BreeMonth.M8, BreeMonth.M9,
            BreeMonth.M10, BreeMonth.M11, BreeMonth.M12,
            BreeMonth.YULE1],
        monthDays: {
            YULE2: [1, 1],
            M1: [2, 31],
            M2: [32, 61],
            M3: [62, 91],
            M4: [92, 121],
            M5: [122, 151],
            M6: [152, 181],
            SUMMERDAYS: [182, 186],
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
