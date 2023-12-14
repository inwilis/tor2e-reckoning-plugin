import {ReckoningDate} from "../reckoning/ReckoningDate";
import {calendarDecorations} from "../calendar/CalendarDecorations";
import {reckonings} from "../reckoning/Reckonings";

export class YearTooltip {

    create(date: ReckoningDate<any>): HTMLElement {
        const tooltipRoot = document.createElement("div");
        tooltipRoot.className = "year-tooltip";

        reckonings.getOtherReckonings(date)
            .map(date => `${date.year} of ${calendarDecorations.getReckoningTitle(date)}`)
            .forEach(line => tooltipRoot.createEl("span", {text: line}));

        if (date.reckoning.isLeapYear(date.year)) {
            tooltipRoot.createEl("span", {text: "Leap year"})
        }

        return tooltipRoot;
    }
}
