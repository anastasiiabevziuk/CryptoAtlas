'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

const Navigation = ({ onClose }: { onClose?: () => void }) => {
    const pathname = usePathname();

    return (
        <nav className={styles.navTabs}>
            <Link
                href="/"
                className={`${styles.tabLink} ${pathname === '/' ? styles.active : ''}`}
                onClick={onClose}
            >
                Map
            </Link>
            <Link
                href="/network"
                className={`${styles.tabLink} ${pathname === '/network' ? styles.active : ''}`}
                onClick={onClose}
            >
                Network
            </Link>
        </nav>
    );
};

export default Navigation;