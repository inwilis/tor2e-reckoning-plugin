import {App, ItemView, ViewStateResult} from "obsidian";
import {ReckoningDate} from "../reckoning/ReckoningDate";
import {stewardsReckoning} from "../reckoning/stewards/StewardsReckoning";
import {CSS_CALENDAR_VIEW} from "../constants";
import {allReckonings, reckonings} from "../reckoning/Reckonings";
import {calendarDecorations} from "./CalendarDecorations";
import {HorizontalNavigationPane} from "../components/HorizontalNavigationPane";
import {MonthCalendar} from "../components/MonthCalendar";
import {Reckoning} from "../reckoning/Reckoning";
import {ToolbarPane, ToolbarPaneButton} from "../components/ToolbarPane";
import {MonthTooltip} from "../components/MonthTooltip";
import {YearTooltip} from "../components/YearTooltip";

export const VIEW_TYPE_STEWARDS_CALENDAR = "tor2e-reckoning-plugin-stewards-calendar"

export class Tor2eCalendarView extends ItemView {


    private defaultView: boolean = false

    private selectedDate: ReckoningDate<any> = stewardsReckoning.getDate(2965, 1)

    private displayDate: ReckoningDate<any> = stewardsReckoning.getDate(2965, 1)

    public static createDefaultView(app: App, selectedDate: ReckoningDate<any>) {
        app?.workspace?.getRightLeaf(false)?.setViewState({
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
                return v?.getViewState()?.state?.defaultView == true;
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

    public static getDefaultView(app: App) {
        const views = app.workspace.getLeavesOfType(VIEW_TYPE_STEWARDS_CALENDAR)

        if (views && views.length > 0) {
            const defaultView = views.find(v => {
                return v?.getViewState()?.state?.defaultView == true;
            });
            if (defaultView) {
                return defaultView;
            }
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
        if (date.reckoning instanceof Reckoning) {
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
        await this.setState({displayDate: date}, {history: false})
    }

    async selectDate(date: ReckoningDate<any>) {
        await this.setState({selectedDate: date}, {history: false})
    }

    async tryViewYear(newValue: string) {
        const oldDate = this.displayDate.copy()

        try {
            const diff = parseInt(newValue) - oldDate.year
            await this.viewDate(this.displayDate.plusYears(diff))
        } catch (e) {
            console.log(e)
            await this.viewDate(oldDate)
        }

        return this.displayDate.year.toString()
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
                }, {history: false}),
                onNext: async () => await this.setState({
                    displayDate: reckonings.toReckoning(availableReckonings[1][0], this.displayDate)
                }, {history: false})
            }).render(root)
        }

        new HorizontalNavigationPane({
            classes: ["year"],
            text: this.displayDate.year.toString(),
            editable: "number",
            onPrevious: async () => await this.viewDate(this.displayDate.plusYears(-1)),
            onNext: async () => await this.viewDate(this.displayDate.plusYears(1)),
            onEdit: this.tryViewYear,
            tooltip: {
                content: new YearTooltip().create(this.displayDate),
            }
        }).render(root)

        new HorizontalNavigationPane({
            classes: ["month", calendarDecorations.getSeason(this.displayDate).toLowerCase()],
            text: this.displayDate.toMonthString(),
            icon: calendarDecorations.getMonthIcon(this.displayDate),
            onPrevious: async () => await this.viewDate(this.displayDate.plusMonths(-1)),
            onNext: async () => await this.viewDate(this.displayDate.plusMonths(1)),
            tooltip: {
                content: new MonthTooltip().create(this.displayDate)
                // hideOnClick: false,
                // trigger: 'click'
            }
        }).render(root)

        new MonthCalendar({
            selectedDate: this.selectedDate,
            displayDate: this.displayDate,
            onDayClick: async (d) => await this.selectDate(d)
        }).render(root)

        this.createToolbar(root);
    }

    private getAvailableReckonings(): [[string, string], [string, string]] | undefined {
        const all: Array<[string, string]> = new Array<[string, string]>()
        let current
        allReckonings.forEach((reckoning, name) => {
            if (this.displayDate.reckoning.getName() == name) {
                all.push([name, calendarDecorations.getReckoningTitle(this.displayDate)])
                current = all.length - 1
            } else if (reckonings.isDateConversionPossible(reckoning.getName(), this.displayDate)) {
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

    private createToolbar(root: HTMLDivElement) {
        const toolbarButtons: ToolbarPaneButton[] = [
            {
                icon: "home",
                hint: "Return to selected date",
                listener: async () => await this.viewDate(this.selectedDate)
            }
        ]

        if (this.displayDate.reckoning.getSupportedLanguages().length > 1) {
            this.displayDate.reckoning.getSupportedLanguages()
                .filter(lang => lang != this.displayDate.language)
                .forEach(lang => toolbarButtons.push({
                    icon: "languages",
                    hint: "Switch to " + lang,
                    listener: () => this.viewDate(this.displayDate.withLanguage(lang))
                }))
        }

        new ToolbarPane({buttons: toolbarButtons}).render(root)
    }
}


