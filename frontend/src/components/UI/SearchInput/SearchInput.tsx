'use client';

import React from 'react';
import { Search } from 'lucide-react';
import styles from './SearchInput.module.css';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = 'Search...',
    className,
    ...props
}) => {
    return (
        <div className={`${styles.wrapper} ${className || ''}`}>
            <Search size={16} className={styles.icon} />

            <input
                type="text"
                placeholder={placeholder}
                className={styles.input}
                {...props}
            />
        </div>
    );
};

export default SearchInput;
