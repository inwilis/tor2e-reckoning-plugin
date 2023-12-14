import {DateToRender, DayToRender} from "./MonthCalendar";
import {calendarDecorations} from "../calendar/CalendarDecorations";
import {reckonings} from "../reckoning/Reckonings";
import {stewardsReckoning} from "../reckoning/stewards/StewardsReckoning";
import tippy from "tippy.js";
import {ReckoningDate} from "../reckoning/ReckoningDate";
import {approximateGregorianYear} from "../reckoning/gregorian/ApproximateGregorianYear";

export class MonthCalendarDayTooltip {
    constructor(private readonly selectedDate: ReckoningDate<any>) {

    }

    createShort(parent: HTMLElement, day: DayToRender) {
        return this.create(parent, day, false)
    }

    createExpanded(parent: HTMLElement, day: DayToRender) {
        return this.create(parent, day, true);
    }

    private create(parent: HTMLElement, day: DayToRender, expanded: boolean) {
        const tooltipFragment = document.createElement("div")
        tooltipFragment.className = "day-tooltip"

        day.dates.forEach(d => {

            tooltipFragment.createEl("div", {cls: "moon-container"}, moonContainer => {
                calendarDecorations.renderMoonPhase(moonContainer, d.date)

                moonContainer.createEl("div", {cls: "moon-details"}, moonDetails => {
                    moonDetails.createEl("span", {cls: "title"}, title => title.createEl("b", {text: d.date.toString()}))

                    this.renderApproximateGregorianDate(moonDetails, d);
                    if (!expanded) {
                        this.renderDistanceToSelectedDate(moonDetails, d);
                    }
                })
            })

            tooltipFragment.createEl("div", {cls: "other-details"}, otherDetails => {

                this.renderSpecialEvent(d, otherDetails);

                if (expanded) {
                    reckonings.convertToEveryReckoningAndLanguagePossible(d.date)
                        .map(convertedDate => `${convertedDate.toDayAndMonthString()} (${(calendarDecorations.getLocaleDescription(convertedDate))})`)
                        .forEach(dateString => otherDetails.createEl("span", {cls: "other-locale", text: dateString}));

                    this.renderDistanceToSelectedDate(otherDetails, d);
                }
            })
        })

        return tippy(parent, {
            content: tooltipFragment,
            theme: "obsidian",
        })
    }

    private renderDistanceToSelectedDate(parent: HTMLDivElement, d: DateToRender) {
        const selected = reckonings.toReckoning("stewards", this.selectedDate)
        const current = reckonings.toReckoning("stewards", d.date)

        if (!selected.isEqual(current)) {
            const daysBetween = stewardsReckoning.getDaysBetween(selected, current).toString()
            const beforeOrAfter = current.isBefore(selected) ? "-" : "+"
            const sEnding = daysBetween.endsWith("1") ? "" : "s"
            parent.createEl("span", {cls: "days-between", text: `${beforeOrAfter}${daysBetween} day${sEnding}`})
        }
    }

    private renderSpecialEvent(d: DateToRender, moonDetails: HTMLDivElement) {
        const specialEvent = d.date.getSpecialEvent()
        if (specialEvent) moonDetails.createEl("span", {cls: "special-event", text: specialEvent})
    }

    private renderApproximateGregorianDate(parent: HTMLDivElement, d: DateToRender) {
        parent.createEl("span", {cls: "gregorian-date", text: this.getGregorianDateString(d.date)})
    }

    private getGregorianDateString(date: ReckoningDate<any>): string {
        const yearData = date.getYearData();

        let gregorianDayOfYear = date.getDayOfYear() - 10; // 1st day of year - a winter solstice - is approximately 22 dec
        if (gregorianDayOfYear < 1) {
            gregorianDayOfYear = yearData.length + gregorianDayOfYear;
        }
        return approximateGregorianYear.getDayOfMonth(gregorianDayOfYear, yearData.type) + " " + approximateGregorianYear.getMonthString(gregorianDayOfYear, yearData.type);
    }

}
