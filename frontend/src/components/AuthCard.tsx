import React from 'react';

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

const AuthCard = ({ title, children }: AuthCardProps) => {
  return (
    <div className="auth-card">
      <h2 className="text-center">{title}</h2>
      {children}
    </div>
  );
};

export default AuthCard;
