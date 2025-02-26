// src/components/Header.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-white">
      <div className="container-fluid">

        <Link to="/home" className="navbar-brand">
          Zievo
        </Link>

        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            id="profileDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className="bi bi-person-circle"
              style={{ fontSize: "1.5rem" }}
            ></i>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="profileDropdown"
          >
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
