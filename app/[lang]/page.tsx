import { redirect } from 'next/navigation';

export default async function Home(props: { params: Promise<{ lang: string }> }) {
    const params = await props.params;
    // Redirect to the default documentation page
    redirect(`/${params.lang}/docs/v1/introduction`);
}
