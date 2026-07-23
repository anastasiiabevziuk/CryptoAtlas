'use client';

import React from 'react';
import { X } from 'lucide-react';
import MarketStat from '../../UI/MarketStat/MarketStat';
import ThemeToggle from '../../UI/ThemeToggle/ThemeToggle';
import Logo from '../../UI/Logo/Logo';
import styles from './MobileMenu.module.css';
import Navigation from '@/components/UI/Navigation/Navigation';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    marketData: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, marketData }) => {


    React.useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const { btcDom, totalCap, sentiment, loading, isError } = marketData;


    const sentimentVariant =
        sentiment?.toLowerCase().includes('greed')
            ? 'success'
            : sentiment?.toLowerCase().includes('fear')
                ? 'danger'
                : 'warning';

    return (
        <div className={styles.fullScreenOverlay}>
            <div className={styles.menuContainer}>

                <div className={styles.header}>
                    <div className={styles.logoWrapper}>
                        <Logo />
                    </div>
                    <button className={styles.closeIconButton} onClick={onClose}>
                        <X size={32} strokeWidth={1.5} />
                    </button>
                </div>

                <div className={styles.scrollContent}>
                    <div className={styles.section}>
                        <div className={styles.mobileNav}>
                            <Navigation />
                        </div>

                        <h3 className={styles.sectionLabel}>Market Stats</h3>

                        <div className={styles.statsStack}>
                            <MarketStat
                                label="BTC Dom"
                                value={isError ? '—' : loading ? '...' : `${btcDom}%`}
                            />

                            <MarketStat
                                label="Market Cap"
                                value={isError ? '—' : loading ? '...' : totalCap}
                            />

                            <MarketStat
                                label="Sentiment"
                                value={isError ? '—' : loading ? '...' : sentiment}
                                variant={sentimentVariant}
                            />
                        </div>
                    </div>

                    <div className={styles.appearanceSection}>
                        <div className={styles.themeRow}>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MobileMenu;
