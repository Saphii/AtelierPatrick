import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaCube, FaHammer, FaPen, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  overflow-x: hidden;
  z-index: 1;
  min-height: 100vh;
  
  /* Permet le scroll vertical mais cache le débordement horizontal */
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

// Container pour les billes (position absolute pour couvrir toute la page)
const MarblesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: visible;
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

// Animation d'apparition/disparition douce pour les billes décoratives
const fadeInOut = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  10% {
    opacity: 1;
    transform: scale(1);
  }
  90% {
    opacity: 1;
    transform: scale(1);
  }
    100% {
    opacity: 0;
    transform: scale(0.8);
  }
`;

// Billes décoratives en fond d'écran (statiques, avec fade in/out)
const DecorativeMarble = styled.div`
  position: absolute;
  width: ${props => props.size || '60px'};
  height: ${props => props.size || '60px'};
  border-radius: 50%;
  background: ${props => props.gradient || 'linear-gradient(135deg, rgba(139, 69, 19, 0.6), rgba(160, 82, 45, 0.6))'};
  box-shadow: 
    0 8px 20px rgba(139, 69, 19, 0.3),
    inset 0 2px 10px rgba(255, 255, 255, 0.2),
    inset 0 -2px 10px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  left: ${props => typeof props.left === 'number' ? `${props.left}px` : props.left || 'auto'};
  top: ${props => typeof props.top === 'number' ? `${props.top}px` : props.top || 'auto'};
  animation: ${fadeInOut} ${props => props.duration || '8s'} ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  backdrop-filter: blur(2px);
  will-change: opacity, transform; /* Optimisation pour les animations */
  
  /* Limiter la zone pour éviter header (80px) et footer (environ 200px) */
  /* Les positions top/bottom sont gérées via les props */
  
  svg {
    width: 75%;
    height: 75%;
    opacity: 0.85;
    filter: brightness(1.1) contrast(1.1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
  
  svg path[fill="currentColor"] {
    fill: rgba(255, 255, 255, 0.9);
  }
  
  img {
    width: 75%;
    height: 75%;
    object-fit: contain;
    opacity: 0.85;
    filter: brightness(1.1) contrast(1.1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
  
  /* Responsive : visible sur tous les écrans mais plus petites sur mobile */
  @media (max-width: 768px) {
    width: ${props => {
      const sizeNum = parseInt(props.size) || 60;
      return `${sizeNum * 0.7}px`;
    }};
    height: ${props => {
      const sizeNum = parseInt(props.size) || 60;
      return `${sizeNum * 0.7}px`;
    }};
    opacity: 0.6;
    display: flex; /* S'assurer qu'elles sont visibles */
  }
  
  @media (max-width: 480px) {
    width: ${props => {
      const sizeNum = parseInt(props.size) || 60;
      return `${sizeNum * 0.6}px`;
    }};
    height: ${props => {
      const sizeNum = parseInt(props.size) || 60;
      return `${sizeNum * 0.6}px`;
    }};
    opacity: 0.5;
    display: flex; /* S'assurer qu'elles sont visibles */
  }
`;


const HeroSection = styled.section`
  position: relative;
  min-height: calc(100vh - 200px);
  max-height: calc(100vh - 200px);
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
  padding: 60px 0;
  margin: 20px 20px 40px 20px;
  border-radius: 30px;
  overflow: hidden;
  z-index: 2;

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
  const [marbles, setMarbles] = useState([]);

  // Générer des billes aléatoirement
  useEffect(() => {
    const generateMarbles = () => {
      // Mélanger les types pour une vraie répartition aléatoire
      const marbleTypes = ['wood', 'logo', '3d'];
      const shuffledTypes = [...marbleTypes].sort(() => Math.random() - 0.5);
      const typePool = [];
      // Créer un pool avec chaque type répété 5 fois pour avoir 15 billes équilibrées
      for (let i = 0; i < 5; i++) {
        typePool.push(...shuffledTypes);
      }
      // Mélanger le pool
      const finalTypePool = typePool.sort(() => Math.random() - 0.5);
      
      const newMarbles = [];
      const occupiedPositions = [];
      const minDistance = 80; // Distance minimale entre les billes (réduite pour en placer plus)
      
      // Calculer la hauteur totale de la page (pas seulement viewport)
      // Attendre un peu pour que le DOM soit complètement rendu
      const documentHeight = Math.max(
        document.body.scrollHeight || 0,
        document.body.offsetHeight || 0,
        document.documentElement.clientHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.documentElement.offsetHeight || 0,
        window.innerHeight || 0
      );
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      // Utiliser au minimum 2x la hauteur du viewport pour avoir de l'espace
      const totalHeight = Math.max(viewportHeight * 2, documentHeight, 2000);
      
      const isPositionValid = (x, y, size) => {
        // Vérifier qu'on reste dans les limites de l'écran
        const footerTop = totalHeight - 250;
        const margin = 30; // Marge de sécurité
        
        if (x < margin || x + size > viewportWidth - margin || y < 100 || y > footerTop - size) {
          return false;
        }
        
        // Zone HeroSection (centré, environ 1200px de large max)
        const heroCenterX = viewportWidth / 2;
        const heroWidth = Math.min(1200, viewportWidth * 0.9);
        const heroTop = 100;
        const heroBottom = viewportHeight - 200;
        const heroPadding = 100; // Marge de sécurité augmentée autour de la HeroSection
        
        // Vérifier si on est dans la zone HeroSection (avec marge)
        if (y + size >= heroTop - 20 && y <= heroBottom + 20) {
          const heroLeft = heroCenterX - heroWidth / 2 - heroPadding;
          const heroRight = heroCenterX + heroWidth / 2 + heroPadding;
          if (x + size >= heroLeft && x <= heroRight) {
            return false;
          }
        }
        
        // Zone ServicesSection (centré, après HeroSection)
        // On calcule mieux la position de la section Services
        const servicesTop = Math.max(viewportHeight - 400, heroBottom + 100);
        const servicesBottom = totalHeight - 250; // Juste avant le footer
        const servicesPadding = 100; // Marge de sécurité augmentée autour de la ServicesSection
        
        if (y + size >= servicesTop - 20 && y <= servicesBottom + 20) {
          const servicesCenterX = viewportWidth / 2;
          const servicesWidth = Math.min(1200, viewportWidth * 0.9);
          const servicesLeft = servicesCenterX - servicesWidth / 2 - servicesPadding;
          const servicesRight = servicesCenterX + servicesWidth / 2 + servicesPadding;
          if (x + size >= servicesLeft && x <= servicesRight) {
            return false;
          }
        }

        // Vérifier qu'on ne se superpose pas avec d'autres billes
        for (const pos of occupiedPositions) {
          const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));
          const minDist = minDistance + (size + pos.size) / 2;
          if (distance < minDist) {
            return false;
          }
        }

        return true;
      };

      // Générer 15 billes avec positions vraiment aléatoires
      let attempts = 0;
      let typeIndex = 0;
      const margin = 30;
      
      // Réduire la taille minimale pour en placer plus
      const minSize = 40;
      const maxSize = 65;
      
      while (newMarbles.length < 15 && attempts < 8000) {
        attempts++;
        const size = minSize + Math.random() * (maxSize - minSize);
        
        // Positions vraiment aléatoires sur toute la hauteur disponible
        const x = margin + Math.random() * (viewportWidth - size - margin * 2);
        const footerTop = totalHeight - 250;
        const maxY = Math.max(200, footerTop - size - margin);
        const minY = 100;
        const y = minY + Math.random() * (maxY - minY);
        
        if (isPositionValid(x, y, size)) {
          // Utiliser le type du pool pour une répartition équilibrée
          const type = finalTypePool[typeIndex % finalTypePool.length];
          typeIndex++;
          
          const delay = Math.random() * 4;
          const duration = 8 + Math.random() * 4;
          
          const opacity = 0.6 + Math.random() * 0.15;
          newMarbles.push({
            id: `marble-${newMarbles.length}-${Date.now()}-${Math.random()}`, // ID unique
            left: x,
            top: y,
            size: `${size}px`,
            type,
            delay: `${delay.toFixed(2)}s`,
            duration: `${duration.toFixed(2)}s`,
            gradient: `linear-gradient(135deg, rgba(139, 69, 19, ${opacity.toFixed(2)}), rgba(160, 82, 45, ${opacity.toFixed(2)}))`,
          });
          
          occupiedPositions.push({ x, y, size });
        }
      }

      console.log(`Généré ${newMarbles.length} billes sur 15 tentatives`);
      setMarbles(newMarbles);
    };

    // Attendre que le DOM soit prêt et que les sections soient rendues
    const timer = setTimeout(() => {
      generateMarbles();
    }, 500); // Augmenté pour laisser le temps au DOM de se charger
    
    // Régénérer uniquement au redimensionnement de la fenêtre (pas au scroll)
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        generateMarbles();
      }, 300);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  // Composants pour les différents types de logos
  const WoodLogSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 36 36">
      <path fill="#662113" d="M17.34 1.835C11.231 2.323 9 5.399 9 8.34c0 2.101-.348 17.904-.348 20.005s2.071 4.385 4.946 5.703c4.186 1.919 14.663 1.074 14.569-5.926c-.107-7.999.045-18.757.045-18.757c-.001-5.213-4.845-8.012-10.872-7.53z"/>
      <path fill="#C1694F" d="M10.948 10.993c3.768 3.14 9.956 2.961 13.601 1.026c3.5-1.858 3.796-4.882 1.488-7.288C24.07 2.68 19.365 1.6 15.311 2.524c-4.561 1.04-8.058 5.389-4.363 8.469z"/>
      <path fill="#FFE8B6" d="M11.949 10.568c3.271 2.726 8.37 2.407 11.807.891c3.147-1.389 3.52-4.01 1.292-6.327c-1.71-1.778-5.792-2.718-9.312-1.916c-3.959.902-6.995 4.678-3.787 7.352z"/>
      <path fill="#662113" d="M9.142 15.03c-1.223-.876-3.315-2.484-3.81-2.804c-.81-.525-2.583 1.725-1.219 3.512s4.088 4.296 4.746 7.729c.659 3.433.283-8.437.283-8.437z"/>
      <ellipse cx="4.876" cy="13.818" fill="#C1694F" rx="1.167" ry=".706" transform="rotate(-75.345 4.875 13.817)"/>
      <path fill="#D99E82" d="M18.666 11.588c-2.247 0-4.511-.762-5.608-1.658c-.808-.66-1.223-1.544-1.138-2.425c.068-.703.489-1.723 2.109-2.591c2.326-1.247 4.73-1.616 6.949-1.069c2.296.564 4.698 2.357 4.477 4.026c-.236 1.768-3.604 3.299-5.267 3.59a8.84 8.84 0 0 1-1.522.127zm.273-6.988c-1.451 0-2.958.403-4.438 1.196c-.973.521-1.521 1.146-1.585 1.806c-.053.542.23 1.109.775 1.554c1.183.966 4.009 1.728 6.326 1.32c1.747-.306 4.313-1.742 4.447-2.737c.128-.962-1.752-2.438-3.724-2.923a7.491 7.491 0 0 0-1.801-.216z"/>
      <path fill="#D99E82" d="M18.432 9.424c-.986 0-1.906-.24-2.423-.663c-.433-.354-.654-.835-.607-1.321c.037-.38.255-.926 1.084-1.371c.629-.337 2.067-.645 3.043-.544c1.105.111 2.625.869 2.589 1.853c-.059 1.524-1.646 1.789-2.697 1.964a6.026 6.026 0 0 1-.989.082zm.687-2.918c-.79 0-1.784.243-2.162.445c-.337.181-.542.394-.56.585c-.014.145.077.313.244.45c.402.329 1.489.556 2.615.37c1.406-.234 1.841-.472 1.861-1.016c-.039-.213-.846-.736-1.688-.82a3.4 3.4 0 0 0-.31-.014z"/>
      <path fill="#292F33" d="m14.213 34.188l.401-6.282l.49 6.594zm11.985-1.648l.178-7.352l.49 6.594z"/>
      <path fill="#C1694F" d="m15.639 22.827l.712-4.589l.09 4.99l.445 4.722zm5.257 11.138l-.178-9.98l.846 7.396zm2.762-13.812l.134-6.327l.511 3.574a.832.832 0 0 1-.019.333l-.626 2.42z"/>
    </svg>
  );

  const Logo3DSVG = () => (
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="currentColor" d="M13 15h3q.825 0 1.413-.587T18 13v-2q0-.825-.587-1.412T16 9h-3zm1.5-1.5v-3H16q.2 0 .35.15t.15.35v2q0 .2-.15.35t-.35.15zm-8 1.5H10q.425 0 .713-.288T11 14v-1q0-.425-.288-.712T10 12q.425 0 .713-.288T11 11v-1q0-.425-.288-.712T10 9H6.5v1.5h3v.75h-2v1.5h2v.75h-3zM4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20z"/>
    </svg>
  );

  const renderMarbleContent = (type) => {
    switch(type) {
      case 'wood':
        return <WoodLogSVG />;
      case '3d':
        return <Logo3DSVG />;
      case 'logo':
        return <img src="/images/logo_patrick.png" alt="Logo Atelier de Patrick" />;
      default:
        return <WoodLogSVG />;
    }
  };

  return (
    <>
      {/* Container pour les billes (en dehors du HomeContainer pour couvrir toute la page) */}
      <MarblesContainer>
        {marbles.map((marble) => (
          <DecorativeMarble
            key={marble.id}
            left={marble.left}
            top={marble.top}
            size={marble.size}
            delay={marble.delay}
            duration={marble.duration}
            gradient={marble.gradient}
          >
            {renderMarbleContent(marble.type)}
          </DecorativeMarble>
        ))}
      </MarblesContainer>
      
      <HomeContainer>

      <HeroSection>
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
