import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCard from './AuthCard';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica para recuperação de senha
    console.log('Esqueci minha senha:', email);
  };

  return (
    <AuthCard title="Forgot Password">
      <form onSubmit={handleSubmit}>
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
