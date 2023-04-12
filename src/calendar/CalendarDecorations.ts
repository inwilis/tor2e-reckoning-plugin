import {StewardsMonth} from "../reckoning/stewards/StewardsMonth";
import {ShireMonth} from "../reckoning/shire/ShireMonth";
import {ReckoningDate} from "../reckoning/ReckoningDate";
import {Season} from "./Season";
import {BreeMonth} from "../reckoning/bree/BreeMonth";


import {STEWARDS_RECKONING_START} from "../reckoning/stewards/StewardsReckoning";
import {moonCalendar} from "../moon/MoonCalendar";

const WEEKDAY_ICONS = ["star", "sun", "moon", "tree-deciduous", "cloudy", "waves", "mountain"]

const reckoningTitles: ReadonlyMap<string, string> = new Map<string, string>([
    ["stewards", "Steward's Reckoning"],
    ["shire", "Shire Reckoning"],
    ["bree", "Bree Reckoning"]
])

export const calendarDecorations = {

    getReckoningTitle(date: ReckoningDate<any>): string {
        if (date.reckoning.getName() == "stewards" && date.year < STEWARDS_RECKONING_START) {
            return "King's Reckoning"

        } else {
            return reckoningTitles.get(date.reckoning.getName()) || date.reckoning.getName()
        }
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
        if (date.reckoning.getName() == "stewards") {
            return this.getStewardsMonthSeason(date.month as StewardsMonth)
        } else if (date.reckoning.getName() == "shire") {
            return this.getShireMonthSeason(date.month as ShireMonth)
        } else if (date.reckoning.getName() == "bree") {
            return this.getBreeMonthSeason(date.month as BreeMonth)
        }
        return ""
    },

    getStewardsMonthSeason(month: StewardsMonth): string {
        return STEWARDS_MONTH_SEASONS[month]
    },

    getShireMonthSeason(month: ShireMonth): string {
        return SHIRE_MONTH_SEASONS[month]
    },

    getBreeMonthSeason(month: BreeMonth): string {
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
            firstHalf.addClass("light")
            secondHalf.addClass("dark")
        } else {
            firstHalf.addClass("dark")
            secondHalf.addClass("light")
        }

        const deg = 180 - Math.floor((percent * 180) / 100)

        curvature.style.transform = `rotate3d(0, 1, 0, ${deg}deg)`
    }
}

const STEWARDS_MONTH_ICONS: Record<StewardsMonth, string> = {
    [StewardsMonth.YESTARE]: "",
    [StewardsMonth.NARVINYE]: "sunrise",
    [StewardsMonth.NENIME]: "cloud-rain",
    [StewardsMonth.SULIME]: "wind",
    [StewardsMonth.TUILERE]: "",
    [StewardsMonth.VIRESSE]: "sprout",
    [StewardsMonth.LOTESSE]: "flower",
    [StewardsMonth.NARIE]: "sun-dim",
    [StewardsMonth.LOENDE]: "",
    [StewardsMonth.ENDERE]: "",
    [StewardsMonth.CERMIE]: "wheat",
    [StewardsMonth.URIME]: "sun",
    [StewardsMonth.YAVANNIE]: "apple",
    [StewardsMonth.YAVIERE]: "",
    [StewardsMonth.NARQUELIE]: "leaf",
    [StewardsMonth.HISIME]: "cloud-fog",
    [StewardsMonth.RINGARE]: "snowflake",
    [StewardsMonth.METTARE]: ""
}

const SHIRE_MONTH_ICONS: Record<ShireMonth, string> = {
    [ShireMonth.YULE2]: "",
    [ShireMonth.AFTERYULE]: "sunrise",
    [ShireMonth.SOLMATH]: "cloud-rain",
    [ShireMonth.RETHE]: "wind",
    [ShireMonth.ASTRON]: "sprout",
    [ShireMonth.THRIMIDGE]: "flower",
    [ShireMonth.FORELITHE]: "sun-dim",
    [ShireMonth.LITHE1]: "",
    [ShireMonth.OVERLITHE_MILLENNIAL]: "",
    [ShireMonth.MIDYEAR]: "",
    [ShireMonth.OVERLITHE]: "",
    [ShireMonth.LITHE2]: "",
    [ShireMonth.AFTERLITHE]: "wheat",
    [ShireMonth.WEDMATH]: "sun",
    [ShireMonth.HALIMATH]: "apple",
    [ShireMonth.WINTERFILTH]: "leaf",
    [ShireMonth.BLOMATH]: "cloud-fog",
    [ShireMonth.FOREYULE]: "snowflake",
    [ShireMonth.YULE1]: ""
}

const BREE_MONTH_ICONS: Record<BreeMonth, string> = {
    [BreeMonth.YULE2]: "",
    [BreeMonth.FRERY]: "sunrise",
    [BreeMonth.SOLMATH]: "cloud-rain",
    [BreeMonth.RETHE]: "wind",
    [BreeMonth.CHITHING]: "sprout",
    [BreeMonth.THRIMIDGE]: "flower",
    [BreeMonth.LITHE]: "sun-dim",
    [BreeMonth.SUMMERDAYS]: "",
    [BreeMonth.MEDE]: "wheat",
    [BreeMonth.WEDMATH]: "sun",
    [BreeMonth.HARVESTMATH]: "apple",
    [BreeMonth.WINTRING]: "leaf",
    [BreeMonth.BLOOTING]: "cloud-fog",
    [BreeMonth.YULEMATH]: "snowflake",
    [BreeMonth.YULE1]: ""
}


const STEWARDS_MONTH_SEASONS: Record<StewardsMonth, Season> = {
    [StewardsMonth.YESTARE]: Season.WINTER,
    [StewardsMonth.NARVINYE]: Season.WINTER,
    [StewardsMonth.NENIME]: Season.WINTER,
    [StewardsMonth.SULIME]: Season.SPRING,
    [StewardsMonth.TUILERE]: Season.SPRING,
    [StewardsMonth.VIRESSE]: Season.SPRING,
    [StewardsMonth.LOTESSE]: Season.SPRING,
    [StewardsMonth.NARIE]: Season.SUMMER,
    [StewardsMonth.LOENDE]: Season.SUMMER,
    [StewardsMonth.ENDERE]: Season.SUMMER,
    [StewardsMonth.CERMIE]: Season.SUMMER,
    [StewardsMonth.URIME]: Season.SUMMER,
    [StewardsMonth.YAVANNIE]: Season.AUTUMN,
    [StewardsMonth.YAVIERE]: Season.AUTUMN,
    [StewardsMonth.NARQUELIE]: Season.AUTUMN,
    [StewardsMonth.HISIME]: Season.AUTUMN,
    [StewardsMonth.RINGARE]: Season.WINTER,
    [StewardsMonth.METTARE]: Season.WINTER
}

const SHIRE_MONTH_SEASONS: Record<ShireMonth, string> = {
    [ShireMonth.YULE2]: Season.WINTER,
    [ShireMonth.AFTERYULE]: Season.WINTER,
    [ShireMonth.SOLMATH]: Season.WINTER,
    [ShireMonth.RETHE]: Season.SPRING,
    [ShireMonth.ASTRON]: Season.SPRING,
    [ShireMonth.THRIMIDGE]: Season.SPRING,
    [ShireMonth.FORELITHE]: Season.SUMMER,
    [ShireMonth.LITHE1]: Season.SUMMER,
    [ShireMonth.OVERLITHE_MILLENNIAL]: Season.SUMMER,
    [ShireMonth.MIDYEAR]: Season.SUMMER,
    [ShireMonth.OVERLITHE]: Season.SUMMER,
    [ShireMonth.LITHE2]: Season.SUMMER,
    [ShireMonth.AFTERLITHE]: Season.SUMMER,
    [ShireMonth.WEDMATH]: Season.SUMMER,
    [ShireMonth.HALIMATH]: Season.AUTUMN,
    [ShireMonth.WINTERFILTH]: Season.AUTUMN,
    [ShireMonth.BLOMATH]: Season.AUTUMN,
    [ShireMonth.FOREYULE]: Season.AUTUMN,
    [ShireMonth.YULE1]: Season.WINTER
}

const BREE_MONTH_SEASONS: Record<BreeMonth, string> = {
    [BreeMonth.YULE2]: Season.WINTER,
    [BreeMonth.FRERY]: Season.WINTER,
    [BreeMonth.SOLMATH]: Season.WINTER,
    [BreeMonth.RETHE]: Season.SPRING,
    [BreeMonth.CHITHING]: Season.SPRING,
    [BreeMonth.THRIMIDGE]: Season.SPRING,
    [BreeMonth.LITHE]: Season.SUMMER,
    [BreeMonth.SUMMERDAYS]: Season.SUMMER,
    [BreeMonth.MEDE]: Season.SUMMER,
    [BreeMonth.WEDMATH]: Season.SUMMER,
    [BreeMonth.HARVESTMATH]: Season.AUTUMN,
    [BreeMonth.WINTRING]: Season.AUTUMN,
    [BreeMonth.BLOOTING]: Season.AUTUMN,
    [BreeMonth.YULEMATH]: Season.AUTUMN,
    [BreeMonth.YULE1]: Season.WINTER
}
