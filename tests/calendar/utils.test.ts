import {describe, test} from "@jest/globals";
import {CODE_BLOCK_EVENT} from "../../src/constants";

describe("test parseEventData()", () => {

    test("should parse event data block", () => {
        const note =
            "---\n" +
            "a: \n" +
            "---\n" +
            "\n" +
            "s\n" +
            "\n" +
            "```tor2e-event\n" +
            "date: 15 Víressë 2974\n" +
            "text: Something else happened\n" +
            "```\n" +
            "\n"

        const pattern = `^\`\`\`${CODE_BLOCK_EVENT}([\\s\\S]+?)\`\`\``;
        console.log(pattern)
        const regExp = new RegExp(pattern, "gm");
        for (let match of note.matchAll(regExp)) {

            console.log(match)

        }
    })

})
