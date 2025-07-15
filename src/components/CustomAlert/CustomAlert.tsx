import React from "react";
import styles from "./CustomAlert.module.css";

interface CustomAlertProps {
  message: string;
  failure: boolean;
  onClose: () => void;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  failure,
  onClose,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p
          className={`${styles.title} ${
            failure ? styles.failureTitle : styles.successTitle
          }`}
        >
          {failure ? "Booking Failed" : "Success"}
        </p>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};
