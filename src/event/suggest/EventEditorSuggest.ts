import {Editor, EditorPosition, EditorSuggest, EditorSuggestContext, EditorSuggestTriggerInfo, Plugin, TFile} from "obsidian";
import {EventSuggester} from "./EventSuggester";
import {MonthSuggestion} from "./MonthSuggestion";

export class EventEditorSuggest extends EditorSuggest<MonthSuggestion> {
    constructor(plugin: Plugin) {
        super(plugin.app);
    }

    onTrigger(cursor: EditorPosition, editor: Editor, file: TFile): EditorSuggestTriggerInfo | null {
        return EventSuggester.onTrigger(cursor, editor)
    }

    getSuggestions(context: EditorSuggestContext): MonthSuggestion[] | Promise<MonthSuggestion[]> {
        return EventSuggester.getSuggestions(context)
    }

    renderSuggestion(value: MonthSuggestion, el: HTMLElement): void {
        el.createSpan({text: value.getTextToSuggest(), cls: "tor2e-event-month-suggestion"})
    }

    selectSuggestion(value: MonthSuggestion, evt: MouseEvent | KeyboardEvent): void {
        if (this.context) {
            const textToInsert = value.getTextToInsert();
            const to = this.context.end;
            this.context.editor.replaceRange(textToInsert + " ", this.context.start, to)
            this.context.editor.setCursor({line: to.line, ch: to.ch + textToInsert.length + 1})
        }
    }


}
