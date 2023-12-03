import {YearType} from "../YearType";
import {YearData} from "../YearData";
import {GregorianMonth} from "./GregorianMonth";
import {GregorianLocalization} from "./GregorianLocalization";

class ApproximateGregorianYear {

    getMonthString(dayOfYear: number, yearType: YearType): string {
        const yearData = YEAR_DATA[yearType];
        return GregorianLocalization.forMonth(yearData.getMonthForDayOfYear(dayOfYear)).gregorian;
    }

    getDayOfMonth(dayOfYear: number, yearType: YearType): number {
        const yearData = YEAR_DATA[yearType];
        return dayOfYear - yearData.monthDays[yearData.getMonthForDayOfYear(dayOfYear)][0] + 1;
    }

    getDateString(dayOfYear: number, yearType: YearType): string {
        return this.getDayOfMonth(dayOfYear, yearType) + " " + this.getMonthString(dayOfYear, yearType);
    }

}

export const approximateGregorianYear: ApproximateGregorianYear = new ApproximateGregorianYear();

const YEAR_DATA: Record<YearType, YearData<GregorianMonth>> = {
    [YearType.REGULAR]: new YearData<GregorianMonth>({
        type: YearType.REGULAR,
        length: 365,
        monthSequence: [
            GregorianMonth.JANUARY,
            GregorianMonth.FEBRUARY,
            GregorianMonth.MARCH,
            GregorianMonth.APRIL,
            GregorianMonth.MAY,
            GregorianMonth.JUNE,
            GregorianMonth.JULY,
            GregorianMonth.AUGUST,
            GregorianMonth.SEPTEMBER,
            GregorianMonth.OCTOBER,
            GregorianMonth.NOVEMBER,
            GregorianMonth.DECEMBER
        ],
        monthDays: {
            [GregorianMonth.JANUARY]: [1, 31],
            [GregorianMonth.FEBRUARY]: [32, 59],
            [GregorianMonth.MARCH]: [60, 90],
            [GregorianMonth.APRIL]: [91, 120],
            [GregorianMonth.MAY]: [121, 151],
            [GregorianMonth.JUNE]: [152, 181],
            [GregorianMonth.JULY]: [182, 212],
            [GregorianMonth.AUGUST]: [213, 243],
            [GregorianMonth.SEPTEMBER]: [244, 273],
            [GregorianMonth.OCTOBER]: [274, 304],
            [GregorianMonth.NOVEMBER]: [305, 334],
            [GregorianMonth.DECEMBER]: [335, 365],
        }
    }),
    [YearType.LEAP]: new YearData<GregorianMonth>({
        type: YearType.REGULAR,
        length: 365,
        monthSequence: [
            GregorianMonth.JANUARY,
            GregorianMonth.FEBRUARY,
            GregorianMonth.MARCH,
            GregorianMonth.APRIL,
            GregorianMonth.MAY,
            GregorianMonth.JUNE,
            GregorianMonth.JULY,
            GregorianMonth.AUGUST,
            GregorianMonth.SEPTEMBER,
            GregorianMonth.OCTOBER,
            GregorianMonth.NOVEMBER,
            GregorianMonth.DECEMBER
        ],
        monthDays: {
            [GregorianMonth.JANUARY]: [1, 31],
            [GregorianMonth.FEBRUARY]: [32, 59],
            [GregorianMonth.MARCH]: [60, 90],
            [ GregorianMonth.APRIL]: [91, 120],
            [GregorianMonth.MAY]: [121, 151],
            [GregorianMonth.JUNE]: [152, 182],
            [GregorianMonth.JULY]: [183, 213],
            [GregorianMonth.AUGUST]: [214, 244],
            [GregorianMonth.SEPTEMBER]: [245, 274],
            [GregorianMonth.OCTOBER]: [275, 305],
            [GregorianMonth.NOVEMBER]: [306, 335],
            [GregorianMonth.DECEMBER]: [336, 366],
        }
    }),
    [YearType.MILLENNIAL]: new YearData<GregorianMonth>({
        type: YearType.REGULAR,
        length: 365,
        monthSequence: [
            GregorianMonth.JANUARY,
            GregorianMonth.FEBRUARY,
            GregorianMonth.MARCH,
            GregorianMonth.APRIL,
            GregorianMonth.MAY,
            GregorianMonth.JUNE,
            GregorianMonth.JULY,
            GregorianMonth.AUGUST,
            GregorianMonth.SEPTEMBER,
            GregorianMonth.OCTOBER,
            GregorianMonth.NOVEMBER,
            GregorianMonth.DECEMBER
        ],
        monthDays: {
            [GregorianMonth.JANUARY]: [1, 31],
            [GregorianMonth.FEBRUARY]: [32, 59],
            [GregorianMonth.MARCH]: [60, 90],
            [ GregorianMonth.APRIL]: [91, 120],
            [GregorianMonth.MAY]: [121, 151],
            [GregorianMonth.JUNE]: [152, 183],
            [GregorianMonth.JULY]: [184, 214],
            [GregorianMonth.AUGUST]: [215, 245],
            [GregorianMonth.SEPTEMBER]: [246, 275],
            [GregorianMonth.OCTOBER]: [276, 306],
            [GregorianMonth.NOVEMBER]: [307, 336],
            [GregorianMonth.DECEMBER]: [337, 367],
        }
    })
}
