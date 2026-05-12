'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            role="switch"
            aria-checked={isDark}
            className={`${styles.switch} ${isDark ? styles.dark : styles.light}`}
            onClick={toggleTheme}
        >
            <div className={styles.track}></div>
            <div className={`${styles.thumb} ${isDark ? styles.thumbDark : ''}`}>
                {isDark ? (
                    <Moon size={14} className={styles.icon} />
                ) : (
                    <Sun size={14} className={styles.icon} />
                )}
            </div>
        </button>
    );
};

export default ThemeToggle;
