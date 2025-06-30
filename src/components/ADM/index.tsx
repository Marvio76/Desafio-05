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
    editUsuario: Usuario | null;
    editMedico: Medico | null;
    editMedicoForm: {
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
        editUsuario: null,
        editMedico: null,
        editMedicoForm: {
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
            this.setState({ usuarios });
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
            this.setState({ medicos });
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
                throw new Error(data?.error || `Erro ${res.status}`);
            }

            this.setState({
                mensagem: data.message || 'Médico deletado com sucesso!',
            });

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

    abrirEditarUsuario = (usuario: Usuario) => {
        this.setState({ editUsuario: { ...usuario } });
    };

    handleEditUsuarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            editUsuario: prevState.editUsuario
                ? { ...prevState.editUsuario, [name]: value }
                : null,
        }));
    };

    salvarUsuarioEditado = async () => {
        if (!this.state.editUsuario) return;
        const { id, nome, email, role } = this.state.editUsuario;

        this.setState({ carregando: true, mensagem: '' });
        try {
            const res = await fetch(
                `https://telemedicina-backend.vercel.app/api/admin/usuarios/${id}`,
                {
                    method: 'PUT',
                    headers: this.getAuthHeaders(),
                    body: JSON.stringify({ nome, email, role }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || `Erro ${res.status}`);
            }

            this.setState({
                mensagem: data.message || 'Usuário atualizado com sucesso!',
                editUsuario: null,
            });
            this.carregarUsuarios();
        } catch (err: any) {
            console.error(err);
            this.setState({
                mensagem: err.message || 'Erro ao atualizar usuário',
            });
        } finally {
            this.setState({ carregando: false });
        }
    };

    abrirEditarMedico = (medico: Medico) => {
        this.setState({
            editMedico: medico,
            editMedicoForm: {
                nome: medico.usuario.nome,
                email: medico.usuario.email,
                senha: '',
                especialidadeNome: medico.especialidade.nome,
                disponibilidades: medico.disponibilidades.map((d) => ({
                    dataHora: d.dataHora,
                })),
                disponibilidadeInput: '',
            },
        });
    };

    handleEditMedicoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            editMedicoForm: {
                ...prevState.editMedicoForm,
                [name]: value,
            },
        }));
    };

    adicionarDisponibilidadeEdit = () => {
        const { disponibilidadeInput, disponibilidades } = this.state.editMedicoForm;
        if (!disponibilidadeInput) return;

        const dateUTC = new Date(disponibilidadeInput);
        const isoString = dateUTC.toISOString();

        this.setState((prevState) => ({
            editMedicoForm: {
                ...prevState.editMedicoForm,
                disponibilidades: [
                    ...disponibilidades,
                    { dataHora: isoString },
                ],
                disponibilidadeInput: '',
            },
        }));
    };

    salvarMedicoEditado = async () => {
        if (!this.state.editMedico) return;

        const usuarioId = this.state.editMedico.usuario.id;
        const {
            nome,
            email,
            senha,
            especialidadeNome,
            disponibilidades,
        } = this.state.editMedicoForm;

        this.setState({ carregando: true, mensagem: '' });
        try {
            const res = await fetch(
                `https://telemedicina-backend.vercel.app/api/admin/medicos/${usuarioId}`,
                {
                    method: 'PUT',
                    headers: this.getAuthHeaders(),
                    body: JSON.stringify({
                        nome,
                        email,
                        senha: senha || undefined,
                        especialidadeNome,
                        disponibilidades,
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || `Erro ${res.status}`);
            }

            this.setState({
                mensagem: data.message || 'Médico atualizado com sucesso!',
                editMedico: null,
            });
            this.carregarMedicos();
            this.carregarUsuarios();
        } catch (err: any) {
            console.error(err);
            this.setState({
                mensagem: err.message || 'Erro ao atualizar médico',
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

        const dateUTC = new Date(disponibilidadeInput);
        const isoString = dateUTC.toISOString();

        this.setState((prevState) => ({
            novoMedico: {
                ...prevState.novoMedico,
                disponibilidades: [
                    ...disponibilidades,
                    { dataHora: isoString },
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

    removerDisponibilidadeNovo = (index: number) => {
        this.setState((prevState) => ({
            novoMedico: {
                ...prevState.novoMedico,
                disponibilidades: prevState.novoMedico.disponibilidades.filter((_, i) => i !== index),
            }
        }));
    };

    removerDisponibilidadeEdit = (index: number) => {
        this.setState((prevState) => ({
            editMedicoForm: {
                ...prevState.editMedicoForm,
                disponibilidades: prevState.editMedicoForm.disponibilidades.filter((_, i) => i !== index),
            }
        }));
    };

    render() {
        const {
            usuarios,
            medicos,
            novoMedico,
            editUsuario,
            editMedico,
            editMedicoForm,
            mensagem,
            carregando,
        } = this.state;

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
                            {usuarios
                                ?.filter((u) => u.role !== 'MEDICO') // Exclui médicos da lista de usuários
                                .map((u) => (
                                    <tr key={u.id}>
                                        <td>{u.nome}</td>
                                        <td>{u.email}</td>
                                        <td>{u.role}</td>
                                        <td>
                                            <button
                                                className={style.btnEdit}
                                                onClick={() => this.abrirEditarUsuario(u)}
                                            >
                                                Editar
                                            </button>
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

                {editUsuario && (
                    <div className={style.modal}>
                        <h3>Editar Usuário</h3>
                        <input
                            name="nome"
                            value={editUsuario.nome}
                            onChange={this.handleEditUsuarioChange}
                            placeholder="Nome"
                        />
                        <input
                            name="email"
                            value={editUsuario.email}
                            onChange={this.handleEditUsuarioChange}
                            placeholder="Email"
                        />
                        <input
                            name="role"
                            value={editUsuario.role}
                            onChange={this.handleEditUsuarioChange}
                            placeholder="Role"
                        />
                        <button onClick={this.salvarUsuarioEditado}>
                            Salvar
                        </button>
                        <button onClick={() => this.setState({ editUsuario: null })}>
                            Cancelar
                        </button>
                    </div>
                )}

                {/* CADASTRO DE MÉDICO */}
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
                                <li key={i}>
                                    {new Date(d.dataHora).toLocaleString()}
                                    <button
                                        type="button"
                                        className={style.btnDeleteSmall}
                                        onClick={() => this.removerDisponibilidadeNovo(i)}
                                    >
                                        Remover
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <button className={style.btnCreate} onClick={this.criarMedico}>
                            Criar Médico
                        </button>
                    </div>
                </section>

                <section className={style.section}>
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
                                    <td data-label="Nome">{m.usuario.nome}</td>
                                    <td data-label="Email">{m.usuario.email}</td>
                                    <td data-label="Especialidade">{m.especialidade.nome}</td>
                                    <td data-label="Disponibilidades">
                                        <ul>
                                            {m.disponibilidades.map((d) => (
                                                <li key={d.id}>
                                                    {new Date(d.dataHora).toLocaleString()}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td data-label="Ações">
                                        <button
                                            className={style.btnEdit}
                                            onClick={() => this.abrirEditarMedico(m)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className={style.btnDelete}
                                            onClick={() => this.deletarMedico(m.usuario.id)}
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

                {editMedico && (
                    <div className={style.modal}>
                        <h3>Editar Médico</h3>
                        <input
                            name="nome"
                            value={editMedicoForm.nome}
                            onChange={this.handleEditMedicoChange}
                            placeholder="Nome"
                        />
                        <input
                            name="email"
                            value={editMedicoForm.email}
                            onChange={this.handleEditMedicoChange}
                            placeholder="Email"
                        />
                        <input
                            name="senha"
                            value={editMedicoForm.senha}
                            type="password"
                            onChange={this.handleEditMedicoChange}
                            placeholder="Nova senha"
                        />
                        <input
                            name="especialidadeNome"
                            value={editMedicoForm.especialidadeNome}
                            onChange={this.handleEditMedicoChange}
                            placeholder="Especialidade"
                        />
                        <div className={style.disponibilidadeWrapper}>
                            <input
                                name="disponibilidadeInput"
                                type="datetime-local"
                                value={editMedicoForm.disponibilidadeInput}
                                onChange={this.handleEditMedicoChange}
                            />
                            <button type="button" onClick={this.adicionarDisponibilidadeEdit}>
                                Adicionar
                            </button>
                        </div>
                        <ul>
                            {editMedicoForm.disponibilidades.map((d, i) => (
                                <li key={i}>
                                    {new Date(d.dataHora).toLocaleString()}
                                    <button
                                        type="button"
                                        className={style.btnDeleteSmall}
                                        onClick={() => this.removerDisponibilidadeEdit(i)}
                                    >
                                        Remover
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={this.salvarMedicoEditado}>Salvar</button>
                        <button onClick={() => this.setState({ editMedico: null })}>
                            Cancelar
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default Adm;