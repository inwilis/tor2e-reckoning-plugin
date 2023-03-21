import {ALL_MONTHS, MonthSuggestion, MULTI_DAY_MONTHS, SINGLE_DAY_INTERCALARIES} from "./MonthSuggestion";
import {CODE_BLOCK_EVENT} from "../../../constants";

export interface LineProvider {
    getLine(line: number): string
}

export interface CursorPosition {
    line: number
    ch: number
}

export interface TriggerInfo {
    start: CursorPosition
    end: CursorPosition
    query: string
}

export const EventSuggester = {

    onTrigger(cursor: CursorPosition, lineProvider: LineProvider): TriggerInfo | null {
        const currentLine = lineProvider.getLine(cursor.line).substring(0, cursor.ch);

        if (!currentLine.trimLeft().startsWith("date: ")) {
            return null
        }

        if (!EventSuggester.inEventBlock(cursor, lineProvider)) {
            return null
        }

        if (currentLine.endsWith("date: ")) {
            return {start: cursor, end: cursor, query: "1:"}
        } else {

            let match = currentLine.match(/date: (\S*)$/)
            if (match && match.length > 0) {
                let term = match[1]
                return {start: {ch: cursor.ch - term.length, line: cursor.line}, end: cursor, query: "1:" + term}
            }

            match = currentLine.match(/date: (\d{0,2})\s(\S*)$/)
            if (match && match.length > 0) {

                let query = (match[1] == "1" || match[1] == "01") ? "all:" : "month:"

                if (match.length > 1) {
                    let term = match[2]
                    return {start: {ch: cursor.ch - term.length, line: cursor.line}, end: cursor, query: query + term}

                } else {
                    return {start: cursor, end: cursor, query: query}
                }

            }

        }
        return null
    },

    inEventBlock(cursor: CursorPosition, lineProvider: LineProvider) {
        for (let i = cursor.line - 1; i >= 0 && i >= cursor.line - 3; i--) {
            const line = lineProvider.getLine(i);
            if (line.startsWith("```") && !line.startsWith("```" + CODE_BLOCK_EVENT)) {
                return false;
            }
            if (line.startsWith("```" + CODE_BLOCK_EVENT)) {
                return true;
            }
        }
        return false;
    },

    getSuggestions(context: TriggerInfo): MonthSuggestion[] | Promise<MonthSuggestion[]> {
        const parts = context.query.split(":", 2);
        const query = parts[0]
        const term = parts.length > 1 ? parts[1] || "" : ""

        if (query == "all") {
            return term == "" ? ALL_MONTHS : ALL_MONTHS.filter(s => s.filterByTerm(term)).map(s => s.mapByTerm(term))
        } else if (query == "1") {
            return term == "" ? SINGLE_DAY_INTERCALARIES : SINGLE_DAY_INTERCALARIES.filter(s => s.filterByTerm(term)).map(s => s.mapByTerm(term))
        } else if (query == "month") {
            return term == "" ? MULTI_DAY_MONTHS : MULTI_DAY_MONTHS.filter(s => s.filterByTerm(term)).map(s => s.mapByTerm(term))
        }
        return []
    },
}
