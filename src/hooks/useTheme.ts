import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check localStorage first
        const storedTheme = localStorage.getItem('theme') as Theme | null;

        if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
            setTheme(storedTheme);
            applyTheme(storedTheme);
        } else {
            // If no stored theme, detect browser preference
            const browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setTheme(browserTheme);
            localStorage.setItem('theme', browserTheme);
            applyTheme(browserTheme);
        }
    }, []);

    const applyTheme = (newTheme: Theme) => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);
    };

    const toggleTheme = () => {
        const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    return {
        theme,
        toggleTheme,
        mounted
    };
};