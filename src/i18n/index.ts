import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJson from "./locales/en/global.json";
import frJson from "./locales/fr/global.json";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: { ...enJson },
      },
      fr: {
        translation: { ...frJson },
      },
    }, // Where we're gonna put translations' files
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie"],
      caches: ["localStorage", "cookie"],
    },
  });

export default i18n;
