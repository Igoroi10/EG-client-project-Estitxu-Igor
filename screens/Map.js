import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { storeData, getData } from '../helpers/localStorage';
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, View, Image } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service'

import GetLocation from 'react-native-get-location';



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

const ContainerInfo = styled.View`
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




// import { StyleSheet } from 'style-sheet';

// const MapContainer = styled.View`
//     height: 80%;
//     justifyContent: center;
//     alignItems: center;
// `

// const MapRender = styled.View`
//     justifyContent: center;
//     height:300px;
//     width: 300px;
//     background-color: red;
// `

// const Maps = () =>{
//     useEffect(() =>{
//         console.log("Carga inicial mapa")
//     },[])
//     return(
//         <MapContainer>
//             <MapRender>
//                 <MapView
//                 provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//                 region={{
//                     latitude: 37.78825,
//                     longitude: -122.4324,
//                     latitudeDelta: 0.015,
//                     longitudeDelta: 0.0121,
//                 }}
//                 ></MapView>
//             </MapRender>
//             <Text>Test phrase</Text>
//       </MapContainer>
//     )
// }



const styles = StyleSheet.create({
    container4Map: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});
   


   const Maps = () =>{
    const [userLocation, setLocation] = useState([]);
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
        "slot": 2,
        "description_es": "",
        "description_en": "",
        "img": "https://i.imgur.com/KAhutBQ.jpeg",
        "found": false
      },
      {
        "_id": "3",
        "name": "Artifact 3",
        "slot": 3,
        "description_es": "",
        "description_en": "",
        "img": "https://i.imgur.com/KAhutBQ.jpeg",
        "found": false
      },
      {
        "_id": "4",
        "name": "Artifact 4",
        "slot": 4,
        "description_es": "",
        "description_en": "",
        "img": "https://i.imgur.com/KAhutBQ.jpeg",
        "found": false
      },
    ];

    useEffect(() => {
      let kont=0;
      artefacto.forEach((element) => {
        if(element.found)
          kont++;
      })
      if(kont===artefacto.length)
      setEndFindding(true)
    }, [artefacto])

    useEffect(()=>{
      console.log('*************CARGA INICIAL DE POSICIÓN****************')
      // const _watchId = Geolocation.watchPosition(
      //   position => {
      //     const {latitude, longitude} = position.coords;
      //     setLocation({latitude, longitude});
      //   },
      //   error => {
      //     console.log(error);
      //   },
      //   {
      //     enableHighAccuracy: true,
      //     distanceFilter: 0,
      //     interval: 5000,
      //     fastestInterval: 2000,
      //   },
      // );
  
      // return () => {
      //   if (_watchId) {
      //     Geolocation.clearWatch(_watchId);
      //   }
      // };

      // Geolocation.getCurrentPosition(
      //   (position) => {
      //     const {latitude, longitude} = position.coords;
      //     setLocation({
      //       latitude,
      //       longitude,
      //     });
      //   },
      //   (error) => {
      //     console.log('Error a la hora de conseguir coordenadas')
      //     console.log(error.code, error.message);
      //   },
      //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      // );


    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
    .then(location => {
      console.log(location);
      let lat = location.latitude;
      let lon = location.longitude;
      console.log('******COORDS*********')
      console.log(lat)
      console.log(lon)
      // console.log(location.latitude)
      setLocation({"latitude":lat, "longitude":lon})
      console.log('LOCATION ON STATE')
      console.log(userLocation)
    })
    .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
})
    },[])

    useEffect(()=> {
      console.log('************* CAMBIO EN LOCATION STATE****************')
      console.log(userLocation.latitude)
      console.log(userLocation.longitude)
    },[userLocation])

    return(
      <View >
        <MapContainer>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: userLocation.latitude?userLocation.latitude:100,
              longitude: userLocation.longitude?userLocation.longitude:100,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
          </MapView>
        </MapContainer>
        <ContainerInfo>
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
            
          {artefacto.map((artifact, index) => (
    <Column key={index}>
      {artifact.found && (
        <Image source={{ uri: artifact.img }} style={imageStyle} />
      )}
    </Column>
  ))}
            
            {/* <Column>
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
            </Column> */}

          </RowContainer>
          <RowContainer>
              {/* cuando los 4 artefactos sean true */}
              {endFindding &&(
              <Button>
                <ButtonText>Fin de búsqueda</ButtonText>
              </Button>
            )}                      
            
          </RowContainer>
        </ContainerInfo>
      </View>
   );
   }


export default Maps