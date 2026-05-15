import React from 'react';
import styles from './loading.module.css';

export default function Loading() {
    return (
        <div className={styles.container}>
            <span className={styles.loader}></span>
            <p className={styles.text}>Loading CryptoAtlas...</p>
        </div>
    );
}