import React, { useState } from 'react';
import style from './style.module.scss';
import ImagemDesktop from './img/imagem-do-noot.png';
import ImagemMobile from './img/imagem-1.png';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    id: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

const decodeToken = (token: string): DecodedToken => {
    return jwtDecode(token);
};

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [formData, setFormData] = useState({ email: '', senha: '' });
    const [mensagem, setMensagem] = useState('');
    const [statusOk, setStatusOk] = useState<boolean | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('https://telemedicina-backend.vercel.app/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                data = { message: text };
            }

            if (response.ok) {
                setMensagem('Login realizado com sucesso!');
                setStatusOk(true);

                const token = data.token;
                localStorage.setItem('token', token); // ⬅️ SALVA O TOKEN

                const decoded = decodeToken(token);
                const role = decoded.role?.toUpperCase();

                console.log('Token decodificado:', decoded);
                console.log('Role do usuário logado:', role);

                setTimeout(() => {
                    if (role === 'ADMIN') {
                        navigate('/adm');
                    } else if (role === 'MEDICO') {
                        navigate('/medico');
                    } else if (role === 'PACIENTE' || role === 'CLIENTE') {
                        navigate('/consulta');
                    } else {
                        console.warn('Role desconhecido:', role);
                        navigate('/consulta');
                    }
                }, 300);
            } else {
                const errorMsg = data.message || 'E-mail ou senha incorretos. Tente novamente.';
                setMensagem(errorMsg);
                setStatusOk(false);
            }
        } catch (error) {
            console.error('Erro no login:', error);
            setMensagem('Erro de conexão com o servidor.');
            setStatusOk(false);
        }
    };

    return (
        <div className={style.sessao01}>
            <div className={style.formulario}>
                <h1>Login</h1>

                <div className={style.campo}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Digite seu email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className={style.campo}>
                    <label>Senha:</label>
                    <div className={style.senhaWrapper}>
                        <input
                            type={mostrarSenha ? 'text' : 'password'}
                            name="senha"
                            placeholder="Digite sua senha"
                            value={formData.senha}
                            onChange={handleChange}
                        />
                        <span
                            className={style.iconeOlho}
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                        >
                            {mostrarSenha ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zm-8 4a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                                    <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.359 11.238a8.57 8.57 0 0 0 1.273-1.43C14.9 8.936 12.6 6 8 6c-.874 0-1.677.14-2.389.385l.716.717C6.823 7.04 7.396 7 8 7c3.368 0 5.366 2.368 5.797 2.992a7.562 7.562 0 0 1-1.101 1.2l.663.663zM3.707 2.293a1 1 0 0 0-1.414 1.414L4.62 6.034C2.953 6.89 1.5 8.636 1.5 8.636S4.055 12 8 12a6.993 6.993 0 0 0 2.684-.532l1.309 1.309a1 1 0 0 0 1.414-1.414L3.707 2.293z" />
                                </svg>
                            )}
                        </span>
                    </div>
                </div>

                {mensagem && (
                    <p style={{ color: statusOk ? 'green' : 'red' }}>{mensagem}</p>
                )}

                <button className={style.botao} onClick={handleLogin}>
                    Entrar
                </button>

                <p>
                    Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
                </p>
            </div>

            <div className={style.imagem}>
                <img src={ImagemDesktop} alt="Imagem desktop" className={style.desktop} />
                <img src={ImagemMobile} alt="Imagem mobile" className={style.mobile} />
                <p className={style.paragrafo}>
                    Faça login e tenha acesso a uma rede de profissionais da saúde!
                </p>
            </div>
        </div>
    );
};

export default Login;
