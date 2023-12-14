import {ReckoningDate} from "../reckoning/ReckoningDate";
import {calendarDecorations} from "../calendar/CalendarDecorations";

export class MonthTooltip {

    create(displayDate: ReckoningDate<any>): HTMLElement {
        const tooltipRoot = document.createElement("div");
        tooltipRoot.className = "month-tooltip";

        tooltipRoot.createEl("span", {cls: "title"}, title =>
            title.createEl("b", {text: displayDate.reckoning.getLocalization().forMonthMeaning(displayDate.month)}))

        const monthInSeason = calendarDecorations.getMonthInSeason(displayDate);
        if (monthInSeason.index) {
            tooltipRoot.createEl("span", {
                cls: "season",
                text: `${calendarDecorations.getOrdinalSuffix(monthInSeason.index)} month of ${monthInSeason.season}`
            })
        }

        return tooltipRoot;
    }

}
