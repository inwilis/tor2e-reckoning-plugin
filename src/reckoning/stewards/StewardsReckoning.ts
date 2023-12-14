import {YearType} from "../YearType";
import {StewardsMonth} from "./StewardsMonth";
import {MONTH_NAMES, stewardsLocalization} from "./StewardsLocalization";
import {YearData} from "../YearData";
import {ReckoningDate} from "../ReckoningDate";
import {Reckoning} from "../Reckoning";
import {StewardsReckoningDate} from "./StewardsReckoningDate";
import {Language} from "../Languages";

export const MARDILS_MILLENNIAL_YEAR = 2059
export const HADORS_MILLENNIAL_YEAR = 2360
export const SHIRE_RECKONING_START_IN_STEWARDS = 1600
export const BREE_RECKONING_START_IN_STEWARDS = 1299
export const STEWARDS_RECKONING_START = 2060

const MILLENNIAL_YEARS: ReadonlySet<number> = new Set<number>([1000, 2000, MARDILS_MILLENNIAL_YEAR, HADORS_MILLENNIAL_YEAR])

class StewardsReckoning extends Reckoning<StewardsMonth> {

    getName(): string {
        return "stewards";
    }

    getYearType(year: number): YearType {
        if (MILLENNIAL_YEARS.has(year)) {
            return YearType.MILLENNIAL
        } else if (this.isLeapYear(year)) {
            return YearType.LEAP
        } else {
            return YearType.REGULAR
        }
    }

    isLeapYear(year: number): boolean {
        return (year % 4 == 0) && (year % 100 != 0)
    }

    getYearData(year: number): YearData<StewardsMonth> {
        if (year < STEWARDS_RECKONING_START) {
            return KINGS_YEAR_DATA[this.getYearType(year)]
        } else {
            return STEWARDS_YEAR_DATA[this.getYearType(year)]
        }
    }

    getDate(year: number, dayOfYear: number, language?: string): ReckoningDate<StewardsMonth> {
        if (year < 1) {
            throw new RangeError(`Year ${year} is before the Year 1 of the Third Age`)
        }

        return super.getDate(year, dayOfYear, language)
    }

    newDate(year: number, month: StewardsMonth, day: number, language?: string): ReckoningDate<StewardsMonth> {
        return new StewardsReckoningDate(this, year, month, day, language)
    }

    getSupportedLanguages(): string[] {
        return [Language.QUENYA, Language.SINDARIN];
    }

    getDefaultLanguage(): string {
        return Language.QUENYA;
    }

    getLocalization() {
        return stewardsLocalization;
    }

    parseDate(date: string, language?: string): ReckoningDate<StewardsMonth> {
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
            let month: StewardsMonth | undefined
            let detectedLanguage: string | undefined

            for (let m in StewardsMonth) {
                const monthLocalization = MONTH_NAMES[m as keyof typeof MONTH_NAMES];
                for (let k in monthLocalization) {
                    if (rawMonth == monthLocalization[k as keyof typeof monthLocalization]) {
                        month = m as keyof typeof MONTH_NAMES
                        detectedLanguage = k
                    }
                }
            }

            if (detectedLanguage) {
                detectedLanguage = detectedLanguage.replace("Simplified", "")
            }

            if (month) {
                if (rawDay) {
                    return this.newDate(year, month, parseInt(rawDay), detectedLanguage)
                } else {
                    const monthDays = this.getYearData(year).monthDays[month];
                    if (monthDays[0] == monthDays[1]) {
                        return this.newDate(year, month, 1, detectedLanguage)
                    }
                }
            }
        }

        throw new Error(`Unable to parse '${date}' as date of Steward's reckoning`)
    }
}

export const stewardsReckoning: Reckoning<StewardsMonth> = new StewardsReckoning()

const KINGS_YEAR_DATA: Record<YearType, YearData<StewardsMonth>> = {
    [YearType.REGULAR]: new YearData<StewardsMonth>({
        type: YearType.REGULAR,
        length: 365,
        monthSequence: [
            StewardsMonth.YESTARE,
            StewardsMonth.NARVINYE, StewardsMonth.NENIME, StewardsMonth.SULIME,
            StewardsMonth.VIRESSE, StewardsMonth.LOTESSE, StewardsMonth.NARIE,
            StewardsMonth.LOENDE,
            StewardsMonth.CERMIE, StewardsMonth.URIME, StewardsMonth.YAVANNIE,
            StewardsMonth.NARQUELIE, StewardsMonth.HISIME, StewardsMonth.RINGARE,
            StewardsMonth.METTARE],
        monthDays: {
            [StewardsMonth.YESTARE]: [1, 1],
            [StewardsMonth.NARVINYE]: [2, 31],
            [StewardsMonth.NENIME]: [32, 61],
            [StewardsMonth.SULIME]: [62, 91],
            [StewardsMonth.TUILERE]: [-1, -1],
            [StewardsMonth.VIRESSE]: [92, 121],
            [StewardsMonth.LOTESSE]: [122, 151],
            [StewardsMonth.NARIE]: [152, 182],
            [StewardsMonth.LOENDE]: [183, 183],
            [StewardsMonth.ENDERE]: [-1, -1],
            [StewardsMonth.CERMIE]: [184, 214],
            [StewardsMonth.URIME]: [215, 244],
            [StewardsMonth.YAVANNIE]: [245, 274],
            [StewardsMonth.YAVIERE]: [-1, -1],
            [StewardsMonth.NARQUELIE]: [275, 304],
            [StewardsMonth.HISIME]: [305, 334],
            [StewardsMonth.RINGARE]: [335, 364],
            [StewardsMonth.METTARE]: [365, 365]
        }
    }),
    [YearType.LEAP]: new YearData<StewardsMonth>({
        type: YearType.LEAP,
        length: 366,
        monthSequence: [
            StewardsMonth.YESTARE,
            StewardsMonth.NARVINYE, StewardsMonth.NENIME, StewardsMonth.SULIME,
            StewardsMonth.VIRESSE, StewardsMonth.LOTESSE, StewardsMonth.NARIE,
            StewardsMonth.ENDERE,
            StewardsMonth.CERMIE, StewardsMonth.URIME, StewardsMonth.YAVANNIE,
            StewardsMonth.NARQUELIE, StewardsMonth.HISIME, StewardsMonth.RINGARE,
            StewardsMonth.METTARE],
        monthDays: {
            [StewardsMonth.YESTARE]: [1, 1],
            [StewardsMonth.NARVINYE]: [2, 31],
            [StewardsMonth.NENIME]: [32, 61],
            [StewardsMonth.SULIME]: [62, 91],
            [StewardsMonth.TUILERE]: [-1, -1],
            [StewardsMonth.VIRESSE]: [92, 121],
            [StewardsMonth.LOTESSE]: [122, 151],
            [StewardsMonth.NARIE]: [152, 182],
            [StewardsMonth.LOENDE]: [-1, -1],
            [StewardsMonth.ENDERE]: [183, 184],
            [StewardsMonth.CERMIE]: [185, 215],
            [StewardsMonth.URIME]: [216, 245],
            [StewardsMonth.YAVANNIE]: [246, 275],
            [StewardsMonth.YAVIERE]: [-1, -1],
            [StewardsMonth.NARQUELIE]: [276, 305],
            [StewardsMonth.HISIME]: [306, 335],
            [StewardsMonth.RINGARE]: [336, 365],
            [StewardsMonth.METTARE]: [366, 366]
        }
    }),
    [YearType.MILLENNIAL]: new YearData<StewardsMonth>({
        type: YearType.MILLENNIAL,
        length: 367,
        monthSequence: [
            StewardsMonth.YESTARE,
            StewardsMonth.NARVINYE, StewardsMonth.NENIME, StewardsMonth.SULIME,
            StewardsMonth.VIRESSE, StewardsMonth.LOTESSE, StewardsMonth.NARIE,
            StewardsMonth.ENDERE,
            StewardsMonth.CERMIE, StewardsMonth.URIME, StewardsMonth.YAVANNIE,
            StewardsMonth.NARQUELIE, StewardsMonth.HISIME, StewardsMonth.RINGARE,
            StewardsMonth.METTARE],
        monthDays: {
            [StewardsMonth.YESTARE]: [1, 1],
            [StewardsMonth.NARVINYE]: [2, 31],
            [StewardsMonth.NENIME]: [32, 61],
            [StewardsMonth.SULIME]: [62, 91],
            [StewardsMonth.TUILERE]: [-1, -1],
            [StewardsMonth.VIRESSE]: [92, 121],
            [StewardsMonth.LOTESSE]: [122, 151],
            [StewardsMonth.NARIE]: [152, 182],
            [StewardsMonth.LOENDE]: [-1, -1],
            [StewardsMonth.ENDERE]: [183, 185],
            [StewardsMonth.CERMIE]: [186, 216],
            [StewardsMonth.URIME]: [217, 246],
            [StewardsMonth.YAVANNIE]: [247, 276],
            [StewardsMonth.YAVIERE]: [-1, -1],
            [StewardsMonth.NARQUELIE]: [277, 306],
            [StewardsMonth.HISIME]: [307, 336],
            [StewardsMonth.RINGARE]: [337, 366],
            [StewardsMonth.METTARE]: [367, 367]
        }
    })
}
const STEWARDS_YEAR_DATA: Record<YearType, YearData<StewardsMonth>> = {
    [YearType.REGULAR]: new YearData<StewardsMonth>({
        type: YearType.REGULAR,
        length: 365,
        monthSequence: [
            StewardsMonth.YESTARE,
            StewardsMonth.NARVINYE, StewardsMonth.NENIME, StewardsMonth.SULIME,
            StewardsMonth.TUILERE,
            StewardsMonth.VIRESSE, StewardsMonth.LOTESSE, StewardsMonth.NARIE,
            StewardsMonth.LOENDE,
            StewardsMonth.CERMIE, StewardsMonth.URIME, StewardsMonth.YAVANNIE,
            StewardsMonth.YAVIERE,
            StewardsMonth.NARQUELIE, StewardsMonth.HISIME, StewardsMonth.RINGARE,
            StewardsMonth.METTARE],
        monthDays: {
            [StewardsMonth.YESTARE]: [1, 1],
            [StewardsMonth.NARVINYE]: [2, 31],
            [StewardsMonth.NENIME]: [32, 61],
            [StewardsMonth.SULIME]: [62, 91],
            [StewardsMonth.TUILERE]: [92, 92],
            [StewardsMonth.VIRESSE]: [93, 122],
            [StewardsMonth.LOTESSE]: [123, 152],
            [StewardsMonth.NARIE]: [153, 182],
            [StewardsMonth.LOENDE]: [183, 183],
            [StewardsMonth.ENDERE]: [-1, -1],
            [StewardsMonth.CERMIE]: [184, 213],
            [StewardsMonth.URIME]: [214, 243],
            [StewardsMonth.YAVANNIE]: [244, 273],
            [StewardsMonth.YAVIERE]: [274, 274],
            [StewardsMonth.NARQUELIE]: [275, 304],
            [StewardsMonth.HISIME]: [305, 334],
            [StewardsMonth.RINGARE]: [335, 364],
            [StewardsMonth.METTARE]: [365, 365]
        }
    }),
    [YearType.LEAP]: new YearData<StewardsMonth>({
        type: YearType.LEAP,
        length: 366,
        monthSequence: [
            StewardsMonth.YESTARE,
            StewardsMonth.NARVINYE, StewardsMonth.NENIME, StewardsMonth.SULIME,
            StewardsMonth.TUILERE,
            StewardsMonth.VIRESSE, StewardsMonth.LOTESSE, StewardsMonth.NARIE,
            StewardsMonth.ENDERE,
            StewardsMonth.CERMIE, StewardsMonth.URIME, StewardsMonth.YAVANNIE,
            StewardsMonth.YAVIERE,
            StewardsMonth.NARQUELIE, StewardsMonth.HISIME, StewardsMonth.RINGARE,
            StewardsMonth.METTARE],
        monthDays: {
            [StewardsMonth.YESTARE]: [1, 1],
            [StewardsMonth.NARVINYE]: [2, 31],
            [StewardsMonth.NENIME]: [32, 61],
            [StewardsMonth.SULIME]: [62, 91],
            [StewardsMonth.TUILERE]: [92, 92],
            [StewardsMonth.VIRESSE]: [93, 122],
            [StewardsMonth.LOTESSE]: [123, 152],
            [StewardsMonth.NARIE]: [153, 182],
            [StewardsMonth.LOENDE]: [-1, -1],
            [StewardsMonth.ENDERE]: [183, 184],
            [StewardsMonth.CERMIE]: [185, 214],
            [StewardsMonth.URIME]: [215, 244],
            [StewardsMonth.YAVANNIE]: [245, 274],
            [StewardsMonth.YAVIERE]: [275, 275],
            [StewardsMonth.NARQUELIE]: [276, 305],
            [StewardsMonth.HISIME]: [306, 335],
            [StewardsMonth.RINGARE]: [336, 365],
            [StewardsMonth.METTARE]: [366, 366]
        }
    }),
    [YearType.MILLENNIAL]: new YearData<StewardsMonth>({
        type: YearType.MILLENNIAL,
        length: 367,
        monthSequence: [
            StewardsMonth.YESTARE,
            StewardsMonth.NARVINYE, StewardsMonth.NENIME, StewardsMonth.SULIME,
            StewardsMonth.TUILERE,
            StewardsMonth.VIRESSE, StewardsMonth.LOTESSE, StewardsMonth.NARIE,
            StewardsMonth.ENDERE,
            StewardsMonth.CERMIE, StewardsMonth.URIME, StewardsMonth.YAVANNIE,
            StewardsMonth.YAVIERE,
            StewardsMonth.NARQUELIE, StewardsMonth.HISIME, StewardsMonth.RINGARE,
            StewardsMonth.METTARE],
        monthDays: {
            [StewardsMonth.YESTARE]: [1, 1],
            [StewardsMonth.NARVINYE]: [2, 31],
            [StewardsMonth.NENIME]: [32, 61],
            [StewardsMonth.SULIME]: [62, 91],
            [StewardsMonth.TUILERE]: [92, 92],
            [StewardsMonth.VIRESSE]: [93, 122],
            [StewardsMonth.LOTESSE]: [123, 152],
            [StewardsMonth.NARIE]: [153, 182],
            [StewardsMonth.LOENDE]: [-1, -1],
            [StewardsMonth.ENDERE]: [183, 185],
            [StewardsMonth.CERMIE]: [186, 215],
            [StewardsMonth.URIME]: [216, 245],
            [StewardsMonth.YAVANNIE]: [246, 275],
            [StewardsMonth.YAVIERE]: [276, 276],
            [StewardsMonth.NARQUELIE]: [277, 306],
            [StewardsMonth.HISIME]: [307, 336],
            [StewardsMonth.RINGARE]: [337, 366],
            [StewardsMonth.METTARE]: [367, 367]
        }
    })
}
