import {MarkdownPostProcessorContext, parseYaml, Plugin} from 'obsidian';
import {EventEditorSuggest} from "./event/suggest/EventEditorSuggest";
import {CODE_BLOCK_EVENT} from "./constants";
import {EventBlockRenderer} from "./event/EventBlockRenderer";
import {Tor2eCalendarView, VIEW_TYPE_STEWARDS_CALENDAR} from "./calendar/Tor2eCalendarView";

export default class Tor2ePlugin extends Plugin {

    async onload() {

        this.registerMarkdownCodeBlockProcessor(CODE_BLOCK_EVENT, this.processEventCodeBlock.bind(this))

        this.registerEditorSuggest(new EventEditorSuggest(this))

        // this.registerEvent(this.app.vault.on("modify", updateFrontmatter(this.app.fileManager, this.app.metadataCache)))

        this.registerView(
            VIEW_TYPE_STEWARDS_CALENDAR,
            (leaf) => new Tor2eCalendarView(leaf)
        )

        this.addRibbonIcon("dice", "Print leaf types", () => {
            this.app.workspace.iterateAllLeaves((leaf) => {
                console.log(leaf.getViewState());
            });
        });
    }

    onunload() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_STEWARDS_CALENDAR)
    }

    async processEventCodeBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
        const params = {...parseYaml(source)}

        ctx.addChild(new EventBlockRenderer(this.app, el, params, ctx.sourcePath))
    }
}

