//компонент Modal — шапка с заголовком и иконкой закрытия;
//содержимое модального окна передается в компонент Modal как children ;
//логика навешивания и удаления обработчиков события нажатия
//клавиши "Esc" описана в компоненте Modal ;

import ReactDOM from "react-dom";
import React from "react";
import PropTypes from "prop-types";
import styles from "./modal.module.css";

import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

function Modal({ children, header, onClose }) {
  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      onClose();
    }
  };
  //логика навешивания и удаления обработчиков события нажатия клавиши "Esc"
  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={`${styles.modal} pt-15 pl-10 pr-10`}>
        <div className={`${styles.header} mb-3`}>
          <h2 className="text text_type_main-large">{header}</h2>
          <button className={styles.button} onClick={onClose} />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

export default Modal;

//проверкa типов PropTypes.
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
