import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaImages, FaEnvelope, FaCog, FaSignOutAlt } from 'react-icons/fa';

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
    font-size: 24px;
    color: #8B4513;
    font-weight: bold;
  }
  
  .logo-text {
    color: white;
    font-size: 24px;
    font-weight: 700;
    
    .subtitle {
      font-size: 14px;
      font-weight: 400;
      opacity: 0.9;
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
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
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
`;

const Header = ({ onAdminClick, isAuthenticated, onLogout }) => {
  const location = useLocation();
  
  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <div className="logo-icon">🏠</div>
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
              <FaHome /> Accueil
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/galerie" 
              className={location.pathname === '/galerie' ? 'active' : ''}
            >
              <FaImages /> Galerie
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={location.pathname === '/contact' ? 'active' : ''}
            >
              <FaEnvelope /> Contact
            </NavLink>
          </li>
          <li>
            <AdminButton 
              onClick={isAuthenticated ? onLogout : onAdminClick}
              isAuthenticated={isAuthenticated}
              className={isAuthenticated ? 'authenticated' : ''}
              title={isAuthenticated ? 'Se déconnecter' : 'Administration'}
            >
              {isAuthenticated ? <FaSignOutAlt /> : <FaCog />}
              {isAuthenticated ? 'Déconnexion' : 'Admin'}
            </AdminButton>
          </li>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
