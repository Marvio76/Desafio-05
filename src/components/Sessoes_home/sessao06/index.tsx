// src/components/Sessoes_home/sessao06/index.tsx
import React from 'react';
import styles from './styles.module.scss';
export function Sessao06() {
  const passos = [
    { id: 1, titulo: "Faça login no nosso sistema", img: "/Sessao_05_06/login_1.png" },
    { id: 2, titulo: "Selecione especialidades", img: "/Sessao_05_06/nutricionista_2.png" },
    { id: 3, titulo: "Escolha data/horário", img: "/Sessao_05_06/calendario_azul.png" },
    { id: 4, titulo: "Finalize e aguarde o link", img: "/Sessao_05_06/wpp.png" },
  ];

  return (
    <section className={styles.Sessao06}>
      <h2>Tutorial da saúde</h2>
      <div className={styles.passos}>
        {passos.map((passo) => (
          <div key={passo.id} className={styles.card}>
            <div className={styles.numero}>{passo.id}</div>
            <p>{passo.titulo}</p>
            <img src={passo.img} alt={passo.titulo} />
          </div>
        ))}
      </div>
    </section>
  );
}
