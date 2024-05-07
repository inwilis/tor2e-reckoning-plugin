import {stewardsReckoning} from "../reckoning/stewards/StewardsReckoning";

export interface Tor2ePluginSettings {
    defaultReckoning: string;
    defaultLanguage: string;
}

export const DEFAULT_SETTINGS: Tor2ePluginSettings = {
    defaultReckoning: stewardsReckoning.getName(),
    defaultLanguage: stewardsReckoning.getDefaultLanguage()
}
