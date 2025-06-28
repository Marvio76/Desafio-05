import style from './styles.module.scss';
import bandeiraMaranhao from '../../../assets/images/sessao07/Bandeira_do_Maranhão.png'
import fapema from '../../../assets/images/sessao07/fapema.png'
import linkedin from '../../../assets/images/sessao07/linkedin-logo.svg'

interface Sessao07Props {}

const Sessao07: React.FC<Sessao07Props> = () => {
    return (
        <div className={style.container}>
            <div className={style.row}>
                <div className={style.leftColumn}>
                    <div className={style.infoBox}>
                        <div className={style.titleGroup}>
                            <div className={style.titleWithIcon}>
                                <img className={style.iconLarge} src={bandeiraMaranhao} alt=''/>
                                <div className={style.title}>Telemedicina</div>
                            </div>
                            <div className={style.subtitle}>
                                Sua saúde é a nossa especialidade, e sua satisfação é o nosso desejo
                            </div>
                        </div>

                        <div className={style.linkSection}>
                            <div className={style.linkText}>Link da nossa equipe:</div>
                            <div className={style.linkBox}>
                                {/* <div className={style.iconPlaceholder} />
                                <div className={style.iconBackground} /> */}
                                <img src={linkedin} alt="" />
                            </div>
                        </div>
                    </div>
                    <img className={style.bannerImage} src={fapema}alt='' />
                </div>

                <div className={style.servicosTitle}>Serviços:</div>

                <div className={style.servicosList}>
                    <div className={style.servico}>Psicologo</div>
                    <div className={style.servico}>Nutricionista</div>
                    <div className={style.servico}>Pediatra</div>
                    <div className={style.servico}>Geriatra</div>
                    <div className={style.servico}>Ortopedista</div>
                </div>
            </div>
        </div>
    );
};

export default Sessao07;
