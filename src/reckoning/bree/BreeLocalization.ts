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
    YULE2: {bree: "2 Yule"},
    M1: {bree: "Frery"},
    M2: {bree: "Solmath"},
    M3: {bree: "Rethe"},
    M4: {bree: "Chithing"},
    M5: {bree: "Thrimidge"},
    M6: {bree: "Lithe"},
    SUMMERDAYS: {bree: "Summerdays"},
    M7: {bree: "Mede"},
    M8: {bree: "Wedmath"},
    M9: {bree: "Harvestmath"},
    M10: {bree: "Wintring"},
    M11: {bree: "Blooting"},
    M12: {bree: "Yulemath"},
    YULE1: {bree: "1 Yule"}
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

