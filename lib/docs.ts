import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const docsDirectory = path.join(process.cwd(), '_docs');

export interface DocPost {
    slug: string;
    meta: {
        title: string;
        description: string;
        [key: string]: any;
    };
    content: string;
}

export async function getDocBySlug(
    version: string,
    lang: string,
    slug: string[]
): Promise<DocPost | null> {
    const realSlug = slug.join('/');
    const fullPath = path.join(docsDirectory, version, lang, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
        slug: realSlug,
        meta: data as any,
        content: contentHtml,
    };
}

export function getAllDocs(version: string, lang: string) {
    const dir = path.join(docsDirectory, version, lang);
    if (!fs.existsSync(dir)) return [];

    // This is a simplified recursive walker for now
    // For the assignment, we might just have flat files or one level deep
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    // Implementation details for recursive walking would go here if needed
    // For now, let's assume flat or handle simple flat lists
    return entries.filter(e => e.isFile() && e.name.endsWith('.md')).map(e => e.name.replace(/\.md$/, ''));
}
