import {ItemView, setIcon, ViewStateResult} from "obsidian";
import {ReckoningDate} from "../reckoning/ReckoningDate";
import {stewardsReckoning} from "../reckoning/stewards/StewardsReckoning";
import {CSS_CALENDAR_VIEW} from "../constants";

export const VIEW_TYPE_STEWARDS_CALENDAR = "tor2e-reckoning-plugin-stewards-calendar"

export class Tor2eCalendarView extends ItemView {

    private selectedDate: ReckoningDate<any> = stewardsReckoning.getDate(2965, 1)

    private displayDate: ReckoningDate<any> = stewardsReckoning.getDate(2965, 1)

    getDisplayText(): string {
        return "TOR2e Calendar"
    }

    getViewType(): string {
        return VIEW_TYPE_STEWARDS_CALENDAR
    }

    async onOpen() {
        this.render()
    }

    async onClose() {
        // Nothing to clean up.
    }

    setState(state: any, result: ViewStateResult): Promise<void> {
        if (state instanceof ReckoningDate) {
            this.selectDate(state)
        }
        return super.setState(state, result);
    }

    selectDate(date: ReckoningDate<any>) {
        this.selectedDate = date
        this.displayDate = date
        this.render()
    }

    viewDate(date: ReckoningDate<any>) {
        this.displayDate = date
        this.render()
    }

    render() {

        const container = this.containerEl.children[1]
        container.empty()

        const root = container.createEl("div", {cls: CSS_CALENDAR_VIEW.ROOT})

        const yearPane = root.createEl("div", {cls: CSS_CALENDAR_VIEW.YEAR.ROOT})
        const previousYear = yearPane.createEl("span", {cls: CSS_CALENDAR_VIEW.YEAR.NAV_PREVIOUS});
        yearPane.createEl("span", {cls: CSS_CALENDAR_VIEW.YEAR.TEXT, text: this.displayDate.year.toString()})
        const nextYear = yearPane.createEl("span", {cls: CSS_CALENDAR_VIEW.YEAR.NAV_NEXT});

        setIcon(previousYear, "chevron-left")
        setIcon(nextYear, "chevron-right")
        previousYear.addEventListener("click", () => {this.viewDate(this.displayDate.plusYears(-1))})
        nextYear.addEventListener("click", () => {this.viewDate(this.displayDate.plusYears(1))})

        const monthPane = root.createEl("div", {cls: CSS_CALENDAR_VIEW.MONTH.ROOT})
        const previousMonth = monthPane.createEl("span", {cls: CSS_CALENDAR_VIEW.MONTH.NAV_PREVIOUS});
        monthPane.createEl("span", {cls: CSS_CALENDAR_VIEW.MONTH.TEXT, text: this.displayDate.toMonthString()})
        const nextMonth = monthPane.createEl("span", {cls: CSS_CALENDAR_VIEW.MONTH.NAV_NEXT});

        setIcon(previousMonth, "chevron-left")
        setIcon(nextMonth, "chevron-right")
        previousMonth.addEventListener("click", () => {this.viewDate(this.displayDate.plusMonths(-1))})
        nextMonth.addEventListener("click", () => {this.viewDate(this.displayDate.plusMonths(1))})

        const monthContainer = root.createEl("div", {cls: CSS_CALENDAR_VIEW.CALENDAR.ROOT})
        this.renderMonth(monthContainer)

    }

    private renderMonth<M extends number | string>(root: HTMLElement) {
        const yearData = this.displayDate.getYearData()
        const firstDay = yearData.getFirstDay(this.displayDate.month)
        const lastDay = yearData.getLastDay(this.displayDate.month)

        for (let i = firstDay; i <= lastDay; i++) {
            const dateForCell = this.displayDate.reckoning.getDate(this.displayDate.year, i);
            const dayOfWeek = dateForCell.getDayOfWeek();
            if (i == firstDay) {
                for (let j = 0; j < dayOfWeek; j++) {
                    root.createEl("div", {cls: CSS_CALENDAR_VIEW.CALENDAR.NOT_DAY})
                }
            }

            const day = root.createEl("div", {cls: CSS_CALENDAR_VIEW.CALENDAR.DAY})
            day.createEl("span", {text: dateForCell.day.toString()})
            day.toggleClass(CSS_CALENDAR_VIEW.CALENDAR.SELECTED_DAY, dateForCell.isEqual(this.selectedDate))
        }
    }
}
