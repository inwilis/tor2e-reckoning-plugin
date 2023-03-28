import {App, MarkdownRenderChild, MarkdownRenderer} from "obsidian";
import {reckonings} from "../reckoning/Reckonings";
import {Tor2eCalendarView} from "../calendar/Tor2eCalendarView";
import {CSS_CLASS_ERROR} from "../constants";


export class EventBlockRenderer extends MarkdownRenderChild {

    constructor(readonly app: App, containerEl: HTMLElement, readonly params: any, readonly sourcePath: string) {
        super(containerEl)
    }


    onload() {
        this.render()
    }

    render() {

        if (this.params.date) {

            const reckoning = reckonings.detectReckoning(this.params.date, this.params.reckoning, this.params.language)

            try {
                let date = reckonings.getReckoning(reckoning).parseDate(this.params.date, this.params.language)

                if (this.params.display?.reckoning) {
                    date = reckonings.toReckoning(this.params.display.reckoning, date)
                }

                if (this.params.display?.language) {
                    date.language = this.params.display?.language
                }

                const dateAsText = date.toString()

                const span = this.containerEl.createSpan({cls: "tor2e-event"})

                const dateSpan = span.createSpan({cls: "tor2e-date", text: dateAsText})
                dateSpan.addEventListener("click", () => Tor2eCalendarView.openDefaultView(this.app, date))

                span.createSpan({cls: "tor2e-separator", text: ": "})
                const textSpan = span.createSpan({cls: "tor2e-text"})

                MarkdownRenderer.renderMarkdown(this.params.text, textSpan, this.sourcePath, this).then(this.unwrapParagraph(textSpan))

            } catch (e) {
                this.containerEl.createSpan({cls: CSS_CLASS_ERROR, text: e})
            }

        }
    }

    private unwrapParagraph(root: HTMLElement) {
        return () => {
            let paragraph = root.querySelector("p");
            while (paragraph) {
                const children = paragraph.childNodes;
                paragraph.replaceWith(...Array.from(children));
                paragraph = root.querySelector("p");
            }
        }
    }

}
