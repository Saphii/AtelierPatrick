import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaFilter, FaSearch, FaEye } from 'react-icons/fa';
import axios from 'axios';

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
  
  &:hover {
    background: #8B4513;
    color: white;
    transform: translateY(-2px);
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

const Gallery = () => {
  const [creations, setCreations] = useState([]);
  const [filteredCreations, setFilteredCreations] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreations();
  }, []);

  useEffect(() => {
    filterCreations();
  }, [creations, activeFilter, searchTerm]);

  const fetchCreations = async () => {
    try {
      const response = await axios.get('/api/creations/');
      setCreations(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des créations:', error);
      // Données de démonstration en cas d'erreur
      setCreations([
        {
          id: 1,
          title: "Table en chêne massif",
          description: "Table à manger sur mesure en chêne massif, finition naturelle",
          category: "bois",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
          price: 450.00
        },
        {
          id: 2,
          title: "Figurine personnalisée",
          description: "Impression 3D d'une figurine personnalisée selon vos spécifications",
          category: "3d",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
          price: 25.00
        },
        {
          id: 3,
          title: "Étagère mixte bois/3D",
          description: "Étagère moderne combinant structure en bois et éléments imprimés en 3D",
          category: "mixte",
          image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
          price: 120.00
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterCreations = () => {
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
      'mixte': 'Mixte'
    };
    return labels[category] || category;
  };

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
        </FilterButton>
        <FilterButton
          active={activeFilter === 'bois'}
          onClick={() => setActiveFilter('bois')}
        >
          Créations Bois
        </FilterButton>
        <FilterButton
          active={activeFilter === '3d'}
          onClick={() => setActiveFilter('3d')}
        >
          Impressions 3D
        </FilterButton>
        <FilterButton
          active={activeFilter === 'mixte'}
          onClick={() => setActiveFilter('mixte')}
        >
          Projets Mixtes
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
          {filteredCreations.map(creation => (
            <CreationCard key={creation.id}>
              <div className="image-container">
                <img src={creation.image} alt={creation.title} />
                <div className="overlay">
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
    </GalleryContainer>
  );
};

export default Gallery;
