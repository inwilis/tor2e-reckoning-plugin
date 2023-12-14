import {BreeMonth} from "./BreeMonth";
import {DayOfWeek} from "../DayOfWeek";
import {Localization} from "../Localization";

export class BreeLocalization implements Localization<BreeMonth> {

    dataForMonth(month: BreeMonth): BreeLocalizationData {
        return MONTH_NAMES[month];
    }

    forMonth(month: BreeMonth): string {
        return MONTH_NAMES[month].bree;
    }

    forMonthMeaning(month: BreeMonth): string {
        return MONTH_NAMES_MEANING[month];
    }

    forDayOfWeek(dayOfWeek: DayOfWeek): string {
        return DAYS_OF_WEEK_NAMES[dayOfWeek].bree;
    }

    forDayOfWeekMeaning(dayOfWeek: DayOfWeek): string {
        return DAYS_OF_WEEK_NAMES_MEANING[dayOfWeek];
    }
}

export const breeLocalization = new BreeLocalization();

export interface BreeLocalizationData {
    bree: string;
}

export const MONTH_NAMES: Record<BreeMonth, BreeLocalizationData> = {
    [BreeMonth.YULE2]: {bree: "2 Yule"},
    [BreeMonth.FRERY]: {bree: "Frery"},
    [BreeMonth.SOLMATH]: {bree: "Solmath"},
    [BreeMonth.RETHE]: {bree: "Rethe"},
    [BreeMonth.CHITHING]: {bree: "Chithing"},
    [BreeMonth.THRIMIDGE]: {bree: "Thrimidge"},
    [BreeMonth.LITHE]: {bree: "Lithe"},
    [BreeMonth.SUMMERDAYS]: {bree: "Summerdays"},
    [BreeMonth.MEDE]: {bree: "Mede"},
    [BreeMonth.WEDMATH]: {bree: "Wedmath"},
    [BreeMonth.HARVESTMATH]: {bree: "Harvestmath"},
    [BreeMonth.WINTRING]: {bree: "Wintring"},
    [BreeMonth.BLOOTING]: {bree: "Blooting"},
    [BreeMonth.YULEMATH]: {bree: "Yulemath"},
    [BreeMonth.YULE1]: {bree: "1 Yule"}
};

export const DAYS_OF_WEEK_NAMES: Record<DayOfWeek, BreeLocalizationData> = {
    [DayOfWeek.D1]: {bree: "Sterday"},
    [DayOfWeek.D2]: {bree: "Sunday"},
    [DayOfWeek.D3]: {bree: "Monday"},
    [DayOfWeek.D4]: {bree: "Trewsday"},
    [DayOfWeek.D5]: {bree: "Hevensday"},
    [DayOfWeek.D6]: {bree: "Mersday"},
    [DayOfWeek.D7]: {bree: "Highday"},
};

export const DAYS_OF_WEEK_NAMES_MEANING: Record<DayOfWeek, string> = {
    [DayOfWeek.D1]: "Star Day",
    [DayOfWeek.D2]: "Sun Day",
    [DayOfWeek.D3]: "Moon Day",
    [DayOfWeek.D4]: "Trees Day",
    [DayOfWeek.D5]: "Heavens Day",
    [DayOfWeek.D6]: "Sea Day",
    [DayOfWeek.D7]: "High Day",
};

export const MONTH_NAMES_MEANING: Record<BreeMonth, string> = {
    [BreeMonth.YULE2]: "New Year's Day",
    [BreeMonth.FRERY]: "Frigid Month",
    [BreeMonth.SOLMATH]: "Muddy Month",
    [BreeMonth.RETHE]: "Glory Month",
    [BreeMonth.CHITHING]: "Sprout Month",
    [BreeMonth.THRIMIDGE]: "Month of Plenty",
    [BreeMonth.LITHE]: "Gentle Month",
    [BreeMonth.SUMMERDAYS]: "Summerdays",
    [BreeMonth.MEDE]: "Meadow Month",
    [BreeMonth.WEDMATH]: "Weed Month",
    [BreeMonth.HARVESTMATH]: "Harvest Month",
    [BreeMonth.WINTRING]: "Wintry Month",
    [BreeMonth.BLOOTING]: "Sacrifice Month",
    [BreeMonth.YULEMATH]: "Yule Month",
    [BreeMonth.YULE1]: "New Year's Eve"
};
