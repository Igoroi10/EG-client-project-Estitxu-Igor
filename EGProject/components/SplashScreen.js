import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';

const SplashContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  color: black;
`;

const SplashImage = styled.Image`
  max-width: 100%;
`;

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de 3 segundos (aumentado de 2 a 3 segundos)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Ajusta el tiempo de simulación aquí
  }, []);

  return (
    <SplashContainer>
      {isLoading ? (
        <LoadingText>Cargando...</LoadingText>
      ) : (
        <SplashImage source={require('../assets/1.png')} />
      )}
    </SplashContainer>
  );
};

export default SplashScreen;
