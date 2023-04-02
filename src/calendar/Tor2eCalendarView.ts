import {App, ItemView, setIcon, ViewStateResult} from "obsidian";
import {ReckoningDate} from "../reckoning/ReckoningDate";
import {stewardsReckoning} from "../reckoning/stewards/StewardsReckoning";
import {CSS_CALENDAR_VIEW} from "../constants";
import {allReckonings, reckonings, reckoningTitles} from "../reckoning/Reckonings";

export const VIEW_TYPE_STEWARDS_CALENDAR = "tor2e-reckoning-plugin-stewards-calendar"

export class Tor2eCalendarView extends ItemView {


    private defaultView: boolean = false

    private selectedDate: ReckoningDate<any> = stewardsReckoning.getDate(2965, 1)

    private displayDate: ReckoningDate<any> = stewardsReckoning.getDate(2965, 1)

    public static createDefaultView(app: App, selectedDate: ReckoningDate<any>) {
        app.workspace.getRightLeaf(false).setViewState({
            type: VIEW_TYPE_STEWARDS_CALENDAR,
            active: true,
            state: {
                defaultView: true,
                selectedDate: selectedDate
            }
        }).then(() =>
            app.workspace.revealLeaf(
                app.workspace.getLeavesOfType(VIEW_TYPE_STEWARDS_CALENDAR)[0]
            ))
    }

    public static openDefaultView(app: App, selectedDate: ReckoningDate<any>) {
        const views = app.workspace.getLeavesOfType(VIEW_TYPE_STEWARDS_CALENDAR)

        if (views && views.length > 0) {
            const defaultView = views.find(v => {
                return v.getViewState().state.defaultView == true;
            });
            if (defaultView) {

                defaultView.setViewState({
                    type: VIEW_TYPE_STEWARDS_CALENDAR,
                    active: true,
                    state: {selectedDate: selectedDate}
                }).then(() => app.workspace.revealLeaf(defaultView))

            } else {
                Tor2eCalendarView.createDefaultView(app, selectedDate)
            }
        } else {
            Tor2eCalendarView.createDefaultView(app, selectedDate)
        }
    }

    getDisplayText(): string {
        return "TOR2e Calendar"
    }

    getIcon(): string {
        return "calendar-range"
    }

    getViewType(): string {
        return VIEW_TYPE_STEWARDS_CALENDAR
    }

    async onOpen() {
        return this.render()
    }

    async onClose() {
        // Nothing to clean up.
    }

    async setState(state: any, result: ViewStateResult): Promise<void> {
        if (state.defaultView) {
            this.defaultView = true
        }

        this.setSelectedDate(state.selectedDate)
        this.setDisplayDate(state.displayDate)

        await this.render()

        this.app.workspace.requestSaveLayout()

        return super.setState(state, result);
    }

    private setSelectedDate(value: any): boolean {
        if (value instanceof ReckoningDate) {
            if (!this.selectedDate.isEqual(value)) {
                this.selectedDate = value
                return true
            }
        }
        return false
    }

    private setDisplayDate(value: any): boolean {
        let result = false
        let newDisplayDate: ReckoningDate<any> = this.selectedDate
        if (value instanceof ReckoningDate) {
            newDisplayDate = value
        }

        if (this.displayDate.month != newDisplayDate.month || this.displayDate.year != newDisplayDate.year) {
            result = true
        }
        this.displayDate = newDisplayDate

        return result
    }

    getState(): any {
        const state = super.getState();
        state.selectedDate = this.selectedDate
        state.displayDate = this.displayDate
        state.defaultView = this.defaultView

        return state;
    }

    async viewDate(date: ReckoningDate<any>) {
        await this.setState({displayDate: date}, {})
    }

    async selectDate(date: ReckoningDate<any>) {
        await this.setState({selectedDate: date}, {})
    }

    async render() {
        const container = this.containerEl.children[1]
        container.empty()

        const root = container.createEl("div", {cls: CSS_CALENDAR_VIEW.ROOT})

        const yearPane = root.createEl("div", {cls: CSS_CALENDAR_VIEW.YEAR.ROOT})
        const previousYear = yearPane.createEl("span", {cls: CSS_CALENDAR_VIEW.YEAR.NAV_PREVIOUS});
        yearPane.createEl("span", {cls: CSS_CALENDAR_VIEW.YEAR.TEXT, text: this.displayDate.year.toString()})
        const nextYear = yearPane.createEl("span", {cls: CSS_CALENDAR_VIEW.YEAR.NAV_NEXT});

        setIcon(previousYear, "chevron-left")
        setIcon(nextYear, "chevron-right")
        previousYear.addEventListener("click", () => {
            this.viewDate(this.displayDate.plusYears(-1))
        })
        nextYear.addEventListener("click", () => {
            this.viewDate(this.displayDate.plusYears(1))
        })

        const monthPane = root.createEl("div", {cls: CSS_CALENDAR_VIEW.MONTH.ROOT})
        const previousMonth = monthPane.createEl("span", {cls: CSS_CALENDAR_VIEW.MONTH.NAV_PREVIOUS});

        const monthBlock = monthPane.createEl("span", {cls: CSS_CALENDAR_VIEW.MONTH.BLOCK})
         setIcon(monthBlock.createEl("span", {cls: CSS_CALENDAR_VIEW.MONTH.ICON}), this.displayDate.toMonthIcon())
        monthBlock.createEl("span", {cls: CSS_CALENDAR_VIEW.MONTH.TEXT, text: this.displayDate.toMonthString()})


        const nextMonth = monthPane.createEl("span", {cls: CSS_CALENDAR_VIEW.MONTH.NAV_NEXT});

        setIcon(previousMonth, "chevron-left")
        setIcon(nextMonth, "chevron-right")
        previousMonth.addEventListener("click", async () => {
            await this.viewDate(this.displayDate.plusMonths(-1))
        })
        nextMonth.addEventListener("click", async () => {
            await this.viewDate(this.displayDate.plusMonths(1))
        })

        const monthContainer = root.createEl("div", {cls: CSS_CALENDAR_VIEW.CALENDAR.ROOT})
        this.renderMonth(monthContainer)

        const dayContainer = root.createEl("div", {cls: CSS_CALENDAR_VIEW.DAY.ROOT})
        await this.renderDayDetails(dayContainer)

    }

    private renderMonth(root: HTMLElement) {
        const yearData = this.displayDate.getYearData()
        const firstDay = yearData.getFirstDay(this.displayDate.month)
        const lastDay = yearData.getLastDay(this.displayDate.month)

        this.selectedDate.reckoning.getDaysOfWeekIcons().forEach(icon => {
            const dayOfWeek = root.createEl("div", {cls: CSS_CALENDAR_VIEW.CALENDAR.DAY_OF_WEEK})
            const span = dayOfWeek.createEl("span")
            setIcon(span, icon)
        })

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
            day.addEventListener("click", async () => {
                await this.selectDate(dateForCell)
            })
        }
    }

    private async renderDayDetails(root: HTMLElement) {
        const dayReckoningsContainer = root.createEl("div", {cls: CSS_CALENDAR_VIEW.DAY.RECKONINGS})
        allReckonings.forEach(reckoning => {
            const reckoningDate = reckonings.toReckoning(reckoning.getName(), this.selectedDate)
            dayReckoningsContainer.createEl("div", {text: `${reckoningTitles.get(reckoning.getName())}`, cls: CSS_CALENDAR_VIEW.DAY.RECKONING_TITLE})
            reckoning.getSupportedLanguages().forEach(language => {
                const dateString = reckoningDate.toString(language)
                const dateBlock = dayReckoningsContainer.createEl("div", {cls: CSS_CALENDAR_VIEW.DAY.DATE_BLOCK});
                dateBlock.createEl("span", {text: `${language.charAt(0).toUpperCase() + language.slice(1)}: `, cls: CSS_CALENDAR_VIEW.DAY.LANGUAGE_TITLE})
                dateBlock.createEl("span", {text: `${dateString}`, cls: CSS_CALENDAR_VIEW.DAY.DATE_STRING})
            })
        })
    }
}
