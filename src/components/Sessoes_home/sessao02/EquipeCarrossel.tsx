import React, { useState, useEffect } from "react";
import "./EquipeCarrossel.scss";
import { Link } from "react-router-dom";

const profissionais = [
    {
        nome: "Psicólogo",
        cargo: "Psicólogo",
        dias: "segunda a sábado",
        imagem: "/Sessao_01_02/psicologo_1.png",
    },
    {
        nome: "Clínico Geral",
        cargo: "Médico Clínico",
        dias: "segunda a sexta",
        imagem: "/Sessao_01_02/pediatra_1.png",
    },
    {
        nome: "Nutricionista",
        cargo: "Nutricionista",
        dias: "terça e quinta",
        imagem: "/Sessao_01_02/nutricionista_1.png",
    },
];


const EquipeCarrossel = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndex((prev) => (prev + 1) % profissionais.length);
        }, 2000);
        return () => clearInterval(intervalo);
    }, []);

    const atual = profissionais[index];

    return (
        <div className="carrossel-wrapper">
            <div className="faixa-superior">
                <div className="mensagem">Segurança começa com cuidado.</div>
                <div className="mensagem">Segurança é ação diária.</div>
                <div className="mensagem">Prevenção garante sua proteção.</div>
                <div className="mensagem">Prevenir para não adoecer.</div>
            </div>

            <h2 className="titulo-secao">Nossa equipe conta com:</h2>

            <div className="card-centralizado">
                <div className="card-imagem-container">
                    <img src={atual.imagem} alt={atual.nome} className="imagem-fundo" />
                    <div className="overlay-direito">
                        <h3>{atual.cargo}</h3>
                        <p>{atual.dias}</p>
                        <Link to="/login">
                            <button>Agende sua consulta</button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bolinhas-controle">
                {profissionais.map((_, i) => (
                    <span
                        key={i}
                        onClick={() => setIndex(i)}
                        className={i === index ? "ativa" : ""}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default EquipeCarrossel;