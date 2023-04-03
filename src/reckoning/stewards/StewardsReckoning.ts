import {YearType} from "../YearType";
import {StewardsMonth} from "./StewardsMonth";
import {MONTH_NAMES} from "./StewardsLocalization";
import {YearData} from "../YearData";
import {ReckoningDate} from "../ReckoningDate";
import {Reckoning} from "../Reckoning";
import {StewardsReckoningDate} from "./StewardsReckoningDate";

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
        return ["quenya", "sindarin"];
    }

    getDefaultLanguage(): string {
        return "quenya";
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
            StewardsMonth.I1,
            StewardsMonth.M1, StewardsMonth.M2, StewardsMonth.M3,
            StewardsMonth.M4, StewardsMonth.M5, StewardsMonth.M6,
            StewardsMonth.I3,
            StewardsMonth.M7, StewardsMonth.M8, StewardsMonth.M9,
            StewardsMonth.M10, StewardsMonth.M11, StewardsMonth.M12,
            StewardsMonth.I5],
        monthDays: {
            I1: [1, 1],
            M1: [2, 31],
            M2: [32, 61],
            M3: [62, 91],
            I2: [-1, -1],
            M4: [92, 121],
            M5: [122, 151],
            M6: [152, 182],
            I3: [183, 183],
            I3L: [-1, -1],
            M7: [184, 214],
            M8: [215, 244],
            M9: [245, 274],
            I4: [-1, -1],
            M10: [275, 304],
            M11: [305, 334],
            M12: [335, 364],
            I5: [365, 365]
        }
    }),
    [YearType.LEAP]: new YearData<StewardsMonth>({
        type: YearType.LEAP,
        length: 366,
        monthSequence: [
            StewardsMonth.I1,
            StewardsMonth.M1, StewardsMonth.M2, StewardsMonth.M3,
            StewardsMonth.M4, StewardsMonth.M5, StewardsMonth.M6,
            StewardsMonth.I3L,
            StewardsMonth.M7, StewardsMonth.M8, StewardsMonth.M9,
            StewardsMonth.M10, StewardsMonth.M11, StewardsMonth.M12,
            StewardsMonth.I5],
        monthDays: {
            I1: [1, 1],
            M1: [2, 31],
            M2: [32, 61],
            M3: [62, 91],
            I2: [-1, -1],
            M4: [92, 121],
            M5: [122, 151],
            M6: [152, 182],
            I3: [-1, -1],
            I3L: [183, 184],
            M7: [185, 215],
            M8: [216, 245],
            M9: [246, 275],
            I4: [-1, -1],
            M10: [276, 305],
            M11: [306, 335],
            M12: [336, 365],
            I5: [366, 366]
        }
    }),
    [YearType.MILLENNIAL]: new YearData<StewardsMonth>({
        type: YearType.MILLENNIAL,
        length: 367,
        monthSequence: [
            StewardsMonth.I1,
            StewardsMonth.M1, StewardsMonth.M2, StewardsMonth.M3,
            StewardsMonth.M4, StewardsMonth.M5, StewardsMonth.M6,
            StewardsMonth.I3L,
            StewardsMonth.M7, StewardsMonth.M8, StewardsMonth.M9,
            StewardsMonth.M10, StewardsMonth.M11, StewardsMonth.M12,
            StewardsMonth.I5],
        monthDays: {
            I1: [1, 1],
            M1: [2, 31],
            M2: [32, 61],
            M3: [62, 91],
            I2: [-1, -1],
            M4: [92, 121],
            M5: [122, 151],
            M6: [152, 182],
            I3: [-1, -1],
            I3L: [183, 185],
            M7: [186, 216],
            M8: [217, 246],
            M9: [247, 276],
            I4: [-1, -1],
            M10: [277, 306],
            M11: [307, 336],
            M12: [337, 366],
            I5: [367, 367]
        }
    })
}
const STEWARDS_YEAR_DATA: Record<YearType, YearData<StewardsMonth>> = {
    [YearType.REGULAR]: new YearData<StewardsMonth>({
        type: YearType.REGULAR,
        length: 365,
        monthSequence: [
            StewardsMonth.I1,
            StewardsMonth.M1, StewardsMonth.M2, StewardsMonth.M3,
            StewardsMonth.I2,
            StewardsMonth.M4, StewardsMonth.M5, StewardsMonth.M6,
            StewardsMonth.I3,
            StewardsMonth.M7, StewardsMonth.M8, StewardsMonth.M9,
            StewardsMonth.I4,
            StewardsMonth.M10, StewardsMonth.M11, StewardsMonth.M12,
            StewardsMonth.I5],
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
    }),
    [YearType.LEAP]: new YearData<StewardsMonth>({
        type: YearType.LEAP,
        length: 366,
        monthSequence: [
            StewardsMonth.I1,
            StewardsMonth.M1, StewardsMonth.M2, StewardsMonth.M3,
            StewardsMonth.I2,
            StewardsMonth.M4, StewardsMonth.M5, StewardsMonth.M6,
            StewardsMonth.I3L,
            StewardsMonth.M7, StewardsMonth.M8, StewardsMonth.M9,
            StewardsMonth.I4,
            StewardsMonth.M10, StewardsMonth.M11, StewardsMonth.M12,
            StewardsMonth.I5],
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
    }),
    [YearType.MILLENNIAL]: new YearData<StewardsMonth>({
        type: YearType.MILLENNIAL,
        length: 367,
        monthSequence: [
            StewardsMonth.I1,
            StewardsMonth.M1, StewardsMonth.M2, StewardsMonth.M3,
            StewardsMonth.I2,
            StewardsMonth.M4, StewardsMonth.M5, StewardsMonth.M6,
            StewardsMonth.I3L,
            StewardsMonth.M7, StewardsMonth.M8, StewardsMonth.M9,
            StewardsMonth.I4,
            StewardsMonth.M10, StewardsMonth.M11, StewardsMonth.M12,
            StewardsMonth.I5],
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
    })
}
