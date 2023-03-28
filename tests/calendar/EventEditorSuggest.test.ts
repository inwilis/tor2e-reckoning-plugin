import {describe, expect, test} from "@jest/globals";
import {ALL_MONTHS, MULTI_DAY_MONTHS, SINGLE_DAY_INTERCALARIES} from "../../src/event/suggest/MonthSuggestion";
import {CursorPosition, EventSuggester, LineProvider, TriggerInfo} from "../../src/event/suggest/EventSuggester";
import {CODE_BLOCK_EVENT} from "../../src/constants";

describe('testing EventEditorSuggest.onTrigger', () => {

    test('should return null if invoked not in date field', () => {
        const [cursor, editor] = mockEditorContext([
            `\`\`\`${CODE_BLOCK_EVENT}`,
            "|  date: ",
            "```"

        ])

        expect(EventSuggester.onTrigger(cursor, editor)).toBeNull();
    })

    test('should return null if invoked after code block', () => {
        const [cursor, editor] = mockEditorContext([
            `\`\`\`${CODE_BLOCK_EVENT}`,
            "  date: ",
            "```",
            "|"

        ])

        expect(EventSuggester.onTrigger(cursor, editor)).toBeNull();
    })

    test('should return null if invoked before code block', () => {
        const [cursor, editor] = mockEditorContext([
            `|\`\`\`${CODE_BLOCK_EVENT}`,
            "  date: ",
            "```"
        ])

        expect(EventSuggester.onTrigger(cursor, editor)).toBeNull();
    })

    test('should trigger for 1: if no day is entered', () => {
        const [cursor, editor] = mockEditorContext([
            `\`\`\`${CODE_BLOCK_EVENT}`,
            "  date: |",
            "```"
        ])

        expect(EventSuggester.onTrigger(cursor, editor)).toMatchObject({query: "1:", start: {ch: 8, line: 1}, end: {ch: 8, line: 1}});
    })

    test('should trigger for all:" if 1st day is entered', () => {
        const [cursor, editor] = mockEditorContext([
            `\`\`\`${CODE_BLOCK_EVENT}`,
            "  date: 1 |",
            "```"
        ])

        expect(EventSuggester.onTrigger(cursor, editor)).toMatchObject({query: "all:", start: {ch: 10, line: 1}, end: {ch: 10, line: 1}});
    })

    test('should trigger for all:" if 01st day is entered', () => {
        const [cursor, editor] = mockEditorContext([
            `\`\`\`${CODE_BLOCK_EVENT}`,
            "  date: 01 |",
            "```"
        ])

        expect(EventSuggester.onTrigger(cursor, editor)).toMatchObject({query: "all:", start: {ch: 11, line: 1}, end: {ch: 11, line: 1}});
    })

    test('should trigger for :month if day 2+ is entered', () => {
        const [cursor, editor] = mockEditorContext([
            `\`\`\`${CODE_BLOCK_EVENT}`,
            "  date: 2 |",
            "```"
        ])

        expect(EventSuggester.onTrigger(cursor, editor)).toMatchObject({query: "month:", start: {ch: 10, line: 1}, end: {ch: 10, line: 1}});
    })

    test('should trigger for month: if day 02+ is entered', () => {
        const [cursor, editor] = mockEditorContext([
            `\`\`\`${CODE_BLOCK_EVENT}`,
            "  date: 13 |",
            "```"
        ])

        expect(EventSuggester.onTrigger(cursor, editor)).toMatchObject({query: "month:", start: {ch: 11, line: 1}, end: {ch: 11, line: 1}});
    })

    test('should trigger for 1:term if no day is entered', () => {
        const [cursor, editor] = mockEditorContext([
            `\`\`\`${CODE_BLOCK_EVENT}`,
            "  date: term|",
            "```"
        ])

        expect(EventSuggester.onTrigger(cursor, editor)).toMatchObject({query: "1:term", start: {ch: 8, line: 1}, end: {ch: 12, line: 1}});
    })

    test('should trigger for all:term" if 1st day and term is entered', () => {
        const [cursor, editor] = mockEditorContext([
            `\`\`\`${CODE_BLOCK_EVENT}`,
            "  date: 1 term|",
            "```"
        ])

        expect(EventSuggester.onTrigger(cursor, editor)).toMatchObject({query: "all:term", start: {ch: 10, line: 1}, end: {ch: 14, line: 1}});
    })

    test('should trigger for all:term" if 01st day and term is entered', () => {
        const [cursor, editor] = mockEditorContext([
            `\`\`\`${CODE_BLOCK_EVENT}`,
            "  date: 01 term|",
            "```"
        ])

        expect(EventSuggester.onTrigger(cursor, editor)).toMatchObject({query: "all:term", start: {ch: 11, line: 1}, end: {ch: 15, line: 1}});
    })

    test('should trigger for month:term if day 2+ is entered', () => {
        const [cursor, editor] = mockEditorContext([
            `\`\`\`${CODE_BLOCK_EVENT}`,
            "  date: 2 term|",
            "```"
        ])

        expect(EventSuggester.onTrigger(cursor, editor)).toMatchObject({query: "month:term", start: {ch: 10, line: 1}, end: {ch: 14, line: 1}});
    })

    test('should trigger for month:term if day 02+ is entered', () => {
        const [cursor, editor] = mockEditorContext([
            `\`\`\`${CODE_BLOCK_EVENT}`,
            "  date: 13 term|",
            "```"
        ])

        expect(EventSuggester.onTrigger(cursor, editor)).toMatchObject({query: "month:term", start: {ch: 11, line: 1}, end: {ch: 15, line: 1}});
    })
})

describe('testing EventEditorSuggest.getSuggestions', () => {
    test('should return ALL_MONTHS on query all:', () => expect(EventSuggester.getSuggestions(triggerInfo("all:"))).toBe(ALL_MONTHS))
    test('should return SINGLE_DAY_INTERCALARIES on query 1:', () => expect(EventSuggester.getSuggestions(triggerInfo("1:"))).toBe(SINGLE_DAY_INTERCALARIES))
    test('should return MULTI_DAY_MONTHS on query month:', () => expect(EventSuggester.getSuggestions(triggerInfo("month:"))).toBe(MULTI_DAY_MONTHS))

    test('should return filtered ALL_MONTHS on query all:Na', () => expect(EventSuggester.getSuggestions(triggerInfo("all:Na")))
        .toMatchObject([
            {item: {quenya: "Narvinyë"}, quenya: true},
            {item: {quenya: "Nárië"}, quenya: true},
            {item: {quenya: "Narquelië"}, quenya: true}]))

    test('should return filtered SINGLE_DAY_INTERCALARIES on query 1:Eth', () => expect(EventSuggester.getSuggestions(triggerInfo("1:Eth")))
        .toMatchObject([
            {item: {sindarin: "Ethuilor"}, sindarin: true}]))

    test('should return filtered MULTI_DAY_MONTHS on query month:Lo', () => expect(EventSuggester.getSuggestions(triggerInfo("month:Lo")))
        .toMatchObject([
            {item: {quenya: "Lótessë"}, quenya: true}]))

    test('should return filtered MULTI_DAY_MONTHS on query month:No', () => expect(EventSuggester.getSuggestions(triggerInfo("month:No")))
        .toMatchObject([
            {item: {sindarin: "Nórui"}, quenya: false, sindarin: true}]))
})

function mockEditorContext(lines: string[]): [CursorPosition, LineProvider] {
    const editorPosition = {line: 0, ch: 0}

    for (let i = 0; i < lines.length; i++) {
        const cursor = lines[i].indexOf("|");
        if (cursor > 0) {
            editorPosition.line = i
            editorPosition.ch = cursor
            lines[i] = lines[i].replace("|", "")
        }
    }

    return [editorPosition, {
        getLine(line: number): string {
            return lines[line]
        }
    }]
}


function triggerInfo(query: string): TriggerInfo {
    return {query: query, start: {line: 0, ch: 0}, end: {line: 0, ch: 0}}
}
