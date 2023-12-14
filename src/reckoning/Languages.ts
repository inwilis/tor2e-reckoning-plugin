export enum Language {
    QUENYA = "quenya",
    SINDARIN = "sindarin"
}

export const languages = {

    getAbbreviation(language: string): string {
        if (language == Language.QUENYA) {
            return "q."

        } else if (language == Language.SINDARIN) {
            return "sind."
        }

        return language;
    }

}
