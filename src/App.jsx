import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

// Full-screen wrapper with animated background
const AppWrapper = styled.div`
  min-height: 100vh;
  background-image: url('/images/solar_system.jpg'); /* Set default background */
  background-size: cover; /* Ensures the image covers the entire screen */
  background-position: center; /* Centers the image */
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: background-image 0.7s ease-in-out;
`;

// Styling the planet names and details
const PlanetList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
  gap: 30px;
`;

const PlanetButton = styled(motion.button).attrs(() => ({
  whileHover: { scale: 1.1, transition: { duration: 0.3 } },
  whileTap: { scale: 0.9 },
}))`
  background: rgba(0, 224, 255, 0.3);
  color: white;
  border: 2px solid rgba(0, 224, 255, 0.7);
  padding: 15px 30px;
  font-size: 20px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 5px 15px rgba(0, 224, 255, 0.4);
  
  &:hover {
    background: rgba(0, 224, 255, 0.6);
    box-shadow: 0 0 20px rgba(0, 224, 255, 1);
  }
`;

const PlanetData = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 224, 255, 0.4);
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #ff6600; /* Orange sunray color */
  text-shadow: 0 0 15px rgba(255, 102, 0, 1), 0 0 30px rgba(255, 102, 0, 0.6);
  animation: glow 1.5s ease-in-out infinite alternate, fire 0.5s ease-in-out infinite alternate;

  @keyframes glow {
    0% {
      text-shadow: 0 0 20px rgba(255, 102, 0, 1), 0 0 30px rgba(255, 102, 0, 0.8);
    }
    100% {
      text-shadow: 0 0 30px rgba(255, 102, 0, 1), 0 0 60px rgba(255, 102, 0, 0.7);
    }
  }

  @keyframes fire {
    0% {
      text-shadow: 0 0 20px rgba(255, 102, 0, 1), 0 0 30px rgba(255, 102, 0, 0.7), 0 0 40px rgba(255, 102, 0, 1);
    }
    50% {
      text-shadow: 0 0 30px rgba(255, 102, 0, 1), 0 0 50px rgba(255, 102, 0, 0.8), 0 0 60px rgba(255, 102, 0, 1);
    }
    100% {
      text-shadow: 0 0 20px rgba(255, 102, 0, 1), 0 0 40px rgba(255, 102, 0, 0.7), 0 0 50px rgba(255, 102, 0, 1);
    }
  }
`;

const PlanetDataCard = styled.div`
  background: rgba(0, 224, 255, 0.3);
  border-radius: 15px;
  padding: 10px 20px;
  margin: 10px;
  text-align: left;
  font-size: 18px;
  box-shadow: 0 0 20px rgba(0, 224, 255, 0.5);
`;

const FunFactCard = styled.div`
  background: rgba(255, 102, 0, 0.4);
  color: white;
  padding: 15px 25px;
  border-radius: 10px;
  margin-top: 15px;
  font-size: 16px;
  box-shadow: 0 0 15px rgba(255, 102, 0, 0.7);
  animation: fadeIn 1s ease-in-out;
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const FooterText = styled.div`
  position: absolute;
  bottom: 20px;
  font-size: 18px;
  color: white;
  text-align: center;
  animation: fadeInFooter 2s ease-in-out, starry 2s linear infinite;

  @keyframes fadeInFooter {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes starry {
    0% {
      text-shadow: 0 0 3px rgba(255, 255, 255, 0.6), 0 0 5px rgba(255, 255, 255, 0.6), 0 0 8px rgba(255, 255, 255, 0.8);
    }
    50% {
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.8), 0 0 8px rgba(255, 255, 255, 1), 0 0 12px rgba(255, 255, 255, 1);
    }
    100% {
      text-shadow: 0 0 3px rgba(255, 255, 255, 0.6), 0 0 5px rgba(255, 255, 255, 0.6), 0 0 8px rgba(255, 255, 255, 0.8);
    }
  }
`;

// Planet images (use URLs or local paths)
const planetImages = {
  Mercury: '/images/mercury.jpg',
  Venus: '/images/venus.jpg',
  Earth: '/images/earth.jpg',
  Mars: '/images/mars.jpg',
  Jupiter: '/images/jupiter.jpg',
  Saturn: '/images/saturn.jpg',
  Uranus: '/images/uranus.jpg',
  Neptune: '/images/neptune.jpg',
  Pluto: '/images/pluto.jpg', // Added Pluto
};

const planets = [
  { name: 'Mercury', eccentricity: 0.2056, orbitalVelocity: 47.87, exampleTravelDistance: 10000, exampleCities: ['New York', 'Tokyo'], funFacts: [
      'Mercury is the smallest planet in our solar system.',
      'A year on Mercury is only 88 Earth days.',
      'Mercury has no atmosphere.',
      'Mercury has the most extreme temperature differences in the solar system.',
      'It is the closest planet to the Sun.'
    ] 
  },
  { name: 'Venus', eccentricity: 0.0068, orbitalVelocity: 35.02, exampleTravelDistance: 8000, exampleCities: ['London', 'Dubai'], funFacts: [
      'Venus has a very thick atmosphere made mostly of carbon dioxide.',
      'One day on Venus is longer than a year on Venus.',
      'Venus is the hottest planet in our solar system.',
      'Venus rotates in the opposite direction to most planets.',
      'Venus has no moons.'
    ]
  },
  { name: 'Earth', eccentricity: 0.0167, orbitalVelocity: 29.78, exampleTravelDistance: 16000, exampleCities: ['London', 'Australia'], funFacts: [
      'Earth is the only planet known to support life.',
      'Earth has one natural satellite: the Moon.',
      'Earth’s core is as hot as the surface of the Sun.',
      'Earth is the densest planet in the solar system.',
      'Earth orbits the Sun at a distance of about 150 million kilometers.'
    ]
  },
  { name: 'Mars', eccentricity: 0.0934, orbitalVelocity: 24.077, exampleTravelDistance: 12000, exampleCities: ['New York', 'Tokyo'], funFacts: [
      'Mars is known as the Red Planet due to its reddish appearance.',
      'Mars has the tallest volcano in the solar system.',
      'A day on Mars is about 24.6 hours.',
      'Mars has two moons: Phobos and Deimos.',
      'Mars may have had liquid water in the past.'
    ]
  },
  { name: 'Jupiter', eccentricity: 0.0484, orbitalVelocity: 13.07, exampleTravelDistance: 14000, exampleCities: ['Los Angeles', 'New York'], funFacts: [
      'Jupiter is the largest planet in our solar system.',
      'Jupiter has a massive storm called the Great Red Spot.',
      'Jupiter has at least 79 moons.',
      'Jupiter’s atmosphere is mostly hydrogen and helium.',
      'A day on Jupiter lasts only about 10 hours.'
    ]
  },
  { name: 'Saturn', eccentricity: 0.0565, orbitalVelocity: 9.69, exampleTravelDistance: 13000, exampleCities: ['Sydney', 'New York'], funFacts: [
      'Saturn is famous for its beautiful rings.',
      'Saturn has 82 known moons.',
      'Saturn’s atmosphere is made up mostly of hydrogen and helium.',
      'One day on Saturn lasts about 10.7 hours.',
      'Saturn is less dense than water.'
    ]
  },
  { name: 'Uranus', eccentricity: 0.046, orbitalVelocity: 6.81, exampleTravelDistance: 15000, exampleCities: ['Los Angeles', 'Tokyo'], funFacts: [
      'Uranus is made mostly of ice and gas.',
      'Uranus has the coldest atmosphere of any planet in the solar system.',
      'Uranus has faint rings.'
    ]
  },
  { name: 'Neptune', eccentricity: 0.0086, orbitalVelocity: 5.43, exampleTravelDistance: 14000, exampleCities: ['London', 'Tokyo'], funFacts: [
      'Neptune is the farthest planet from the Sun.',
      'Neptune has 14 known moons.',
      'Neptune’s winds are the fastest in the solar system.',
      'Neptune has a storm called the Great Dark Spot.',
      'Neptune was the first planet to be discovered using mathematical predictions.'
    ]
  },
  { name: 'Pluto', eccentricity: 0.2488, orbitalVelocity: 4.74, exampleTravelDistance: 15000, exampleCities: ['Los Angeles', 'New York'], funFacts: [
      'Pluto was considered the ninth planet until 2006.',
      'Pluto is smaller than Earth’s moon.',
      'Pluto has five known moons.',
      'Pluto’s orbit is more elliptical than any other planet’s orbit.',
      'Pluto is composed mostly of ice and rock.'
    ]
  }
];

const SolarSystemApp = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [planetFunFact, setPlanetFunFact] = useState('');
  const [bgImage, setBgImage] = useState('/images/solar_system.jpg'); // Default background

  const randomFunFact = (planetName) => {
    const planet = planets.find((p) => p.name === planetName);
    const randomIndex = Math.floor(Math.random() * planet.funFacts.length);
    return planet.funFacts[randomIndex];
  };

  const handlePlanetClick = (planetName) => {
    setSelectedPlanet(planetName);
    setPlanetFunFact(randomFunFact(planetName));
    setBgImage(planetImages[planetName]);
  };

  // Function to calculate travel time based on orbital velocity
  const calculateTravelTime = (velocity, distance) => {
    const timeInSeconds = distance / velocity;
    const timeInMinutes = (timeInSeconds / 60).toFixed(2);
    return timeInMinutes;
  };

  const travelExample = (planetName) => {
    const planet = planets.find((p) => p.name === planetName);
    const travelTime = calculateTravelTime(planet.orbitalVelocity, planet.exampleTravelDistance);
    return `Hey! With the speed of ${planetName}, you can reach ${planet.exampleCities[0]} to ${planet.exampleCities[1]} in just ${travelTime} minutes.`;
  };

  return (
    <AppWrapper style={{ backgroundImage: `url(${bgImage})` }}>
      <Heading>🚀 Solar System - Explore the Planets 🚀</Heading>

      <PlanetList>
        {planets.map((planet) => (
          <PlanetButton key={planet.name} onClick={() => handlePlanetClick(planet.name)}>
            {planet.name}
          </PlanetButton>
        ))}
      </PlanetList>

      {selectedPlanet && (
        <PlanetData>
          <h2>{selectedPlanet}</h2>
          <PlanetDataCard>
            <p><strong>Orbital Velocity:</strong> {planets.find(p => p.name === selectedPlanet).orbitalVelocity} km/s</p>
            <p><strong>Eccentricity:</strong> {planets.find(p => p.name === selectedPlanet).eccentricity}</p>
            <p>{travelExample(selectedPlanet)}</p>
          </PlanetDataCard>
          
          <FunFactCard>{planetFunFact}</FunFactCard>
        </PlanetData>
      )}

      <FooterText>
      ⭐ Abarth's Space Explorations ⭐
      </FooterText>
    </AppWrapper>
  );
};

export default SolarSystemApp;
