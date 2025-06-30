import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style.module.scss';

const TeleConsulta = () => {
    const navigate = useNavigate();



    function voltarParaConsultas() {
        navigate('/Paciente');
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
            <div className={style.jogosContainer}>
            <h2>Jogo</h2>
            <div className={style.jogo}>
                <iframe
                    src="https://itch.io/embed-upload/14145006?color=333333"
                    width="1280"
                    height="740"
                    frameBorder="0"
                    allowFullScreen
                >
                    <a href="https://addamdav.itch.io/doutor-corredor">
                        Play Doutor Corredor on itch.io
                    </a>
                </iframe>
            </div>
        </div>
        </div>

        
    );
};

export default TeleConsulta;
