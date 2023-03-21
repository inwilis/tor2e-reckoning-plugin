import {MarkdownPostProcessorContext, parseYaml, Plugin} from 'obsidian';
import {EventEditorSuggest} from "./calendar/event/suggest/EventEditorSuggest";
import {CODE_BLOCK_EVENT} from "./constants";
import {EventBlockRenderer} from "./calendar/event/EventBlockRenderer";

export default class Tor2ePlugin extends Plugin {

    async onload() {

        this.registerMarkdownCodeBlockProcessor(CODE_BLOCK_EVENT, this.processEventCodeBlock.bind(this))

        this.registerEditorSuggest(new EventEditorSuggest(this))

        // this.registerEvent(this.app.vault.on("modify", updateFrontmatter(this.app.fileManager, this.app.metadataCache)))
    }

    async processEventCodeBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
        const params = {...parseYaml(source)}

        ctx.addChild(new EventBlockRenderer(this.app, el, params, ctx.sourcePath))
    }

    onunload() {

    }
}

