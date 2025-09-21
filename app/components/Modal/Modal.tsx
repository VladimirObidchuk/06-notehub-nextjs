import Button from "../Button/Button";
import css from "./Modal.module.css";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: Props) => {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
