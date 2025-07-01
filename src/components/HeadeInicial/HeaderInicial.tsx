import React, { useState, useEffect, use} from "react";
import { getUserFromToken, DecodedToken, logout } from "../../utils/auth";
import avatarIcon from '../../assets/images/icons_avatar.png';

function Header() {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const usuario = getUserFromToken();
    setUser(usuario);
  }, []);

  function getNavLink(role: string) {
  switch (role) {
      case "MEDICO":
        return { text: "Consultas Marcadas", href: "/medico" };
      case "ADMIN":
        return { text: "Administrador", href: "/adm" };
      case "PACIENTE":
        return { text: "Agende sua Consulta", href: "/consulta" };
      default:
        return null;
    }
  }

  let role = ""
  if(user){
    role = user.role;
  }

const navLink = getNavLink(role);
  return (
    
    <header>
      <nav
        className="navbar navbar-expand-md navbar-dark fixed-top px-4"
        style={{ backgroundColor: '#2A5D59' }}
        >
        <div className="container-fluid">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img
              src="/Sessao_01_02/bandeira.png"
              alt="Ícone da bandeira"
              width="68"
              className="me-2"
            />
            <span>Telemedicina</span>
          </a>

          {/* Botão Burger (Toggle) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu Navegação */}
          <div className="collapse navbar-collapse" id="navbarMenu">
            {user ? (
                <>
                 <ul className="navbar-nav mx-auto mb-2 mb-md-0">
                  <li className="nav-item">
                    <a className="nav-link text-white" href="/">
                      Início
                    </a>
                  </li>
                  {user.role=== "PACIENTE"?
                    <li className="nav-item">
                      <a className="nav-link text-white" href="/Paciente">
                        Consultas
                      </a>
                    </li>
                    :""
                  }
                  
                   {navLink && (
                      <li className="nav-item">
                        <a className="nav-link text-white" href={navLink.href}>
                          {navLink.text}
                        </a>
                      </li>
                    )}
                    </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                    <li className="nav-item d-flex align-items-center me-2">
                        <img
                            src={avatarIcon}
                            alt="Avatar"
                            className="rounded-circle"
                            style={{ width: 38, height: 38, objectFit: "cover" }}
                        />
                        <div className="ms-2 text-white">
                            <div>{user.nome}</div>
                            <small>Perfil</small>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a
                            href="/"
                            onClick={logout}
                            className="btn btn-light btn-sm"
                            role="button"
                        >
                            Sair
                        </a>
                    </li>
              </ul>
              </>
            ) : (
              <>
                <ul className="navbar-nav mx-auto mb-2 mb-md-0">
                  <li className="nav-item">
                    <a className="nav-link text-white" href="/">
                      Início
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="">
                      Sobre nós
                    </a>
                  </li>
                </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                  <li className="nav-item me-2">
                    <a
                      href="/cadastro"
                      className="btn btn-light btn-sm"
                      role="button"
                    >
                      Cadastrar-se
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="btn btn-light btn-sm" role="button">
                      Login
                    </a>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
