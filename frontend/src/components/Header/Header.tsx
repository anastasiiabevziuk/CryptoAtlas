'use client';

import React, { useMemo, useState } from 'react';
import { Menu } from 'lucide-react';
import Logo from '../UI/Logo/Logo';
import MarketStat from '../UI/MarketStat/MarketStat';
import SearchInput from '../UI/SearchInput/SearchInput';
import ThemeToggle from '../UI/ThemeToggle/ThemeToggle';
import MobileMenu from './MobileMenu/MobileMenu';
import { useMarketData } from '@/hooks/useMarketData';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const marketData = useMarketData();
    const { btcDom, totalCap, sentiment, loading, isError } = marketData;

    const sentimentVariant = useMemo(() => {
        if (loading) return 'default';
        const s = (sentiment ?? '').toLowerCase();
        if (s.includes('greed')) return 'success';
        if (s.includes('fear')) return 'danger';
        return 'warning';
    }, [loading, sentiment]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.leftGroup}>
                    <Logo />


                    <nav className={`${styles.marketStats} ${styles.desktopStats}`}>
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
                    </nav>
                </div>

                <div className={styles.rightGroup}>

                    <div className={styles.desktopControls}>
                        <SearchInput placeholder="Quick search..." />
                        <div className={styles.divider}></div>
                        <ThemeToggle />
                    </div>


                    <button
                        className={styles.menuBtn}
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>


            <MobileMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                marketData={marketData}
            />
        </header>
    );
};

export default Header;