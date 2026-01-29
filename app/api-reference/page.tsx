import { APIReference } from '@/components/SwaggerUI';
import { Header } from '@/components/Header';

export default function ApiRefPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6">API Reference</h1>
                <APIReference />
            </main>
        </div>
    );
}
