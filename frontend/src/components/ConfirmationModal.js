import React from 'react';
import styled from 'styled-components';
import { FaTimes, FaExclamationTriangle, FaTrash } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  padding: 20px 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  
  .icon {
    font-size: 1.5rem;
  }
  
  h3 {
    font-size: 1.3rem;
    margin: 0;
    font-weight: 600;
  }
`;

const ModalBody = styled.div`
  padding: 25px;
  
  .warning-icon {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    
    svg {
      font-size: 3rem;
      color: #ffc107;
    }
  }
  
  p {
    text-align: center;
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
    
    .creation-title {
      font-weight: 600;
      color: #8B4513;
    }
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 15px;
  padding: 0 25px 25px;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &.cancel-btn {
    background: #f8f9fa;
    color: #6c757d;
    border: 2px solid #e9ecef;
    
    &:hover {
      background: #e9ecef;
      transform: translateY(-1px);
    }
  }
  
  &.confirm-btn {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    color: white;
    border: none;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`;

const ConfirmationModal = ({ isOpen, onClose, onConfirm, creationTitle }) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <FaExclamationTriangle className="icon" />
          <h3>Confirmer la suppression</h3>
        </ModalHeader>
        
        <ModalBody>
          <div className="warning-icon">
            <FaExclamationTriangle />
          </div>
          
          <p>
            Êtes-vous sûr de vouloir supprimer définitivement 
            <span className="creation-title"> "{creationTitle}"</span> ?
          </p>
          
          <p style={{ fontSize: '0.9rem', color: '#999' }}>
            Cette action est irréversible.
          </p>
        </ModalBody>
        
        <ModalActions>
          <Button className="cancel-btn" onClick={onClose}>
            Annuler
          </Button>
          <Button className="confirm-btn" onClick={handleConfirm}>
            <FaTrash />
            Supprimer
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;
