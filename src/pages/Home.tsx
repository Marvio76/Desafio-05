import React from 'react';
import '../index.css';
import Botao from '../components/Botao/Botao';
import { useNavigate } from 'react-router-dom';
import Sessao01 from '../components/Sessoes_home/sessao01';
import Sessao02 from '../components/Sessoes_home/sessao02/EquipeCarrossel';
import { Sessao05 } from '../components/Sessoes_home/sessao05';
import { Sessao06 } from '../components/Sessoes_home/sessao06';
import Sessao04 from '../components/Sessoes_home/sessao04';
import Sessao07 from '../components/Sessoes_home/sessao07';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div style={{ margin: 0, padding: 0 }}>
            <Botao onClick={() => navigate('/login')}>Login</Botao>
            <Botao onClick={() => navigate('/cadastro')}>Cadastro</Botao>
            <Sessao01 />
            <Sessao02 />
             <Sessao04 />
            <Sessao05/>
            <Sessao06 />
            <Sessao07 />
        </div>
    );
};

export default Home;