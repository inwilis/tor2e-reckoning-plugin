import {App, MarkdownRenderChild} from "obsidian";
import {StewardsReckoning} from "../../reckoning/stewards/StewardsReckoning";


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

                const parsedDate = StewardsReckoning.parseDate(this.params.date)

                if (typeof parsedDate == "string") {
                    this.containerEl.createSpan({cls: "tor2e-error", text: parsedDate})

                } else {
                    const text = this.params.lang == "sindarin" ? parsedDate.toSindarin() : parsedDate.toQuenya();
                    const tooltip = this.params.lang == "sindarin" ? parsedDate.toSindarinDayOfWeek() : parsedDate.toQuenyaDayOfWeek() + ` (${parsedDate.getDayOfWeek() + 1})`

                    const span = this.containerEl.createSpan({cls: "tor2e-event"})
                    span.createSpan({cls: "tor2e-date", text: text, title: tooltip})
                    span.createSpan({cls: "tor2e-separator", text: ": "})
                    span.createSpan({cls: "tor2e-text", text: this.params.text})
                }
            } else {
                this.containerEl.createSpan({cls: "tor2e-error", text: `Unable to parse '${this.params.date}' as date`})
            }
        }
    }
}
