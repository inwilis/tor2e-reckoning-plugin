import {DayOfWeek} from "../reckoning/DayOfWeek";
import {ReckoningDate} from "../reckoning/ReckoningDate";
import tippy from "tippy.js";
import {reckonings} from "../reckoning/Reckonings";
import {calendarDecorations} from "../calendar/CalendarDecorations";

export class MonthCalendarDayOfWeekTooltip {

    constructor(private readonly displayDate: ReckoningDate<any>) {

    }

    createShort(parent: HTMLElement, dayOfWeek: DayOfWeek) {
        return this.create(parent, dayOfWeek, false);
    }

    createExpanded(parent: HTMLElement, dayOfWeek: DayOfWeek) {
        return this.create(parent, dayOfWeek, true);
    }


    private create(parent: HTMLElement, dayOfWeek: DayOfWeek, expanded: boolean) {
        const tooltipFragment = document.createElement("div")
        tooltipFragment.className = "day-of-week-tooltip"

        tooltipFragment.createEl("span", {}, title =>
            title.createEl("b", {text: this.displayDate.reckoning.getLocalization().forDayOfWeek(dayOfWeek, this.displayDate.language)}))

        if (expanded) {
            reckonings.convertToEveryReckoningAndLanguagePossible(this.displayDate)
                .map(convertedDate => `${convertedDate.reckoning.getLocalization().forDayOfWeek(dayOfWeek, convertedDate.language)} (${(calendarDecorations.getLocaleDescription(convertedDate))})`)
                .forEach(dyOfWeekString => tooltipFragment.createEl("span", {
                    cls: "other-locale",
                    text: dyOfWeekString
                }));
        }

        tooltipFragment.createEl("span", {text: this.displayDate.reckoning.getLocalization().forDayOfWeekMeaning(dayOfWeek)})

        return tippy(parent, {
            content: tooltipFragment,
            theme: "obsidian"
        });
    }
}
