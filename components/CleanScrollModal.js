import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { useState } from 'react';
import { useEffect } from 'react';

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View`

  align-items: center;
  position: absolute;
  top: 200px;
`;

const ContentText = styled.Text`
  color: black;
  align-items: center;
  top: 80px;
  z-index: 1;
  width: 300px;
`;

const ModalImage = styled.Image`
  position: absolute;
  width: 350px;
  height: 600px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: red;
  border-radius: 50px;
  z-index: 1;
  right: -40px;
`;

const CloseButtonText = styled.Text`
  color: white;
  left: 15px;
  top: 10px;
`;

const CleanScrollModal = ({ potionStatus, setPotionCreated, towerStatus, setTowerStatus }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const deleteIngredients = () => {
    setSelectedIngredients([]);
  };
  
  const close = () => {
    setTowerStatus('start');
    setPotionCreated('start');
    deleteIngredients();
  };
  
  useEffect(() => {
    // console.log("towerstatus: " + towerStatus);
    // console.log("ingredients: ", selectedIngredients);
  }, [towerStatus, selectedIngredients]);
  
  return (
    <Modal transparent={true} visible={potionStatus === 'Potion of cleanse_parchment'}>
      <ModalContainer>
        <ContentContainer>
          <CloseButton onPress={close}>
            <CloseButtonText>X</CloseButtonText>
          </CloseButton>
          <ContentText>
            Este pergamino recoge la historia de la leyenda de la armadura épica: un artefacto de brillo dorado ne cesario para acceder a la tumba Espectral, lugar donde residen los 4 jinetes.
            La armadura se perdió en la 2ª Era, pero se conservan aún manuales de cómo se llegó a forjar. Cada una de las piezas necesarias para su construcción descansa en una tumba del Obituario. El problema es que la entrada permanece sellada por el rosetón de los 4 artefactos arcanos necesarios para desbloquearla.
            Los artefactos se perdieron a lo largo de la ciénaga, pero poco más se sabe. El único material disponible es un viejo manuscrito con un mapa de la zona. Sin embargo, a excepción de unos números extraños, no incluye detalles relevantes. Nadie ha logrado comprender su significado, pero podrían indicar el paradero de los artefactos.
          </ContentText>
          <ModalImage source={require('../assets/scroll.png')} />
        </ContentContainer>
      </ModalContainer>
    </Modal>
  );
};

export default CleanScrollModal;
