import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #2c2c2c;
  color: white;
  padding: 40px 0 20px;
  margin-top: 60px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const FooterSection = styled.div`
  h3 {
    color: #8B4513;
    margin-bottom: 20px;
    font-size: 18px;
  }
  
  p, li {
    margin-bottom: 10px;
    opacity: 0.9;
  }
  
  ul {
    list-style: none;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  
  svg {
    color: #8B4513;
    font-size: 16px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #8B4513;
    border-radius: 50%;
    color: white;
    transition: all 0.3s ease;
    
    &:hover {
      background: #A0522D;
      transform: translateY(-2px);
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #444;
  margin-top: 30px;
  opacity: 0.7;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>L'Atelier de Patrick</h3>
          <p>
            Spécialisé dans les créations en bois et les impressions 3D, 
            Patrick vous accompagne dans vos projets personnalisés avec 
            passion et savoir-faire artisanal.
          </p>
          <SocialLinks>
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <h3>Contact</h3>
          <ContactInfo>
            <FaMapMarkerAlt />
            <span>Balgau (Alsace)</span>
          </ContactInfo>
          <ContactInfo>
            <FaPhone />
            <span>06 XX XX XX XX</span>
          </ContactInfo>
          <ContactInfo>
            <FaEnvelope />
            <span>contact@atelier-patrick.fr</span>
          </ContactInfo>
        </FooterSection>
        
        <FooterSection>
          <h3>Services</h3>
          <ul>
            <li>• Créations sur mesure en bois</li>
            <li>• Impressions 3D personnalisées</li>
            <li>• Réparations et restaurations</li>
            <li>• Conseils et devis gratuits</li>
          </ul>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; 2025 L'Atelier de Patrick. Tous droits réservés.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
