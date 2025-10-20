import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';
import { authService } from './services/api';

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

function App() {
  const [showAdminModal, setShowAdminModal] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(authService.isAuthenticated());

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAdminModal(false);
  };

  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Header 
          onAdminClick={() => setShowAdminModal(true)}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/galerie" element={<Gallery />} />
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
      </AppContainer>
    </Router>
  );
}

export default App;
