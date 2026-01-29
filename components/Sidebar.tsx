'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useTheme } from 'next-themes';

export function Sidebar({ lang, version }: { lang: string, version: string }) {
    const pathname = usePathname();

    // Hardcoded for demonstration, ideally fetched based on version
    const navItems = [
        { title: 'Introduction', slug: 'introduction' },
        { title: 'Getting Started', slug: 'getting-started' }, // Fake link
    ];

    return (
        <aside className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 overflow-y-auto hidden md:block" data-testid="sidebar">
            <nav className="p-4 space-y-2">
                <div className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    {version.toUpperCase()} Documentation
                </div>
                {navItems.map((item) => {
                    const href = `/${lang}/docs/${version}/${item.slug}`;
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={item.slug}
                            href={href}
                            className={clsx(
                                'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                                    : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
                            )}
                            data-testid={`sidebar-nav-link-${item.slug}`}
                        >
                            {item.title}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
