





import React from "react";
import AlertModal from "./Alert";
import SuccessModal from "./Success";
import WarningModal from "./Warning";


export default function Modal() {
  return (
    <>
      <SuccessModal />
      <AlertModal />
      <WarningModal />
    </>
  );
}
