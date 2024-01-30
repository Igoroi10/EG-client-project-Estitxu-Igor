import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { View} from 'react-native';

import FirstFace from './FirstFace';
import IngredientEffects from './IngredientEffects'
 
const ModalText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin: 10px;
  text-align: right;
`;

const CloseButton = styled.TouchableOpacity`
  padding: 0px;
  border-radius: 0px;
`;



const ContentContainer = styled.View`
  border-radius: 10px;
  margin-top: 20%;
  background-color: #fff;
  padding: 0px;
  width: 90%;
  height: 58%

`;

const UserDetail = ({ isVisible, closeModal, item }) => {

      return (
        <Modal isVisible={isVisible} alignItems='center' style={{top: '-5%'}}>
          <ContentContainer>
              <View style={{top: 0}}>
                <CloseButton onPress={closeModal} >
                  <ModalText>X </ModalText>
                </CloseButton>

                <View style={{top: -15}}>
                  <FirstFace user={item}/>
                  <IngredientEffects item={item} />
                </View>
              

              </View>
          </ContentContainer>
        </Modal>

      );
   
};


export default UserDetail;
