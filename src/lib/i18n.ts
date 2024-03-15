import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(detector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    defaultNS: 'common',
    backend: {
      loadPath:
        `${import.meta.env.BASE_URL}/locales/{{lng}}/{{ns}}.json`.replace(
          '//',
          '/',
        ),
    },
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(console.error);

export { i18n };
