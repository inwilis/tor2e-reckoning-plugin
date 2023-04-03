import {App, ItemView, setIcon, ViewStateResult} from "obsidian";
import {ReckoningDate} from "../reckoning/ReckoningDate";
import {stewardsReckoning} from "../reckoning/stewards/StewardsReckoning";
import {CSS_CALENDAR_VIEW} from "../constants";
import {allReckonings, reckonings} from "../reckoning/Reckonings";
import {calendarDecorations} from "./CalendarDecorations";

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

        if (state.selectedDate) {
            this.selectedDate = state.selectedDate
            this.displayDate = state.selectedDate
        }

        if (state.displayDate) {
            this.displayDate = state.displayDate
        }

        await this.render()

        this.app.workspace.requestSaveLayout()

        return super.setState(state, result);
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

        const controlsPane = root.createEl("div", {cls: CSS_CALENDAR_VIEW.VIEW_CONTROLS.ROOT})
        this.renderControlsPane(controlsPane)

        const yearPane = root.createEl("div", {cls: CSS_CALENDAR_VIEW.YEAR.ROOT})
        this.renderYearPane(yearPane)

        const monthPane = root.createEl("div", {cls: CSS_CALENDAR_VIEW.MONTH.ROOT})
        this.renderMonthPane(monthPane)

        const monthContainer = root.createEl("div", {cls: CSS_CALENDAR_VIEW.CALENDAR.ROOT})
        this.renderMonth(monthContainer)

        const dayContainer = root.createEl("div", {cls: CSS_CALENDAR_VIEW.DAY.ROOT})
        await this.renderDayDetails(dayContainer)

    }

    private renderControlsPane(controlsPane: HTMLElement) {
        controlsPane.createEl("select", {cls: CSS_CALENDAR_VIEW.VIEW_CONTROLS.SELECT}, s => {
            allReckonings.forEach((reckoning, name) => {
                const attr: any = {"value": name}
                if (this.displayDate.reckoning.getName() == name) {
                    attr.selected = true
                }
                if (reckonings.isConversionPossible(this.displayDate.reckoning.getName(), reckoning.getName(), this.displayDate.year)) {
                    s.createEl("option", {
                        text: calendarDecorations.getReckoningTitle(reckonings.toReckoning(reckoning.getName(), this.displayDate)),
                        attr: attr
                    })
                }
            })

            s.addEventListener("change", async (event) => {
                const target: any = event.target

                if (target?.value) {
                    await this.setState({
                        selectedDate: reckonings.toReckoning(target.value, this.selectedDate),
                        displayDate: reckonings.toReckoning(target.value, this.displayDate)
                    }, {})
                }
            })
        })

        controlsPane.createEl("select", {cls: CSS_CALENDAR_VIEW.VIEW_CONTROLS.SELECT}, s => {
            this.selectedDate.reckoning.getSupportedLanguages().forEach(language => {
                const attr: any = {"value": language}
                if (this.displayDate.language == language) {
                    attr.selected = true
                }
                s.createEl("option", {text: capitalize(language), attr: attr})
            })

            s.addEventListener("change", async (event) => {
                const target: any = event.target

                if (target?.value) {
                    await this.setState({
                        selectedDate: this.selectedDate.withLanguage(target.value),
                        displayDate: this.displayDate.withLanguage(target.value)
                    }, {})
                }
            })
        })
    }

    private renderYearPane(yearPane: any) {
        const previousYear = yearPane.createEl("span", {cls: CSS_CALENDAR_VIEW.YEAR.NAV_PREVIOUS});
        yearPane.createEl("span", {cls: CSS_CALENDAR_VIEW.YEAR.TEXT, text: this.displayDate.year.toString()})
        const nextYear = yearPane.createEl("span", {cls: CSS_CALENDAR_VIEW.YEAR.NAV_NEXT});

        setIcon(previousYear, "chevron-left")
        setIcon(nextYear, "chevron-right")

        previousYear.addEventListener("click", async () => {
            await this.viewDate(this.displayDate.plusYears(-1))
        })
        nextYear.addEventListener("click", async () => {
            await this.viewDate(this.displayDate.plusYears(1))
        })
    }

    private renderMonthPane(monthPane: any) {
        const previousMonth = monthPane.createEl("span", {cls: CSS_CALENDAR_VIEW.MONTH.NAV_PREVIOUS});

        const monthBlock = monthPane.createEl("span", {cls: CSS_CALENDAR_VIEW.MONTH.BLOCK})
        const monthIcon = monthBlock.createEl("span", {cls: [CSS_CALENDAR_VIEW.MONTH.ICON, calendarDecorations.getSeason(this.displayDate).toLowerCase()]})
        monthBlock.createEl("span", {cls: CSS_CALENDAR_VIEW.MONTH.TEXT, text: this.displayDate.toMonthString()})

        const nextMonth = monthPane.createEl("span", {cls: CSS_CALENDAR_VIEW.MONTH.NAV_NEXT});

        setIcon(monthIcon, calendarDecorations.getMonthIcon(this.displayDate))
        setIcon(previousMonth, "chevron-left")
        setIcon(nextMonth, "chevron-right")

        previousMonth.addEventListener("click", async () => {
            await this.viewDate(this.displayDate.plusMonths(-1))
        })
        nextMonth.addEventListener("click", async () => {
            await this.viewDate(this.displayDate.plusMonths(1))
        })
    }

    private renderMonth(root: HTMLElement) {
        const yearData = this.displayDate.getYearData()
        const firstDay = yearData.getFirstDay(this.displayDate.month)
        const lastDay = yearData.getLastDay(this.displayDate.month)

        calendarDecorations.getWeekDayIcons().forEach(icon => {
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
            if (reckonings.isConversionPossible(this.selectedDate.reckoning.getName(), reckoning.getName(), this.selectedDate.year)) {
                const reckoningDate = reckonings.toReckoning(reckoning.getName(), this.selectedDate)
                dayReckoningsContainer.createEl("div", {
                    text: `${calendarDecorations.getReckoningTitle(reckoningDate)}`,
                    cls: CSS_CALENDAR_VIEW.DAY.RECKONING_TITLE
                })
                reckoning.getSupportedLanguages().forEach(language => {
                    const dateString = reckoningDate.toString(language)
                    const dateBlock = dayReckoningsContainer.createEl("div", {cls: CSS_CALENDAR_VIEW.DAY.DATE_BLOCK});
                    dateBlock.createEl("span", {text: `${(capitalize(language))}: `, cls: CSS_CALENDAR_VIEW.DAY.LANGUAGE_TITLE})
                    dateBlock.createEl("span", {text: `${dateString}`, cls: CSS_CALENDAR_VIEW.DAY.DATE_STRING})
                })
            }
        })
    }


}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

