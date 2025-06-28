import React, { useState } from 'react';
import style from './styles.module.scss';
import ImagemDesktop from './img/imagem-do-noot.png';
import ImagemMobile from './img/imagem-1.png';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: ''
    });

    const [mensagem, setMensagem] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCadastro = async () => {
        try {
            const response = await fetch('https://telemedicina-backend.vercel.app/api/auth/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const text = await response.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch (e) {
                data = { message: text }; // caso não seja JSON
            }

            console.log('Status:', response.status);
            console.log('Resposta da API:', data);

            if (response.ok) {
                setMensagem('Cadastro realizado com sucesso!');
            } else {
                setMensagem(data.message || 'Erro ao cadastrar: este e-mail já está cadastrado.');
            }
        } catch (error) {
            console.error('Erro ao conectar com a API:', error);
            setMensagem('Erro de conexão com o servidor.');
        }
    };


    return (
        <div className={style.sessao01}>
            <div className={style.formulario}>
                <h1>Cadastro</h1>

                <div className={style.campo}>
                    <label>Nome:</label>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Digite como devemos chamar você"
                        value={formData.nome}
                        onChange={handleChange}
                    />
                </div>

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

                {mensagem && <p style={{ color: 'red' }}>{mensagem}</p>}

                <button className={style.botao} onClick={handleCadastro}>
                    Fazer Cadastro
                </button>

                <p>
                    Já possui uma conta? <Link to="/login">Faça login!</Link>
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
