import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminModal from './components/AdminModal';
import CreationForm from './components/CreationForm';
import ConfirmationModal from './components/ConfirmationModal';
import Footer from './components/Footer';
import { CreationsProvider } from './contexts/CreationsContext';
import { authService, creationService } from './services/api';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #faf9f7;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: #8B4513;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input, textarea {
    font-family: inherit;
    outline: none;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }, [pathname]);

  return null;
};

function App() {
  const [showAdminModal, setShowAdminModal] = React.useState(false);
  const [showCreationForm, setShowCreationForm] = React.useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(false);
  const [editingCreation, setEditingCreation] = React.useState(null);
  const [deletingCreation, setDeletingCreation] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(authService.isAuthenticated());

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAdminModal(false);
    setShowCreationForm(false);
    setShowConfirmationModal(false);
    setEditingCreation(null);
    setDeletingCreation(null);
  };

  const handleCreateClick = () => {
    setEditingCreation(null);
    setShowCreationForm(true);
  };

  const handleEditCreation = (creation) => {
    setEditingCreation(creation);
    setShowCreationForm(true);
  };

  const handleDeleteClick = (creation) => {
    setDeletingCreation(creation);
    setShowConfirmationModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCreation) return;
    
    try {
      await creationService.delete(deletingCreation.id);
      // Forcer le rafraîchissement du contexte
      window.dispatchEvent(new CustomEvent('refreshCreations'));
      setDeletingCreation(null);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression de la création');
    }
  };

  const handleCreationFormClose = () => {
    setShowCreationForm(false);
    setEditingCreation(null);
  };

  const handleCreationFormSuccess = () => {
    setShowCreationForm(false);
    setEditingCreation(null);
    // Le contexte va automatiquement mettre à jour la liste
  };

  return (
    <CreationsProvider>
      <Router>
        <ScrollToTop />
        <GlobalStyle />
        <AppContainer>
          <Header 
            onAdminClick={() => setShowAdminModal(true)}
            onCreateClick={handleCreateClick}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
          <MainContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/galerie" element={
                <Gallery 
                  isAuthenticated={isAuthenticated}
                  onEditCreation={handleEditCreation}
                  onDeleteCreation={handleDeleteClick}
                />
              } />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </MainContent>
          <Footer />
          
          {showAdminModal && (
            <AdminModal
              onClose={() => setShowAdminModal(false)}
              onLoginSuccess={handleLoginSuccess}
              onLogout={handleLogout}
              isAuthenticated={isAuthenticated}
            />
          )}
          
          {showCreationForm && (
            <CreationForm
              creation={editingCreation}
              onClose={handleCreationFormClose}
              onSuccess={handleCreationFormSuccess}
            />
          )}
          
          {showConfirmationModal && (
            <ConfirmationModal
              isOpen={showConfirmationModal}
              onClose={() => {
                setShowConfirmationModal(false);
                setDeletingCreation(null);
              }}
              onConfirm={handleDeleteConfirm}
              creationTitle={deletingCreation?.title || ''}
            />
          )}
        </AppContainer>
      </Router>
    </CreationsProvider>
  );
}

export default App;
