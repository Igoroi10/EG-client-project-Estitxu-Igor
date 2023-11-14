import React, { useState, useEffect }  from 'react';
import styled from 'styled-components/native'
import { storeData, getData } from '../helpers/localStorage';
import { useNavigation } from '@react-navigation/native';
import { View, Image} from 'react-native';







const Divider = styled.View`
  width: 100%;
  height: 2px;
  background-color: #DDDDDD;
`;
const MapContainer = styled.View`
  width: 100%;
  height: 400px;
  flex-direction: row;
  align-items: center;
  background: grey;
`;

const Container = styled.View`
    width: 100%;
    height: 330px;
     justify-content: center;

    background: white;
`
const RowContainer = styled.View`
  width: 100%;
  height: 33%;
  flex-direction: row;
  align-items: center;
  background: white;
  top: 0px;
  left: 0px;
  justify-content: center;
`

const Text = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin: 0 0px;
    padding-top: 0px;
    text-align: center;
    color: black;
`

const PendingText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
  padding-top: 25px;
  text-align: center;
  color: black;
`

const Button = styled.TouchableOpacity`
 width: 50%;
 height: 42px;
 border-radius: 10px;
 margin-left: 0px;
 background: grey;
 align-items: center;
 justify-content: center;
 left: 0px;
`

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

const Column = styled.View`
  flex: 1;
  justify-content: center;
  align-items: left;
  left: 0px;
  top: 0px;
  border-color: black;
  border-width: 2px;
  border-style: dashed;
  margin-left: 10px;
  margin-right: 10px;
  height: 70%;
`;

const imageStyle = {
      width: 85,
      height: 80,
      marginLeft: -3


};


const Map = () => { 
  const [isArtefactNear, setIsArtefactNear] = useState(false); 
  const [isPending, setIsPending] = useState(false); 
  const [endFindding, setEndFindding] = useState(false); 
  const artefacto = [
    {
      "_id": "6553311ee4205e97236a40d3",
      "name": "Artifact 1",
      "slot": 1,
      "description_es": "",
      "description_en": "",
      "img": "https://i.imgur.com/KAhutBQ.jpeg",
      "found": true
    },
    {
      "_id": "2",
      "name": "Artifact 2",
      "slot": 1,
      "description_es": "",
      "description_en": "",
      "img": "https://i.imgur.com/KAhutBQ.jpeg",
      "found": false
    },
    {
      "_id": "3",
      "name": "Artifact 3",
      "slot": 1,
      "description_es": "",
      "description_en": "",
      "img": "https://i.imgur.com/KAhutBQ.jpeg",
      "found": false
    },
    {
      "_id": "4",
      "name": "Artifact 4",
      "slot": 1,
      "description_es": "",
      "description_en": "",
      "img": "https://i.imgur.com/KAhutBQ.jpeg",
      "found": false
    },
  ]


  useEffect(() => {
    let kont=0;
    artefacto.forEach((element) => {
      if(element.found)
        kont++;
    })
    if(kont===artefacto.length)
    setEndFindding(true)
  }, [artefacto])

    return (
        <>
            <View>
              <MapContainer />
              <Container>
                  <RowContainer>
                    {/* if distancia entre artefacto y usuario es < 1m */}
                    {isArtefactNear &&(
                      <Button>
                        <ButtonText>Recoger Artefacto</ButtonText>
                      </Button>
                    )}
                    {isPending &&(
                      <PendingText>Pending...</PendingText>
                    )}
                    {/* if (from db) search.sattus */}
                  </RowContainer>
                  <RowContainer >
                    <Column>
                      {artefacto[0].found &&(
                        <Image source={{ uri: artefacto[0].img }} style={imageStyle} />
                      )}
                    </Column>
                    <Column>
                      {artefacto[1].found &&(
                          <Image source={{ uri: artefacto[1].img }} style={imageStyle} />
                        )}
                    </Column>
                    <Column>
                      {artefacto[2].found &&(
                        <Image source={{ uri: artefacto[2].img }} style={imageStyle} />
                      )}
                    </Column>
                    <Column>
                      {artefacto[3].found &&(
                        <Image source={{ uri: artefacto[3].img }} style={imageStyle} />
                      )}                    
                    </Column>

                  </RowContainer>
                  <RowContainer>
                      {/* cuando los 4 artefactos sean true */}
                      {endFindding &&(
                      <Button>
                        <ButtonText>Fin de búsqueda</ButtonText>
                      </Button>
                    )}                      
                    
                  </RowContainer>
              </Container>
       
            </View>
        </>
    )
}

export default Map
