import React, { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaEye,
  FaFilter,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import styled from "styled-components";
import { useCreations } from "../contexts/CreationsContext";
import { resolveImageUrl } from "../services/api";

const GalleryContainer = styled.div`
  background: linear-gradient(180deg, #f7f3ef 0%, #ffffff 100%);
  padding: 48px 0 96px;
`;

const GalleryInner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
`;

const GalleryHeader = styled.header`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 2.75rem;
    margin-bottom: 12px;
    color: #4a2f18;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 1.15rem;
    color: #5b5147;
    max-width: 620px;
    margin: 0 auto;
    line-height: 1.7;
  }
`;

const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const FiltersSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid ${(props) => (props.active ? "#8B4513" : "#e0d5cb")};
  background: ${(props) => (props.active ? "#8B4513" : "white")};
  color: ${(props) => (props.active ? "white" : "#5b5147")};
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #8b4513;
    color: ${(props) => (props.active ? "white" : "#8B4513")};
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(139, 69, 19, 0.12);
  }

  .count {
    min-width: 22px;
    height: 22px;
    border-radius: 999px;
    background: ${(props) =>
      props.active ? "rgba(255,255,255,0.25)" : "#efe5dd"};
    color: ${(props) => (props.active ? "white" : "#8B4513")};
    font-size: 0.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const SearchBar = styled.div`
  flex: 1;

  .search-input {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 18px;
    padding: 0 20px;
    border: 1px solid #e6ded6;
    box-shadow: 0 8px 18px rgba(90, 72, 54, 0.08);
    transition: border 0.2s ease;

    &:focus-within {
      border-color: #b17a4b;
    }

    input {
      flex: 1;
      padding: 14px 12px;
      border: none;
      background: transparent;
      font-size: 1rem;
      color: #3f2c1d;

      &::placeholder {
        color: #9c8d82;
      }
    }

    svg {
      color: #b17a4b;
      font-size: 1.2rem;
    }
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 28px;
`;

const CreationCard = styled.article`
  background: white;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(57, 38, 23, 0.12);
  overflow: hidden;
  position: relative;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 38px rgba(57, 38, 23, 0.18);
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  padding-top: 68%;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
  }

  ${CreationCard}:hover & img {
    transform: scale(1.06);
  }
`;

const ImageOverlay = styled.button`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    180deg,
    rgba(19, 12, 7, 0) 20%,
    rgba(19, 12, 7, 0.65) 100%
  );
  color: white;
  font-size: 1.6rem;
  border: none;
  opacity: 0;
  transition: opacity 0.25s ease;
  cursor: pointer;

  ${CreationCard}:hover & {
    opacity: 1;
  }
`;

const AdminActions = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 10;

  button {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    background: rgba(22, 14, 5, 0.65);
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, background 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      background: rgba(22, 14, 5, 0.85);
    }

    &.edit-btn {
      background: rgba(33, 150, 243, 0.85);
      &:hover {
        background: rgba(33, 150, 243, 1);
      }
    }

    &.delete-btn {
      background: rgba(220, 53, 69, 0.85);
      &:hover {
        background: rgba(220, 53, 69, 1);
      }
    }
  }

  ${CreationCard}:hover & {
    opacity: 1;
  }
`;

const CategoryBadge = styled.span`
  position: absolute;
  left: 16px;
  bottom: 16px;
  background: rgba(255, 255, 255, 0.88);
  color: #5b3c24;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CardContent = styled.div`
  padding: 22px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.15rem;
  color: #3b2716;
  margin: 0;
`;

const CardDescription = styled.p`
  color: #7a6a5f;
  font-size: 0.95rem;
  line-height: 1.55;
  flex: 1;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 120px 20px;
  color: #7a6a5f;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 14px;
    color: #4a2f18;
  }

  p {
    font-size: 1rem;
    max-width: 440px;
    margin: 0 auto;
    line-height: 1.6;
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
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
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
    if (activeFilter !== "all") {
      filtered = filtered.filter(
        (creation) => creation.category === activeFilter
      );
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (creation) =>
          creation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creation.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCreations(filtered);
  };

  const getCategoryLabel = (category) => {
    const labels = {
      bois: "Bois",
      "3d": "3D",
      mixte: "Mixte",
      gravure: "Gravure",
    };
    return labels[category] || category;
  };

  const getCategoryCount = (category) => {
    if (!Array.isArray(creations)) return 0;
    return creations.filter((creation) => creation.category === category)
      .length;
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

    if (direction === "prev") {
      newIndex =
        currentImageIndex > 0 ? currentImageIndex - 1 : currentList.length - 1;
    } else {
      newIndex =
        currentImageIndex < currentList.length - 1 ? currentImageIndex + 1 : 0;
    }

    setCurrentImageIndex(newIndex);
    setSelectedImage(currentList[newIndex]);
  };

  const handleKeyPress = (e) => {
    if (selectedImage) {
      if (e.key === "Escape") {
        closeImageModal();
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [selectedImage, currentImageIndex]);

  if (loading) {
    return (
      <GalleryContainer>
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <h2>Chargement des créations...</h2>
        </div>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      <GalleryInner>
        <GalleryHeader>
          <h1>Galerie des Créations</h1>
          <p>
            Parcourez nos pièces uniques mêlant artisanat du bois et
            impression&nbsp;3D. Chaque réalisation est soigneusement conçue et
            photographiée dans l’atelier.
          </p>
        </GalleryHeader>

        <Toolbar>
          <FiltersSection>
            <FilterButton
              active={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
            >
              <FaFilter /> Toutes
              {creations.length > 0 && (
                <span className="count">{creations.length}</span>
              )}
            </FilterButton>
            <FilterButton
              active={activeFilter === "bois"}
              onClick={() => setActiveFilter("bois")}
            >
              Créations Bois
              {getCategoryCount("bois") > 0 && (
                <span className="count">{getCategoryCount("bois")}</span>
              )}
            </FilterButton>
            <FilterButton
              active={activeFilter === "3d"}
              onClick={() => setActiveFilter("3d")}
            >
              Impressions 3D
              {getCategoryCount("3d") > 0 && (
                <span className="count">{getCategoryCount("3d")}</span>
              )}
            </FilterButton>
            <FilterButton
              active={activeFilter === "mixte"}
              onClick={() => setActiveFilter("mixte")}
            >
              Projets Mixtes
              {getCategoryCount("mixte") > 0 && (
                <span className="count">{getCategoryCount("mixte")}</span>
              )}
            </FilterButton>
            <FilterButton
              active={activeFilter === "gravure"}
              onClick={() => setActiveFilter("gravure")}
            >
              Gravure
              {getCategoryCount("gravure") > 0 && (
                <span className="count">{getCategoryCount("gravure")}</span>
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
        </Toolbar>

        {filteredCreations.length === 0 ? (
          <EmptyState>
            <h3>Aucune création trouvée</h3>
            <p>
              Essayez de modifier vos critères de recherche ou contactez-nous
              pour un projet sur mesure.
            </p>
          </EmptyState>
        ) : (
          <GalleryGrid>
            {filteredCreations.map((creation, index) => (
              <CreationCard key={creation.id}>
                <CardImageWrapper>
                  <img
                    src={resolveImageUrl(creation.image) || ""}
                    alt={creation.title}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/600x400?text=Image+indisponible";
                    }}
                  />
                  <CategoryBadge>
                    {getCategoryLabel(creation.category)}
                  </CategoryBadge>

                  {isAuthenticated && (
                    <AdminActions>
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
                    </AdminActions>
                  )}

                  <ImageOverlay
                    type="button"
                    onClick={() => openImageModal(creation, index)}
                    aria-label={`Voir ${creation.title} en grand`}
                  >
                    <FaEye />
                  </ImageOverlay>
                </CardImageWrapper>

                <CardContent>
                  <CardTitle>{creation.title}</CardTitle>
                  <CardDescription>{creation.description}</CardDescription>
                </CardContent>
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
                <img
                  src={resolveImageUrl(selectedImage.image) || ""}
                  alt={selectedImage.title}
                />

                {filteredCreations.length > 1 && (
                  <>
                    <button
                      className="nav-btn prev"
                      onClick={() => navigateImage("prev")}
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="nav-btn next"
                      onClick={() => navigateImage("next")}
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>

              <div className="image-info">
                <span className="category">
                  {getCategoryLabel(selectedImage.category)}
                </span>
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
              </div>
            </div>
          </ImageModal>
        )}
      </GalleryInner>
    </GalleryContainer>
  );
};

export default Gallery;
