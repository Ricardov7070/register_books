import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "./AuthCard";
import api from "../services/api";
import { useCustomAlert } from "../hooks/useCustomAlert";


const Login: React.FC = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { alert, showAlert } = useCustomAlert();
  const [passwordError, setPasswordError] = useState<string | null>(null);


  // Realiza a autenticação do usuário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {

      const response = await api.post("/auth/signin", { email, password });

      if (response.status === 200) {

        showAlert(`😃 ${response.data.success}`, "success");

        localStorage.setItem("token", response.data.access_token);
        
        setTimeout(() => {
          navigate("/home");
        }, 1100);
        
      }

    } catch (error: any) {

      if (error.response.status === 400) {

        const erros = error.response.data.errors;

        setPasswordError(erros.password[0]);

      } else if (error.response.status === 401) {

        showAlert(`😞 ${error.response.data.warning}`, "warning");

      } else {

        showAlert(`🚫 ${error.response.data.error}`, "error");

      };
      
    };

  };

  
  return (
    <AuthCard title="Login">
      {alert}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-1">
          <label>Senha:</label>
          <input
            type="password"
            className={`form-control ${passwordError ? "is-invalid" : ""}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError(null);
            }}
            required
          />
          {passwordError && <div className="invalid-feedback">{passwordError}</div>}
        </div>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/forgot-password" className="text-decoration-none">
            Forgot Password?
          </Link>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
      <div className="text-center mt-2">
        Don't have an account?
        <Link to="/register" className="text-decoration-none">
          {" "}
          Sign up now
        </Link>
      </div>
    </AuthCard>
  );
  
};

export default Login;
