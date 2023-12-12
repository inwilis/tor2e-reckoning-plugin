import {setIcon} from "obsidian";
import tippy from "tippy.js";

export interface ToolbarPaneData {
    classes?: string[]
    buttons: ToolbarPaneButton[]
}

export interface ToolbarPaneButton {
    icon: string
    hint?: string
    listener: () => void
}

export class ToolbarPane {


    constructor(readonly data: ToolbarPaneData) {
    }

    render(parent: HTMLElement): HTMLElement {
        const root = parent.createEl("div", {cls: (this.data.classes || []).concat(["toolbar-pane"])})

        for (const buttonData of this.data.buttons) {
            const button = root.createEl("span", {cls: "button"}, btn => setIcon(btn, buttonData.icon))
            if (buttonData.hint) {
                tippy(button, {
                    theme: "obsidian",
                    content: buttonData.hint
                })
            }

            button.addEventListener("click", buttonData.listener)
        }

        return root
    }


}
