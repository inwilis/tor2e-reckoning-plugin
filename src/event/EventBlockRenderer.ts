import {App, MarkdownRenderChild, MarkdownRenderer} from "obsidian";
import {reckonings} from "../reckoning/Reckonings";
import {Tor2eCalendarView} from "../calendar/Tor2eCalendarView";
import Tor2ePlugin from "../main";
import {ReckoningDate} from "../reckoning/ReckoningDate";
import {CSS_CLASS_ERROR} from "../constants";


export class EventBlockRenderer extends MarkdownRenderChild {

    constructor(readonly app: App, readonly plugin: Tor2ePlugin, containerEl: HTMLElement, readonly params: any, readonly sourcePath: string) {
        super(containerEl)
    }


    onload() {
        this.render()
    }

    render() {

        const date = this.getDate();

        if (date instanceof ReckoningDate) {


            const dateAsText = date.toString()

            const span = this.containerEl.createSpan({cls: "tor2e-event"})

            const dateSpan = span.createSpan({cls: "tor2e-date", text: dateAsText})
            dateSpan.addEventListener("click", () => Tor2eCalendarView.openDefaultView(this.app, date))
            dateSpan.addEventListener("tor2e-refresh-event-codeblock", () => dateSpan.setText(date.toString()))

            span.createSpan({cls: "tor2e-separator", text: ": "})
            const textSpan = span.createSpan({cls: "tor2e-text"})

            MarkdownRenderer.render(this.app, this.params.text, textSpan, this.sourcePath, this).then(this.unwrapParagraph(textSpan))


        } else if (date) {

            const span = this.containerEl.createSpan({cls: CSS_CLASS_ERROR})
            span.createSpan({cls: "tor2e-date", text: this.params.date});
            span.createSpan({cls: "tor2e-separator", text: ": "})
            span.createSpan({cls: "tor2e-text", text: date})
        }
    }

    private getDate(): ReckoningDate<any> | string | undefined {

        if (this.params.date) {
            try {
                const detected = reckonings.detectReckoning(this.params.date, this.params.reckoning, this.params.language);

                if (!detected || detected.length == 0) {
                    console.log(this.params)
                    return "Unable to detect reckoning for date";
                }

                const [reckoning, language] = detected[0];
                let date = reckonings.getReckoning(reckoning).parseDate(this.params.date, language);

                date = reckonings
                    .toReckoning(this.params.display?.reckoning || this.plugin.settings.defaultReckoning, date)
                    .withLanguage(this.params.display?.language || this.plugin.settings.defaultLanguage);

                return date;
            } catch (e) {
                return e instanceof Error ? e.message : String(e);
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
