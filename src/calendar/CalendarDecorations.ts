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
    I1: "",
    M1: "sunrise",
    M2: "cloud-rain",
    M3: "wind",
    I2: "",
    M4: "sprout",
    M5: "flower",
    M6: "sun-dim",
    I3: "",
    I3L: "",
    M7: "wheat",
    M8: "sun",
    M9: "apple",
    I4: "",
    M10: "leaf",
    M11: "cloud-fog",
    M12: "snowflake",
    I5: ""
}

const SHIRE_MONTH_ICONS: Record<ShireMonth, string> = {
    YULE2: "",
    M1: "sunrise",
    M2: "cloud-rain",
    M3: "wind",
    M4: "sprout",
    M5: "flower",
    M6: "sun-dim",
    LITHE1: "",
    OVERLITHE_MILLENNIAL: "",
    MIDYEAR: "",
    OVERLITHE: "",
    LITHE2: "",
    M7: "wheat",
    M8: "sun",
    M9: "apple",
    M10: "leaf",
    M11: "cloud-fog",
    M12: "snowflake",
    YULE1: ""
}

const BREE_MONTH_ICONS: Record<BreeMonth, string> = {
    YULE2: "",
    M1: "sunrise",
    M2: "cloud-rain",
    M3: "wind",
    M4: "sprout",
    M5: "flower",
    M6: "sun-dim",
    SUMMERDAYS: "",
    M7: "wheat",
    M8: "sun",
    M9: "apple",
    M10: "leaf",
    M11: "cloud-fog",
    M12: "snowflake",
    YULE1: ""
}


const STEWARDS_MONTH_SEASONS: Record<StewardsMonth, Season> = {
    I1: Season.WINTER,
    M1: Season.WINTER,
    M2: Season.WINTER,
    M3: Season.WINTER,
    I2: Season.SPRING,
    M4: Season.SPRING,
    M5: Season.SPRING,
    M6: Season.SPRING,
    I3: Season.SUMMER,
    I3L: Season.SUMMER,
    M7: Season.SUMMER,
    M8: Season.SUMMER,
    M9: Season.SUMMER,
    I4: Season.AUTUMN,
    M10: Season.AUTUMN,
    M11: Season.AUTUMN,
    M12: Season.AUTUMN,
    I5: Season.WINTER
}

const SHIRE_MONTH_SEASONS: Record<ShireMonth, string> = {
    YULE2: Season.WINTER,
    M1: Season.WINTER,
    M2: Season.WINTER,
    M3: Season.WINTER,
    M4: Season.SPRING,
    M5: Season.SPRING,
    M6: Season.SPRING,
    LITHE1: Season.SUMMER,
    OVERLITHE_MILLENNIAL: Season.SUMMER,
    MIDYEAR: Season.SUMMER,
    OVERLITHE: Season.SUMMER,
    LITHE2: Season.SUMMER,
    M7: Season.SUMMER,
    M8: Season.SUMMER,
    M9: Season.SUMMER,
    M10: Season.AUTUMN,
    M11: Season.AUTUMN,
    M12: Season.AUTUMN,
    YULE1: Season.WINTER
}

const BREE_MONTH_SEASONS: Record<BreeMonth, string> = {
    YULE2: Season.WINTER,
    M1: Season.WINTER,
    M2: Season.WINTER,
    M3: Season.WINTER,
    M4: Season.SPRING,
    M5: Season.SPRING,
    M6: Season.SPRING,
    SUMMERDAYS: Season.SUMMER,
    M7: Season.SUMMER,
    M8: Season.SUMMER,
    M9: Season.SUMMER,
    M10: Season.AUTUMN,
    M11: Season.AUTUMN,
    M12: Season.AUTUMN,
    YULE1: Season.WINTER
}
