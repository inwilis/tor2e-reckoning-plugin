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
    icon: string
}

export const MONTH_NAMES: Record<ShireMonth, ShireLocalizationData> = {
    YULE2: {shire: "2 Yule", bree: "2 Yule", icon: ""},
    M1: {shire: "Afteryule", bree: "Frery", icon: "sunrise"},
    M2: {shire: "Solmath", bree: "Solmath", icon: "cloud-rain"},
    M3: {shire: "Rethe", bree: "Rethe", icon: "wind"},
    M4: {shire: "Astron", bree: "Chithing", icon: "sprout"},
    M5: {shire: "Thrimidge", bree: "Thrimidge", icon: "flower"},
    M6: {shire: "Forelithe", bree: "Lithe", icon: "sun-dim"},
    LITHE1: {shire: "1 Lithe", bree: "Summerday", icon: ""},
    OVERLITHE_MILLENNIAL: {shire: "Leap Overlithe", bree: "Summerday", icon: ""},
    MIDYEAR: {shire: "Mid-Year's Day", bree: "Summerday", icon: ""},
    OVERLITHE: {shire: "Overlithe", bree: "Summerday", icon: ""},
    LITHE2: {shire: "2 Lithe", bree: "Summerday", icon: ""},
    M7: {shire: "Afterlithe", bree: "Mede", icon: "wheat"},
    M8: {shire: "Wedmath", bree: "Wedmath", icon: "sun"},
    M9: {shire: "Halimath", bree: "Harvestmath", icon: "apple"},
    M10: {shire: "Winterfilth", bree: "Wintring", icon: "leaf"},
    M11: {shire: "Blomath", bree: "Blooting", icon: "cloud-fog"},
    M12: {shire: "Foreyule", bree: "Yulemath", icon: "snowflake"},
    YULE1: {shire: "1 Yule", bree: "1 Yule", icon: ""}
}

export const DAYS_OF_WEEK_NAMES: Record<DayOfWeek, ShireLocalizationData> = {
    [DayOfWeek.D1]: {shire: "Sterday", bree: "Sterday", icon: "star"},
    [DayOfWeek.D2]: {shire: "Sunday", bree: "Sunday", icon: "sun"},
    [DayOfWeek.D3]: {shire: "Monday", bree: "Monday", icon: "moon"},
    [DayOfWeek.D4]: {shire: "Trewsday", bree: "Trewsday", icon: "tree-deciduous"},
    [DayOfWeek.D5]: {shire: "Hevensday", bree: "Hevensday", icon: "cloudy"},
    [DayOfWeek.D6]: {shire: "Mersday", bree: "Mersday", icon: "waves"},
    [DayOfWeek.D7]: {shire: "Highday", bree: "Highday", icon: "mountain"},
}

