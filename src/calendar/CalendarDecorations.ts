import {StewardsMonth} from "../reckoning/stewards/StewardsMonth";
import {ShireMonth} from "../reckoning/shire/ShireMonth";
import {ReckoningDate} from "../reckoning/ReckoningDate";
import {Season} from "./Season";
import {BreeMonth} from "../reckoning/bree/BreeMonth";


import {STEWARDS_RECKONING_START} from "../reckoning/stewards/StewardsReckoning";
import {moonCalendar} from "../moon/MoonCalendar";
import {languages} from "../reckoning/Languages";

const WEEKDAY_ICONS = ["star", "sun", "moon", "tree-deciduous", "cloudy", "waves", "mountain"]

const reckoningTitles: ReadonlyMap<string, string> = new Map<string, string>([
    ["stewards", "Steward's"],
    ["shire", "Shire"],
    ["bree", "Bree"]
])

export interface MonthInSeason {
    season: Season,
    index?: number
}

export const calendarDecorations = {

    getReckoningTitle(date: ReckoningDate<any>): string {
        return this.getReckoningShortTitle(date) + " Reckoning";
    },

    getReckoningShortTitle(date: ReckoningDate<any>): string {
        return (date.reckoning.getName() == "stewards" && date.year < STEWARDS_RECKONING_START)
            ? "King's"
            : reckoningTitles.get(date.reckoning.getName()) || date.reckoning.getName();
    },

    getWeekDayIcons(): string[] {
        return WEEKDAY_ICONS
    },

    getMonthIcon(date: ReckoningDate<any>): string {
        if (date.reckoning.getName() == "stewards") {
            return this.getStewardsMonthIcon(date.month as StewardsMonth)
        } else if (date.reckoning.getName() == "shire") {
            return this.getShireMonthIcon(date.month as ShireMonth)
        } else if (date.reckoning.getName() == "bree") {
            return this.getBreeMonthIcon(date.month as BreeMonth)
        }
        return ""
    },

    getStewardsMonthIcon(month: StewardsMonth): string {
        return STEWARDS_MONTH_ICONS[month]
    },

    getShireMonthIcon(month: ShireMonth): string {
        return SHIRE_MONTH_ICONS[month]
    },

    getBreeMonthIcon(month: BreeMonth): string {
        return BREE_MONTH_ICONS[month]
    },

    getSeason(date: ReckoningDate<any>): string {
        return this.getMonthInSeason(date).season
    },

    getMonthInSeason(date: ReckoningDate<any>): MonthInSeason {
        if (date.reckoningName == "stewards") {
            return this.getStewardsMonthSeason(date.month as StewardsMonth)
        } else if (date.reckoningName == "shire") {
            return this.getShireMonthSeason(date.month as ShireMonth)
        } else if (date.reckoningName == "bree") {
            return this.getBreeMonthSeason(date.month as BreeMonth)
        }

        throw RangeError("Unknown reckoning: " + date.reckoningName);
    },

    getStewardsMonthSeason(month: StewardsMonth): MonthInSeason {
        return STEWARDS_MONTH_SEASONS[month]
    },

    getShireMonthSeason(month: ShireMonth): MonthInSeason {
        return SHIRE_MONTH_SEASONS[month]
    },

    getBreeMonthSeason(month: BreeMonth): MonthInSeason {
        return BREE_MONTH_SEASONS[month]
    },

    renderMoonPhase(container: HTMLElement, date: ReckoningDate<any>) {
        const [growing, percent] = moonCalendar.getMoonDiskPercent(date)

        const fullMoon = percent > 97
        const newMoon = percent < 3

        const moon = container.createEl("div", {cls: "moon"})
        const firstHalf = moon.createEl("div", {cls: ["half"]})
        const secondHalf = moon.createEl("div", {cls: ["half"]})
        const curvature = moon.createEl("div", {cls: "curvature"})

        if (fullMoon) {
            firstHalf.addClass("light")
            secondHalf.addClass("light")
        } else if (newMoon) {
            firstHalf.addClass("dark")
            secondHalf.addClass("dark")
        } else if (growing) {
            firstHalf.addClass("dark")
            secondHalf.addClass("light")
        } else {
            firstHalf.addClass("light")
            secondHalf.addClass("dark")
        }

        const deg = 180 - Math.floor((percent * 180) / 100)

        curvature.style.transform = `rotate3d(0, 1, 0, ${deg}deg)`
    },

    getLocaleDescription(date: ReckoningDate<any>): string {
        return date.reckoning.getSupportedLanguages().length > 1
            ? languages.getAbbreviation(date.language) + " " + this.getReckoningShortTitle(date)
            : this.getReckoningShortTitle(date)
    },

    getOrdinalSuffix(i: number): string {
        const tens = i % 10;
        const hundreds = i % 100;

        if (tens == 1 && hundreds != 11) {
            return i + "st";
        }
        if (tens == 2 && hundreds != 12) {
            return i + "nd";
        }
        if (tens == 3 && hundreds != 13) {
            return i + "rd";
        }
        return i + "th";
    },
}

const STEWARDS_MONTH_ICONS: Record<StewardsMonth, string> = {
    [StewardsMonth.YESTARE]: "sunrise",
    [StewardsMonth.NARVINYE]: "sunrise",
    [StewardsMonth.NENIME]: "cloud-rain",
    [StewardsMonth.SULIME]: "wind",
    [StewardsMonth.TUILERE]: "sprout",
    [StewardsMonth.VIRESSE]: "sprout",
    [StewardsMonth.LOTESSE]: "flower",
    [StewardsMonth.NARIE]: "sun",
    [StewardsMonth.LOENDE]: "sun",
    [StewardsMonth.ENDERE]: "sun",
    [StewardsMonth.CERMIE]: "wheat",
    [StewardsMonth.URIME]: "tree-deciduous",
    [StewardsMonth.YAVANNIE]: "apple",
    [StewardsMonth.YAVIERE]: "apple",
    [StewardsMonth.NARQUELIE]: "leaf",
    [StewardsMonth.HISIME]: "cloud-fog",
    [StewardsMonth.RINGARE]: "snowflake",
    [StewardsMonth.METTARE]: "snowflake"
}

const SHIRE_MONTH_ICONS: Record<ShireMonth, string> = {
    [ShireMonth.YULE2]: "sunrise",
    [ShireMonth.AFTERYULE]: "sunrise",
    [ShireMonth.SOLMATH]: "cloud-rain",
    [ShireMonth.RETHE]: "wind",
    [ShireMonth.ASTRON]: "sprout",
    [ShireMonth.THRIMIDGE]: "flower",
    [ShireMonth.FORELITHE]: "sun",
    [ShireMonth.LITHE1]: "sun",
    [ShireMonth.OVERLITHE_MILLENNIAL]: "sun",
    [ShireMonth.MIDYEAR]: "sun",
    [ShireMonth.OVERLITHE]: "sun",
    [ShireMonth.LITHE2]: "sun",
    [ShireMonth.AFTERLITHE]: "wheat",
    [ShireMonth.WEDMATH]: "tree-deciduous",
    [ShireMonth.HALIMATH]: "apple",
    [ShireMonth.WINTERFILTH]: "leaf",
    [ShireMonth.BLOMATH]: "cloud-fog",
    [ShireMonth.FOREYULE]: "snowflake",
    [ShireMonth.YULE1]: "snowflake"
}

const BREE_MONTH_ICONS: Record<BreeMonth, string> = {
    [BreeMonth.YULE2]: "sunrise",
    [BreeMonth.FRERY]: "sunrise",
    [BreeMonth.SOLMATH]: "cloud-rain",
    [BreeMonth.RETHE]: "wind",
    [BreeMonth.CHITHING]: "sprout",
    [BreeMonth.THRIMIDGE]: "flower",
    [BreeMonth.LITHE]: "sun",
    [BreeMonth.SUMMERDAYS]: "sun",
    [BreeMonth.MEDE]: "wheat",
    [BreeMonth.WEDMATH]: "tree-deciduous",
    [BreeMonth.HARVESTMATH]: "apple",
    [BreeMonth.WINTRING]: "leaf",
    [BreeMonth.BLOOTING]: "cloud-fog",
    [BreeMonth.YULEMATH]: "snowflake",
    [BreeMonth.YULE1]: "snowflake"
}

const STEWARDS_MONTH_SEASONS: Record<StewardsMonth, MonthInSeason> = {
    [StewardsMonth.YESTARE]: {season: Season.WINTER},
    [StewardsMonth.NARVINYE]: {season: Season.WINTER, index: 2},
    [StewardsMonth.NENIME]: {season: Season.WINTER, index: 3},
    [StewardsMonth.SULIME]: {season: Season.SPRING, index: 1},
    [StewardsMonth.TUILERE]: {season: Season.SPRING},
    [StewardsMonth.VIRESSE]: {season: Season.SPRING, index: 2},
    [StewardsMonth.LOTESSE]: {season: Season.SPRING, index: 3},
    [StewardsMonth.NARIE]: {season: Season.SUMMER, index: 1},
    [StewardsMonth.LOENDE]: {season: Season.SUMMER},
    [StewardsMonth.ENDERE]: {season: Season.SUMMER},
    [StewardsMonth.CERMIE]: {season: Season.SUMMER, index: 2},
    [StewardsMonth.URIME]: {season: Season.SUMMER, index: 3},
    [StewardsMonth.YAVANNIE]: {season: Season.AUTUMN, index: 1},
    [StewardsMonth.YAVIERE]: {season: Season.AUTUMN},
    [StewardsMonth.NARQUELIE]: {season: Season.AUTUMN, index: 2},
    [StewardsMonth.HISIME]: {season: Season.AUTUMN, index: 3},
    [StewardsMonth.RINGARE]: {season: Season.WINTER, index: 1},
    [StewardsMonth.METTARE]: {season: Season.WINTER}
}

const SHIRE_MONTH_SEASONS: Record<ShireMonth, MonthInSeason> = {
    [ShireMonth.YULE2]: {season: Season.WINTER},
    [ShireMonth.AFTERYULE]: {season: Season.WINTER, index: 2},
    [ShireMonth.SOLMATH]: {season: Season.WINTER, index: 3},
    [ShireMonth.RETHE]: {season: Season.SPRING, index: 1},
    [ShireMonth.ASTRON]: {season: Season.SPRING, index: 2},
    [ShireMonth.THRIMIDGE]: {season: Season.SPRING, index: 3},
    [ShireMonth.FORELITHE]: {season: Season.SUMMER, index: 1},
    [ShireMonth.LITHE1]: {season: Season.SUMMER},
    [ShireMonth.OVERLITHE_MILLENNIAL]: {season: Season.SUMMER},
    [ShireMonth.MIDYEAR]: {season: Season.SUMMER},
    [ShireMonth.OVERLITHE]: {season: Season.SUMMER},
    [ShireMonth.LITHE2]: {season: Season.SUMMER},
    [ShireMonth.AFTERLITHE]: {season: Season.SUMMER, index: 2},
    [ShireMonth.WEDMATH]: {season: Season.SUMMER, index: 3},
    [ShireMonth.HALIMATH]: {season: Season.AUTUMN, index: 1},
    [ShireMonth.WINTERFILTH]: {season: Season.AUTUMN, index: 2},
    [ShireMonth.BLOMATH]: {season: Season.AUTUMN, index: 3},
    [ShireMonth.FOREYULE]: {season: Season.WINTER, index: 1},
    [ShireMonth.YULE1]: {season: Season.WINTER}
}

const BREE_MONTH_SEASONS: Record<BreeMonth, MonthInSeason> = {
    [BreeMonth.YULE2]: {season: Season.WINTER},
    [BreeMonth.FRERY]: {season: Season.WINTER, index: 2},
    [BreeMonth.SOLMATH]: {season: Season.WINTER, index: 3},
    [BreeMonth.RETHE]: {season: Season.SPRING, index: 1},
    [BreeMonth.CHITHING]: {season: Season.SPRING, index: 2},
    [BreeMonth.THRIMIDGE]: {season: Season.SPRING, index: 3},
    [BreeMonth.LITHE]: {season: Season.SUMMER, index: 1},
    [BreeMonth.SUMMERDAYS]: {season: Season.SUMMER},
    [BreeMonth.MEDE]: {season: Season.SUMMER, index: 2},
    [BreeMonth.WEDMATH]: {season: Season.SUMMER, index: 3},
    [BreeMonth.HARVESTMATH]: {season: Season.AUTUMN, index: 1},
    [BreeMonth.WINTRING]: {season: Season.AUTUMN, index: 2},
    [BreeMonth.BLOOTING]: {season: Season.AUTUMN, index: 3},
    [BreeMonth.YULEMATH]: {season: Season.WINTER, index: 1},
    [BreeMonth.YULE1]: {season: Season.WINTER}
}
