import {ShireMonth} from "./ShireMonth";
import {DayOfWeek} from "../DayOfWeek";

export class ShireLocalization {
    static forMonth(month: ShireMonth): ShireLocalizationData {
        return MONTH_NAMES[month]
    }

    static forDayOfWeek(dayOfWeek: DayOfWeek) {
        return DAYS_OF_WEEK_NAMES[dayOfWeek]
    }
}

export interface ShireLocalizationData {
    shire: string
}

export const MONTH_NAMES: Record<ShireMonth, ShireLocalizationData> = {
    [ShireMonth.YULE2]: {shire: "2 Yule"},
    [ShireMonth.AFTERYULE]: {shire: "Afteryule"},
    [ShireMonth.SOLMATH]: {shire: "Solmath"},
    [ShireMonth.RETHE]: {shire: "Rethe"},
    [ShireMonth.ASTRON]: {shire: "Astron"},
    [ShireMonth.THRIMIDGE]: {shire: "Thrimidge"},
    [ShireMonth.FORELITHE]: {shire: "Forelithe"},
    [ShireMonth.LITHE1]: {shire: "1 Lithe"},
    [ShireMonth.OVERLITHE_MILLENNIAL]: {shire: "Leap Overlithe"},
    [ShireMonth.MIDYEAR]: {shire: "Mid-Year's Day"},
    [ShireMonth.OVERLITHE]: {shire: "Overlithe"},
    [ShireMonth.LITHE2]: {shire: "2 Lithe"},
    [ShireMonth.AFTERLITHE]: {shire: "Afterlithe"},
    [ShireMonth.WEDMATH]: {shire: "Wedmath"},
    [ShireMonth.HALIMATH]: {shire: "Halimath"},
    [ShireMonth.WINTERFILTH]: {shire: "Winterfilth"},
    [ShireMonth.BLOMATH]: {shire: "Blomath"},
    [ShireMonth.FOREYULE]: {shire: "Foreyule"},
    [ShireMonth.YULE1]: {shire: "1 Yule"}
}

export const DAYS_OF_WEEK_NAMES: Record<DayOfWeek, ShireLocalizationData> = {
    [DayOfWeek.D1]: {shire: "Sterday"},
    [DayOfWeek.D2]: {shire: "Sunday"},
    [DayOfWeek.D3]: {shire: "Monday"},
    [DayOfWeek.D4]: {shire: "Trewsday"},
    [DayOfWeek.D5]: {shire: "Hevensday"},
    [DayOfWeek.D6]: {shire: "Mersday"},
    [DayOfWeek.D7]: {shire: "Highday"},
}

