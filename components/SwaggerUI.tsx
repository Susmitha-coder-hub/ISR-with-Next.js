'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export function APIReference() {
    return (
        <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-50 bg-white rounded-lg p-4">
            <SwaggerUI url="/openapi.json" />
        </div>
    );
}
