import {shireReckoning} from "../reckoning/shire/ShireReckoning";
import {ShireMonth} from "../reckoning/shire/ShireMonth";
import {ReckoningDate} from "../reckoning/ReckoningDate";
import {reckonings} from "../reckoning/Reckonings";
import {MoonPhase} from "./MoonPhase";

export const MOON_ANCHOR_DATE = reckonings.toReckoning("stewards", shireReckoning.newDate(1419, ShireMonth.M3, 7))

const SYNODIC_PERIOD = 29.53059

class MoonCalendar {

    getMoonAge(date: ReckoningDate<any>): number {
        const currentDate = reckonings.toReckoning(MOON_ANCHOR_DATE.reckoningName, date)
        const daysToAnchor = MOON_ANCHOR_DATE.reckoning.getDaysBetween(MOON_ANCHOR_DATE, currentDate)
        const daysToNewMoon = daysToAnchor + (SYNODIC_PERIOD / 2)
        return currentDate.isBefore(MOON_ANCHOR_DATE)
            ? SYNODIC_PERIOD - daysToNewMoon % SYNODIC_PERIOD
            : daysToNewMoon % SYNODIC_PERIOD
    }

    getMoonDiskPercent(date: ReckoningDate<any>): [boolean, number] {
        const age = this.getMoonAge(date)

        const growing = age < SYNODIC_PERIOD / 2

        const percent = growing
            ? age * 200 / SYNODIC_PERIOD
            : (SYNODIC_PERIOD - age) * 200 / SYNODIC_PERIOD

        return [growing, percent]
    }

    getMoonPhase(date: ReckoningDate<any>): MoonPhase {
        const [growing, percent] = this.getMoonDiskPercent(date)

        if (growing) {
            if (percent < 3.4) {
                return MoonPhase.NEW
            } else if (percent >= 3.4 && percent < 46.6) {
                return MoonPhase.WAXING_CRESCENT
            } else if (percent >= 46.6 && percent < 55) {
                return MoonPhase.FIRST_QUARTER
            } else if (percent >= 55 && percent <= 95) {
                return MoonPhase.WAXING_GIBBOUS
            } else {
                return MoonPhase.FULL
            }
        } else {
            if (percent < 3.4) {
                return MoonPhase.NEW
            } else if (percent >= 3.4 && percent < 46.6) {
                return MoonPhase.WANING_CRESCENT
            } else if (percent >= 46.6 && percent < 55) {
                return MoonPhase.LAST_QUARTER
            } else if (percent >= 55 && percent <= 95) {
                return MoonPhase.WANING_GIBBOUS
            } else {
                return MoonPhase.FULL
            }
        }

        // if (growing) {
        //     if (percent < 3.4) {
        //         return MoonPhase.NEW
        //     } else if (percent >= 3.4 && percent < 46.6) {
        //         return MoonPhase.WAXING_CRESCENT
        //     } else if (percent >= 46.6 && percent < 53.4) {
        //         return MoonPhase.FIRST_QUARTER
        //     } else if (percent >= 53.4 && percent <= 96.4) {
        //         return MoonPhase.WAXING_GIBBOUS
        //     } else {
        //         return MoonPhase.FULL
        //     }
        // } else {
        //     if (percent < 3.4) {
        //         return MoonPhase.NEW
        //     } else if (percent >= 3.4 && percent < 46.6) {
        //         return MoonPhase.WANING_CRESCENT
        //     } else if (percent >= 46.6 && percent < 53.4) {
        //         return MoonPhase.LAST_QUARTER
        //     } else if (percent >= 53.4 && percent <= 96.4) {
        //         return MoonPhase.WANING_GIBBOUS
        //     } else {
        //         return MoonPhase.FULL
        //     }
        // }
    }
}

export const moonCalendar = new MoonCalendar()
