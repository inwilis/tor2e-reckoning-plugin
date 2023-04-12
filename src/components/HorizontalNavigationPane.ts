import {setIcon} from "obsidian";

export interface HorizontalNavigationPaneData {
    classes?: string[]
    icon?: string
    text?: string
    onPrevious?: () => void
    onNext?: () => void
}

export class HorizontalNavigationPane {


    constructor(readonly data: HorizontalNavigationPaneData) {
    }

    render(parent: HTMLElement): HTMLElement {
        const root = parent.createEl("div", {cls: (this.data.classes || []).concat(["hor-nav-pane"])})
        const previousButton = root.createEl("span", {cls: "nav-button previous"}, btn => setIcon(btn, "chevron-left"))

        const content = root.createEl("span", {cls: "content"})
        content.createEl("span", {cls: "icon"}, i => setIcon(i, this.data.icon || ""))
        content.createEl("span", {cls: "text", text: this.data.text})

        const nextButton = root.createEl("span", {cls: "nav-button next"}, btn => setIcon(btn, "chevron-right"))

        if (this.data.onPrevious) previousButton.addEventListener("click", this.data.onPrevious)
        if (this.data.onNext) nextButton.addEventListener("click", this.data.onNext)

        return root
    }

}
