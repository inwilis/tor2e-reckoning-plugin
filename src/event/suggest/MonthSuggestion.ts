import {MONTH_NAMES, StewardsLocalizationData} from "../../reckoning/stewards/StewardsLocalization";
import {StewardsMonth} from "../../reckoning/stewards/StewardsMonth";

export class MonthSuggestion {
    constructor(item: StewardsLocalizationData, quenya: boolean, sindarin: boolean) {
        this.item = item;
        this.quenya = quenya
        this.sindarin = sindarin
    }

    item: StewardsLocalizationData

    quenya: boolean

    sindarin: boolean

    filterByTerm(term: string): boolean {
        return this.item.quenyaSimplified.startsWith(term)
            || this.item.sindarinSimplified.startsWith(term)
            || this.item.quenya.startsWith(term)
            || this.item.sindarin.startsWith(term)
    }

    mapByTerm(term: string): MonthSuggestion {

        const quenya = this.item.quenya.startsWith(term)
        const quenyaSimplified = this.item.quenyaSimplified.startsWith(term)
        const sindarin = this.item.sindarin.startsWith(term)
        const sindarinSimplified = this.item.sindarinSimplified.startsWith(term)

        if (quenyaSimplified || sindarinSimplified || quenya || sindarin) {
            return new MonthSuggestion(this.item, quenya || quenyaSimplified, sindarin || sindarinSimplified)
        }

        throw new Error("Unexpected state: mapByTerm() must be called only after filterByTerm() returns true")
    }

    getTextToSuggest(): string {
        if (this.quenya && this.sindarin) {
            return this.item.quenya + "|" + this.item.sindarin
        } else if (this.quenya) {
            return this.item.quenya
        } else if (this.sindarin) {
            return this.item.sindarin
        } else {
            return ""
        }
    }

    getTextToInsert() {
        if (this.quenya) {
            return this.item.quenya
        } else {
            return this.item.sindarin
        }
    }
}

export const
    ALL_MONTHS: MonthSuggestion[] = (() => {
        const result: MonthSuggestion[] = [];

        for (let m in StewardsMonth) {
            const monthLocalization = MONTH_NAMES[m as keyof typeof MONTH_NAMES];
            result.push(new MonthSuggestion(monthLocalization, true, true))
        }
        return result
    })()

export const
    SINGLE_DAY_INTERCALARIES: MonthSuggestion[] = (() => {
        const result: MonthSuggestion[] = [];

        result.push(new MonthSuggestion(MONTH_NAMES.I1, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.I2, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.I3, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.I4, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.I5, true, true))

        return result
    })()

export const
    MULTI_DAY_MONTHS: MonthSuggestion[] = (() => {
        const result: MonthSuggestion[] = [];

        result.push(new MonthSuggestion(MONTH_NAMES.M1, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.M2, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.M3, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.M4, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.M5, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.M6, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.I3L, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.M7, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.M8, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.M9, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.M10, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.M11, true, true))
        result.push(new MonthSuggestion(MONTH_NAMES.M12, true, true))

        return result
    })()
