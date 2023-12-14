import {DayOfWeek} from "./DayOfWeek";

export interface Localization<M extends number | string> {

    forMonth(month: M, language: string): string

    forMonthMeaning(month: M): string

    forDayOfWeek(dayOfWeek: DayOfWeek, language: string): string

    forDayOfWeekMeaning(dayOfWeek: DayOfWeek): string

}
