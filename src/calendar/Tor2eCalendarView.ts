import {App, ItemView, ViewStateResult} from "obsidian";
import {ReckoningDate} from "../reckoning/ReckoningDate";
import {stewardsReckoning} from "../reckoning/stewards/StewardsReckoning";
import {CSS_CALENDAR_VIEW} from "../constants";
import {allReckonings, reckonings} from "../reckoning/Reckonings";
import {calendarDecorations} from "./CalendarDecorations";
import {Reckoning} from "../reckoning/Reckoning";
import {HorizontalNavigationPane} from "../components/HorizontalNavigationPane";
import {MonthCalendar} from "../components/MonthCalendar";

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
            this.selectedDate = this.repairReckoning(state.selectedDate)
            this.displayDate = this.repairReckoning(state.selectedDate)
        }

        if (state.displayDate) {
            this.displayDate = this.repairReckoning(state.displayDate)
        }

        await this.render()

        this.app.workspace.requestSaveLayout()

        return super.setState(state, result);
    }

    private repairReckoning(date: ReckoningDate<any>) {
        if (date.reckoning instanceof Reckoning<any>) {
            return date
        }
        return reckonings.getReckoning(date.reckoningName).newDate(date.year, date.month, date.day, date.language);
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

        const availableReckonings = this.getAvailableReckonings()
        if (availableReckonings) {
            new HorizontalNavigationPane({
                classes: ["reckoning"],
                text: calendarDecorations.getReckoningTitle(this.displayDate),
                onPrevious: async () => await this.setState({
                    displayDate: reckonings.toReckoning(availableReckonings[0][0], this.displayDate)
                }, {}),
                onNext: async () => await this.setState({
                    displayDate: reckonings.toReckoning(availableReckonings[1][0], this.displayDate)
                }, {})
            }).render(root)
        }

        new HorizontalNavigationPane({
            classes: ["year"],
            text: this.displayDate.year.toString(),
            onPrevious: async () => await this.viewDate(this.displayDate.plusYears(-1)),
            onNext: async () => await this.viewDate(this.displayDate.plusYears(1))
        }).render(root)

        new HorizontalNavigationPane({
            classes: ["month", calendarDecorations.getSeason(this.displayDate).toLowerCase()],
            text: this.displayDate.toMonthString(),
            icon: calendarDecorations.getMonthIcon(this.displayDate),
            onPrevious: async () => await this.viewDate(this.displayDate.plusMonths(-1)),
            onNext: async () => await this.viewDate(this.displayDate.plusMonths(1))
        }).render(root)

        new MonthCalendar({
            selectedDate: this.selectedDate,
            displayDate: this.displayDate,
            onDayClick: async (d) => await this.selectDate(d)
        }).render(root)

        const dayContainer = root.createEl("div", {cls: CSS_CALENDAR_VIEW.DAY.ROOT})
        await this.renderDayDetails(dayContainer)

    }

    private getAvailableReckonings(): [[string, string], [string, string]] | undefined {
        const all: Array<[string, string]> = new Array<[string, string]>()
        let current
        allReckonings.forEach((reckoning, name) => {
            if (this.displayDate.reckoning.getName() == name) {
                all.push([name, calendarDecorations.getReckoningTitle(this.displayDate)])
                current = all.length - 1
            } else if (reckonings.isConversionPossible(this.displayDate.reckoning.getName(), reckoning.getName(), this.displayDate.year)) {
                all.push([name, calendarDecorations.getReckoningTitle(reckonings.toReckoning(reckoning.getName(), this.displayDate))])
            }
        })

        if (current == undefined) {
            return undefined
        }

        if (all.length == 1) {
            return [all[0], all[0]]
        }

        if (current == 0) {
            return [all[all.length - 1], all[1]]
        } else if (current == all.length - 1) {
            return [all[current - 1], all[0]]
        } else {
            return [all[current - 1], all[current + 1]]
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

