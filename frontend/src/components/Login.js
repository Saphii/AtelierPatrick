import React, { useState } from 'react';
import styled from 'styled-components';
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { authService } from '../services/api';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
  padding: 20px;
`;

const LoginCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  .logo-icon {
    width: 80px;
    height: 80px;
    background: #8B4513;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
  h1 {
    color: #8B4513;
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  .form-group {
    margin-bottom: 25px;
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }
    
    .input-container {
      position: relative;
      
      input {
        width: 100%;
        padding: 15px 50px 15px 15px;
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
      
      .icon {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #8B4513;
        font-size: 1.1rem;
      }
      
      .password-toggle {
        position: absolute;
        right: 45px;
        top: 50%;
        transform: translateY(-50%);
        color: #8B4513;
        cursor: pointer;
        font-size: 1.1rem;
        
        &:hover {
          color: #A0522D;
        }
      }
    }
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

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
`;

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Effacer l'erreur quand l'utilisateur tape
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(formData.username, formData.password);
      onLoginSuccess(response.user);
    } catch (error) {
      setError(error.error || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <div className="logo-icon">
            <img src="/images/logo_patrick.png" alt="Logo L'Atelier de Patrick" />
          </div>
          <h1>Administration</h1>
          <p>L'Atelier de Patrick</p>
        </Logo>

        <Form onSubmit={handleSubmit}>
          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}

          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <div className="input-container">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Entrez votre nom d'utilisateur"
                required
              />
              <FaUser className="icon" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Entrez votre mot de passe"
                required
              />
              <FaLock className="icon" />
              <div 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </SubmitButton>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
