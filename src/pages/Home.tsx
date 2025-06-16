import React from 'react';
import Botao from '../components/Botao/Botao';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Botao onClick={() => navigate('/login')}>Login</Botao>
            <Botao onClick={() => navigate('/cadastro')}>Cadastro</Botao>
        </div>
    );
};

export default Home;
