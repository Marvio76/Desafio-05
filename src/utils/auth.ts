// src/utils/auth.ts
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
    id: number;
    nome: string;
    email: string;
    role: string;
    iat: number;
    exp: number; 
}

export const getUserFromToken = (): DecodedToken | null => {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    try {
        const decoded: DecodedToken = jwtDecode(token);

        // Verifica se o token expirou
        if (decoded.exp * 1000 < Date.now()) {
            console.warn("Token expirado. Iniciando logout.");
            logout();
            return null;
        }

        return decoded;
    } catch (error) {
        console.error("Erro ao decodificar ou validar o token:", error);
        logout();
        return null;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
};