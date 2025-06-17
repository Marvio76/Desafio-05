import style from './styles.module.scss';

interface Sessao01Props {}

const sessao01: React.FC<Sessao01Props> = () => {
    return (
        <div className={style.sessao01}>
        <h1>Bem-vindo à Sessão 01</h1>
        <p>Esta é a primeira sessão do nosso componente.</p>
        </div>
    );
}

export default sessao01;