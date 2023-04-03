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
    YULE2: {shire: "2 Yule"},
    M1: {shire: "Afteryule"},
    M2: {shire: "Solmath"},
    M3: {shire: "Rethe"},
    M4: {shire: "Astron"},
    M5: {shire: "Thrimidge"},
    M6: {shire: "Forelithe"},
    LITHE1: {shire: "1 Lithe"},
    OVERLITHE_MILLENNIAL: {shire: "Leap Overlithe"},
    MIDYEAR: {shire: "Mid-Year's Day"},
    OVERLITHE: {shire: "Overlithe"},
    LITHE2: {shire: "2 Lithe"},
    M7: {shire: "Afterlithe"},
    M8: {shire: "Wedmath"},
    M9: {shire: "Halimath"},
    M10: {shire: "Winterfilth"},
    M11: {shire: "Blomath"},
    M12: {shire: "Foreyule"},
    YULE1: {shire: "1 Yule"}
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

