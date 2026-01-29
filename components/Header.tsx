'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Search } from './Search';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
            <div className="flex h-16 items-center px-4 md:px-6">
                <div className="mr-8 flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <span>DocuSite</span>
                    </Link>
                </div>

                <div className="flex-1 flex justify-center max-w-lg mx-auto">
                    <Search />
                </div>

                <div className="flex items-center gap-4 ml-auto">
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
