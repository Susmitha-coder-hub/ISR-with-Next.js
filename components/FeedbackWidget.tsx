'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function FeedbackWidget() {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // In a real app, send to API
    };

    return (
        <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold mb-2">{t('feedback_title')}</h3>
            {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500"
                        rows={3}
                        placeholder={t('feedback_title')}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        data-testid="feedback-input"
                        required
                    />
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                        data-testid="feedback-submit"
                    >
                        <Send className="h-4 w-4" />
                        {t('feedback_submit')}
                    </button>
                </form>
            ) : (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md" data-testid="feedback-success-message">
                    {t('feedback_success')}
                </div>
            )}
        </div>
    );
}
