import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './login';
import Cadastro from './cadastro';
import Consulta from './Consulta';
import Medico from  './medico';
import Adm from './adm';
import TeleConsulta from './teleconsulta';
import TeleMedico from './Telemedico';
import Paciente from './Paciente';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="/Paciente" element={<Paciente />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/medico" element={<Medico />} />
        <Route path="/adm" element={<Adm />} />
        <Route path="/teleconsulta" element={<TeleConsulta />} />
        <Route path="/telemedico" element={<TeleMedico />} />
      </Routes>
    </Router>
  );
}

export default App;
