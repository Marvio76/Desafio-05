import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style.module.scss';

const TeleMedico = () => {
    const navigate = useNavigate();



    function voltarParaConsultas() {
        navigate('/medico');
    }

    return (
        <div className={style.teleconsultaContainer}>
            <h1>TeleConsulta</h1>
            <p>Bem-vindo à sua consulta online. Clique abaixo para acessar sua videochamada.</p>
            <div className={style.buttonGroup}>
                <button>
                    Entrar na Videochamada
                </button>
                <button onClick={voltarParaConsultas} className={style.btnVoltar}>
                    Voltar
                </button>
            </div>
        </div>
    );
};

export default TeleMedico;
