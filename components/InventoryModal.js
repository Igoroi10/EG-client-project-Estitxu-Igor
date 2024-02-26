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
  background-color: rgba(256, 256, 256, 0.3); 
`;

const Image = styled.Image`
  width: 50px;
  height: 50px;
  margin: 5px;
  background-color: rgba(256, 256, 256, 0.3); 
`;

const SmallTransparentSquare = styled.View`
  top: 2.5%;
  width: 35px;
  height: 40px;
  margin: 3px;
  background-color: rgba(256, 256, 256, 0.3); 
`;

const Rectangles = styled.View`
  width: 30px;
  height: 70px;
  margin: 5px;
  background-color: rgba(256, 256, 256, 0.3); 
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

const TransparentSquareInventory = styled.View`
  width: 50px;
  height: 50px;
  margin: 5px;
  background-color: rgba(128, 128, 128, 0.2); 
`;


const InventoryModal = ({ isVisible, closeModal, itemLinks }) => {
  const { globalState, handleGlobalState } = useContext(Context);
  const [isCollected, setIsCollected] = useState(false);

  useEffect(() => {
    console.log("***************** INVENTORY LINKS ******************")
    console.log(globalState.items)
    let itemsFound = 0;
    globalState.items.forEach(item => {
      if(item.retrieved === true){
        itemsFound++;
      }
    });
    if((itemsFound === globalState.items.length)){
      setIsCollected(true)
    }
    else{
      setIsCollected(false)
    }

  }, [Object.values(globalState.items)])

      console.log("*********************user inventory *************************")
      console.log(globalState.user.inventory)
      if(globalState.user.inventory !== null){
        itemLinks = []
        globalState.user.inventory.forEach(item => {
          if(globalState.items[item].imgURL !== "") //1 is empty
            itemLinks.push(globalState.items[item].imgURL);

          console.log("***************item links***************************")
          console.log(itemLinks)

          console.log(globalState.items[1].imgURL)


        })
      };


  return (
    <Modal isVisible={isVisible}>
      <ModalContainer>
        <BackgroundImage source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/equipo-ganador.appspot.com/o/avatarBackground2.png?alt=media&token=2982e7f6-f1bb-4367-975a-7cbcb00e3d17'}}>
          <ScrollView>
            <View>
                <TouchableOpacity onPress={closeModal}>
                  <ModalText>X </ModalText>
                </TouchableOpacity>
            

              {/* armadura(?) */}
                <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: '10%' }}>
                  <TransparentSquare />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 3, marginBottom: -18 }}>
                  <Rectangles style={{left: -10}}/>
                  <SmallTransparentSquare />
                  <TransparentSquare />
                  <SmallTransparentSquare />
                  <Rectangles style={{left: 10}}/>

                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <TransparentSquare />
                </View>

              {/* resto de inventario / objects */}
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20, marginTop: '60%' }}>
                              <View style={{ flexDirection: 'row', flexWrap: 'wrap' , marginLeft: 25}}>
                  {[...Array(15)].map((_, index) => (
                    
                    (itemLinks !== undefined && itemLinks.length > 0 && itemLinks.length >= index+1) ? (
                      <Image source={{ uri: itemLinks[index] }} style={{ width: 50, height: 50 }} key={index} />
                    ) : (
                      <TransparentSquareInventory key={index} />
                    )
                  ))}
                </View>
              </View>
              
              {isCollected && (
                <Button    label="Crafting travel"  onPress={() => console.log("button crafting travel pressed")}>
                  <ButtonText>Crafting travel</ButtonText>
                </Button>
              )}

            </View>
            
          </ScrollView>
        </BackgroundImage>
      </ModalContainer>
    </Modal>
  );
};

export default InventoryModal;
