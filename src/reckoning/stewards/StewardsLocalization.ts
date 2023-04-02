import {StewardsMonth} from "./StewardsMonth";
import {DayOfWeek} from "../DayOfWeek";

export class StewardsLocalization {
    static forMonth(month: StewardsMonth): StewardsLocalizationData {
        return MONTH_NAMES[month]
    }

    static forDayOfWeek(dayOfWeek: DayOfWeek) {
        return DAYS_OF_WEEK_NAMES[dayOfWeek]
    }
}

export interface StewardsLocalizationData {
    quenya: string;
    quenyaSimplified: string;
    sindarin: string;
    sindarinSimplified: string;
    icon: string;
}

export const MONTH_NAMES: Record<StewardsMonth, StewardsLocalizationData> = {
    I1: {quenya: "Yestarë", quenyaSimplified: "Yestare", sindarin: "Iestor", sindarinSimplified: "Iestor", icon: ""},
    M1: {quenya: "Narvinyë", quenyaSimplified: "Narvinye", sindarin: "Narwain", sindarinSimplified: "Narwain", icon: "sunrise"},
    M2: {quenya: "Nénimë", quenyaSimplified: "Nenime", sindarin: "Nínui", sindarinSimplified: "Ninui", icon: "cloud-rain"},
    M3: {quenya: "Súlimë", quenyaSimplified: "Sulime", sindarin: "Gwaeron", sindarinSimplified: "Gwaeron", icon: "wind"},
    I2: {quenya: "Tuilérë", quenyaSimplified: "Tuilere", sindarin: "Ethuilor", sindarinSimplified: "Ethuilor", icon: ""},
    M4: {quenya: "Víressë", quenyaSimplified: "Viresse", sindarin: "Gwirith", sindarinSimplified: "Gwirith", icon: "sprout"},
    M5: {quenya: "Lótessë", quenyaSimplified: "Lotesse", sindarin: "Lothron", sindarinSimplified: "Lothron", icon: "flower"},
    M6: {quenya: "Nárië", quenyaSimplified: "Narie", sindarin: "Nórui", sindarinSimplified: "Norui", icon: "sun-dim"},
    I3: {quenya: "Loëndë", quenyaSimplified: "Loende", sindarin: "Lawenedh", sindarinSimplified: "Lawenedh", icon: ""},
    I3L: {quenya: "Enderë", quenyaSimplified: "Endere", sindarin: "Enedhor", sindarinSimplified: "Enedhor", icon: ""},
    M7: {quenya: "Cermië", quenyaSimplified: "Cermie", sindarin: "Cerveth", sindarinSimplified: "Cerveth", icon: "wheat"},
    M8: {quenya: "Urimë", quenyaSimplified: "Urime", sindarin: "Urui", sindarinSimplified: "Urui", icon: "sun"},
    M9: {quenya: "Yavannië", quenyaSimplified: "Yavannie", sindarin: "Ivanneth", sindarinSimplified: "Ivanneth", icon: "apple"},
    I4: {quenya: "Yáviérë", quenyaSimplified: "Yaviere", sindarin: "Lavassor", sindarinSimplified: "Lavassor", icon: ""},
    M10: {quenya: "Narquelië", quenyaSimplified: "Narquelie", sindarin: "Narbeleth", sindarinSimplified: "Narbeleth", icon: "leaf"},
    M11: {quenya: "Hísimë", quenyaSimplified: "Hisime", sindarin: "Hithui", sindarinSimplified: "Hithui", icon: "cloud-fog"},
    M12: {quenya: "Ringarë", quenyaSimplified: "Ringare", sindarin: "Girithron", sindarinSimplified: "Girithron", icon: "snowflake"},
    I5: {quenya: "Mettarë", quenyaSimplified: "Mettare", sindarin: "Methor", sindarinSimplified: "Methor", icon: ""}
}

export const DAYS_OF_WEEK_NAMES: Record<DayOfWeek, StewardsLocalizationData> = {
    [DayOfWeek.D1]: {quenya: "Elenya", quenyaSimplified: "Elenya", sindarin: "Orgilion", sindarinSimplified: "Orgilion", icon: "star"},
    [DayOfWeek.D2]: {quenya: "Anarya", quenyaSimplified: "Anarya", sindarin: "Oranor", sindarinSimplified: "Oranor", icon: "sun"},
    [DayOfWeek.D3]: {quenya: "Isilya", quenyaSimplified: "Isilya", sindarin: "Orithil", sindarinSimplified: "Orithil", icon: "moon"},
    [DayOfWeek.D4]: {quenya: "Aldëa", quenyaSimplified: "Aldea", sindarin: "Orgaladh", sindarinSimplified: "Orgaladh", icon: "tree-deciduous"},
    [DayOfWeek.D5]: {quenya: "Menelya", quenyaSimplified: "Menelya", sindarin: "Ormenel", sindarinSimplified: "Ormenel", icon: "cloudy"},
    [DayOfWeek.D6]: {quenya: "Eärenya", quenyaSimplified: "Earenya", sindarin: "Oraearon", sindarinSimplified: "Oraearon", icon: "waves"},
    [DayOfWeek.D7]: {quenya: "Valanya", quenyaSimplified: "Valanya", sindarin: "Orbelain", sindarinSimplified: "Orbelain", icon: "mountain"}
}
