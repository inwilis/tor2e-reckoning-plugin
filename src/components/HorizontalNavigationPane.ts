import {setIcon} from "obsidian";

export interface HorizontalNavigationPaneData {
    classes?: string[]
    icon?: string
    text?: string
    editable?: string
    onPrevious?: () => void
    onNext?: () => void
    onEdit?: (newValue: string) => Promise<string>
}

export class HorizontalNavigationPane {


    constructor(readonly data: HorizontalNavigationPaneData) {
    }

    render(parent: HTMLElement): HTMLElement {
        const root = parent.createEl("div", {cls: (this.data.classes || []).concat(["hor-nav-pane"])})
        const previousButton = root.createEl("span", {cls: "nav-button previous"}, btn => setIcon(btn, "chevron-left"))

        const content = root.createEl("span", {cls: "content"})
        content.createEl("span", {cls: "icon"}, i => setIcon(i, this.data.icon || ""))

        if (this.data.editable) {
            const editableType: string = this.data.editable
            const form = content.createEl("form", {cls: "text-editable"})
            const paneText = form.createEl("input", {cls: "text", value: this.data.text, type: "submit"});
            form.addEventListener('submit', async (ev) => {
                await this.switchEditableElement(paneText, editableType)
                ev.preventDefault()
            })

            form.addEventListener("focusout", async () => await this.switchEditableElement(paneText, editableType))

        } else {
            content.createEl("span", {cls: "text", text: this.data.text})
        }

        const nextButton = root.createEl("span", {cls: "nav-button next"}, btn => setIcon(btn, "chevron-right"))

        if (this.data.onPrevious) previousButton.addEventListener("click", this.data.onPrevious)
        if (this.data.onNext) nextButton.addEventListener("click", this.data.onNext)


        return root
    }

    private async switchEditableElement(paneText: any, editableType: string) {
        if (paneText.type != "submit") {
            if (this.data.onEdit) {
                paneText.value = await this.data.onEdit(paneText.value)
            }
            paneText.type = "submit"

        } else {
            paneText.type = editableType
        }
    }
}
