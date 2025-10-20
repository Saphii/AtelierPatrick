import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaFilter, FaSearch, FaEye, FaTimes, FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from 'react-icons/fa';
import { useCreations } from '../contexts/CreationsContext';

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const GalleryHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FiltersSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 12px 24px;
  border-radius: 25px;
  background: ${props => props.active ? '#8B4513' : 'white'};
  color: ${props => props.active ? 'white' : '#8B4513'};
  border: 2px solid #8B4513;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  
  &:hover {
    background: #8B4513;
    color: white;
    transform: translateY(-2px);
  }
  
  .count {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #A0522D;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  
  .search-input {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 25px;
    padding: 0 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    
    input {
      flex: 1;
      padding: 15px 10px;
      border: none;
      background: transparent;
      font-size: 1rem;
      
      &::placeholder {
        color: #999;
      }
    }
    
    svg {
      color: #8B4513;
      font-size: 1.2rem;
    }
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const CreationCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .image-container {
    position: relative;
    height: 250px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
    
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(139, 69, 19, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 5;
      
      svg {
        color: white;
        font-size: 2rem;
      }
    }
    
    &:hover .overlay {
      opacity: 1;
    }
  }
  
  .content {
    padding: 25px;
    
    .category {
      display: inline-block;
      background: #f0f0f0;
      color: #8B4513;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 15px;
    }
    
    h3 {
      font-size: 1.3rem;
      margin-bottom: 10px;
    }
    
    p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 15px;
    }
    
    .price {
      font-size: 1.2rem;
      font-weight: 600;
      color: #8B4513;
    }
  }
  
  .admin-actions {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
    
    button {
      background: rgba(0, 0, 0, 0.7);
      border: none;
      color: white;
      padding: 8px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background: rgba(0, 0, 0, 0.9);
        transform: scale(1.1);
      }
      
      &.edit-btn {
        background: rgba(33, 150, 243, 0.8);
        
        &:hover {
          background: rgba(33, 150, 243, 1);
        }
      }
      
      &.delete-btn {
        background: rgba(244, 67, 54, 0.8);
        
        &:hover {
          background: rgba(244, 67, 54, 1);
        }
      }
    }
  }
  
  &:hover .admin-actions {
    opacity: 1;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #666;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.1rem;
  }
`;

const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  
  .modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .close-btn {
      position: absolute;
      top: -50px;
      right: 0;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 1.5rem;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
      }
    }
    
    .image-container {
      position: relative;
      max-width: 100%;
      max-height: 80vh;
      
      img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      }
      
      .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 1.5rem;
        padding: 15px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.1);
        }
        
        &.prev {
          left: -60px;
        }
        
        &.next {
          right: -60px;
        }
      }
    }
    
    .image-info {
      margin-top: 20px;
      text-align: center;
      color: white;
      
      h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
      }
      
      p {
        font-size: 1rem;
        opacity: 0.8;
        max-width: 500px;
      }
      
      .category {
        display: inline-block;
        background: rgba(139, 69, 19, 0.8);
        color: white;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
        margin-bottom: 15px;
      }
    }
  }
  
  @media (max-width: 768px) {
    .modal-content {
      .nav-btn {
        &.prev {
          left: 10px;
        }
        
        &.next {
          right: 10px;
        }
      }
    }
  }
`;

const Gallery = ({ isAuthenticated, onEditCreation, onDeleteCreation }) => {
  const { creations, loading } = useCreations();
  const [filteredCreations, setFilteredCreations] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    filterCreations();
  }, [creations, activeFilter, searchTerm]);

  const filterCreations = () => {
    // S'assurer que creations est un tableau
    if (!Array.isArray(creations)) {
      setFilteredCreations([]);
      return;
    }

    let filtered = creations;

    // Filtre par catégorie
    if (activeFilter !== 'all') {
      filtered = filtered.filter(creation => creation.category === activeFilter);
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(creation =>
        creation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creation.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCreations(filtered);
  };

  const getCategoryLabel = (category) => {
    const labels = {
      'bois': 'Bois',
      '3d': '3D',
      'mixte': 'Mixte',
      'gravure': 'Gravure'
    };
    return labels[category] || category;
  };

  const getCategoryCount = (category) => {
    if (!Array.isArray(creations)) return 0;
    return creations.filter(creation => creation.category === category).length;
  };

  const handleEditCreation = (creation) => {
    if (onEditCreation) {
      onEditCreation(creation);
    }
  };

  const handleDeleteCreation = (creation) => {
    if (onDeleteCreation) {
      onDeleteCreation(creation);
    }
  };

  const openImageModal = (creation, index) => {
    setSelectedImage(creation);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const navigateImage = (direction) => {
    const currentList = filteredCreations;
    let newIndex = currentImageIndex;
    
    if (direction === 'prev') {
      newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentList.length - 1;
    } else {
      newIndex = currentImageIndex < currentList.length - 1 ? currentImageIndex + 1 : 0;
    }
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(currentList[newIndex]);
  };

  const handleKeyPress = (e) => {
    if (selectedImage) {
      if (e.key === 'Escape') {
        closeImageModal();
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev');
      } else if (e.key === 'ArrowRight') {
        navigateImage('next');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedImage, currentImageIndex]);

  if (loading) {
    return (
      <GalleryContainer>
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h2>Chargement des créations...</h2>
        </div>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      <GalleryHeader>
        <h1>Galerie des Créations</h1>
        <p>
          Découvrez notre collection de créations uniques en bois et impressions 3D. 
          Chaque pièce raconte une histoire et témoigne de notre passion pour l'artisanat.
        </p>
      </GalleryHeader>

      <FiltersSection>
        <FilterButton
          active={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        >
          <FaFilter /> Toutes
          {creations.length > 0 && (
            <span className="count">{creations.length}</span>
          )}
        </FilterButton>
        <FilterButton
          active={activeFilter === 'bois'}
          onClick={() => setActiveFilter('bois')}
        >
          Créations Bois
          {getCategoryCount('bois') > 0 && (
            <span className="count">{getCategoryCount('bois')}</span>
          )}
        </FilterButton>
        <FilterButton
          active={activeFilter === '3d'}
          onClick={() => setActiveFilter('3d')}
        >
          Impressions 3D
          {getCategoryCount('3d') > 0 && (
            <span className="count">{getCategoryCount('3d')}</span>
          )}
        </FilterButton>
        <FilterButton
          active={activeFilter === 'mixte'}
          onClick={() => setActiveFilter('mixte')}
        >
          Projets Mixtes
          {getCategoryCount('mixte') > 0 && (
            <span className="count">{getCategoryCount('mixte')}</span>
          )}
        </FilterButton>
        <FilterButton
          active={activeFilter === 'gravure'}
          onClick={() => setActiveFilter('gravure')}
        >
          Gravure
          {getCategoryCount('gravure') > 0 && (
            <span className="count">{getCategoryCount('gravure')}</span>
          )}
        </FilterButton>
      </FiltersSection>

      <SearchBar>
        <div className="search-input">
          <FaSearch />
          <input
            type="text"
            placeholder="Rechercher une création..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </SearchBar>

      {filteredCreations.length === 0 ? (
        <EmptyState>
          <h3>Aucune création trouvée</h3>
          <p>Essayez de modifier vos critères de recherche ou contactez-nous pour un projet sur mesure.</p>
        </EmptyState>
      ) : (
        <GalleryGrid>
          {filteredCreations.map((creation, index) => (
            <CreationCard key={creation.id}>
              <div className="image-container">
                <img src={creation.image} alt={creation.title} />
                
                {isAuthenticated && (
                  <div className="admin-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEditCreation(creation)}
                      title="Modifier cette création"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteCreation(creation)}
                      title="Supprimer cette création"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
                
                <div 
                  className="overlay"
                  onClick={() => openImageModal(creation, index)}
                >
                  <FaEye />
                </div>
              </div>
              <div className="content">
                <span className="category">{getCategoryLabel(creation.category)}</span>
                <h3>{creation.title}</h3>
                <p>{creation.description}</p>
                {creation.price && (
                  <div className="price">{creation.price.toFixed(2)}€</div>
                )}
              </div>
            </CreationCard>
          ))}
        </GalleryGrid>
      )}

      {selectedImage && (
        <ImageModal onClick={closeImageModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeImageModal}>
              <FaTimes />
            </button>
            
            <div className="image-container">
              <img src={selectedImage.image} alt={selectedImage.title} />
              
              {filteredCreations.length > 1 && (
                <>
                  <button 
                    className="nav-btn prev" 
                    onClick={() => navigateImage('prev')}
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    className="nav-btn next" 
                    onClick={() => navigateImage('next')}
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>
            
            <div className="image-info">
              <span className="category">{getCategoryLabel(selectedImage.category)}</span>
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              {selectedImage.price && (
                <div className="price">{selectedImage.price.toFixed(2)}€</div>
              )}
            </div>
          </div>
        </ImageModal>
      )}
    </GalleryContainer>
  );
};

export default Gallery;
