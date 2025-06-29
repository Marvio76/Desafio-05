import style from './styles.module.scss';
import bandeiraMaranhao from '../../../assets/images/sessao07/Bandeira_do_Maranhão.png';
import fapema from '../../../assets/images/sessao07/fapema.png';
import linkedin from '../../../assets/images/sessao07/linkedin-logo.svg';

interface Sessao07Props {}

const Sessao07: React.FC<Sessao07Props> = () => {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <div className={style.infoSection}>
                    <div className={style.titleGroup}>
                        <div className={style.titleWithIcon}>
                            <img className={style.iconLarge} src={bandeiraMaranhao} alt="Bandeira do Maranhão"/>
                            <h2 className={style.title}>Telemedicina</h2>
                        </div>
                        <p className={style.subtitle}>
                            Sua saúde é a nossa especialidade, e sua satisfação é o nosso desejo
                        </p>
                    </div>

                    <div className={style.linkSection}>
                        <p className={style.linkText}>Link da nossa equipe:</p>
                        <a href="#" className={style.linkBox} aria-label="LinkedIn">
                            <img src={linkedin} alt="LinkedIn" />
                        </a>
                    </div>
                    <img className={style.bannerImage} src={fapema} alt="Logo FAPEMA" />
                </div>

                <div className={style.servicesSection}>
                    <h3 className={style.servicosTitle}>Serviços:</h3>
                    <ul className={style.servicosList}>
                        <li className={style.servico}>Psicologo</li>
                        <li className={style.servico}>Nutricionista</li>
                        <li className={style.servico}>Pediatra</li>
                        <li className={style.servico}>Geriatra</li>
                        <li className={style.servico}>Ortopedista</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sessao07;