import { notFound } from 'next/navigation';
import { getDocBySlug } from '@/lib/docs';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { TableOfContents } from '@/components/TableOfContents';
import { FeedbackWidget } from '@/components/FeedbackWidget';
import { VersionSelector } from '@/components/VersionSelector';
import { CodeBlockManager } from '@/components/CodeBlockManager';
import { i18nConfig } from '@/i18n.config';

export const revalidate = 60; // ISR requirement

export async function generateStaticParams() {
    // In a real app, we would crawl the _docs directory to generate all params.
    // For this assignment, we'll generate params for the basic known routes to help ISR/SSG.
    // We can let others fall back to on-demand generation or generate them here.
    // Let's generate a few critical ones.
    const params = [];
    const versions = ['v1', 'v2'];
    const locales = i18nConfig.locales;
    const slugs = ['introduction'];

    for (const lang of locales) {
        for (const version of versions) {
            for (const slug of slugs) {
                params.push({ lang, version, slug: [slug] });
            }
        }
    }
    return params;
}

export default async function DocPage(props: {
    params: Promise<{ lang: string; version: string; slug: string[] }>;
}) {
    const params = await props.params;
    const doc = await getDocBySlug(params.version, params.lang, params.slug);

    if (!doc) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 container mx-auto max-w-7xl">
                <Sidebar lang={params.lang} version={params.version} />

                <main className="flex-1 min-w-0 py-10 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-sm text-gray-500">
                            {params.lang.toUpperCase()} / {params.version.toUpperCase()}
                        </div>
                        <VersionSelector version={params.version} lang={params.lang} />
                    </div>

                    <article className="prose dark:prose-invert max-w-none mb-12" data-testid="doc-content">
                        <h1>{doc.meta.title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: doc.content }} />
                    </article>

                    <FeedbackWidget />
                    <CodeBlockManager />
                </main>

                <TableOfContents />
            </div>
        </div>
    );
}
