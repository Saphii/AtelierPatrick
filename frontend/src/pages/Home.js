import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHammer, FaCube, FaArrowRight, FaStar } from 'react-icons/fa';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.9), rgba(160, 82, 45, 0.9)), 
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="wood" patternUnits="userSpaceOnUse" width="20" height="20"><rect width="20" height="20" fill="%23f4f1ed"/><path d="M0 10h20M10 0v20" stroke="%23d4c4b0" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23wood)"/></svg>');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 100px 0;
  margin-bottom: 80px;
  border-radius: 20px;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  p {
    font-size: 1.3rem;
    margin-bottom: 40px;
    opacity: 0.95;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: white;
  color: #8B4513;
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
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
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #8B4513, #A0522D);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 30px;
    color: white;
    font-size: 2rem;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  p {
    color: #666;
    line-height: 1.8;
    margin-bottom: 25px;
  }
  
  .price {
    font-size: 1.2rem;
    font-weight: 600;
    color: #8B4513;
    margin-bottom: 20px;
  }
`;

const TestimonialsSection = styled.section`
  background: #f8f6f3;
  padding: 80px 0;
  border-radius: 20px;
  margin-bottom: 80px;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  .stars {
    color: #ffc107;
    margin-bottom: 15px;
    font-size: 1.2rem;
  }
  
  .quote {
    font-style: italic;
    margin-bottom: 20px;
    color: #555;
  }
  
  .author {
    font-weight: 600;
    color: #8B4513;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <h1>L'Atelier de Patrick</h1>
        <p>
          Découvrez l'artisanat d'exception avec nos créations en bois 
          et impressions 3D personnalisées. Chaque pièce est unique, 
          façonnée avec passion et savoir-faire.
        </p>
        <CTAButton to="/galerie">
          Découvrir nos créations <FaArrowRight />
        </CTAButton>
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
            <div className="price">Devis gratuit</div>
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
            <div className="price">À partir de 5€</div>
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
        </ServicesGrid>
      </ServicesSection>

      <TestimonialsSection>
        <SectionTitle>Ce que disent nos clients</SectionTitle>
        <TestimonialsGrid>
          <TestimonialCard>
            <div className="stars">★★★★★</div>
            <p className="quote">
              "Un travail exceptionnel ! Patrick a su comprendre exactement 
              ce que je voulais et l'a réalisé avec une précision remarquable."
            </p>
            <div className="author">- Marie L.</div>
          </TestimonialCard>
          
          <TestimonialCard>
            <div className="stars">★★★★★</div>
            <p className="quote">
              "Service impeccable et créativité au rendez-vous. 
              Je recommande vivement l'Atelier de Patrick !"
            </p>
            <div className="author">- Jean-Pierre M.</div>
          </TestimonialCard>
          
          <TestimonialCard>
            <div className="stars">★★★★★</div>
            <p className="quote">
              "Des créations uniques qui allient tradition et modernité. 
              Un artisan passionné et à l'écoute."
            </p>
            <div className="author">- Sophie D.</div>
          </TestimonialCard>
        </TestimonialsGrid>
      </TestimonialsSection>
    </HomeContainer>
  );
};

export default Home;
