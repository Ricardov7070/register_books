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

        showAlert(`⚠️ ${error.response.data.message}`, "info");

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
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
