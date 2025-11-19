import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children, type = 'info' }) => {
  if (!isOpen) return null;

  const getEmoji = () => {
    switch(type) {
      case 'success': return '🎉';
      case 'error': return '😅';
      case 'levelup': return '⭐';
      default: return '🎮';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${type}`} onClick={e => e.stopPropagation()}>
        <div className="modal-emoji">{getEmoji()}</div>
        <h2 className="modal-title">{title}</h2>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
