'use client';

import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline';
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'outline',
    icon,
    children,
    className,
    ...props
}) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${className || ''}`}
            {...props}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {children}
        </button>
    );
};

export default Button;