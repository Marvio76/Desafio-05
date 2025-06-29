import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './style.module.scss';
import Header from '../HeadeInicial/HeaderInicial';
import StepHeader from '../agendamento/StepHeader';
import SelectInput from '../agendamento/SelectInput';
import NavigationButtons from '../agendamento/NavigationButtons';
import './layout.module.scss'; 

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
    const navigate = useNavigate();

    const [consultas, setConsultas] = useState<Consulta[]>([]);
    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [medicoId, setMedicoId] = useState('');
    const [disponibilidades, setDisponibilidades] = useState<Disponibilidade[]>([]);
    const [disponibilidadeId, setDisponibilidadeId] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [step, setStep] = useState(1);
    const [agendamentoConcluido, setAgendamentoConcluido] = useState(false);


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
            const data = await res.json();
            if (!res.ok) throw new Error(`Erro ${res.status}`);
            setMedicos(Array.isArray(data) ? data : data.medicos || []);
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
            const data = await res.json();
            if (!res.ok) throw new Error(`Erro ${res.status}`);
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
                'https://telemedicina-backend.vercel.app/api/consultas/minhas',
                { headers: getAuthHeaders() }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(`Erro ${res.status}`);
            setConsultas(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Erro fetchConsultas:', err);
            setMensagem('Erro ao buscar consultas');
            setConsultas([]);
        } finally {
            setCarregando(false);
        }
    }

async function agendarConsulta(
  medicoId: string,
  disponibilidadeId: string,
  disponibilidades: any[],
  setMensagem: (msg: string) => void,
  setCarregando: (c: boolean) => void,
  fetchConsultas: () => void,
  limparCampos: () => void
) {
  if (!medicoId || !disponibilidadeId) {
    setMensagem('Selecione o médico e o horário!');
    return;
  }

  setCarregando(true);
  setMensagem('');

  try {
    const disponibilidade = disponibilidades.find(d => d.id === Number(disponibilidadeId));
    if (!disponibilidade) {
      setMensagem('Horário inválido.');
      return;
    }

    const res = await fetch(
      'https://telemedicina-backend.vercel.app/api/consultas/agendar',
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
  setAgendamentoConcluido(true); // ⬅️ Exibe a tela de sucesso
  fetchConsultas();
  limparCampos();
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
                `https://telemedicina-backend.vercel.app/api/consultas/cancelar/${id}`,
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
    function getEspecialidadeNome(medicoId: number) {
        const medico = medicos.find((m) => m.id === medicoId);
        return medico?.especialidade?.nome || '';
    }
    const medicoOptions = medicos.map((m) => ({
        value: m.id,
        label: `${m.usuario.nome} (${m.especialidade?.nome || 'N/A'})`,
    }));

    const horarioOptions = disponibilidades.map((d) => ({
        value: d.id,
        label: new Date(d.dataHora).toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        })
    }));

    return (
        
        <>
        <div>

        
            <Header/>

           <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-sm p-4" style={{ maxWidth: '600px', width: '100%', borderColor: '#034052'}}>
        <div className="card-body">
          {/* Header Steps */}
          <div className="d-flex justify-content-around mb-4">
            <StepHeader stepNumber={1} text="Agendamento" isActive={step===1} />
            <StepHeader stepNumber={2} text="Confirmação" isActive={step===2} />
          </div>


         {agendamentoConcluido ? (
            <div className="text-center">
                <div className="border rounded p-4" style={{ borderColor: '#034052', backgroundColor: '#f8f9fa' }}>
                <i className="bi bi-check-circle" style={{ fontSize: '4rem', color: '#034052' }}></i>
                <p className="mt-3 fs-5" style={{ color: '#034052' }}>
                    Seu agendamento foi concluído!<br />
                    O link da consulta será enviado no seu email!
                </p>
                </div>
            </div>
            ):step === 1 ? (
            <div className="mb-4">
                <SelectInput
                label="Médico"
                id="medico"
                options={medicoOptions}
                selectedValue={medicoId}
                onChange={(e) => setMedicoId(e.target.value)}
                placeholder="Selecione o médico"
                />
                <SelectInput
                label="Horário"
                id="horario"
                options={horarioOptions}
                selectedValue={disponibilidadeId}
                onChange={(e) => setDisponibilidadeId(e.target.value)}
                placeholder="Selecione o horário"
                disabled={!medicoId}
                />
            </div>
            ) : (
            <div className="mb-4">
                <h5>Confirmação</h5>
                <p><strong>Médico:</strong> {medicos.find(m => m.id === Number(medicoId))?.usuario.nome}</p>
                <p><strong>Especialidade:</strong> {getEspecialidadeNome(Number(medicoId))}</p>
                <p><strong>Horário:</strong> {
                disponibilidades.find(d => d.id === Number(disponibilidadeId))?.dataHora &&
                new Date(disponibilidades.find(d => d.id === Number(disponibilidadeId))!.dataHora).toLocaleString('pt-BR')
                }</p>
                
            </div>
            )}


          {/* Navigation Buttons */}
<NavigationButtons
  step={step}
  setStep={setStep}
  onConcluir={() =>
    agendarConsulta(
      medicoId,
      disponibilidadeId,
      disponibilidades,
      setMensagem,
      setCarregando,
      fetchConsultas,
      () => {
        setMedicoId('');
        setDisponibilidadeId('');
        setStep(1); // volta para o início
      }
    )
  }
  podeAvancar={!!medicoId && !!disponibilidadeId}
/>

        </div>
      </div>
    </div>
    </div>


            {/* <div className={style.consultaContainer}>
           

                {mensagem && <p className={style.mensagem}>{mensagem}</p>}
                {carregando && <p>Carregando...</p>}

                <section className={style.section}>
                    <h2>Agendar nova consulta</h2>
                    <form onSubmit={agendarConsulta} className={style.formGroup}>
                        <select value={medicoId} onChange={(e) => setMedicoId(e.target.value)}>
                            <option value="">Selecione o médico</option>
                            {medicos.map((m) => (
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
                    <div className={style.tableWrapper}>
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
                                {consultas.length === 0 ? (
                                    <tr>
                                        <td colSpan={4}>Nenhuma consulta agendada.</td>
                                    </tr>
                                ) : (
                                    consultas.map((c) => (
                                        <tr key={c.id}>
                                            <td data-label="Médico">{c.medico.usuario.nome}</td>
                                            <td data-label="Especialidade">
                                                {getEspecialidadeNome(c.medico.id)}
                                            </td>
                                            <td data-label="Data/Hora">
                                                {new Date(c.dataHora).toLocaleString()}
                                            </td>
                                            <td data-label="Ações">
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button
                                                        className={style.btnDeleteSmall}
                                                        onClick={() => cancelarConsulta(c.id)}
                                                        disabled={carregando}
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        className={style.btnAcessarSmall}
                                                        onClick={() => navigate('/teleconsulta')}
                                                        disabled={carregando}
                                                    >
                                                        Acesse sua consulta
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div> */}
        </>
    );
};

export default Consulta;
