import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../index.css";
import { useCustomAlert } from "../hooks/useCustomAlert";
import { useLogout } from "../hooks/logout";

interface EditUserModalProps {
  show: boolean;
  onClose: () => void;
}


const EditUserModal: React.FC<EditUserModalProps> = ({ show, onClose }) => {

  if (!show) return null;

  const { alert, showAlert } = useCustomAlert();
  const { logout } = useLogout();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);


  useEffect(() => {

    if (show) {
      setName(localStorage.getItem("userNome") || "");
      setEmail(localStorage.getItem("userEmail") || "");
      setPassword(localStorage.getItem("userPassword") || ""); 
    }

  }, [show]); 


  // Realiza a edição do usuário
  const handleEditUser = async () => {

    try {

      const response = await api.put(`/updateUser/`, { name, email, password });

      if (response.status === 200) {

        showAlert(`✅ ${response.data.success}`, "success");

      }

      setTimeout(() => {
        logout();
      }, 1500);

    } catch (error: any) {

      if (error.response.status === 400) {

        const erros = error.response.data.errors;

        setNameError(erros.name ? erros.name[0] : null);
        setEmailError(erros.email ? erros.email[0] : null);
        setPasswordError(erros.password ? erros.password[0] : null);

      } else {

        showAlert(`🚫 ${error.response.data.error}`, "error");

      }

    }

  };


  return (
    <div className="modal-overlay">
      <div className="modalUser">
        <div className="row d-flex justify-content-end">
          <button type="button" className="btn-close" onClick={onClose}></button>
          {alert && <div className="alert-container">{alert}</div>}
        </div>

        <h2 className="text-center">Edit User</h2>

        <form onSubmit={(e) => { e.preventDefault(); handleEditUser(); }}>
          <div className="row d-flex justify-content-center">
            <div className="col-md-3">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  className={nameError ? "is-invalid" : ""}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError(null);
                  }}
                  required
                />
                {nameError && <small className="invalid-feedback">{nameError}</small>}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  className={emailError ? "is-invalid" : ""}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  required
                />
                {emailError && <small className="invalid-feedback">{emailError}</small>}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  className={passwordError ? "is-invalid" : ""}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError(null);
                  }}
                  required
                />
                {passwordError && <small className="invalid-feedback">{passwordError}</small>}
              </div>
            </div>
          </div>

          <div className="modal-actions text-center d-flex justify-content-center mt-3">
            <div className="row d-flex justify-content-center">
              <div className="col-md-6">
                <button type="submit" className="btn btn-primary me-2">
                  Edit
                </button>
              </div>
              <div className="col-md-6">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

};

export default EditUserModal;
