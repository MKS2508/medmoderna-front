// LoginComponent.tsx
import React, { useState } from 'react';
import { useAuth } from '../../Auth/AuthContext';
import {loginUser} from "../../services/api-login-service";

const LoginComponent: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await loginUser( email, password );
            setToken(response.token);
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
            />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default LoginComponent;
