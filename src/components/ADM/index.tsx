import React from 'react';
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

interface State {
    usuarios: Usuario[] | null;
    medicos: Medico[] | null;
    novoMedico: {
        nome: string;
        email: string;
        senha: string;
        especialidadeNome: string;
        disponibilidades: { dataHora: string }[];
        disponibilidadeInput: string;
    };
    mensagem: string;
    carregando: boolean;
}

class Adm extends React.Component<{}, State> {
    state: State = {
        usuarios: null,
        medicos: null,
        novoMedico: {
            nome: '',
            email: '',
            senha: '',
            especialidadeNome: '',
            disponibilidades: [],
            disponibilidadeInput: '',
        },
        mensagem: '',
        carregando: false,
    };

    componentDidMount() {
        this.carregarUsuarios();
        this.carregarMedicos();
    }

    getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
        };
    };

    carregarUsuarios = async () => {
        this.setState({ carregando: true, mensagem: '' });
        try {
            const res = await fetch('https://telemedicina-backend.vercel.app/api/admin/usuarios', {
                headers: this.getAuthHeaders(),
            });

            if (!res.ok) throw new Error(`Erro ${res.status}`);
            const usuarios = await res.json();
            if (Array.isArray(usuarios)) {
                this.setState({ usuarios });
            } else {
                this.setState({ mensagem: 'Formato inesperado de usuários' });
            }
        } catch (err) {
            console.error(err);
            this.setState({ mensagem: 'Erro ao carregar usuários' });
        } finally {
            this.setState({ carregando: false });
        }
    };

    carregarMedicos = async () => {
        this.setState({ carregando: true, mensagem: '' });
        try {
            const res = await fetch('https://telemedicina-backend.vercel.app/api/admin/listamedicos', {
                headers: this.getAuthHeaders(),
            });

            if (!res.ok) throw new Error(`Erro ${res.status}`);
            const medicos = await res.json();
            if (Array.isArray(medicos)) {
                this.setState({ medicos });
            } else {
                this.setState({ mensagem: 'Formato inesperado de médicos' });
            }
        } catch (err) {
            console.error(err);
            this.setState({ mensagem: 'Erro ao carregar médicos' });
        } finally {
            this.setState({ carregando: false });
        }
    };

    deletarUsuario = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja deletar este usuário?')) return;
        this.setState({ carregando: true, mensagem: '' });
        try {
            const res = await fetch(`https://telemedicina-backend.vercel.app/api/admin/usuarios/${id}`, {
                method: 'DELETE',
                headers: this.getAuthHeaders(),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || `Erro ${res.status}`);
            }

            this.setState({ mensagem: data.message || 'Usuário deletado com sucesso!' });
            this.carregarUsuarios();
        } catch (err: any) {
            console.error(err);
            this.setState({ mensagem: err.message || 'Erro ao deletar usuário' });
        } finally {
            this.setState({ carregando: false });
        }
    };


    deletarMedico = async (usuarioId: number) => {
        if (!window.confirm('Tem certeza que deseja deletar este médico?')) return;

        this.setState({ carregando: true, mensagem: '' });

        try {
            const res = await fetch(
                `https://telemedicina-backend.vercel.app/api/admin/medicos/${usuarioId}`,
                {
                    method: 'DELETE',
                    headers: this.getAuthHeaders(),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                // Lê a mensagem de erro do backend
                throw new Error(data?.error || `Erro ${res.status}`);
            }

            this.setState({
                mensagem: data.message || 'Médico deletado com sucesso!',
            });

            // Atualiza listas após deleção
            await this.carregarMedicos();
            await this.carregarUsuarios();
        } catch (err: any) {
            console.error(err);
            this.setState({
                mensagem: err.message || 'Erro ao deletar médico',
            });
        } finally {
            this.setState({ carregando: false });
        }
    };



    handleNovoMedicoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            novoMedico: {
                ...prevState.novoMedico,
                [name]: value,
            }
        }));
    };

    adicionarDisponibilidade = () => {
        const { disponibilidadeInput, disponibilidades } = this.state.novoMedico;
        if (!disponibilidadeInput) return;

        // Converte para um Date em UTC
        const dateUTC = new Date(disponibilidadeInput);
        const isoString = dateUTC.toISOString();

        this.setState((prevState) => ({
            novoMedico: {
                ...prevState.novoMedico,
                disponibilidades: [
                    ...disponibilidades,
                    { dataHora: isoString }
                ],
                disponibilidadeInput: '',
            }
        }));
    };

    criarMedico = async () => {
        const { nome, email, senha, especialidadeNome, disponibilidades } = this.state.novoMedico;
        if (!nome || !email || !senha || !especialidadeNome) {
            this.setState({ mensagem: 'Preencha todos os campos do médico' });
            return;
        }

        this.setState({ carregando: true, mensagem: '' });

        try {
            const res = await fetch('https://telemedicina-backend.vercel.app/api/admin/medicos', {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ nome, email, senha, especialidadeNome, disponibilidades }),
            });

            if (res.ok) {
                this.setState({
                    mensagem: 'Médico criado com sucesso!',
                    novoMedico: {
                        nome: '',
                        email: '',
                        senha: '',
                        especialidadeNome: '',
                        disponibilidades: [],
                        disponibilidadeInput: '',
                    }
                });
                this.carregarMedicos();
            } else {
                const errorData = await res.json();
                this.setState({ mensagem: errorData.message || 'Erro ao criar médico' });
            }
        } catch (err) {
            console.error(err);
            this.setState({ mensagem: 'Erro de conexão ao criar médico' });
        } finally {
            this.setState({ carregando: false });
        }
    };

    render() {
        const { usuarios, medicos, novoMedico, mensagem, carregando } = this.state;

        return (
            <div className={style.admContainer}>
                <h1>Área Administrativa</h1>

                {mensagem && <p className={style.mensagem}>{mensagem}</p>}
                {carregando && <p>Carregando...</p>}

                <section className={style.section}>
                    <h2>Usuários</h2>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Função</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios?.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.nome}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role}</td>
                                    <td>
                                        <button
                                            className={style.btnDelete}
                                            onClick={() => this.deletarUsuario(u.id)}
                                            disabled={carregando}
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className={style.section}>
                    <h2>Cadastro de Médico</h2>
                    <div className={style.formGroup}>
                        <input name="nome" placeholder="Nome" value={novoMedico.nome} onChange={this.handleNovoMedicoChange} />
                        <input name="email" placeholder="Email" value={novoMedico.email} onChange={this.handleNovoMedicoChange} />
                        <input name="senha" placeholder="Senha" type="password" value={novoMedico.senha} onChange={this.handleNovoMedicoChange} />
                        <input name="especialidadeNome" placeholder="Especialidade" value={novoMedico.especialidadeNome} onChange={this.handleNovoMedicoChange} />

                        <div className={style.disponibilidadeWrapper}>
                            <input
                                name="disponibilidadeInput"
                                type="datetime-local"
                                value={novoMedico.disponibilidadeInput}
                                onChange={this.handleNovoMedicoChange}
                            />
                            <button type="button" onClick={this.adicionarDisponibilidade}>
                                Adicionar
                            </button>
                        </div>

                        <ul>
                            {novoMedico.disponibilidades.map((d, i) => (
                                <li key={i}>{new Date(d.dataHora).toLocaleString()}</li>
                            ))}
                        </ul>

                        <button className={style.btnCreate} onClick={this.criarMedico}>
                            Criar Médico
                        </button>
                    </div>

                    <h2>Médicos</h2>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Especialidade</th>
                                <th>Disponibilidades</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicos?.map((m) => (
                                <tr key={m.id}>
                                    <td>{m.usuario.nome}</td>
                                    <td>{m.usuario.email}</td>
                                    <td>{m.especialidade.nome}</td>
                                    <td>
                                        <ul>
                                            {m.disponibilidades.map((d) => (
                                                <li key={d.id}>{new Date(d.dataHora).toLocaleString()}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <button className={style.btnDelete} onClick={() => this.deletarMedico(m.usuario.id)}>
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        );
    }
}

export default Adm;
