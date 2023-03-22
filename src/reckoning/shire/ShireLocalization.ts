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
    bree: string
}

export const MONTH_NAMES: Record<ShireMonth, ShireLocalizationData> = {
    YULE2: {shire: "2 Yule", bree: "2 Yule"},
    M1: {shire: "Afteryule", bree: "Frery"},
    M2: {shire: "Solmath", bree: "Solmath"},
    M3: {shire: "Rethe", bree: "Rethe"},
    M4: {shire: "Astron", bree: "Chithing"},
    M5: {shire: "Thrimidge", bree: "Thrimidge"},
    M6: {shire: "Forelithe", bree: "Lithe"},
    LITHE1: {shire: "1 Lithe", bree: "Summerday"},
    OVERLITHE_MILLENNIAL: {shire: "Leap Overlithe", bree: "Summerday"},
    MIDYEAR: {shire: "Mid-Year's Day", bree: "Summerday"},
    OVERLITHE: {shire: "Overlithe", bree: "Summerday"},
    LITHE2: {shire: "2 Lithe", bree: "Summerday"},
    M7: {shire: "Afterlithe", bree: "Mede"},
    M8: {shire: "Wedmath", bree: "Wedmath"},
    M9: {shire: "Halimath", bree: "Harvestmath"},
    M10: {shire: "Winterfilth", bree: "Wintring"},
    M11: {shire: "Blomath", bree: "Blooting"},
    M12: {shire: "Foreyule", bree: "Yulemath"},
    YULE1: {shire: "1 Yule", bree: "1 Yule"}
}

export const DAYS_OF_WEEK_NAMES: Record<DayOfWeek, ShireLocalizationData> = {
    [DayOfWeek.D1]: {shire: "Sterday", bree: "Sterday"},
    [DayOfWeek.D2]: {shire: "Sunday", bree: "Sunday"},
    [DayOfWeek.D3]: {shire: "Monday", bree: "Monday"},
    [DayOfWeek.D4]: {shire: "Trewsday", bree: "Trewsday"},
    [DayOfWeek.D5]: {shire: "Hevensday", bree: "Hevensday"},
    [DayOfWeek.D6]: {shire: "Mersday", bree: "Mersday"},
    [DayOfWeek.D7]: {shire: "Highday", bree: "Highday"},
}

