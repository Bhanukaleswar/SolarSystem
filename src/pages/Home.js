import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FloatingStars = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/stars-background.jpg') no-repeat center center fixed;
  background-size: cover;
  opacity: 0.2;
  z-index: -1;
  animation: float 10s infinite linear;

  @keyframes float {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
`;

const HeroSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #00b4d8, #1f40c7);
  border-radius: 20px;
  box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 80vh;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: white;
  text-align: center;
  letter-spacing: 2px;
  font-weight: bold;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
  animation: glowing 1.5s infinite alternate;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @keyframes glowing {
    0% {
      text-shadow: 0 0 10px #00b4d8, 0 0 20px #00b4d8, 0 0 30px #00b4d8;
    }
    100% {
      text-shadow: 0 0 20px #1f40c7, 0 0 30px #1f40c7, 0 0 40px #1f40c7;
    }
  }
`;

const FloatingButton = styled(motion.button)`
  background: #ff0066;
  padding: 20px 40px;
  border-radius: 50px;
  border: none;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 15px 30px rgba(255, 0, 102, 0.3);
  transition: all 0.3s ease;
  :hover {
    transform: translateY(-5px);
    box-shadow: 0px 20px 50px rgba(255, 0, 102, 0.5);
  }
`;

const RotatingPlanet = styled(motion.img)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.5);
  animation: rotate 10s linear infinite;

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const Home = () => {
  return (
    <HeroSection>
      <FloatingStars
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <div>
        <Title>Welcome to the Futuristic Space App</Title>
        <FloatingButton 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </FloatingButton>
      </div>
      {/* Rotating Planet */}
      <RotatingPlanet 
        src="/planet-image.png" // Add your planet image here
        alt="Rotating Planet"
        whileHover={{ scale: 1.1 }}
      />
    </HeroSection>
  );
};

export default Home;
