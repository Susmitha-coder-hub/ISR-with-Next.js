export const i18nConfig = {
    locales: ['en', 'es', 'fr', 'de'],
    defaultLocale: 'en',
};

export type Locale = (typeof i18nConfig)['locales'][number];
