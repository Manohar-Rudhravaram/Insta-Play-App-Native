import React, { createContext, useState } from 'react';
export const themeContext = createContext();
export default function ThemeContext({ children }) {
    const [lightTheme, setLightTheme] = useState(false);
    function toggleHandler() {
        setLightTheme(pre => !pre);
    }
    const theme = lightTheme ? 'light' : 'dark';
    return (
        <themeContext.Provider value={{ theme, toggleHandler }}>
            {children}
        </themeContext.Provider>
    );
}
