import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
