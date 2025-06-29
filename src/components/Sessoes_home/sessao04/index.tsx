import style from './styles.module.scss';
import amor from '../../../assets/images/sessao04/00-amor.png';
import atendimentoDeQualidade from '../../../assets/images/sessao04/01-atendimento-de-qualidade.png';
import agilidadeNasConsultas from '../../../assets/images/sessao04/02-agilidade-nas-consultas.png';
import priorizamosAEquidade from '../../../assets/images/sessao04/03-priorizamos-a-equidade.png';
import profissionaisQualidifcados from '../../../assets/images/sessao04/04-profissionais-qualificados.png';
import cuidadoDeVoce from '../../../assets/images/sessao04/05-cuidando-de-voce-com-dedicacao.png';

interface CardProps {
  icon: string;
  title: string;
  text: string;
}

const Card: React.FC<CardProps> = ({ icon, title, text }) => {
  return (
    <div className={style.card}>
      <img className={style.icon} src={icon} alt={title} />
      <div className={style.cardContent}>
        <h3 className={style.cardTitle}>{title}</h3>
        <p className={style.cardText}>{text}</p>
      </div>
    </div>
  );
};

const Sessao04: React.FC = () => {
  const cards = [
    {
      icon: amor,
      title: "Trabalhar com amor",
      text: "Trabalhamos sempre com amor, para que nossos clientes se sintam acolhidos."
    },
    {
      icon: atendimentoDeQualidade,
      title: "Atendimento de qualidade",
      text: "Atendemos nossos clientes da melhor forma com profissionalismo e cuidado."
    },
    {
      icon: agilidadeNasConsultas,
      title: "Agilidade nas nossas consultas",
      text: "Com processos ágeis, oferecemos consultas simples e de alta qualidade."
    },
    {
      icon: priorizamosAEquidade,
      title: "Priorizamos a equidade",
      text: "Compreendemos as necessidades únicas de cada pessoa, trabalhamos juntos para oferecer o melhor cuidado."
    },
    {
      icon: profissionaisQualidifcados,
      title: "Profissionais qualificados",
      text: "Nossa equipe é composta por especialistas altamente qualificados."
    },
    {
      icon: cuidadoDeVoce,
      title: "Cuidando de você com dedicação",
      text: "Comprometidos em oferecer atenção personalizada e suporte contínuo para sua saúde."
    }
  ];

  return (
    <section className={style.container}>
      <h2 className={style.title}>Nossa prioridade sempre!</h2>
      <div className={style.cardContainer}>
        {cards.map((card, index) => (
          <Card key={index} icon={card.icon} title={card.title} text={card.text} />
        ))}
      </div>
    </section>
  );
};

export default Sessao04;