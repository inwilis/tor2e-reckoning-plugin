import {BreeMonth} from "./BreeMonth";
import {YearType} from "../YearType";
import {reckonings} from "../Reckonings";
import {BreeLocalization, MONTH_NAMES} from "./BreeLocalization";
import {YearData} from "../YearData";
import {ReckoningDate} from "../ReckoningDate";
import {Reckoning} from "../Reckoning";
import {BreeReckoningDate} from "./BreeReckoningDate";
import {SHIRE_REFORM_YEAR} from "../shire/ShireReckoning";
import {
    BREE_RECKONING_START_IN_STEWARDS,
    SHIRE_RECKONING_START_IN_STEWARDS,
    stewardsReckoning
} from "../stewards/StewardsReckoning";
import {DayOfWeek} from "../DayOfWeek";

export const SHIRE_REFORM_YEAR_IN_BREE = SHIRE_REFORM_YEAR + SHIRE_RECKONING_START_IN_STEWARDS - BREE_RECKONING_START_IN_STEWARDS

class BreeReckoning extends Reckoning<BreeMonth> {

    getName(): string {
        return "bree";
    }

    getYearType(year: number): YearType {
        const stewardsYear = reckonings.yearToReckoning(this.getName(), "stewards", year)
        return stewardsReckoning.getYearType(stewardsYear)
    }

    isLeapYear(year: number): boolean {
        const stewardsYear = reckonings.yearToReckoning(this.getName(), "stewards", year)
        return stewardsReckoning.isLeapYear(stewardsYear)
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

    getDayOfWeekString(dayOfWeek: DayOfWeek, language?: string): string {
        return BreeLocalization.forDayOfWeek(dayOfWeek).bree
    }
}

export const breeReckoning: BreeReckoning = new BreeReckoning()

const YEAR_DATA: Record<YearType, YearData<BreeMonth>> = {
    [YearType.REGULAR]: new YearData<BreeMonth>({
        type: YearType.REGULAR,
        length: 365,
        monthSequence: [
            BreeMonth.YULE2,
            BreeMonth.FRERY, BreeMonth.SOLMATH, BreeMonth.RETHE,
            BreeMonth.CHITHING, BreeMonth.THRIMIDGE, BreeMonth.LITHE,
            BreeMonth.SUMMERDAYS,
            BreeMonth.MEDE, BreeMonth.WEDMATH, BreeMonth.HARVESTMATH,
            BreeMonth.WINTRING, BreeMonth.BLOOTING, BreeMonth.YULEMATH,
            BreeMonth.YULE1],
        monthDays: {
            [BreeMonth.YULE2]: [1, 1],
            [BreeMonth.FRERY]: [2, 31],
            [BreeMonth.SOLMATH]: [32, 61],
            [BreeMonth.RETHE]: [62, 91],
            [BreeMonth.CHITHING]: [92, 121],
            [BreeMonth.THRIMIDGE]: [122, 151],
            [BreeMonth.LITHE]: [152, 181],
            [BreeMonth.SUMMERDAYS]: [182, 184],
            [BreeMonth.MEDE]: [185, 214],
            [BreeMonth.WEDMATH]: [215, 244],
            [BreeMonth.HARVESTMATH]: [245, 274],
            [BreeMonth.WINTRING]: [275, 304],
            [BreeMonth.BLOOTING]: [305, 334],
            [BreeMonth.YULEMATH]: [335, 364],
            [BreeMonth.YULE1]: [365, 365]
        }
    }),
    [YearType.LEAP]: new YearData<BreeMonth>({
        type: YearType.LEAP,
        length: 366,
        monthSequence: [
            BreeMonth.YULE2,
            BreeMonth.FRERY, BreeMonth.SOLMATH, BreeMonth.RETHE,
            BreeMonth.CHITHING, BreeMonth.THRIMIDGE, BreeMonth.LITHE,
            BreeMonth.SUMMERDAYS,
            BreeMonth.MEDE, BreeMonth.WEDMATH, BreeMonth.HARVESTMATH,
            BreeMonth.WINTRING, BreeMonth.BLOOTING, BreeMonth.YULEMATH,
            BreeMonth.YULE1],
        monthDays: {
            [BreeMonth.YULE2]: [1, 1],
            [BreeMonth.FRERY]: [2, 31],
            [BreeMonth.SOLMATH]: [32, 61],
            [BreeMonth.RETHE]: [62, 91],
            [BreeMonth.CHITHING]: [92, 121],
            [BreeMonth.THRIMIDGE]: [122, 151],
            [BreeMonth.LITHE]: [152, 181],
            [BreeMonth.SUMMERDAYS]: [182, 185],
            [BreeMonth.MEDE]: [186, 215],
            [BreeMonth.WEDMATH]: [216, 245],
            [BreeMonth.HARVESTMATH]: [246, 275],
            [BreeMonth.WINTRING]: [276, 305],
            [BreeMonth.BLOOTING]: [306, 335],
            [BreeMonth.YULEMATH]: [336, 365],
            [BreeMonth.YULE1]: [366, 366]
        }
    }),
    [YearType.MILLENNIAL]: new YearData<BreeMonth>({
        type: YearType.MILLENNIAL,
        length: 367,
        monthSequence: [
            BreeMonth.YULE2,
            BreeMonth.FRERY, BreeMonth.SOLMATH, BreeMonth.RETHE,
            BreeMonth.CHITHING, BreeMonth.THRIMIDGE, BreeMonth.LITHE,
            BreeMonth.SUMMERDAYS,
            BreeMonth.MEDE, BreeMonth.WEDMATH, BreeMonth.HARVESTMATH,
            BreeMonth.WINTRING, BreeMonth.BLOOTING, BreeMonth.YULEMATH,
            BreeMonth.YULE1],
        monthDays: {
            [BreeMonth.YULE2]: [1, 1],
            [BreeMonth.FRERY]: [2, 31],
            [BreeMonth.SOLMATH]: [32, 61],
            [BreeMonth.RETHE]: [62, 91],
            [BreeMonth.CHITHING]: [92, 121],
            [BreeMonth.THRIMIDGE]: [122, 151],
            [BreeMonth.LITHE]: [152, 181],
            [BreeMonth.SUMMERDAYS]: [182, 186],
            [BreeMonth.MEDE]: [187, 216],
            [BreeMonth.WEDMATH]: [217, 246],
            [BreeMonth.HARVESTMATH]: [247, 276],
            [BreeMonth.WINTRING]: [277, 306],
            [BreeMonth.BLOOTING]: [307, 336],
            [BreeMonth.YULEMATH]: [337, 366],
            [BreeMonth.YULE1]: [367, 367]
        }
    })
}
