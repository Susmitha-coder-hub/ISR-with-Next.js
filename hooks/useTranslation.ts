'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// For this assignment, we'll implement a simple fetch-based translator or import directly.
// Dynamic imports for JSON files are tricky with Client Components if we want strictly static.
// But since the requirement is "create JSON files", let's fetch them or map them.
// To keep it simple and performant, let's just dynamic import based on lang if possible, 
// or simpler: just hardcode the logic to READ the files or use a dictionary object here for the *hook* implementation 
// while the physical files exist to satisfy the requirement.
// However, to be "correct", let's try to actually use the files.
// We can use a client-side fetch.

export function useTranslation() {
    const params = useParams();
    const lang = (params?.lang as string) || 'en';
    const [translations, setTranslations] = useState<Record<string, string>>({});

    useEffect(() => {
        import(`../public/locales/${lang}/common.json`)
            .then((mod) => setTranslations(mod.default))
            .catch(() => {
                // Fallback to English if file not found or error
                import(`../public/locales/en/common.json`).then(m => setTranslations(m.default));
            });
    }, [lang]);

    const t = (key: string) => {
        return translations[key] || key;
    };

    return { t };
}
