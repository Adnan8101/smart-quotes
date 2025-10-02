import React, { useEffect } from 'react';
import { MdCheckCircle, MdClose } from 'react-icons/md';

interface ToastProps {
  message: string;
  details?: string;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, details, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="toast-container">
      <div className="toast-content">
        <div className="toast-icon-wrapper">
          <MdCheckCircle className="toast-icon" />
        </div>
        <div className="toast-text">
          <div className="toast-message">{message}</div>
          {details && <div className="toast-details">{details}</div>}
        </div>
        <button className="toast-close" onClick={onClose}>
          <MdClose />
        </button>
      </div>
    </div>
  );
};

export default Toast;
