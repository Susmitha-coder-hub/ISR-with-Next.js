'use client';

import { useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute right-2 top-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
            data-testid="copy-code-button"
            aria-label="Copy code"
        >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        </button>
    );
}

export function CodeBlockManager() {
    useEffect(() => {
        const codeBlocks = document.querySelectorAll('pre');
        codeBlocks.forEach((pre) => {
            if (pre.getAttribute('data-processed')) return;
            pre.setAttribute('data-processed', 'true');
            pre.classList.add('relative', 'group');
            pre.setAttribute('data-testid', 'code-block');

            const code = pre.querySelector('code')?.innerText || '';
            const wrapper = document.createElement('div');
            pre.appendChild(wrapper);

            const root = createRoot(wrapper);
            root.render(<CopyButton text={code} />);
        });
    }, []);

    return null;
}
