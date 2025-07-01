import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './styles.module.scss';
import Header from '../HeadeInicial/HeaderInicial';

interface Consulta {
    id: number;
    dataHora: string;
    paciente: {
        nome: string;
        email: string;
    };
}

const Medico: React.FC = () => {
    const [consultas, setConsultas] = useState<Consulta[]>([]);
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    function getAuthHeaders() {
        return {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        };
    }

    useEffect(() => {
        fetchConsultasDoMedico();
    }, []);

    async function fetchConsultasDoMedico() {
        setCarregando(true);
        setMensagem('');
        try {
            const res = await fetch(
                'https://telemedicina-backend.vercel.app/api/consultas/medico',
                { headers: getAuthHeaders() }
            );
            if (!res.ok) {
                throw new Error(`Erro ${res.status}`);
            }
            const data = await res.json();
            setConsultas(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Erro ao buscar consultas do médico:', err);
            setMensagem('Erro ao buscar consultas do médico.');
            setConsultas([]);
        } finally {
            setCarregando(false);
        }
    }

    function acessarConsulta() {
        navigate('/telemedico');
    }

    return (
        <>
        <Header/>
        <div className={style.medicoContainer}>
            <h1>Bem-vindo ao sistema médico</h1>
            <p>Esta é a página do médico.</p>

            {mensagem && <p className={style.mensagem}>{mensagem}</p>}
            {carregando && <p>Carregando...</p>}

            {consultas.length === 0 && !carregando && (
                <p>Nenhuma consulta agendada.</p>
            )}

            {consultas.length > 0 && (
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>E-mail</th>
                            <th>Data/Hora</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultas.map((consulta) => (
                            <tr key={consulta.id}>
                                <td data-label="Paciente">{consulta.paciente.nome}</td>
                                <td data-label="Data/Hora">{consulta.paciente.email}</td>
                                <td>{new Date(consulta.dataHora).toLocaleString()}</td>
                                <td>
                                    <button
                                        className={style.btnAcessar}
                                        onClick={acessarConsulta}
                                    >
                                        Acessar Consulta
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </>
    );
};

export default Medico;
