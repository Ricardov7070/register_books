import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from './AuthCard';
import api from "../services/api";
import { useCustomAlert } from "../hooks/useCustomAlert";

const Register: React.FC = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { alert, showAlert } = useCustomAlert();


  // Realiza o registro do usuário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {

      const response = await api.post("/auth/signup", { name, email, password });

      if (response.status === 200) {

        showAlert(`✅ ${response.data.success}`, "success");

        setName("");
        setEmail("");
        setPassword("");
    
      }

    } catch (error: any) {

      if (error.response.status === 400) {

        showAlert(`⚠️ ${error.response.data.message}`, "info");

      } else {

        showAlert(`🚫 ${error.response.data.error}`, "error");

      };

    };

  };


  return (
    <AuthCard title="Registro">
      {alert}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
      <div className="auth-links">
        <Link to="/login">Back to login</Link>
      </div>
    </AuthCard>
  );
  
};

export default Register;
