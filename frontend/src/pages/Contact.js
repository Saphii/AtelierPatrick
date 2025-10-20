import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #8B4513;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  .icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #8B4513, #A0522D);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
  }
  
  .content {
    h3 {
      font-size: 1.2rem;
      margin-bottom: 5px;
      color: #8B4513;
    }
    
    p {
      color: #666;
      margin: 0;
    }
  }
`;

const ContactForm = styled.form`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #8B4513;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
  }
  
  input, textarea {
    width: 100%;
    padding: 15px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    
    &:focus {
      border-color: #8B4513;
      outline: none;
    }
    
    &::placeholder {
      color: #999;
    }
  }
  
  textarea {
    height: 120px;
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #8B4513, #A0522D);
  color: white;
  padding: 15px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(139, 69, 19, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  svg {
    font-size: 1.2rem;
  }
`;

const MapSection = styled.div`
  background: #f8f6f3;
  padding: 60px 0;
  border-radius: 20px;
  text-align: center;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #8B4513;
  }
  
  p {
    color: #666;
    margin-bottom: 30px;
  }
  
  .map-container {
    width: 100%;
    height: 300px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post('/api/contact/', formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactContainer>
      <ContactHeader>
        <h1>Contactez-nous</h1>
        <p>
          Vous avez un projet en tête ? N'hésitez pas à nous contacter pour discuter 
          de vos besoins et obtenir un devis personnalisé.
        </p>
      </ContactHeader>

      <ContactContent>
        <ContactInfo>
          <h2>Informations de contact</h2>
          
          <InfoItem>
            <div className="icon">
              <FaMapMarkerAlt />
            </div>
            <div className="content">
              <h3>Adresse</h3>
              <p>Balgau (Alsace)</p>
            </div>
          </InfoItem>
          
          <InfoItem>
            <div className="icon">
              <FaPhone />
            </div>
            <div className="content">
              <h3>Téléphone</h3>
              <p>06 XX XX XX XX</p>
            </div>
          </InfoItem>
          
          <InfoItem>
            <div className="icon">
              <FaEnvelope />
            </div>
            <div className="content">
              <h3>Email</h3>
              <p>contact@atelier-patrick.fr</p>
            </div>
          </InfoItem>
          
          <InfoItem>
            <div className="icon">
              <FaClock />
            </div>
            <div className="content">
              <h3>Horaires</h3>
              <p>
                Lundi - Vendredi: 9h - 18h<br />
                Samedi: 9h - 12h<br />
                Dimanche: Fermé
              </p>
            </div>
          </InfoItem>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit}>
          <h2>Envoyez-nous un message</h2>
          
          {isSubmitted && (
            <SuccessMessage>
              <FaCheckCircle />
              Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
            </SuccessMessage>
          )}
          
          <FormGroup>
            <label htmlFor="name">Nom complet *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom complet"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="phone">Téléphone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="06 XX XX XX XX"
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="subject">Sujet *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Objet de votre message"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Décrivez votre projet ou votre demande..."
              required
            />
          </FormGroup>
          
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
          </SubmitButton>
        </ContactForm>
      </ContactContent>

      <MapSection>
        <h2>Nous trouver</h2>
        <p>L'atelier est situé à Balgau, dans le Grand Est.</p>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42773.372389584365!2d7.491705290908911!3d47.929888393538555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47910cb26838ea6f%3A0xa6fd7edd1e0c4d43!2s68740%20Balgau!5e0!3m2!1sfr!2sfr!4v1760987316884!5m2!1sfr!2sfr"
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '15px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation de L'Atelier de Patrick à Balgau"
          ></iframe>
        </div>
      </MapSection>
    </ContactContainer>
  );
};

export default Contact;
