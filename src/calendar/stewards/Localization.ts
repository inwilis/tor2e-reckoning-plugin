import {Month} from "./Month";
import {DayOfWeek} from "./DayOfWeek";

export class Localization {
    static forMonth(month: Month): LocalizationData {
        return MONTH_NAMES[month]
    }

    static forDayOfWeek(dayOfWeek: DayOfWeek) {
        return DAYS_OF_WEEK_NAMES[dayOfWeek]
    }
}

export interface LocalizationData {
    quenya: string;
    quenyaSimplified: string;
    sindarin: string;
    sindarinSimplified: string;
}

export const MONTH_NAMES: Record<Month, LocalizationData> = {
    I1: {quenya: "Yestarë", quenyaSimplified: "Yestare", sindarin: "Iestor", sindarinSimplified: "Iestor"},
    M1: {quenya: "Narvinyë", quenyaSimplified: "Narvinye", sindarin: "Narwain", sindarinSimplified: "Narwain"},
    M2: {quenya: "Nénimë", quenyaSimplified: "Nenime", sindarin: "Nínui", sindarinSimplified: "Ninui"},
    M3: {quenya: "Súlimë", quenyaSimplified: "Sulime", sindarin: "Gwaeron", sindarinSimplified: "Gwaeron"},
    I2: {quenya: "Tuilérë", quenyaSimplified: "Tuilere", sindarin: "Ethuilor", sindarinSimplified: "Ethuilor"},
    M4: {quenya: "Víressë", quenyaSimplified: "Viresse", sindarin: "Gwirith", sindarinSimplified: "Gwirith"},
    M5: {quenya: "Lótessë", quenyaSimplified: "Lotesse", sindarin: "Lothron", sindarinSimplified: "Lothron"},
    M6: {quenya: "Nárië", quenyaSimplified: "Narie", sindarin: "Nórui", sindarinSimplified: "Norui"},
    I3: {quenya: "Loëndë", quenyaSimplified: "Loende", sindarin: "Lawenedh", sindarinSimplified: "Lawenedh"},
    I3L: {quenya: "Enderë", quenyaSimplified: "Endere", sindarin: "Enedhor", sindarinSimplified: "Enedhor"},
    M7: {quenya: "Cermië", quenyaSimplified: "Cermie", sindarin: "Cerveth", sindarinSimplified: "Cerveth"},
    M8: {quenya: "Urimë", quenyaSimplified: "Urime", sindarin: "Urui", sindarinSimplified: "Urui"},
    M9: {quenya: "Yavannië", quenyaSimplified: "Yavannie", sindarin: "Ivanneth", sindarinSimplified: "Ivanneth"},
    I4: {quenya: "Yáviérë", quenyaSimplified: "Yaviere", sindarin: "Lavassor", sindarinSimplified: "Lavassor"},
    M10: {quenya: "Narquelië", quenyaSimplified: "Narquelie", sindarin: "Narbeleth", sindarinSimplified: "Narbeleth"},
    M11: {quenya: "Hísimë", quenyaSimplified: "Hisime", sindarin: "Hithui", sindarinSimplified: "Hithui"},
    M12: {quenya: "Ringarë", quenyaSimplified: "Ringare", sindarin: "Girithron", sindarinSimplified: "Girithron"},
    I5: {quenya: "Mettarë", quenyaSimplified: "Mettare", sindarin: "Methor", sindarinSimplified: "Methor"}
}

export const DAYS_OF_WEEK_NAMES: Record<DayOfWeek, LocalizationData> = {
    [DayOfWeek.D1]: {quenya: "Elenya", quenyaSimplified: "Elenya", sindarin: "Orgilion", sindarinSimplified: "Orgilion"},
    [DayOfWeek.D2]: {quenya: "Anarya", quenyaSimplified: "Anarya", sindarin: "Oranor", sindarinSimplified: "Oranor"},
    [DayOfWeek.D3]: {quenya: "Isilya", quenyaSimplified: "Isilya", sindarin: "Orithil", sindarinSimplified: "Orithil"},
    [DayOfWeek.D4]: {quenya: "Aldëa", quenyaSimplified: "Aldea", sindarin: "Orgaladh", sindarinSimplified: "Orgaladh"},
    [DayOfWeek.D5]: {quenya: "Menelya", quenyaSimplified: "Menelya", sindarin: "Ormenel", sindarinSimplified: "Ormenel"},
    [DayOfWeek.D6]: {quenya: "Eärenya", quenyaSimplified: "Earenya", sindarin: "Oraearon", sindarinSimplified: "Oraearon"},
    [DayOfWeek.D7]: {quenya: "Valanya", quenyaSimplified: "Valanya", sindarin: "Orbelain", sindarinSimplified: "Orbelain"}
}

