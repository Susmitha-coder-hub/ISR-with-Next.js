import '../globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'API Reference',
    description: 'Swagger UI API Documentation',
};

export default function ApiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen bg-white text-gray-900`}>
                {children}
            </body>
        </html>
    );
}
