'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

export function TableOfContents() {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // Simple h2 parsing from the rendered content
        const elements = Array.from(document.querySelectorAll('h2, h3'));
        const items = elements.map((elem) => ({
            id: elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
            text: elem.textContent || '',
            level: Number(elem.tagName.substring(1)),
        }));

        // Ensure IDs exist on the elements
        elements.forEach((elem) => {
            if (!elem.id) {
                elem.id = elem.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
            }
        });

        setHeadings(items);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        elements.forEach((elem) => observer.observe(elem));

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <nav className="sticky top-24 hidden xl:block w-64 pl-8 border-l border-gray-200 dark:border-gray-800" data-testid="table-of-contents">
            <h4 className="text-sm font-semibold mb-4 text-gray-900 dark:text-gray-100">On this page</h4>
            <ul className="space-y-2">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <a
                            href={`#${heading.id}`}
                            className={clsx(
                                'block text-sm transition-colors',
                                activeId === heading.id
                                    ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
                                heading.level === 3 && 'pl-4'
                            )}
                            data-testid={`toc-link-${heading.id}`}
                            data-active={activeId === heading.id}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
