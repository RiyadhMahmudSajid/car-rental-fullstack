import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem('app-theme') || 'light'
    );
    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };
    useEffect(() => {
      
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

        localStorage.setItem('app-theme', theme);
    }, [theme])

    const contextValue = {
        theme,
        setTheme,
        toggleTheme,
    };
    return <ThemeContext value={contextValue}>
        {children}
    </ThemeContext>
};

export default ThemeProvider;