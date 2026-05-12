'use client';

import React from 'react';
import styles from './MarketStat.module.css';

interface MarketStatProps {
    label: string;
    value: string | number | null;
    variant?: 'default' | 'success' | 'danger' | 'warning';
}

const MarketStat: React.FC<MarketStatProps> = ({ label, value, variant = 'default' }) => {
    const isStatus = variant !== 'default';

    return (
        <div className={styles.stat}>
            <span className={styles.label}>{label}</span>

            <div
                className={
                    isStatus
                        ? `${styles.sentimentWrapper} ${styles[variant]}`
                        : styles.value
                }
            >
                {value}
            </div>
        </div>
    );
};

export default MarketStat;
