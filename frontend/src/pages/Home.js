import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHammer, FaCube, FaArrowRight, FaStar, FaPen } from 'react-icons/fa';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.95), rgba(160, 82, 45, 0.95)), 
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="wood" patternUnits="userSpaceOnUse" width="20" height="20"><rect width="20" height="20" fill="%23f4f1ed"/><path d="M0 10h20M10 0v20" stroke="%23d4c4b0" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23wood)"/></svg>');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 120px 0;
  margin: 40px 20px 100px 20px;
  border-radius: 30px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    animation: shimmer 3s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .logo-section {
    margin-bottom: 40px;
    
    .main-logo {
      width: 240px;
      height: 240px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 30px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      animation: float 3s ease-in-out infinite;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
  }
  
  h1 {
    font-size: 4rem;
    margin-bottom: 25px;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    font-weight: 700;
    letter-spacing: -1px;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
  
  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 40px;
    opacity: 0.95;
    font-weight: 300;
    letter-spacing: 0.5px;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
  
  p {
    font-size: 1.3rem;
    margin-bottom: 50px;
    opacity: 0.95;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #fff, #f8f6f3);
  color: #8B4513;
  padding: 18px 35px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.2rem;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(139, 69, 19, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(139, 69, 19, 0.1), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #8B4513, #A0522D);
    color: white;
    
    &::before {
      left: 100%;
    }
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
  
  @media (max-width: 768px) {
    padding: 15px 30px;
    font-size: 1.1rem;
  }
`;

const ServicesSection = styled.section`
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: #8B4513;
    border-radius: 2px;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const ServiceCard = styled.div`
  background: white;
  padding: 50px 40px;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(139, 69, 19, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(139, 69, 19, 0.05), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    
    &::before {
      left: 100%;
    }
  }
  
  .icon {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #8B4513, #A0522D);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 35px;
    color: white;
    font-size: 2.5rem;
    box-shadow: 0 10px 25px rgba(139, 69, 19, 0.3);
    transition: all 0.3s ease;
  }
  
  &:hover .icon {
    transform: scale(1.1);
    box-shadow: 0 15px 35px rgba(139, 69, 19, 0.4);
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    color: #8B4513;
    font-weight: 600;
  }
  
  p {
    color: #666;
    line-height: 1.8;
    margin-bottom: 30px;
    font-size: 1.1rem;
  }
  
  .price {
    font-size: 1.4rem;
    font-weight: 700;
    color: #8B4513;
    margin-bottom: 20px;
    padding: 15px 25px;
    background: linear-gradient(135deg, #f8f6f3, #f0f0f0);
    border-radius: 25px;
    display: inline-block;
  }
  
  @media (max-width: 768px) {
    padding: 40px 30px;
    
    .icon {
      width: 80px;
      height: 80px;
      font-size: 2rem;
    }
    
    h3 {
      font-size: 1.5rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

const TestimonialsSection = styled.section`
  background: linear-gradient(135deg, #f8f6f3 0%, #f0f0f0 100%);
  padding: 100px 0;
  border-radius: 30px;
  margin-bottom: 100px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(139, 69, 19, 0.05) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .testimonials-content {
    position: relative;
    z-index: 2;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 60px;
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  border-left: 5px solid #8B4513;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
  
  .stars {
    color: #ffc107;
    margin-bottom: 20px;
    font-size: 1.3rem;
    display: flex;
    gap: 2px;
  }
  
  .quote {
    font-style: italic;
    margin-bottom: 25px;
    color: #555;
    font-size: 1.1rem;
    line-height: 1.7;
    position: relative;
    
    &::before {
      content: '"';
      font-size: 3rem;
      color: #8B4513;
      position: absolute;
      top: -10px;
      left: -15px;
      opacity: 0.3;
    }
  }
  
  .author {
    font-weight: 600;
    color: #8B4513;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;
    
    &::before {
      content: '—';
      color: #A0522D;
      font-size: 1.2rem;
    }
  }
  
  @media (max-width: 768px) {
    padding: 30px;
    
    .quote {
      font-size: 1rem;
    }
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <div className="hero-content">
          <div className="logo-section">
            <div className="main-logo">
              <img src="/images/logo_patrick.png" alt="Logo L'Atelier de Patrick" />
            </div>
          </div>
          <h1>L'Atelier de Patrick</h1>
          <div className="subtitle">Créations Bois & Impressions 3D</div>
          <p>
            Découvrez l'artisanat d'exception avec nos créations en bois 
            et impressions 3D personnalisées. Chaque pièce est unique, 
            façonnée avec passion et savoir-faire artisanal.
          </p>
          <CTAButton to="/galerie">
            Découvrir nos créations <FaArrowRight />
          </CTAButton>
        </div>
      </HeroSection>

      <ServicesSection>
        <SectionTitle>Nos Services</SectionTitle>
        <ServicesGrid>
          <ServiceCard>
            <div className="icon">
              <FaHammer />
            </div>
            <h3>Créations en Bois</h3>
            <p>
              Mobilier sur mesure, objets décoratifs, sculptures... 
              Chaque création en bois est unique et réalisée selon vos souhaits.
            </p>
            <div className="price">Sur mesure</div>
          </ServiceCard>
          
          <ServiceCard>
            <div className="icon">
              <FaCube />
            </div>
            <h3>Impression 3D</h3>
            <p>
              Prototypage rapide, pièces techniques, objets décoratifs... 
              L'impression 3D pour donner vie à vos idées les plus créatives.
            </p>
            <div className="price">Sur mesure</div>
          </ServiceCard>
          
          <ServiceCard>
            <div className="icon">
              <FaStar />
            </div>
            <h3>Projets Mixtes</h3>
            <p>
              Combinaison parfaite entre tradition du bois et innovation 3D 
              pour des créations originales et fonctionnelles.
            </p>
            <div className="price">Sur mesure</div>
          </ServiceCard>
          
          <ServiceCard>
            <div className="icon">
              <FaPen />
            </div>
            <h3>Gravure</h3>
            <p>
              Gravure personnalisée sur bois, métal ou autres matériaux. 
              Textes, logos, motifs décoratifs pour des créations uniques.
            </p>
            <div className="price">Sur mesure</div>
          </ServiceCard>
        </ServicesGrid>
      </ServicesSection>

    </HomeContainer>
  );
};

export default Home;
