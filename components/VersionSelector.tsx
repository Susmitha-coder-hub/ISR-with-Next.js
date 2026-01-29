'use client';

import { useRouter, usePathname } from 'next/navigation';

export function VersionSelector({ version, lang }: { version: string, lang: string }) {
    const router = useRouter();
    const currentVersion = version;
    const versions = ['v1', 'v2', 'v3'];

    // This function assumes the URL structure is always /[lang]/docs/[version]/...
    // It naively replaces the version segment.
    const handleVersionChange = (newVersion: string) => {
        // Current path: /en/docs/v1/introduction
        // New path: /en/docs/v2/introduction
        const path = window.location.pathname;
        const parts = path.split('/');
        // parts[0] is empty, parts[1] is lang, parts[2] is 'docs', parts[3] is version
        if (parts[3] === currentVersion) {
            parts[3] = newVersion;
            router.push(parts.join('/'));
        }
    };

    return (
        <div className="relative inline-block text-left ml-4" data-testid="version-selector">
            <select
                onChange={(e) => handleVersionChange(e.target.value)}
                value={currentVersion}
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
                {versions.map((v) => (
                    <option key={v} value={v} data-testid={`version-option-${v}`}>
                        {v.toUpperCase()}
                    </option>
                ))}
            </select>
        </div>
    );
}
