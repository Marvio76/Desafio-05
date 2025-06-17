import style from './styles.module.scss';
interface Sessao02Props {}

const sessao02: React.FC<Sessao02Props> = () => {
    return (
        <div className={style.sessao02}>
        <h1>Bem-vindo à Sessão 02</h1>
        <p>Esta é a segunada sessão do nosso componente.</p>
        </div>
    );
}

export default sessao02;