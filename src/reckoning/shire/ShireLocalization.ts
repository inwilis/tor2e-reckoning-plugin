import {ShireMonth} from "./ShireMonth";
import {DayOfWeek} from "../DayOfWeek";
import {Localization} from "../Localization";

export class ShireLocalization implements Localization<ShireMonth> {
    dataForMonth(month: ShireMonth): ShireLocalizationData {
        return MONTH_NAMES[month]
    }

    forMonth(month: ShireMonth): string {
        return MONTH_NAMES[month].shire;
    }

    forMonthMeaning(month: ShireMonth): string {
        return MONTH_NAMES_MEANING[month];
    }

    forDayOfWeek(dayOfWeek: DayOfWeek) {
        return DAYS_OF_WEEK_NAMES[dayOfWeek].shire;
    }

    forDayOfWeekMeaning(dayOfWeek: DayOfWeek) {
        return DAYS_OF_WEEK_NAMES_MEANING[dayOfWeek];
    }
}

export const shireLocalization = new ShireLocalization()

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

export const DAYS_OF_WEEK_NAMES_MEANING: Record<DayOfWeek, string> = {
    [DayOfWeek.D1]: "Star Day",
    [DayOfWeek.D2]: "Sun Day",
    [DayOfWeek.D3]: "Moon Day",
    [DayOfWeek.D4]: "Trees Day",
    [DayOfWeek.D5]: "Heavens Day",
    [DayOfWeek.D6]: "Sea Day",
    [DayOfWeek.D7]: "High Day",
}

export const MONTH_NAMES_MEANING: Record<ShireMonth, string> = {
    [ShireMonth.YULE2]: "New Year's Day",
    [ShireMonth.AFTERYULE]: "Month after Yule",
    [ShireMonth.SOLMATH]: "Muddy Month",
    [ShireMonth.RETHE]: "Glory Month",
    [ShireMonth.ASTRON]: "Easter Month",
    [ShireMonth.THRIMIDGE]: "Month of Plenty",
    [ShireMonth.FORELITHE]: "Month before Midsummer",
    [ShireMonth.LITHE1]: "Midsummer's Eve",
    [ShireMonth.OVERLITHE_MILLENNIAL]: "Millennial Summer Leap Day",
    [ShireMonth.MIDYEAR]: "Midsummer Day",
    [ShireMonth.OVERLITHE]: "Summer Leap Day",
    [ShireMonth.LITHE2]: "Day after Midsummer",
    [ShireMonth.AFTERLITHE]: "Month after Midsummer",
    [ShireMonth.WEDMATH]: "Weed Month",
    [ShireMonth.HALIMATH]: "Holy Month",
    [ShireMonth.WINTERFILTH]: "Filling Month",
    [ShireMonth.BLOMATH]: "Sacrifice Month",
    [ShireMonth.FOREYULE]: "Month before Yule",
    [ShireMonth.YULE1]: "New Year's Eve"
}
