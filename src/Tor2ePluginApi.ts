import Tor2ePlugin from "./main";
import {reckonings} from "./reckoning/Reckonings";
import {Tor2eCalendarView} from "./calendar/Tor2eCalendarView";
import {ReckoningDate} from "./reckoning/ReckoningDate";
import {moonCalendar} from "./moon/MoonCalendar";

export default class Tor2ePluginApi {

    private plugin: Tor2ePlugin;


    constructor(plugin: Tor2ePlugin) {
        this.plugin = plugin;
    }

    public getReckonings() {
        return reckonings;
    }

    public getMoonCalendar() {
        return moonCalendar;
    }

    public getSelectedDate() {
        const defaultView = Tor2eCalendarView.getDefaultView(this.plugin.app);

        if (defaultView) {
            return defaultView.getViewState()?.state?.selectedDate;
        }
    }

    public getSelectedDateInReckoning(reckoning: string) {
        const defaultView = Tor2eCalendarView.getDefaultView(this.plugin.app);
        const date = defaultView?.getViewState()?.state?.selectedDate;

        if (date instanceof ReckoningDate) {
            return reckonings.toReckoning(reckoning, date);
        }
    }
}
