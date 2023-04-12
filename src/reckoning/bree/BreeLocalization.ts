import {BreeMonth} from "./BreeMonth";
import {DayOfWeek} from "../DayOfWeek";

export class BreeLocalization {
    static forMonth(month: BreeMonth): BreeLocalizationData {
        return MONTH_NAMES[month]
    }

    static forDayOfWeek(dayOfWeek: DayOfWeek) {
        return DAYS_OF_WEEK_NAMES[dayOfWeek]
    }
}

export interface BreeLocalizationData {
    bree: string
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
}

export const DAYS_OF_WEEK_NAMES: Record<DayOfWeek, BreeLocalizationData> = {
    [DayOfWeek.D1]: {bree: "Sterday"},
    [DayOfWeek.D2]: {bree: "Sunday"},
    [DayOfWeek.D3]: {bree: "Monday"},
    [DayOfWeek.D4]: {bree: "Trewsday"},
    [DayOfWeek.D5]: {bree: "Hevensday"},
    [DayOfWeek.D6]: {bree: "Mersday"},
    [DayOfWeek.D7]: {bree: "Highday"},
}

