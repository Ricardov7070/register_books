import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "./AuthCard";
import api from "../services/api";

const Login: React.FC = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
  
    try {

      const response = await api.post("/login", { email, password });
  
      if (response.status === 200) {

        alert(response.data.success);

        localStorage.setItem("token", response.data.access_token);
        navigate("/home");

      }
    } catch (error: any) {

      if (error.response?.status === 400) {

        alert(error.response.data.message || "Invalid credentials!");

      } else if (error.response?.status === 422) {

        const errors = error.response.data.errors;
        const errorMessages = Object.values(errors).flat().join("\n");
        alert(errorMessages);

      } else if (error.response?.status === 500) {

        alert("Server error: " + (error.response.data.error || "Try again later."));

      } else {

        alert("Unexpected error: " + error.message);

      }

    }

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
