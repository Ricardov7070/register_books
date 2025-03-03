import { useState, ReactNode } from "react";
import CustomAlert from "../components/CustomAlert";

export const useCustomAlert = () => {

  const [alert, setAlert] = useState<ReactNode | null>(null);

  const showAlert = (message: string, type: "success" | "error" | "warning" | "info" = "info", duration = 3000) => {
    setAlert(<CustomAlert message={message} type={type} duration={duration} onClose={() => setAlert(null)} />);
  };

  return { alert, showAlert };
  
};
