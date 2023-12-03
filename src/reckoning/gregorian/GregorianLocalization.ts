import {GregorianMonth} from "./GregorianMonth";

export class GregorianLocalization {
    static forMonth(month: GregorianMonth): GregorianLocalizationData {
        return MONTH_NAMES[month]
    }


}

export interface GregorianLocalizationData {
    gregorian: string
}

export const MONTH_NAMES: Record<GregorianMonth, GregorianLocalizationData> = {
    [GregorianMonth.JANUARY]: { gregorian: "January" },
    [GregorianMonth.FEBRUARY]: { gregorian: "February" },
    [GregorianMonth.MARCH]: { gregorian: "March" },
    [GregorianMonth.APRIL]: { gregorian: "April" },
    [GregorianMonth.MAY]: { gregorian: "May" },
    [GregorianMonth.JUNE]: { gregorian: "June" },
    [GregorianMonth.JULY]: { gregorian: "July" },
    [GregorianMonth.AUGUST]: { gregorian: "August" },
    [GregorianMonth.SEPTEMBER]: { gregorian: "September" },
    [GregorianMonth.OCTOBER]: { gregorian: "October" },
    [GregorianMonth.NOVEMBER]: { gregorian: "November" },
    [GregorianMonth.DECEMBER]: { gregorian: "December" }
}



