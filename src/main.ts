import {MarkdownPostProcessorContext, MarkdownView, parseYaml, Plugin} from 'obsidian';
import {EventEditorSuggest} from "./event/suggest/EventEditorSuggest";
import {CODE_BLOCK_EVENT} from "./constants";
import {EventBlockRenderer} from "./event/EventBlockRenderer";
import {Tor2eCalendarView, VIEW_TYPE_STEWARDS_CALENDAR} from "./calendar/Tor2eCalendarView";
import {Tor2ePluginSettingsTab} from "./settings/Tor2ePluginSettingsTab";
import {DEFAULT_SETTINGS, Tor2ePluginSettings} from "./settings/Tor2ePluginSettings";
import Tor2ePluginApi from "./Tor2ePluginApi";

export default class Tor2ePlugin extends Plugin {

    settings: Tor2ePluginSettings;

    api: Tor2ePluginApi;

    async onload() {
        await this.loadSettings();

        this.addSettingTab(new Tor2ePluginSettingsTab(this.app, this));

        this.registerMarkdownCodeBlockProcessor(CODE_BLOCK_EVENT, this.processEventCodeBlock.bind(this))

        this.registerEditorSuggest(new EventEditorSuggest(this))

        this.registerView(VIEW_TYPE_STEWARDS_CALENDAR,
            (leaf) => new Tor2eCalendarView(leaf)
        )

        this.api = new Tor2ePluginApi(this);
    }

    onunload() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_STEWARDS_CALENDAR)
    }

    async loadSettings() {
        this.settings = {...DEFAULT_SETTINGS, ...await this.loadData()};
    }

    async saveSettings() {
        await this.saveData(this.settings);


        for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
            const view = <MarkdownView>leaf.view;


            const event = new CustomEvent("tor2e-refresh-event-codeblock");
            view.previewMode.containerEl.dispatchEvent(event);

        }
    }

    async processEventCodeBlock(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext): Promise<void> {
        const params = {...parseYaml(source)}

        ctx.addChild(new EventBlockRenderer(this.app, this, el, params, ctx.sourcePath))
    }
}

