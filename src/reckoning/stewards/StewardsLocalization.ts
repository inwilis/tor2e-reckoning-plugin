import {StewardsMonth} from "./StewardsMonth";
import {DayOfWeek} from "../DayOfWeek";
import {Language} from "../Languages";
import {Localization} from "../Localization";

export class StewardsLocalization implements Localization<StewardsMonth> {
    dataForMonth(month: StewardsMonth): StewardsLocalizationData {
        return MONTH_NAMES[month]
    }
    forMonth(month: StewardsMonth, language: string): string {
        if (language == Language.SINDARIN) {
            return MONTH_NAMES[month].sindarin
        } else {
            return MONTH_NAMES[month].quenya
        }
    }

    forMonthMeaning(month: StewardsMonth): string {
        return MONTH_NAMES_MEANING[month];
    }

    forDayOfWeek(dayOfWeek: DayOfWeek, language: string): string {
        if (language == Language.SINDARIN) {
            return DAYS_OF_WEEK_NAMES[dayOfWeek].sindarin
        } else {
            return DAYS_OF_WEEK_NAMES[dayOfWeek].quenya
        }
    }

    forDayOfWeekMeaning(dayOfWeek: DayOfWeek): string {
        return DAYS_OF_WEEK_NAMES_MEANING[dayOfWeek]
    }
}

export const stewardsLocalization = new StewardsLocalization();

export interface StewardsLocalizationData {
    quenya: string;
    quenyaSimplified: string;
    sindarin: string;
    sindarinSimplified: string;
}

export const MONTH_NAMES: Record<StewardsMonth, StewardsLocalizationData> = {
    [StewardsMonth.YESTARE]: {quenya: "Yestarë", quenyaSimplified: "Yestare", sindarin: "Iestor", sindarinSimplified: "Iestor"},
    [StewardsMonth.NARVINYE]: {quenya: "Narvinyë", quenyaSimplified: "Narvinye", sindarin: "Narwain", sindarinSimplified: "Narwain"},
    [StewardsMonth.NENIME]: {quenya: "Nénimë", quenyaSimplified: "Nenime", sindarin: "Nínui", sindarinSimplified: "Ninui"},
    [StewardsMonth.SULIME]: {quenya: "Súlimë", quenyaSimplified: "Sulime", sindarin: "Gwaeron", sindarinSimplified: "Gwaeron"},
    [StewardsMonth.TUILERE]: {quenya: "Tuilérë", quenyaSimplified: "Tuilere", sindarin: "Ethuilor", sindarinSimplified: "Ethuilor"},
    [StewardsMonth.VIRESSE]: {quenya: "Víressë", quenyaSimplified: "Viresse", sindarin: "Gwirith", sindarinSimplified: "Gwirith"},
    [StewardsMonth.LOTESSE]: {quenya: "Lótessë", quenyaSimplified: "Lotesse", sindarin: "Lothron", sindarinSimplified: "Lothron"},
    [StewardsMonth.NARIE]: {quenya: "Nárië", quenyaSimplified: "Narie", sindarin: "Nórui", sindarinSimplified: "Norui"},
    [StewardsMonth.LOENDE]: {quenya: "Loëndë", quenyaSimplified: "Loende", sindarin: "Lawenedh", sindarinSimplified: "Lawenedh"},
    [StewardsMonth.ENDERE]: {quenya: "Enderë", quenyaSimplified: "Endere", sindarin: "Enedhor", sindarinSimplified: "Enedhor"},
    [StewardsMonth.CERMIE]: {quenya: "Cermië", quenyaSimplified: "Cermie", sindarin: "Cerveth", sindarinSimplified: "Cerveth"},
    [StewardsMonth.URIME]: {quenya: "Urimë", quenyaSimplified: "Urime", sindarin: "Urui", sindarinSimplified: "Urui"},
    [StewardsMonth.YAVANNIE]: {quenya: "Yavannië", quenyaSimplified: "Yavannie", sindarin: "Ivanneth", sindarinSimplified: "Ivanneth"},
    [StewardsMonth.YAVIERE]: {quenya: "Yáviérë", quenyaSimplified: "Yaviere", sindarin: "Lavassor", sindarinSimplified: "Lavassor"},
    [StewardsMonth.NARQUELIE]: {quenya: "Narquelië", quenyaSimplified: "Narquelie", sindarin: "Narbeleth", sindarinSimplified: "Narbeleth"},
    [StewardsMonth.HISIME]: {quenya: "Hísimë", quenyaSimplified: "Hisime", sindarin: "Hithui", sindarinSimplified: "Hithui"},
    [StewardsMonth.RINGARE]: {quenya: "Ringarë", quenyaSimplified: "Ringare", sindarin: "Girithron", sindarinSimplified: "Girithron"},
    [StewardsMonth.METTARE]: {quenya: "Mettarë", quenyaSimplified: "Mettare", sindarin: "Methor", sindarinSimplified: "Methor"}
}

export const DAYS_OF_WEEK_NAMES: Record<DayOfWeek, StewardsLocalizationData> = {
    [DayOfWeek.D1]: {quenya: "Elenya", quenyaSimplified: "Elenya", sindarin: "Orgilion", sindarinSimplified: "Orgilion"},
    [DayOfWeek.D2]: {quenya: "Anarya", quenyaSimplified: "Anarya", sindarin: "Oranor", sindarinSimplified: "Oranor"},
    [DayOfWeek.D3]: {quenya: "Isilya", quenyaSimplified: "Isilya", sindarin: "Orithil", sindarinSimplified: "Orithil"},
    [DayOfWeek.D4]: {quenya: "Aldëa", quenyaSimplified: "Aldea", sindarin: "Orgaladh", sindarinSimplified: "Orgaladh"},
    [DayOfWeek.D5]: {quenya: "Menelya", quenyaSimplified: "Menelya", sindarin: "Ormenel", sindarinSimplified: "Ormenel"},
    [DayOfWeek.D6]: {quenya: "Eärenya", quenyaSimplified: "Earenya", sindarin: "Oraearon", sindarinSimplified: "Oraearon"},
    [DayOfWeek.D7]: {quenya: "Valanya", quenyaSimplified: "Valanya", sindarin: "Orbelain", sindarinSimplified: "Orbelain"}
}

export const DAYS_OF_WEEK_NAMES_MEANING: Record<DayOfWeek, string> = {
    [DayOfWeek.D1]: "Stars Day",
    [DayOfWeek.D2]: "Sun Day",
    [DayOfWeek.D3]: "Moon Day",
    [DayOfWeek.D4]: "White Tree's Day",
    [DayOfWeek.D5]: "Heavens Day",
    [DayOfWeek.D6]: "Sea Day",
    [DayOfWeek.D7]: "Valar Day",
}

export const MONTH_NAMES_MEANING: Record<StewardsMonth, string> = {
    [StewardsMonth.YESTARE]: "First Day",
    [StewardsMonth.NARVINYE]: "New Sun",
    [StewardsMonth.NENIME]: "Wet Month",
    [StewardsMonth.SULIME]: "Windy Month",
    [StewardsMonth.TUILERE]: "Spring-day",
    [StewardsMonth.VIRESSE]: "Budding Month",
    [StewardsMonth.LOTESSE]: "Flower Month",
    [StewardsMonth.NARIE]: "Sunny Month",
    [StewardsMonth.LOENDE]: "Midyear's Day",
    [StewardsMonth.ENDERE]: "Middle-days",
    [StewardsMonth.CERMIE]: "Reaping Month",
    [StewardsMonth.URIME]: "Hot Month",
    [StewardsMonth.YAVANNIE]: "Fruit Giving Month",
    [StewardsMonth.YAVIERE]: "Autumn-day",
    [StewardsMonth.NARQUELIE]: "Sun Waning",
    [StewardsMonth.HISIME]: "Misty Month",
    [StewardsMonth.RINGARE]: "Cold Month",
    [StewardsMonth.METTARE]: "Last Day"
}
