import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes, FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaImages, FaEye, FaLock, FaUser, FaEyeSlash } from 'react-icons/fa';
import { authService, creationService } from '../services/api';
import CreationForm from './CreationForm';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
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
  max-width: 1000px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  color: white;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 {
    font-size: 1.5rem;
    margin: 0;
  }
  
  .close-button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 30px;
`;

const LoginForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  
  .form-group {
    margin-bottom: 25px;
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }
    
    .input-container {
      position: relative;
      
      input {
        width: 100%;
        padding: 15px 50px 15px 15px;
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
      
      .icon {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #8B4513;
        font-size: 1.1rem;
      }
      
      .password-toggle {
        position: absolute;
        right: 45px;
        top: 50%;
        transform: translateY(-50%);
        color: #8B4513;
        cursor: pointer;
        font-size: 1.1rem;
        
        &:hover {
          color: #A0522D;
        }
      }
    }
  }
  
  .submit-button {
    width: 100%;
    background: linear-gradient(135deg, #8B4513, #A0522D);
    color: white;
    padding: 15px;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    
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
  
  .error-message {
    background: #f8d7da;
    color: #721c24;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    border: 1px solid #f5c6cb;
  }
`;

const AdminContent = styled.div`
  .admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    
    h3 {
      color: #8B4513;
      font-size: 1.5rem;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 15px;
      
      .user-name {
        background: #f0f0f0;
        padding: 8px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
        color: #8B4513;
      }
      
      .logout-button {
        background: #dc3545;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.9rem;
        
        &:hover {
          background: #c82333;
          transform: translateY(-1px);
        }
      }
    }
  }
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #8B4513, #A0522D);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(139, 69, 19, 0.3);
  }
`;

const CreationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const CreationCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  
  .image-container {
    position: relative;
    height: 150px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      
      .actions {
        display: flex;
        gap: 10px;
        
        button {
          background: white;
          border: none;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:hover {
            transform: scale(1.1);
          }
          
          &.edit {
            color: #8B4513;
          }
          
          &.delete {
            color: #dc3545;
          }
        }
      }
    }
    
    &:hover .overlay {
      opacity: 1;
    }
  }
  
  .content {
    padding: 15px;
    
    .category {
      display: inline-block;
      background: #f0f0f0;
      color: #8B4513;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 500;
      margin-bottom: 8px;
    }
    
    h4 {
      font-size: 1rem;
      margin-bottom: 8px;
      color: #333;
      line-height: 1.3;
    }
    
    p {
      color: #666;
      font-size: 0.8rem;
      line-height: 1.4;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .price {
      font-size: 0.9rem;
      font-weight: 600;
      color: #8B4513;
    }
    
    .status {
      margin-top: 8px;
      font-size: 0.7rem;
      padding: 3px 8px;
      border-radius: 8px;
      
      &.available {
        background: #d4edda;
        color: #155724;
      }
      
      &.unavailable {
        background: #f8d7da;
        color: #721c24;
      }
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
  
  .icon {
    font-size: 3rem;
    color: #8B4513;
    margin-bottom: 20px;
  }
  
  h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 25px;
  }
`;

const AdminModal = ({ onClose, onLoginSuccess, onLogout, isAuthenticated }) => {
  const [showLogin, setShowLogin] = useState(!isAuthenticated);
  const [creations, setCreations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCreation, setEditingCreation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // États pour le formulaire de connexion
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
      loadCreations();
    }
  }, [isAuthenticated]);

  const loadUser = () => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  };

  const loadCreations = async () => {
    try {
      setLoading(true);
      const data = await creationService.getAllAdmin();
      // S'assurer que data est un tableau
      if (Array.isArray(data)) {
        setCreations(data);
      } else {
        console.error('Les données ne sont pas un tableau:', data);
        setCreations([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des créations:', error);
      setCreations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const response = await authService.login(loginData.username, loginData.password);
      setUser(response.user);
      setShowLogin(false);
      onLoginSuccess();
    } catch (error) {
      setLoginError(error.error || 'Erreur de connexion');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogoutClick = async () => {
    await authService.logout();
    setUser(null);
    setShowLogin(true);
    onLogout();
  };

  const handleAddCreation = () => {
    setEditingCreation(null);
    setShowForm(true);
  };

  const handleEditCreation = (creation) => {
    setEditingCreation(creation);
    setShowForm(true);
  };

  const handleDeleteCreation = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette création ?')) {
      try {
        await creationService.delete(id);
        await loadCreations();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    setEditingCreation(null);
    await loadCreations();
  };

  const getCategoryLabel = (category) => {
    const labels = {
      'bois': 'Bois',
      '3d': '3D',
      'mixte': 'Mixte'
    };
    return labels[category] || category;
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Administration - L'Atelier de Patrick</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </ModalHeader>

        <ModalBody>
          {showLogin ? (
            <LoginForm onSubmit={handleLogin}>
              {loginError && (
                <div className="error-message">
                  {loginError}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur</label>
                <div className="input-container">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    placeholder="Entrez votre nom d'utilisateur"
                    required
                  />
                  <FaUser className="icon" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <div className="input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                  <FaLock className="icon" />
                  <div 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-button" disabled={isLoggingIn}>
                {isLoggingIn ? 'Connexion...' : 'Se connecter'}
              </button>
            </LoginForm>
          ) : (
            <AdminContent>
              <div className="admin-header">
                <h3>Gestion des créations</h3>
                <div className="user-info">
                  <div className="user-name">
                    Connecté en tant que {user?.username}
                  </div>
                  <button className="logout-button" onClick={handleLogoutClick}>
                    <FaSignOutAlt />
                    Déconnexion
                  </button>
                </div>
              </div>

              <AddButton onClick={handleAddCreation}>
                <FaPlus />
                Ajouter une création
              </AddButton>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <h4>Chargement des créations...</h4>
                </div>
              ) : creations.length === 0 ? (
                <EmptyState>
                  <div className="icon">
                    <FaImages />
                  </div>
                  <h4>Aucune création</h4>
                  <p>Commencez par ajouter votre première création !</p>
                  <AddButton onClick={handleAddCreation}>
                    <FaPlus />
                    Ajouter une création
                  </AddButton>
                </EmptyState>
              ) : (
                <CreationsGrid>
                  {creations.map(creation => (
                    <CreationCard key={creation.id}>
                      <div className="image-container">
                        <img 
                          src={creation.image} 
                          alt={creation.title}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/250x150?text=Image+non+disponible';
                          }}
                        />
                        <div className="overlay">
                          <div className="actions">
                            <button 
                              className="edit"
                              onClick={() => handleEditCreation(creation)}
                              title="Modifier"
                            >
                              <FaEdit />
                            </button>
                            <button 
                              className="delete"
                              onClick={() => handleDeleteCreation(creation.id)}
                              title="Supprimer"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="content">
                        <span className="category">{getCategoryLabel(creation.category)}</span>
                        <h4>{creation.title}</h4>
                        <p>{creation.description}</p>
                        {creation.price && (
                          <div className="price">{creation.price}€</div>
                        )}
                        <div className={`status ${creation.is_available ? 'available' : 'unavailable'}`}>
                          {creation.is_available ? 'Disponible' : 'Non disponible'}
                        </div>
                      </div>
                    </CreationCard>
                  ))}
                </CreationsGrid>
              )}
            </AdminContent>
          )}
        </ModalBody>
      </ModalContent>

      {showForm && (
        <CreationForm
          creation={editingCreation}
          onClose={() => {
            setShowForm(false);
            setEditingCreation(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}
    </ModalOverlay>
  );
};

export default AdminModal;
