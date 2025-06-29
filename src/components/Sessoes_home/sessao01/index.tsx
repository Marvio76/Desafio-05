
import styles from './styles.module.scss';
import Header from '../../HeadeInicial/HeaderInicial'
function App() {
  

  return (
    <>
      
      <Header/>
      <section className={styles.hero}>
        <div className={styles['hero-text']}>
          <h1>Precisando se consultar sem sair de casa? Você está no lugar certo!</h1>
          <p>
            Desenvolver experiências interativas e educativas com nossos clientes, é uma de nossas
            especialidades! Contamos com jogos e simuladores gamificados que promovam a
            conscientização da população sobre a saúde.
          </p>
        </div>
        <div className={styles['hero-image']}>
          <img src="/Sessao_01_02/home.png" alt="Imagem da Doutora e pacientes" />
        </div>
      </section>

      <section className={styles.cards}>
        <div className={styles.card}>
          <h3>Cards sobre saúde</h3>
          <p>Mantenha-se informado sobre algumas das doenças mais presentes na sociedade brasileira</p>
        </div>
        <div className={styles.card}>
          <h3>Procure seu profissional</h3>
          <p>Encontre proficionais da saúde, clicando aqui.</p>
        </div>
        <div className={styles.card}>
          <h3>Tutorial do Site</h3>
          <p>
            Acesse o tutorial para navegar com mais clareza pelo site, é importante caso tenha
            dificuldades de acesso.
          </p>
        </div>
      </section>     
    </>
  );
}

export default App;