'use client';

import { usePathname, useRouter } from 'next/navigation';
import { i18nConfig } from '@/i18n.config';

export function LanguageSwitcher() {
    const pathName = usePathname();
    const router = useRouter();

    const redirectedPathName = (locale: string) => {
        if (!pathName) return '/';
        const segments = pathName.split('/');
        segments[1] = locale;
        return segments.join('/');
    };

    const currentLocale = pathName?.split('/')[1] || i18nConfig.defaultLocale;

    return (
        <div className="relative inline-block text-left" data-testid="language-switcher">
            <select
                onChange={(e) => router.push(redirectedPathName(e.target.value))}
                value={currentLocale}
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
                {i18nConfig.locales.map((locale) => (
                    <option key={locale} value={locale}>
                        {locale.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}
