'use client';

import React from 'react';
import Link from 'next/link';
import { Activity } from 'lucide-react';
import styles from './Logo.module.css';

interface LogoProps {
    withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ withText = true }) => {
    return (
        <Link href="/" className={styles.logo} aria-label="Go to homepage">
            <Activity className={styles.icon} size={30} />

            {withText && (
                <span className={styles.text}>
                    Crypto<span>Atlas</span>
                </span>
            )}
        </Link>
    );
};

export default Logo;
