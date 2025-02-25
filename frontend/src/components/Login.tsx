import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "./AuthCard";
import api from "../services/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.post("/login", { email, password }).then((response) => {
      if (response.status === 200) {
        navigate("/home");
      } else {
        alert("Invalid email or password");
      }
    });
  };

  return (
    <AuthCard title="Login">
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
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
