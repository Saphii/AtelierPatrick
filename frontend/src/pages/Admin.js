import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaImages, FaEye } from 'react-icons/fa';
import { authService, creationService } from '../services/api';
import CreationForm from './CreationForm';

const AdminContainer = styled.div`
  min-height: 100vh;
  background: #f8f6f3;
`;

const AdminHeader = styled.header`
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  color: white;
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.div`
  h1 {
    font-size: 2rem;
    margin-bottom: 5px;
  }
  
  p {
    opacity: 0.9;
    font-size: 1rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  
  .user-info {
    background: rgba(255, 255, 255, 0.1);
    padding: 10px 15px;
    border-radius: 25px;
    font-size: 0.9rem;
  }
`;

const LogoutButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px 15px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const AdminContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const AdminActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  
  h2 {
    color: #8B4513;
    font-size: 2rem;
  }
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #8B4513, #A0522D);
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(139, 69, 19, 0.3);
  }
`;

const CreationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const CreationCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .image-container {
    position: relative;
    height: 200px;
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
        gap: 15px;
        
        button {
          background: white;
          border: none;
          padding: 10px;
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
    padding: 20px;
    
    .category {
      display: inline-block;
      background: #f0f0f0;
      color: #8B4513;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: 500;
      margin-bottom: 10px;
    }
    
    h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: #333;
    }
    
    p {
      color: #666;
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 15px;
    }
    
    .price {
      font-size: 1.1rem;
      font-weight: 600;
      color: #8B4513;
    }
    
    .status {
      margin-top: 10px;
      font-size: 0.8rem;
      padding: 5px 10px;
      border-radius: 10px;
      
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
  padding: 80px 20px;
  color: #666;
  
  .icon {
    font-size: 4rem;
    color: #8B4513;
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }
`;

const Admin = () => {
  const [creations, setCreations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCreation, setEditingCreation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
    loadCreations();
  }, []);

  const loadUser = () => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  };

  const loadCreations = async () => {
    try {
      const data = await creationService.getAllAdmin();
      setCreations(data);
    } catch (error) {
      console.error('Erreur lors du chargement des créations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    window.location.reload();
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

  if (loading) {
    return (
      <AdminContainer>
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h2>Chargement...</h2>
        </div>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <HeaderContent>
          <HeaderTitle>
            <h1>Administration</h1>
            <p>Gestion des créations</p>
          </HeaderTitle>
          <HeaderActions>
            <div className="user-info">
              Connecté en tant que {user?.username}
            </div>
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt />
              Déconnexion
            </LogoutButton>
          </HeaderActions>
        </HeaderContent>
      </AdminHeader>

      <AdminContent>
        <AdminActions>
          <h2>Mes Créations</h2>
          <AddButton onClick={handleAddCreation}>
            <FaPlus />
            Ajouter une création
          </AddButton>
        </AdminActions>

        {creations.length === 0 ? (
          <EmptyState>
            <div className="icon">
              <FaImages />
            </div>
            <h3>Aucune création</h3>
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
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+non+disponible';
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
                  <h3>{creation.title}</h3>
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
    </AdminContainer>
  );
};

export default Admin;
