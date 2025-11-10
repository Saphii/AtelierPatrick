import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes, FaUpload, FaImage, FaSave } from 'react-icons/fa';
import { creationService, resolveImageUrl } from '../services/api';
import { useCreations } from '../contexts/CreationsContext';

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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  border-bottom: 1px solid #e0e0e0;
  
  h2 {
    color: #8B4513;
    font-size: 1.5rem;
    margin: 0;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #666;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      background: #f0f0f0;
      color: #333;
    }
  }
`;

const ModalBody = styled.div`
  padding: 30px;
`;

const Form = styled.form`
  .form-group {
    margin-bottom: 25px;
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }
    
    input, textarea, select {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      
      &:focus {
        border-color: #8B4513;
        outline: none;
      }
      
      &::placeholder {
        color: #999;
      }
    }
    
    textarea {
      height: 100px;
      resize: vertical;
    }
    
    select {
      cursor: pointer;
    }
  }
`;

const ImageUpload = styled.div`
  .upload-area {
    border: 2px dashed #8B4513;
    border-radius: 15px;
    padding: 30px;
    text-align: center;
    background: #faf9f7;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      background: #f0f0f0;
      border-color: #A0522D;
    }
    
    &.has-image {
      border-style: solid;
      background: white;
    }
    
    input[type="file"] {
      display: none;
    }
    
    .upload-content {
      .icon {
        font-size: 3rem;
        color: #8B4513;
        margin-bottom: 15px;
      }
      
      h3 {
        color: #8B4513;
        margin-bottom: 10px;
      }
      
      p {
        color: #666;
        margin-bottom: 15px;
      }
      
      .upload-button {
        background: #8B4513;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: #A0522D;
          transform: translateY(-2px);
        }
      }
    }
    
    .image-preview {
      img {
        max-width: 100%;
        max-height: 200px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      
      .change-image {
        margin-top: 15px;
        background: #f0f0f0;
        color: #8B4513;
        border: none;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: #e0e0e0;
        }
      }
    }
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  
  button {
    padding: 12px 25px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    
    &.cancel {
      background: #f0f0f0;
      color: #666;
      border: none;
      
      &:hover {
        background: #e0e0e0;
      }
    }
    
    &.submit {
      background: linear-gradient(135deg, #8B4513, #A0522D);
      color: white;
      border: none;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(139, 69, 19, 0.3);
      }
      
      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
      }
    }
  }
`;

const CreationForm = ({ creation, onClose, onSubmit }) => {
  const { refreshCreations } = useCreations();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'bois',
    price: '',
    is_available: true,
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (creation) {
      setFormData({
        title: creation.title || '',
        description: creation.description || '',
        category: creation.category || 'bois',
        price: creation.price || '',
        is_available: creation.is_available !== undefined ? creation.is_available : true,
        image: null
      });
      setImagePreview(resolveImageUrl(creation.image));
    }
  }, [creation]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      let result;
      if (creation) {
        result = await creationService.update(creation.id, formData);
      } else {
        result = await creationService.create(formData);
      }

      const message =
        result?.message ||
        (creation
          ? 'Création mise à jour avec succès !'
          : 'Création créée avec succès !');

      const returnedCreation = result?.creation || null;

      // Forcer le rafraîchissement du contexte
      window.dispatchEvent(new CustomEvent('refreshCreations'));

      onSubmit({
        message,
        creation: returnedCreation,
        mode: creation ? 'update' : 'create',
      });
    } catch (error) {
      setError(error.message || 'Erreur lors de la sauvegarde');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>{creation ? 'Modifier la création' : 'Ajouter une création'}</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                background: '#f8d7da',
                color: '#721c24',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px',
                border: '1px solid #f5c6cb'
              }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="title">Titre de la création *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Table en chêne massif"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez votre création..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Catégorie *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="bois">Création Bois</option>
                <option value="3d">Impression 3D</option>
                <option value="mixte">Mixte Bois/3D</option>
                <option value="gravure">Gravure</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Prix (€)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ex: 150"
                step="0.01"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={handleChange}
                />
                {' '}Disponible à la vente
              </label>
            </div>

            <ImageUpload>
              <div className={`upload-area ${imagePreview ? 'has-image' : ''}`}>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Aperçu" />
                    <div>
                      <button
                        type="button"
                        className="change-image"
                        onClick={() => document.getElementById('image').click()}
                      >
                        <FaImage /> Changer l'image
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="upload-content">
                    <div className="icon">
                      <FaUpload />
                    </div>
                    <h3>Ajouter une photo</h3>
                    <p>Cliquez pour sélectionner une image de votre création</p>
                    <button
                      type="button"
                      className="upload-button"
                      onClick={() => document.getElementById('image').click()}
                    >
                      <FaImage /> Choisir une image
                    </button>
                  </div>
                )}
              </div>
            </ImageUpload>

            <FormActions>
              <button type="button" className="cancel" onClick={onClose}>
                Annuler
              </button>
              <button type="submit" className="submit" disabled={isSubmitting}>
                <FaSave />
                {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </FormActions>
          </Form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreationForm;
