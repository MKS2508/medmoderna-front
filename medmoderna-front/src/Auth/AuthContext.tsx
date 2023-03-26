import React, { createContext, useContext, useState, useEffect } from 'react';

interface IAuthContext {
    token: string | null;
    setToken: (token: string | null) => void;
}

const AuthContext = createContext<IAuthContext>({
    token: null,
    setToken: () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
    }
    return context;
};
