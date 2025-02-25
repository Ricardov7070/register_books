import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import AuthLayout from './components/AuthLayout';

const App: React.FC = () => {
  const isAuthenticated = true; // Simulação de autenticação

  return (
    <Router>
      <Routes>
        {/* Rotas de autenticação envolvidas pelo AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Rota da Home sem o container de autenticação */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        {/* Rota padrão */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
