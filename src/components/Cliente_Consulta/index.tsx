import React, { useEffect, useState } from 'react';
import style from './style.module.scss';

interface Usuario {
    id: number;
    nome: string;
    email: string;
    role: string;
}

interface Especialidade {
    id: number;
    nome: string;
}

interface Disponibilidade {
    id: number;
    medicoId: number;
    dataHora: string;
}

interface Medico {
    id: number;
    usuarioId: number;
    especialidadeId: number;
    usuario: Usuario;
    especialidade: Especialidade;
    disponibilidades: Disponibilidade[];
}

interface Consulta {
    id: number;
    dataHora: string;
    status?: string;
    medico: {
        id: number;
        usuarioId: number;
        especialidadeId: number;
        usuario: {
            nome: string;
            email: string;
        };
    };
}

const Consulta: React.FC = () => {
    const [consultas, setConsultas] = useState<Consulta[]>([]);
    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [medicoId, setMedicoId] = useState('');
    const [disponibilidades, setDisponibilidades] = useState<Disponibilidade[]>([]);
    const [disponibilidadeId, setDisponibilidadeId] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);

    const token = localStorage.getItem('token');

    function getAuthHeaders() {
        return {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        };
    }

    useEffect(() => {
        fetchMedicos();
        fetchConsultas();
    }, []);

    useEffect(() => {
        if (medicoId) fetchDisponibilidades(medicoId);
        else setDisponibilidades([]);
    }, [medicoId]);

    async function fetchMedicos() {
        setCarregando(true);
        setMensagem('');
        try {
            const res = await fetch(
                'https://telemedicina-backend.vercel.app/api/consultas/listamedicos',
                { headers: getAuthHeaders() }
            );
            if (!res.ok) throw new Error(`Erro ${res.status}`);
            const data = await res.json();
            console.log('Dados médicos:', data);
            if (Array.isArray(data)) {
                setMedicos(data);
            } else if (Array.isArray(data.medicos)) {
                setMedicos(data.medicos);
            } else {
                setMedicos([]);
            }
        } catch (err) {
            console.error('Erro fetchMedicos:', err);
            setMensagem('Erro ao buscar médicos');
            setMedicos([]);
        } finally {
            setCarregando(false);
        }
    }

    async function fetchDisponibilidades(medicoId: string) {
        setCarregando(true);
        setMensagem('');
        try {
            const res = await fetch(
                `https://telemedicina-backend.vercel.app/api/consultas/disponibilidades/${medicoId}`,
                { headers: getAuthHeaders() }
            );
            if (!res.ok) throw new Error(`Erro ${res.status}`);
            const data = await res.json();
            console.log('Disponibilidades:', data);
            setDisponibilidades(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Erro fetchDisponibilidades:', err);
            setMensagem('Erro ao buscar horários');
            setDisponibilidades([]);
        } finally {
            setCarregando(false);
        }
    }

    async function fetchConsultas() {
        setCarregando(true);
        setMensagem('');
        try {
            const res = await fetch(
                'https://telemedicina-backend.vercel.app/api/consultas/minhas', // rota correta para listar consultas do paciente
                {
                    headers: getAuthHeaders(),
                }
            );
            if (!res.ok) throw new Error(`Erro ${res.status}`);
            const data = await res.json();
            console.log('Dados consultas:', data);
            setConsultas(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Erro fetchConsultas:', err);
            setMensagem('Erro ao buscar consultas');
            setConsultas([]);
        } finally {
            setCarregando(false);
        }
    }

    async function agendarConsulta(e: React.FormEvent) {
        e.preventDefault();
        if (!medicoId || !disponibilidadeId) {
            setMensagem('Selecione o médico e o horário!');
            return;
        }
        setCarregando(true);
        setMensagem('');
        try {
            const disponibilidade = disponibilidades.find(
                (d) => d.id === Number(disponibilidadeId)
            );
            if (!disponibilidade) {
                setMensagem('Horário inválido.');
                setCarregando(false);
                return;
            }
            const res = await fetch(
                'https://telemedicina-backend.vercel.app/api/consultas/agendar', // rota correta para agendar consulta
                {
                    method: 'POST',
                    headers: getAuthHeaders(),
                    body: JSON.stringify({
                        medicoId: Number(medicoId),
                        dataHora: disponibilidade.dataHora,
                    }),
                }
            );
            const data = await res.json();
            if (res.ok) {
                setMensagem(data.message || 'Consulta agendada com sucesso!');
                setMedicoId('');
                setDisponibilidadeId('');
                fetchConsultas();
            } else {
                setMensagem(data.error || 'Erro ao agendar consulta');
            }
        } catch (err) {
            console.error('Erro agendarConsulta:', err);
            setMensagem('Erro ao agendar consulta');
        } finally {
            setCarregando(false);
        }
    }

    async function cancelarConsulta(id: number) {
        if (!window.confirm('Deseja cancelar esta consulta?')) return;
        setCarregando(true);
        setMensagem('');
        try {
            const res = await fetch(
                `https://telemedicina-backend.vercel.app/api/consultas/cancelar/${id}`, // rota correta para cancelar
                {
                    method: 'DELETE',
                    headers: getAuthHeaders(),
                }
            );
            const data = await res.json();
            if (res.ok) {
                setMensagem(data.message || 'Consulta cancelada!');
                fetchConsultas();
            } else {
                setMensagem(data.error || 'Erro ao cancelar');
            }
        } catch (err) {
            console.error('Erro cancelarConsulta:', err);
            setMensagem('Erro ao cancelar consulta');
        } finally {
            setCarregando(false);
        }
    }

    function handleLogout() {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    // Busca a especialidade do médico na lista de médicos pelo id
    function getEspecialidadeNome(medicoId: number) {
        const medico = medicos.find((m) => m.id === medicoId);
        return medico?.especialidade?.nome || '';
    }

    return (
        <div className={style.consultaContainer}>
            <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <h1>Consultas</h1>
                <button className={style.btnDeleteSmall} onClick={handleLogout}>
                    Sair
                </button>
            </div>

            {mensagem && <p className={style.mensagem}>{mensagem}</p>}
            {carregando && <p>Carregando...</p>}

            <section className={style.section}>
                <h2>Agendar nova consulta</h2>
                <form onSubmit={agendarConsulta} className={style.formGroup}>
                    <select value={medicoId} onChange={(e) => setMedicoId(e.target.value)}>
                        <option value="">Selecione o médico</option>
                        {Array.isArray(medicos) &&
                            medicos.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.usuario.nome} ({m.especialidade?.nome})
                                </option>
                            ))}
                    </select>

                    <select
                        value={disponibilidadeId}
                        onChange={(e) => setDisponibilidadeId(e.target.value)}
                        disabled={!medicoId}
                    >
                        <option value="">Selecione o horário</option>
                        {disponibilidades.map((d) => (
                            <option key={d.id} value={d.id}>
                                {new Date(d.dataHora).toLocaleString()}
                            </option>
                        ))}
                    </select>

                    <button type="submit" disabled={carregando}>
                        Agendar
                    </button>
                </form>
            </section>

            <section className={style.section}>
                <h2>Consultas agendadas</h2>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Médico</th>
                            <th>Especialidade</th>
                            <th>Data/Hora</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultas.length === 0 && (
                            <tr>
                                <td colSpan={4}>Nenhuma consulta agendada.</td>
                            </tr>
                        )}
                        {consultas.map((c) => (
                            <tr key={c.id}>
                                <td>{c.medico.usuario.nome}</td>
                                <td>{getEspecialidadeNome(c.medico.id)}</td>
                                <td>{new Date(c.dataHora).toLocaleString()}</td>
                                <td>
                                    <button
                                        className={style.btnDeleteSmall}
                                        onClick={() => cancelarConsulta(c.id)}
                                        disabled={carregando}
                                    >
                                        Cancelar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Consulta;
