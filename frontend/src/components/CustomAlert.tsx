import React, { useEffect, useState } from "react";

interface AlertProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose: () => void;
}


const CustomAlert: React.FC<AlertProps> = ({ message, type = "info", duration = 3000, onClose }) => {
const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);
    }, duration);

    return () => clearTimeout(timer);

  }, [duration, onClose]);

  return visible ? (
    <div className={`custom-alert ${type}`}>
      {message}
    </div>
  ) : null;
  
};

export default CustomAlert;
