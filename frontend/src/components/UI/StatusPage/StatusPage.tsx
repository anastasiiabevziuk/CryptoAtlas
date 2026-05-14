'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MoveLeft } from 'lucide-react';
import Button from '../Button/Button';
import styles from './StatusPage.module.css';

interface StatusPageProps {
    code: string;
    title: string;
    description: string;
}

const StatusPage: React.FC<StatusPageProps> = ({ code, title, description }) => {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.errorCode}>{code}</h1>
                <div className={styles.divider}></div>
                <h2 className={styles.message}>{title}</h2>
                <p className={styles.description}>{description}</p>

                <Button
                    variant="outline"
                    icon={<MoveLeft size={20} />}
                    onClick={() => router.push('/')}
                >
                    Back to Dashboard
                </Button>
            </div>
        </div>
    );
};

export default StatusPage;