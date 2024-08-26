import React, { createContext, useContext, useEffect, useState } from 'react';

interface AppContextType {
    user: any;
    setUser: (user: any) => void;
    token: any;
    setToken: (token: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);
const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!token || !user) {
            const token: any = localStorage.getItem('token');
            const user: any = localStorage.getItem('user');

            if (token && user) {
                setToken(token);
                setUser(user);
            }
        }
    }, []);

    return <AppContext.Provider value={{ user, setUser, token, setToken }}>{children}</AppContext.Provider>;
};

const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('AppContext must be used within a UserProvider');
    }
    return context;
};

export { AppProvider, useAppContext };
