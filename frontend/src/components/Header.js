import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaImages, FaEnvelope, FaCog, FaSignOutAlt, FaPlus } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  
  @media (max-width: 768px) {
    padding: 0 15px;
    height: 70px;
  }
  
  @media (max-width: 480px) {
    padding: 0 10px;
    height: 60px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  
  .logo-icon {
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    
    @media (max-width: 768px) {
      width: 45px;
      height: 45px;
    }
    
    @media (max-width: 480px) {
      width: 40px;
      height: 40px;
    }
  }
  
  .logo-text {
    color: white;
    font-size: 24px;
    font-weight: 700;
    
    .subtitle {
      font-size: 14px;
      font-weight: 400;
      opacity: 0.9;
      
      @media (max-width: 768px) {
        font-size: 12px;
      }
      
      @media (max-width: 480px) {
        display: none;
      }
    }
    
    @media (max-width: 768px) {
      font-size: 20px;
    }
    
    @media (max-width: 480px) {
      font-size: 18px;
    }
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 30px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const NavLink = styled(Link)`
  color: white;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 0.9rem;
    gap: 6px;
  }
  
  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.8rem;
    gap: 4px;
    
    span {
      display: none;
    }
  }
`;

const AdminButton = styled.button`
  background: ${props => props.isAuthenticated ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
  
  &.authenticated {
    background: rgba(76, 175, 80, 0.2);
    border-color: rgba(76, 175, 80, 0.5);
  }
  
  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 0.8rem;
    gap: 4px;
  }
  
  @media (max-width: 480px) {
    padding: 5px 8px;
    font-size: 0.7rem;
    gap: 3px;
    
    span {
      display: none;
    }
  }
`;

const Header = ({ onAdminClick, onCreateClick, isAuthenticated, onLogout }) => {
  const location = useLocation();
  
  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <div className="logo-icon">
            <img src="/images/logo_patrick.png" alt="Logo L'Atelier de Patrick" />
          </div>
          <div className="logo-text">
            L'Atelier de Patrick
            <div className="subtitle">Créations Bois & 3D</div>
          </div>
        </Logo>
        
        <NavLinks>
          <li>
            <NavLink 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              <FaHome /> <span>Accueil</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/galerie" 
              className={location.pathname === '/galerie' ? 'active' : ''}
            >
              <FaImages /> <span>Galerie</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              <FaEnvelope /> <span>Contact</span>
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <AdminButton 
                onClick={onCreateClick}
                isAuthenticated={true}
                className="authenticated"
                title="Créer une nouvelle création"
              >
                <FaPlus />
                <span>Créer</span>
              </AdminButton>
            </li>
          )}
          <li>
            <AdminButton 
              onClick={isAuthenticated ? onLogout : onAdminClick}
              isAuthenticated={isAuthenticated}
              className={isAuthenticated ? 'authenticated' : ''}
              title={isAuthenticated ? 'Se déconnecter' : 'Administration'}
            >
              {isAuthenticated ? <FaSignOutAlt /> : <FaCog />}
              <span>{isAuthenticated ? 'Déconnexion' : 'Admin'}</span>
            </AdminButton>
          </li>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
