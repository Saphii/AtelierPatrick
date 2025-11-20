import React, { useEffect, useRef } from "react";
import { FaArrowRight, FaCube, FaHammer, FaPen, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const HomeContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 50px;
  position: relative;
  overflow-x: hidden;
  z-index: 1;
  min-height: 100vh;
  
  @media (max-width: 1600px) {
    padding: 0 30px;
  }
  
  @media (max-width: 1400px) {
    padding: 0 20px;
  }
  
  @media (max-width: 1024px) {
    padding: 0 15px;
  }
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
  
  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;


// Animations pour les éléments décoratifs
const float = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
`;

const floatReverse = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(20px) rotate(-5deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
    }
    50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Vidéos décoratives de chaque côté de la HeroSection (en dehors de la div)
const VideoContainer = styled.div`
  position: absolute;
  width: ${props => props.width || '350px'};
  height: ${props => props.height || '450px'};
  ${props => props.side === 'left' 
    ? 'left: -400px;' 
    : 'right: -400px;'}
  top: 50%;
  transform: translateY(-50%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(139, 69, 19, 0.2);
  z-index: 1;
  opacity: 0;
  animation: ${fadeInUp} 1s ease-out ${props => props.delay || '0.5s'} forwards;
  border: 3px solid rgba(139, 69, 19, 0.3);
  background: rgba(139, 69, 19, 0.1);
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(139, 69, 19, 0.1) 0%,
      transparent 50%,
      rgba(160, 82, 45, 0.1) 100%
    );
    pointer-events: none;
    z-index: 1;
  }
  
  &::after {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, rgba(139, 69, 19, 0.5), rgba(160, 82, 45, 0.5));
    border-radius: 20px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-50%) scale(1.05);
    box-shadow: 
      0 25px 80px rgba(0, 0, 0, 0.4),
      0 0 60px rgba(139, 69, 19, 0.3);
    
    &::after {
      opacity: 1;
    }
  }
  
  @media (max-width: 1600px) {
    ${props => props.side === 'left' 
      ? 'left: -360px;' 
      : 'right: -360px;'}
    width: 320px;
    height: 420px;
  }
  
  @media (max-width: 1400px) {
    ${props => props.side === 'left' 
      ? 'left: -320px;' 
      : 'right: -320px;'}
    width: 280px;
    height: 380px;
  }
  
  @media (max-width: 1200px) {
    ${props => props.side === 'left' 
      ? 'left: -280px;' 
      : 'right: -280px;'}
    width: 250px;
    height: 350px;
  }
  
  @media (max-width: 1024px) {
    /* Tablette : vidéos plus petites et mieux positionnées */
    width: 200px;
    height: 280px;
    ${props => props.side === 'left' 
      ? 'left: -230px;' 
      : 'right: -230px;'}
  }
  
  @media (max-width: 968px) {
    display: none; /* Masquer sur tablette petite et mobile */
  }
`;


const HeroSection = styled.section`
  position: relative;
  min-height: calc(100vh - 200px);
  max-height: calc(100vh - 200px);
  max-width: 900px;
  margin: 20px auto 40px auto;
  display: flex;
  align-items: center;
  background: linear-gradient(
      135deg,
      rgba(139, 69, 19, 0.95),
      rgba(160, 82, 45, 0.95)
    ),
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="wood" patternUnits="userSpaceOnUse" width="20" height="20"><rect width="20" height="20" fill="%23f4f1ed"/><path d="M0 10h20M10 0v20" stroke="%23d4c4b0" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23wood)"/></svg>');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 60px 40px;
  border-radius: 30px;
  overflow: visible;
  z-index: 2;
  
  @media (max-width: 1024px) {
    max-width: 95%;
    padding: 50px 30px;
    margin: 20px auto 40px auto;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 40px 20px;
    margin: 15px 15px 30px 15px;
    min-height: calc(100vh - 180px);
    max-height: calc(100vh - 180px);
  }
  
  @media (max-width: 480px) {
    padding: 30px 15px;
    margin: 10px 10px 20px 10px;
    border-radius: 20px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
    animation: shimmer 3s infinite;
  }

  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
    animation: ${rotate} 30s linear infinite;
    pointer-events: none;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
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
    animation: ${fadeInUp} 1s ease-out 0.2s both;

    .main-logo {
      width: 240px;
      height: 240px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 30px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 60px rgba(255, 255, 255, 0.1);
      animation: float 3s ease-in-out infinite;
      overflow: hidden;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        inset: -5px;
        border-radius: 50%;
        background: linear-gradient(45deg, rgba(255, 255, 255, 0.3), transparent);
        animation: ${rotate} 10s linear infinite;
        z-index: -1;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        position: relative;
        z-index: 1;
      }
    }

    @keyframes float {
      0%,
      100% {
        transform: translateY(0px) scale(1);
      }
      50% {
        transform: translateY(-15px) scale(1.02);
      }
    }
  }

  h1 {
    font-size: 4rem;
    margin-bottom: 25px;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.2);
    font-weight: 700;
    letter-spacing: -1px;
    animation: ${fadeInUp} 1s ease-out;
    position: relative;
    
    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 4px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
      animation: expandLine 1.5s ease-out 0.5s both;
    }

    @keyframes expandLine {
      from {
        width: 0;
      }
      to {
        width: 100px;
      }
    }

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
    animation: ${fadeInUp} 1s ease-out 0.3s both;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);

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
  color: #8b4513;
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
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(139, 69, 19, 0.1),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #8b4513, #a0522d);
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
  margin-top: 120px; /* Espacement pour apparaître sur la deuxième page */
  margin-bottom: 80px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    margin-top: 100px;
  }
  
  @media (max-width: 480px) {
    margin-top: 80px;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 60px;
  position: relative;
  animation: ${fadeInUp} 0.8s ease-out;
  color: #8b4513;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    background: linear-gradient(90deg, transparent, #8b4513, transparent);
    border-radius: 2px;
    animation: expandTitle 1s ease-out 0.5s both;
  }
  
  @keyframes expandTitle {
    from {
      width: 0;
    }
    to {
      width: 120px;
    }
  }

  &::before {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 2px;
    background: rgba(139, 69, 19, 0.2);
    border-radius: 2px;
  }
  
  @media (max-width: 1024px) {
    font-size: 2.2rem;
    margin-bottom: 50px;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.7rem;
    margin-bottom: 30px;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    padding: 0 15px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 25px;
    padding: 0 10px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0;
  }
`;

const ServiceCard = styled.div`
  background: white;
  padding: 50px 40px;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(139, 69, 19, 0.1);
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(139, 69, 19, 0.05),
      transparent
    );
    transition: left 0.6s ease;
  }

  &::after {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(139, 69, 19, 0.1) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 25px 50px rgba(139, 69, 19, 0.2);

    &::before {
      left: 100%;
    }

    &::after {
      opacity: 1;
    }
  }

  .icon {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #8b4513, #a0522d);
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
    color: #8b4513;
    font-weight: 600;
    
    @media (max-width: 768px) {
      font-size: 1.6rem;
      margin-bottom: 20px;
    }
    
    @media (max-width: 480px) {
      font-size: 1.4rem;
      margin-bottom: 15px;
    }
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
    color: #8b4513;
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
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(139, 69, 19, 0.05) 0%,
      transparent 70%
    );
    animation: rotate 20s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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
  border-left: 5px solid #8b4513;

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
      color: #8b4513;
      position: absolute;
      top: -10px;
      left: -15px;
      opacity: 0.3;
    }
  }

  .author {
    font-weight: 600;
    color: #8b4513;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 10px;

    &::before {
      content: "—";
      color: #a0522d;
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
  const servicesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-service-card]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <HomeContainer>
      <HeroSection>
        {/* Vidéo à gauche (dans HeroSection pour scroll avec elle) */}
        <VideoContainer side="left" delay="0.3s">
          <video autoPlay loop muted playsInline>
            <source src="/videos/laser.mp4" type="video/mp4" />
          </video>
        </VideoContainer>

        {/* Vidéo à droite (dans HeroSection pour scroll avec elle) */}
        <VideoContainer side="right" delay="0.5s">
          <video autoPlay loop muted playsInline>
            <source src="/videos/imprimante.mp4" type="video/mp4" />
          </video>
        </VideoContainer>
        <div className="hero-content">
          <div className="logo-section">
            <div className="main-logo">
              <img
                src="/images/logo_patrick.png"
                alt="Logo L'Atelier de Patrick"
              />
            </div>
          </div>
          <h1>L'Atelier de Patrick</h1>
          <div className="subtitle">Créations Bois & Impressions 3D</div>
          {/* <p>
            Découvrez l'artisanat d'exception avec nos créations en bois 
            et impressions 3D personnalisées. Chaque pièce est unique, 
            façonnée avec passion et savoir-faire artisanal.
          </p> */}
          <CTAButton to="/galerie">
            Découvrir nos créations <FaArrowRight />
          </CTAButton>
        </div>
      </HeroSection>

      <ServicesSection ref={servicesRef}>
        <SectionTitle>Nos Services</SectionTitle>
        <ServicesGrid>
          <ServiceCard data-service-card delay="0.1s">
            <div className="icon">
              <FaHammer />
            </div>
            <h3>Créations en Bois</h3>
            <p>
              Mobilier sur mesure, objets décoratifs, sculptures... Chaque
              création en bois est unique et réalisée selon vos souhaits.
            </p>
            <div className="price">Sur mesure</div>
          </ServiceCard>

          <ServiceCard data-service-card delay="0.2s">
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

          <ServiceCard data-service-card delay="0.3s">
            <div className="icon">
              <FaStar />
            </div>
            <h3>Projets Mixtes</h3>
            <p>
              Combinaison parfaite entre tradition du bois et innovation 3D pour
              des créations originales et fonctionnelles.
            </p>
            <div className="price">Sur mesure</div>
          </ServiceCard>

          <ServiceCard data-service-card delay="0.4s">
            <div className="icon">
              <FaPen />
            </div>
            <h3>Gravure</h3>
            <p>
              Gravure personnalisée sur bois, métal ou autres matériaux. Textes,
              logos, motifs décoratifs pour des créations uniques.
            </p>
            <div className="price">Sur mesure</div>
          </ServiceCard>
        </ServicesGrid>
      </ServicesSection>
      </HomeContainer>
    </>
  );
};

export default Home;
