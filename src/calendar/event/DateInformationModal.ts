import {App, Modal} from "obsidian";
import {ReckoningDate} from "../../reckoning/ReckoningDate";
import {allReckonings, reckonings} from "../../reckoning/Reckonings";

export class DateInformationModal extends Modal {

    constructor(app: App, readonly date: ReckoningDate<any>, readonly params: any) {
        super(app);
    }

    onOpen() {
        let {contentEl} = this;
        const displayLanguage = this.params.display?.language || this.params.language || this.date.reckoning.getDefaultLanguage();
        contentEl.createEl("h1", {text: this.date.toString(displayLanguage)})
        this.date.reckoning.getSupportedLanguages().forEach((lang) => {
            if (lang != displayLanguage) {
                contentEl.createEl("p", {text: this.date.toString(lang)})
            }
        })

        allReckonings.forEach((reckoning, name) => {
            if (name != this.date.reckoning.getName()) {
                const convertedDate = reckonings.toReckoning(reckoning.getName(), this.date);
                reckoning.getSupportedLanguages().forEach((lang) => {
                    if (lang != displayLanguage) {
                        contentEl.createEl("p", {text: convertedDate.toString(lang)})
                    }
                })
            }
        })

    }

    onClose() {
        let {contentEl} = this;
        contentEl.empty();
    }
}
