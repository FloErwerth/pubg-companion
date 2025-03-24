import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { de } from "./de";

export const defaultNS = "translation";
export const resources = { de } as const;

i18n
  .use(initReactI18next)
  .init({
    defaultNS,
    lng: "de",
    resources,
    keySeparator: ".",
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;
