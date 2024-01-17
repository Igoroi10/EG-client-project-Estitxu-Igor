import React, { useState, useEffect, useContext }  from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { View, TouchableOpacity, ScrollView } from 'react-native';

import { Context } from '../AppContext';

const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  padding: 5px;
`;

const ModalText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin: 10px;
  text-align: right;
  text-shadow: 2px 2px 2px black;
`;

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const TransparentSquare = styled.View`
  width: 50px;
  height: 50px;
  margin: 5px;
  background-color: rgba(128, 128, 128, 0.3); 
`;

const SamllTransparentSquare = styled.View`
  top: 2.5%;
  width: 35px;
  height: 40px;
  margin: 3px;
  background-color: rgba(128, 128, 128, 0.3); 
`;

const Laukizuzenak = styled.View`
  width: 30px;
  height: 70px;
  margin: 5px;
  background-color: rgba(128, 128, 128, 0.3);
  top: -3%;
`;

const Button = styled.TouchableOpacity`
 width: 50%;
 height: 42px;
 border-radius: 10px;
 margin-left: 25%;
 background: blue;
 align-items: center;
 justify-content: center;
`

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
`;


const InventoryModal = ({ isVisible, closeModal }) => {
  const { globalState, handleGlobalState } = useContext(Context);

  return (
    <Modal isVisible={isVisible}>
      <ModalContainer>
        <BackgroundImage source={require('../assets/white.jpeg')}>
          <ScrollView>
            <View>
              <TouchableOpacity onPress={closeModal}>
                <ModalText>X </ModalText>
              </TouchableOpacity>
          

            {/* armadura(?) */}
              <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
                <TransparentSquare />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 3, marginBottom: -18 }}>
                <Laukizuzenak style={{left: -10}}/>
                <SamllTransparentSquare />
                <TransparentSquare />
                <SamllTransparentSquare />
                <Laukizuzenak style={{left: 10}}/>

              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <TransparentSquare />
              </View>

            {/* resto de inventario / objects */}
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20 }}>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' , marginLeft: 25}}>
                {[...Array(10)].map((_, index) => (
                  <TransparentSquare key={index} />
                ))}
              </View>
            </View>
            <Button    label="Crafting travel"  onPress={() => console.log("button crafting travel pressed")}>
                <ButtonText>Crafting travel</ButtonText>
            </Button>
            </View>
          </ScrollView>
        </BackgroundImage>
      </ModalContainer>
    </Modal>
  );
};

export default InventoryModal;
