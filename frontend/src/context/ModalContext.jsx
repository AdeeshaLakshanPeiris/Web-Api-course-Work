
import React, { createContext, useContext, useState } from "react";

// Create ModalContext
const ModalContext = createContext();

// Custom hook to use ModalContext
export const useModal = () => useContext(ModalContext);

// ModalProvider to wrap the application
export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null, // success | alert | warning
    message: "",
  });

  const openSuccess = (message) => setModal({ isOpen: true, type: "success", message });
  const openAlert = (message) => setModal({ isOpen: true, type: "alert", message });
  const openWarning = (message) => setModal({ isOpen: true, type: "warning", message });
  const closeModal = () => setModal({ isOpen: false, type: null, message: "" });

  return (
    <ModalContext.Provider value={{ modal, openSuccess, openAlert, openWarning, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
