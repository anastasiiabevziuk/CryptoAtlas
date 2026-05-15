'use client';

import { useEffect } from 'react';
import StatusPage from '@/components/UI/StatusPage/StatusPage';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StatusPage
                code="500"
                title="Something went wrong"
                description="We encountered an unexpected error while fetching crypto data."
            />
        </div>
    );
}