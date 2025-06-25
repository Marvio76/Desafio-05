import style from './styles.module.scss';
import amor from '../../../assets/images/sessao04/00-amor.png';
import atendimentoDeQualidade from '../../../assets/images/sessao04/01-atendimento-de-qualidade.png';
import agilidadeNasConsultas from '../../../assets/images/sessao04/02-agilidade-nas-consultas.png';
import priorizamosAEquidade from '../../../assets/images/sessao04/03-priorizamos-a-equidade.png';
import profissionaisQualidifcados from '../../../assets/images/sessao04/04-profissionais-qualificados.png';
import cuidadoDeVoce from '../../../assets/images/sessao04/05-cuidando-de-voce-com-dedicacao.png';

interface Sessao04Props {}

const Sessao04: React.FC<Sessao04Props> = () => {
    return (
        <div className={style.container}>
            <div className={style.title}>Nossa prioridade sempre!</div>
            <div className={style.cardContainer}>
                <div className={style.card}>
                    <img className={style.icon} src={amor} alt=''/>
                    <div className={style.cardContent}>
                        <div className={style.cardTitle}>Trabalhar com amor</div>
                        <div className={style.cardText}>Trabalhamos sempre com amor, para que nossos clientes se sintam acolhidos.</div>
                    </div>
                </div>
                <div className={style.card}>
                    <img className={style.icon} src={atendimentoDeQualidade} alt=''/>
                    <div className={style.cardTitle}>Atendimento de qualidade</div>
                    <div className={style.cardText}>Atendemos nossos clientes da melhor forma com profissionalismo e cuidado.</div>
                </div>
                <div className={style.card}>
                    <img className={style.icon} src={agilidadeNasConsultas} alt=''/>
                    <div className={style.cardContent}>
                        <div className={style.cardTitle}>Agilidade nas nossas consultas</div>
                        <div className={style.cardText}>Com processos ágeis, oferecemos consultas simples e de alta qualidade.</div>
                    </div>
                </div>
                <div className={style.card}>
                    <img className={style.icon} src={priorizamosAEquidade} alt=''/>
                    <div className={style.cardContent}>
                        <div className={style.cardTitle}>Priorizamos a equidade</div>
                        <div className={style.cardText}>Compreendemos as necessidades únicas de cada pessoa, trabalhamos juntos para oferecer o melhor cuidado.</div>
                    </div>
                </div>
                <div className={style.card}>
                    <img className={style.icon} src={profissionaisQualidifcados} alt=''/>
                    <div className={style.cardContent}>
                        <div className={style.cardTitle}>Profissionais qualificados</div>
                        <div className={style.cardText}>Nossa equipe é composta por especialistas altamente qualificados.</div>
                    </div>
                </div>
                <div className={style.card}>
                    <img className={style.icon} src={cuidadoDeVoce} alt=''/>
                    <div className={style.cardContent}>
                        <div className={style.cardTitle}>Cuidando de você com dedicação</div>
                        <div className={style.cardText}>Comprometidos em oferecer atenção personalizada e suporte contínuo para sua saúde.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sessao04;
