import styles from "./modal-overlay.module.css";
import React, { FC, ReactNode } from "react";

interface IModalOverlayProps {
  onClick: () => void;
  children: ReactNode;
}
const ModalOverlay: FC<IModalOverlayProps> = ({ onClick, children }) => {
  const closeByClickOverlay = (evt: React.MouseEvent<HTMLElement>) => {
    if (evt.target === evt.currentTarget) {
      onClick();
    }
  };

  return (
    <div className={styles.overlay} onClick={closeByClickOverlay}>
      {children}
    </div>
  );
};

export default ModalOverlay;
