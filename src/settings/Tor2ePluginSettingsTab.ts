import {App, PluginSettingTab, Setting} from "obsidian";
import Tor2ePlugin from "../main";
import {allReckonings} from "../reckoning/Reckonings";


export class Tor2ePluginSettingsTab extends PluginSettingTab {


    constructor(app: App, private plugin: Tor2ePlugin) {
        super(app, plugin);
    }

    display(): void {
        let {containerEl} = this;
        containerEl.empty();

        containerEl.createEl('h2', {text: 'Date codeblocks'});

        new Setting(containerEl)
            .setName("Default reckoning")
            .setDesc("Dates in codeblocks will be displayed in this reckoning, if not explicitly configured otherwise.")
            .addDropdown(component => {
                allReckonings.forEach((reckoning, name) => component.addOption(name, name));
                component.setValue(this.plugin.settings.defaultReckoning);

                component.onChange(async name => {
                    this.plugin.settings.defaultReckoning = name;
                    this.plugin.settings.defaultLanguage = allReckonings.get(name)?.getDefaultLanguage() ?? "";
                    await this.plugin.saveSettings();
                    this.display();

                })
            });

        const supportedLanguages = allReckonings.get(this.plugin.settings.defaultReckoning)?.getSupportedLanguages();
        if (supportedLanguages && supportedLanguages.length > 1) {
            new Setting(containerEl)
                .setName("Default language")
                .setDesc("Dates in codeblocks will be displayed in this language, if not explicitly configured otherwise.")
                .addDropdown(component => {

                    supportedLanguages.forEach(language => component.addOption(language, language));
                    component.setValue(this.plugin.settings.defaultLanguage);

                    component.onChange(async name => {
                        this.plugin.settings.defaultLanguage = name;
                        await this.plugin.saveSettings();
                    })
                });
        }
    }
}
