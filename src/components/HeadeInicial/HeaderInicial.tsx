import React, { useState, useEffect, use } from "react";
import { getUserFromToken, DecodedToken, logout } from "../../utils/auth";

function Header() {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const usuario = getUserFromToken();
    setUser(usuario);
  }, []);
  console.log("user: ", user);
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
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">
                      Sobre nós
                    </a>
                  </li>
                   <li className="nav-item">
                        {user.role=== "MEDICO"?
                        <a className="nav-link text-white" href="/consulta">
                            Ver consulta marcadas
                        </a>
                        :<a className="nav-link text-white" href="/consulta">
                        Agende sua Consulta
                        </a>}
                    </li>
                    </ul>
                <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                    <li className="nav-item d-flex align-items-center me-2">
                        <img
                            src="/imgs/usuario.png"
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
