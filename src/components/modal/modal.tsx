import ReactDOM from "react-dom";
import React, { FC, ReactNode, useEffect } from "react";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");
interface IModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<IModalProps> = ({ children, onClose }) => {
  //логика навешивания и удаления обработчиков события нажатия клавиши "Esc"
  useEffect(() => {
    const handleEscClose = (evt: { key: string }) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={`${styles.modal} pt-15 pl-10 pr-10`}>
        <button className={styles.button} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot!
  );
};

export default Modal;
