import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/logout";
import logo from "../assets/logo-zievo.webp";
import api from "../services/api";
import { useCustomAlert } from "../hooks/useCustomAlert";
import "../index.css";
import UserModal from "./UserModal";


const Header: React.FC = () => {

  const { logout } = useLogout();
  const { alert, showAlert } = useCustomAlert();
  const [showModal, setShowModal] = useState<boolean>(false);


  // Realiza o logout do usuário
  const handleLogout = async () => {

    try {

      await api.post("/logoutUser");

      logout();

    } catch (error: any) {

      if (error.response?.status === 400) {

        showAlert(`⚠️ ${error.response.data.message}`, "info");

      } else {

        showAlert(`🚫 ${error.response?.data.error || "Erro inesperado"}`, "error");

      }

    }

  };


  // Realiza a exclusão do Usuário
  const handleDeleteUser = async () => {

    if (window.confirm("Would you like to delete this user?")) {

      try {

        const response = await api.delete("/deleteUser");

        if (response.status === 200) {

          showAlert(`✅ ${response.data.success}`, "success");

        }

        setTimeout(() => {
          logout();
        }, 1500);

      } catch (error: any) {

        if (error.response?.status === 400) {

          showAlert(`⚠️ ${error.response.data.message}`, "info");

        } else {

          showAlert(`🚫 ${error.response?.data.error || "Erro inesperado"}`, "error");

        }

      }

    }

  };


  const handleEditUser = () => {
    setShowModal(true);
  };


  return (
    <>
      {alert && <div className="alert-container">{alert}</div>}

      <nav className="navbar navbar-light bg-white">
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand">
            <img src={logo} alt="Logo Zievo" style={{ height: "40px" }} />
          </Link>

          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="profileDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle" style={{ fontSize: "1.7rem" }}></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li>
                <button className="dropdown-item" onClick={handleEditUser}>
                  Edit Profile
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleDeleteUser}>
                  Delete Profile
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showModal && <UserModal show={showModal} onClose={() => setShowModal(false)} />}
    </>
  );
  
};

export default Header;
