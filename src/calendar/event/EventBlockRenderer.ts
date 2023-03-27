import {App, MarkdownRenderChild} from "obsidian";
import {reckonings} from "../../reckoning/Reckonings";
import {DateInformationModal} from "./DateInformationModal";
import {stewardsReckoning} from "../../reckoning/stewards/StewardsReckoning";


export class EventBlockRenderer extends MarkdownRenderChild {

    constructor(readonly app: App, containerEl: HTMLElement, readonly params: any, readonly sourcePath: string) {
        super(containerEl)
    }


    onload() {
        this.render()
    }

    render() {

        if (this.params.date) {

            const reckoning = this.params.reckoning || stewardsReckoning.getName()

            try {
                let date = reckonings.getReckoning(reckoning).parseDate(this.params.date, this.params.language)

                if (this.params.display?.reckoning) {
                    date = reckonings.toReckoning(this.params.display.reckoning, date)
                }

                const dateAsText = date.toString(this.params.display?.language)

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
