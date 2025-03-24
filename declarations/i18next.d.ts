import { defaultNS, resources } from "translation";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: (typeof resources)["de"];
    }
}
