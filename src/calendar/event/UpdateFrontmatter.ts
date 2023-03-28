import {FileManager, MetadataCache, parseYaml, TAbstractFile, TFile} from "obsidian";
import {CODE_BLOCK_EVENT} from "../../constants";
import {stewardsReckoning} from "../../reckoning/stewards/StewardsReckoning";
import {ReckoningDate} from "../../reckoning/ReckoningDate";

export function updateFrontmatter(fileManager: FileManager, metadataCache: MetadataCache) {

    return async (file: TAbstractFile) => {

        if (file instanceof TFile) {
            const content = await file.vault.cachedRead(file);

            const eventData = parseEventData(content);

            const fileCache = metadataCache.getFileCache(file);

            if (eventData.length == 0 && (!fileCache || !fileCache.frontmatter || !fileCache.frontmatter.tor2events)) {
                return
            }

            return await fileManager.processFrontMatter(file, (frontmatter: any) => processFrontmatter(eventData, frontmatter))
        }
    }
}

export function parseEventData(content: string): EventData[] {
    const result: EventData[] = [];
    for (let match of content.matchAll(new RegExp(`^\`\`\`${CODE_BLOCK_EVENT}([\\s\\S]+?)\`\`\``, "gm"))) {
        if (match && match[1]) {
            const parsed = parseYaml(match[1]);
            if (typeof parsed.date == "string" && typeof parsed.text == "string") {
                const parsedDate = stewardsReckoning.parseDate(parsed.date);
                result.push({date: parsedDate, text: parsed.text})
            }
        }
    }
    return result
}

export interface EventData {
    date: ReckoningDate<any>
    text: string
}


function processFrontmatter(eventData: EventData[], frontmatter: any) {
    if (frontmatter.tor2events && frontmatter.tor2events.inline) {
        delete frontmatter.tor2events.inline
    }

    if (eventData.length > 0) {

        if (!frontmatter.tor2events) {
            frontmatter.tor2events = {}
        }

        if (!frontmatter.tor2events.inline) {
            frontmatter.tor2events.inline = []
        }

        // eventData.forEach(e => frontmatter.tor2events.inline.push({date: e.date.toQuenya(), text: e.text}))
    }
}


