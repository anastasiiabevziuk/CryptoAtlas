'use client';

import React, { createContext, useState, useEffect } from 'react';

interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState<boolean>(true);

    useEffect(() => {
        const root = document.documentElement;

        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            setIsDark(true);
            return;
        }
        if (saved === 'light') {
            setIsDark(false);
            return;
        }


        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(prefersDark);
    }, []);


    useEffect(() => {
        const root = document.documentElement;

        if (isDark) {
            root.classList.add('dark-theme');
            root.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.add('light-theme');
            root.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};


