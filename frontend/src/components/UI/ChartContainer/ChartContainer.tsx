import React from 'react';
import styles from './ChartContainer.module.css';

interface Props {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

const ChartContainer: React.FC<Props> = ({ title, subtitle, children }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default ChartContainer;