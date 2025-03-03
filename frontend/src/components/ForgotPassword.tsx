import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from './AuthCard';
import api from "../services/api";
import { useCustomAlert } from "../hooks/useCustomAlert";


const ForgotPassword: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const { alert, showAlert } = useCustomAlert();


  // Realiza o envio do email com a nova senha gerada
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {

      const response = await api.post("/auth/forgotPassword", { name, email});

      if (response.status === 200) {

        showAlert(`✅ ${response.data.success}`, "success");
        
        setName("");
        setEmail("");
    
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
    <AuthCard title="Forgot Password">
      {alert}
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Name:</label>
          <input 
            type="name" 
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
        <button className="btn btn-primary" type="submit">Send</button>
      </form>
      <div className="auth-links">
        <Link to="/login">Back to login</Link>
      </div>
    </AuthCard>
  );
  
};

export default ForgotPassword;
