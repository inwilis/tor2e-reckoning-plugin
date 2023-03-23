import {App, MarkdownRenderChild} from "obsidian";
import {stewardsReckoning} from "../../reckoning/stewards/StewardsReckoning";


export class EventBlockRenderer extends MarkdownRenderChild {

    constructor(readonly app: App, containerEl: HTMLElement, readonly params: any, readonly sourcePath: string) {
        super(containerEl)
    }


    onload() {
        this.render()
    }

    render() {

        if (this.params.date && this.params.text) {

            if (typeof this.params.date == "string") {

                try {
                    const parsedDate = stewardsReckoning.parseDate(this.params.date)

                    const text = parsedDate.toString(this.params.lang)
                    const tooltip = parsedDate.toDayOfWeekString(this.params.lang) + ` (${parsedDate.getDayOfWeek() + 1})`

                    const span = this.containerEl.createSpan({cls: "tor2e-event"})
                    span.createSpan({cls: "tor2e-date", text: text, title: tooltip})
                    span.createSpan({cls: "tor2e-separator", text: ": "})
                    span.createSpan({cls: "tor2e-text", text: this.params.text})

                } catch (e) {
                    this.containerEl.createSpan({cls: "tor2e-error", text: e})
                }
            } else {
                this.containerEl.createSpan({cls: "tor2e-error", text: `Unable to parse '${this.params.date}' as date`})
            }
        }
    }


}
