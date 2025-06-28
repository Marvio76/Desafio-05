import { useState } from 'react';
import React from 'react';
import styles from './styles.module.scss';

export function Sessao05() {
  const [detalheAberto, setDetalheAberto] = useState<null | "dengue" | "ansiedade">(null);

  const fecharDetalhe = () => setDetalheAberto(null);

  return (
    <section className={styles.Sessao05}>
      <h2>Também no nosso site você encontra</h2>
      <div className={styles.cards}>
        <div className={styles["card-grande"]}>
          <h3>Jogo de prevenção</h3>
          <p>Jogue nosso jogo enquanto aprende saúde</p>
          <img src="/Sessao_05_06/jogo.png" alt="Jogo de Prevenção" />
        </div>

        <div className={styles["card-duplo"]}>
          <div className={styles["card-pequeno"]}>
            <img src="/Sessao_05_06/dengue.png" alt="Dengue" />
            <h4>
              Dengue
              <button className={styles["btn-cuidado"]} type="button">
                Cuidado
              </button>
            </h4>
            <p>Respondendo perguntas sobre prevenção</p>
            <button onClick={() => setDetalheAberto("dengue")} className={styles["btn-mais-detalhes"]}>
              Mais detalhes
            </button>
          </div>

          <div className={styles["card-pequeno"]}>
            <img src="/Sessao_05_06/ansiedade.png" alt="Ansiedade" />
            <h4>
              Ansiedade
              <button className={styles["btn-cuidado"]} type="button">
                Cuidado
              </button>
            </h4>
            <p>Dicas de como controlar crises e sintomas</p>
            <button onClick={() => setDetalheAberto("ansiedade")} className={styles["btn-mais-detalhes"]}>
              Mais detalhes
            </button>
          </div>
        </div>

        {/* Modal de Detalhes */}
        {detalheAberto === "dengue" && (
          <div className={styles["card-detalhado"]}>
            <button className={styles["btn-fechar"]} onClick={fecharDetalhe}>✖</button>
            <h4>Dengue <span className={styles["badge-alerta"]}>Cuidado!</span></h4>
            <p>A dengue é uma doença viral transmitida através da picada do mosquito Aedes aegypti.</p>
            <h5>Alguns sintomas:</h5>
            <ul>
              <li>Febre alta</li>
              <li>Dores na cabeça, nos músculos e nas articulações</li>
              <li>Manchas vermelhas na pele</li>
              <li>Cansaço intenso e náusea</li>
            </ul>
            <h5>Prevenção:</h5>
            <ul>
              <li>Use repelente a todo momento</li>
              <li>Utilize roupas e mosquiteiros</li>
              <li>Evite água parada próxima a sua casa</li>
            </ul>
            <p><strong>Recomenda-se procurar um médico ao apresentar os sintomas.</strong></p>
            <button className={styles["btn-acao"]}>Procurar por médicos</button>
          </div>
        )}

        {detalheAberto === "ansiedade" && (
          <div className={styles["card-detalhado"]}>
            <button className={styles["btn-fechar"]} onClick={fecharDetalhe}>✖</button>
            <h4>Ansiedade <span className={styles["badge-alerta"]}>Cuidado!</span></h4>
            <p>A ansiedade é uma reação natural do corpo ao estresse...</p>
            <h5>Alguns sintomas:</h5>
            <ul>
              <li>Coração acelerado</li>
              <li>Preocupação excessiva</li>
              <li>Dificuldade para respirar e dormir</li>
            </ul>
            <h5>Prevenção:</h5>
            <ul>
              <li>Pratique atividades relaxantes</li>
              <li>Procure apoio de um profissional</li>
              <li>Evite excesso de estímulos e cuide da alimentação</li>
            </ul>
            <p><strong>Consulte um psicólogo caso os sintomas persistam.</strong></p>
            <button className={styles["btn-acao"]}>Procurar por um psicólogo</button>
          </div>
        )}
      </div>
    </section>
  );
}
