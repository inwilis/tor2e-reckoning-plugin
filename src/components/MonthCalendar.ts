import {CSS_CALENDAR_VIEW} from "../constants";
import {calendarDecorations} from "../calendar/CalendarDecorations";
import {Menu, setIcon} from "obsidian";
import {reckonings} from "../reckoning/Reckonings";
import {DayOfWeek} from "../reckoning/DayOfWeek";
import {ReckoningDate} from "../reckoning/ReckoningDate";
import {createSingleton, Instance} from "tippy.js";
import {MonthCalendarDayTooltip} from "./MonthCalendarDayTooltip";
import {MonthCalendarDayOfWeekTooltip} from "./MonthCalendarDayOfWeekTooltip";

export interface MonthCalendarData {
    displayDate: ReckoningDate<any>
    selectedDate: ReckoningDate<any>
    onDayClick: (d: ReckoningDate<any>) => Promise<void>
}

export interface DateToRender {
    date: ReckoningDate<any>
    render: string
}

export interface DayToRender {
    dayOfWeek: DayOfWeek
    dates: DateToRender[]
    inMonth: boolean
    selected: boolean
}

export class MonthCalendar {

    private readonly displayDate: ReckoningDate<any>
    private readonly selectedDate: ReckoningDate<any>

    constructor(private readonly data: MonthCalendarData) {
        this.displayDate = data.displayDate
        this.selectedDate = data.selectedDate
    }

    render(parent: HTMLElement) {
        const root = parent.createEl("div", {cls: CSS_CALENDAR_VIEW.CALENDAR.ROOT})
        const tooltips: Instance[] = []
        const expandedTooltips: Instance[] = []

        const monthCalendarDayOfWeekTooltip = new MonthCalendarDayOfWeekTooltip(this.displayDate);

        for (let i = 0; i < 7; i++) {
            const icon = calendarDecorations.getWeekDayIcons()[i]
            const dayOfWeek = root.createEl("div", {cls: CSS_CALENDAR_VIEW.CALENDAR.DAY_OF_WEEK})
            const span = dayOfWeek.createEl("span")
            setIcon(span, icon)
            tooltips.push(monthCalendarDayOfWeekTooltip.createShort(dayOfWeek, i))
            expandedTooltips.push(monthCalendarDayOfWeekTooltip.createExpanded(dayOfWeek, i))
        }

        const yearData = this.displayDate.getYearData()
        const firstDay = this.displayDate.reckoning.getDate(this.displayDate.year, yearData.getFirstDay(this.displayDate.month), this.displayDate.language)

        const firstDayToShow = this.rollBackToD1(firstDay)
        const lastDay = this.displayDate.reckoning.getDate(this.displayDate.year, yearData.getLastDay(this.displayDate.month), this.displayDate.language)

        const lastDayToShow = this.rollForwardToD7(lastDay)
        const daysToRender: DayToRender[] = []

        if (firstDayToShow.getDayOfWeek() > DayOfWeek.D1) {
            for (let i = DayOfWeek.D1; i < firstDayToShow.getDayOfWeek(); i++) {
                daysToRender.push({dayOfWeek: i, dates: [], inMonth: false, selected: false})
            }
        }

        let currentDay = firstDayToShow

        const convertedSelectedDate = reckonings.convertIfPossible(this.displayDate.reckoningName, this.selectedDate)

        while (!currentDay.isAfter(lastDayToShow)) {
            const lastDayToRender = daysToRender.last();
            const currentDayOfWeek = currentDay.getDayOfWeek();

            if (lastDayToRender) {
                if (lastDayToRender.dayOfWeek == currentDayOfWeek) {

                    if (currentDay.isBefore(firstDay) || currentDay.isEqual(firstDay)) {
                        lastDayToRender.dates = [{date: currentDay, render: this.renderDate(currentDay)}]
                        lastDayToRender.inMonth = currentDay.month == this.displayDate.month
                        lastDayToRender.selected = lastDayToRender.selected || (convertedSelectedDate != null && currentDay.isEqual(convertedSelectedDate))

                    } else if (!currentDay.isAfter(lastDay)) {
                        lastDayToRender.dates.push({date: currentDay, render: this.renderDate(currentDay)})
                        lastDayToRender.inMonth = lastDayToRender.inMonth || currentDay.month == this.displayDate.month
                        lastDayToRender.selected = lastDayToRender.selected || (convertedSelectedDate != null && currentDay.isEqual(convertedSelectedDate))
                    }

                } else {
                    daysToRender.push({
                        dayOfWeek: currentDayOfWeek,
                        dates: [{date: currentDay, render: this.renderDate(currentDay)}],
                        inMonth: currentDay.month == this.displayDate.month,
                        selected: convertedSelectedDate != null && currentDay.isEqual(convertedSelectedDate)
                    })
                }
            } else {
                daysToRender.push({
                    dayOfWeek: currentDayOfWeek,
                    dates: [{date: currentDay, render: this.renderDate(currentDay)}],
                    inMonth: currentDay.month == this.displayDate.month,
                    selected: convertedSelectedDate != null && currentDay.isEqual(convertedSelectedDate)
                })
            }

            currentDay = currentDay.plusDays(1)
        }

        const monthCalendarDayTooltip = new MonthCalendarDayTooltip(this.selectedDate);

        daysToRender.forEach(dayToRender => {
            if (dayToRender.dates.length == 0) {
                root.createEl("div", {cls: CSS_CALENDAR_VIEW.CALENDAR.NOT_DAY})

            } else {
                const day = root.createEl("div", {cls: dayToRender.inMonth ? CSS_CALENDAR_VIEW.CALENDAR.DAY : CSS_CALENDAR_VIEW.CALENDAR.NOT_DAY})

                const text = dayToRender.dates.map(d => d.render).join(" / ")
                day.createEl("span", {text: text})

                day.toggleClass(CSS_CALENDAR_VIEW.CALENDAR.SELECTED_DAY, dayToRender.selected)
                // day.toggleClass("multi-day", dayToRender.dates.length > 1)
                day.toggleClass("long", text.length > 5)

                if (dayToRender.inMonth) {
                    const lastDate = dayToRender.dates.last()
                    if (lastDate) {
                        day.addEventListener("click", async () => {
                            await this.data.onDayClick(lastDate.date)
                        })

                        day.addEventListener("contextmenu", async e => {
                            const menu = this.createDayMenu(lastDate.date);
                            menu.showAtMouseEvent(e)
                        })

                        calendarDecorations.renderMoonPhase(day.createEl("span"), lastDate.date)
                    }
                }

                tooltips.push(monthCalendarDayTooltip.createShort(day, dayToRender))
                expandedTooltips.push(monthCalendarDayTooltip.createExpanded(day, dayToRender))
            }
        })

        const shortSingleton = createSingleton(tooltips, {
            theme: "obsidian",
            delay: 200,
            moveTransition: 'transform 0.2s ease-out',
            // hideOnClick: false,
            // trigger: 'click'
        });

        createSingleton(expandedTooltips, {
            theme: "obsidian",
            delay: [1500, 200],
            moveTransition: 'transform 0.2s ease-out',
            onShow: () => shortSingleton.disable(),
            onHide: () => shortSingleton.enable()
            // hideOnClick: false,
            // trigger: 'click'
        });
    }

    private createDayMenu(date: ReckoningDate<any>) {
        const menu = new Menu();
        menu.addItem((item) => item
            .setTitle("Copy")
            .setIcon("documents")
            .onClick(() => window.navigator.clipboard.writeText(date.toString())))

        menu.addItem((item) => item
            .setTitle("Copy as event")
            .setIcon("documents")
            .onClick(() => {

                const reckoning = date.reckoningName == "stewards" ? "" : `reckoning: ${date.reckoningName}\n`
                const text = `\`\`\`tor2e-event\ndate: ${date.toString()}\n${reckoning}text: \n\`\`\``

                return window.navigator.clipboard.writeText(text)
            }))

        return menu;
    }

    private rollBackToD1(date: ReckoningDate<any>) {
        let d = date
        let cont = false
        while (d.getDayOfWeek() > DayOfWeek.D1 || cont) {
            if (d.year == 1 && d.getDayOfYear() == 1) {
                return d
            }
            d = d.plusDays(-1)
            let previous = d.plusDays(-1)
            cont = !previous.isEqual(d) && previous.getDayOfWeek() == d.getDayOfWeek()
        }
        return d
    }

    private rollForwardToD7(date: ReckoningDate<any>) {
        let d = date
        let cont = false
        while (d.getDayOfWeek() < DayOfWeek.D7 || cont) {
            d = d.plusDays(1)
            let next = d.plusDays(1)
            cont = !next.isEqual(d) && next.getDayOfWeek() == d.getDayOfWeek()
        }
        return d
    }


    private renderDate(date: ReckoningDate<any>): string {

        const yearData = date.getYearData()
        const dayOfYear = date.getDayOfYear();

        if (date.year != this.displayDate.year) {
            if (dayOfYear == 1 || dayOfYear == yearData.length) {
                return "Year " + date.year.toString()
            }
        }

        if (date.month != this.displayDate.month) {
            if (dayOfYear == yearData.getFirstDay(date.month) || dayOfYear == yearData.getLastDay(date.month)) {
                return date.toMonthString()
            }
        }

        return date.toDayString()
    }


}
