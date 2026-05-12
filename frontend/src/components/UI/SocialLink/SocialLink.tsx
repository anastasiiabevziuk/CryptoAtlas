'use client';

import React from 'react';
import styles from './SocialLink.module.css';

interface SocialLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={styles.link}
        >
            {icon}
        </a>
    );
};

export default SocialLink;
