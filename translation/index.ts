import i18next from "i18next";
import de from "~/translation/de.json";
import {initReactI18next} from "react-i18next";

export const defaultNS = "translation";
export const resources = {
    de: {
        translation: de,
    },
};

// to use regional locales use { "en-US": enUS } etc
i18next.use(initReactI18next).init({
    lng: "de",
    defaultNS,
    resources,
    keySeparator: ".",
    compatibilityJSON: "v4",
});
