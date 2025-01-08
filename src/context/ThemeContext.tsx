// src/context/ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

type ThemeContextType = {
    isDark: boolean;
    toggleTheme: () => void;
};

const defaultState = {
    isDark: false,
    toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultState);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
