import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../HeadeInicial/HeaderInicial';
import style from './pagianIncial.module.scss';
import { useNavigate } from 'react-router-dom';
import avatarIcon from '../../assets/images/icons_avatar.png';

// ✅ NOVAS INTERFACES corrigidas

interface Especialidade {
  id: number;
  nome: string;
}

interface Usuario {
  nome: string;
}

interface Medico {
  id: number;
  usuario: Usuario;
  especialidade?: Especialidade;
}

interface Consulta {
  id: number;
  medico: Medico;
  dataHora: string;
}

interface UserProfileScreenProps {
  userName: string;
  userEmail: string;
  userRole: string;
}

type NavegacaoRole = {
  linkBotao01: string;
  linkBotao02: string;
  label01: string;
  label02: string;
};

// Função auxiliar para headers autenticados
function getAuthHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };
}

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  userName,
  userEmail,
  userRole,
}) => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const getButtonLinks = (role: string): NavegacaoRole => {
    switch (role.toUpperCase()) {
      case 'PACIENTE':
        return {
          linkBotao01: '/paciente/historico',
          linkBotao02: '/paciente/exames',
          label01: 'Histórico de consultas',
          label02: 'Exames',
        };
      case 'MEDICO':
        return {
          linkBotao01: '/medico/consultas',
          linkBotao02: '/medico/pacientes',
          label01: 'Minhas consultas',
          label02: 'Pacientes',
        };
      case 'ADMIN':
        return {
          linkBotao01: '/admin/logs',
          linkBotao02: '/admin/usuarios',
          label01: 'Logs do sistema',
          label02: 'Gerenciar usuários',
        };
      default:
        return {
          linkBotao01: '/',
          linkBotao02: '/',
          label01: 'Início',
          label02: 'Início',
        };
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, []);

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

  const buttonLinks = getButtonLinks(userRole);

  return (
    <>
      <Header />
      <div className={style.contaner}>
        <div
          className="card p-4 mx-auto"
          style={{
            width: '90%',
            borderRadius: '15px',
            border: '3px solid #034052',
          }}
        >
          <div className="d-flex align-items-center mb-4">
            <img
              src={avatarIcon}
              alt="User Avatar"
              className="rounded-circle me-3"
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                border: '2px solid #034052',
              }}
            />
            <div>
              <h5 className="mb-0">{userName}</h5>
              <p className="text-muted mb-0">{userEmail}</p>
            </div>
          </div>

          {mensagem && (
            <div className="alert alert-info mt-3">{mensagem}</div>
          )}

          {consultas.length > 0 && (
            <div className="table-responsive mt-5">
              <table className="table table-bordered table-hover tabela-responsive-custom">
                <thead className="table-light">
                  <tr>
                    <th>Médico</th>
                    <th>Especialidade</th>
                    <th>Data/Hora</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {consultas.map((c) => (
                    <tr key={c.id}>
                      <td data-label="Médico">
                        {c.medico?.usuario?.nome || '—'}
                      </td>
                      <td data-label="Especialidade">
                        {c.medico?.especialidade?.nome || '—'}
                      </td>
                      <td data-label="Data/Hora">
                        {new Date(c.dataHora).toLocaleString('pt-BR')}
                      </td>
                      <td data-label="Ações">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfileScreen;
