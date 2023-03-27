import {App, MarkdownRenderChild} from "obsidian";
import {reckonings} from "../../reckoning/Reckonings";
import {DateInformationModal} from "./DateInformationModal";


export class EventBlockRenderer extends MarkdownRenderChild {

    constructor(readonly app: App, containerEl: HTMLElement, readonly params: any, readonly sourcePath: string) {
        super(containerEl)
    }


    onload() {
        this.render()
    }

    render() {

        if (this.params.reckoning && this.params.date) {

            try {
                let date = reckonings.getReckoning(this.params.reckoning).parseDate(this.params.date, this.params.language)

                if (this.params.display?.reckoning) {
                    date = reckonings.toReckoning(this.params.display.reckoning, date)
                }

                const dateAsText = date.toString(this.params.display?.language || this.params.language)

                const span = this.containerEl.createSpan({cls: "tor2e-event"})

                const dateSpan = span.createSpan({cls: "tor2e-date", text: dateAsText})
                dateSpan.addEventListener("click", () => new DateInformationModal(this.app, date, this.params).open())

                span.createSpan({cls: "tor2e-separator", text: ": "})
                span.createSpan({cls: "tor2e-text", text: this.params.text})

            } catch (e) {
                this.containerEl.createSpan({cls: "tor2e-error", text: e})
            }

        }
    }


}
