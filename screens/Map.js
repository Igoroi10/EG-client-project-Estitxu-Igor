import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { storeData, getData } from '../helpers/localStorage';
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, View, Image } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service'

import GetLocation from 'react-native-get-location';
import axios from 'axios';



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
    const [artifactNear, setArtifactNear] = useState(null); 
    const [isEndFindding, setIsEndFindding] = useState(false); 
    const [artifacts, setArtifacts] = useState([]);
    const [status, setStatus] = useState();
    
    const artefacto = [
      {
        "name": "artifact1",
        "slot": 1,
        "description_es": "",
        "description_en": "",
        "img": "https://i.imgur.com/KAhutBQ.jpeg",
        "found": true,
        "latitude": 43.310625,
        "longitude": -2.003209
      },
      {
        "name": "artifact2",
        "slot": 2,
        "description_es": "",
        "description_en": "",
        "img": "https://i.imgur.com/KAhutBQ.jpeg",
        "found": false,
        "latitude": 43.310673,
        "longitude": -2.002441
      },
      {
        "name": "artifact3",
        "slot": 3,
        "description_es": "",
        "description_en": "",
        "img": "https://i.imgur.com/KAhutBQ.jpeg",
        "found": false,
        "latitude": 43.309534,
        "longitude": -2.002030
      },
      {
        "name": "artifact4",
        "slot": 4,
        "description_es": "",
        "description_en": "",
        "img": "https://i.imgur.com/KAhutBQ.jpeg",
        "found": false,
        "latitude": 43.309801,
        "longitude": -2.003381
      },
    ];



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
      fetchArtifacts();
      fetchStatus();

    },[])


    useEffect(()=> {
      console.log('************* CAMBIO EN LOCATION STATE****************')
      console.log(userLocation.latitude)
      console.log(userLocation.longitude)
    },[userLocation])

    useEffect(() => {
      let kont=0;
      artifacts.forEach((artifact) => {
        if(artifact.found === true)
          kont++;
        
      })
      if(kont===artefacto.length && kont!==0)
        setIsEndFindding(true)
    }, [artifacts])


    async function fetchArtifacts() {
      try {
          const response = await axios.get('http://192.168.0.26:3000/api/artifacts/');
          const responseData = response.data.data;
          setArtifacts(responseData);
      } catch (error) {
          console.error('Error al obtener los artefactos:', error);
      }
    }

    async function fetchStatus() {
      try {
          const response = await axios.get('http://192.168.0.26:3000/api/search/');
          const responseData = response.data.data[0].validation;
          setStatus(responseData);
      } catch (error) {
          console.error('Error al obtener el search:', error);
      }
    }


    async function updateArtifact() {
      try {
          const response = await axios.patch('http://192.168.0.26:3000/api/artifacts/', {
            name: artifactNear.name,
            found: "true"
          });
          const responseData = response.data.data;

          fetchArtifacts();
          setArtifactNear(null) //esto está comentado para que el boton de reinicio funcione mientras no este puesta la lógica de cercanía al artefacto
      } catch (error) {
          console.error('Error al obtener el search:', error);
      }
    }

    //para checkear si estamos cerca de un artefacto (habrá q cambiar el contenido, pero + o - se entiende la idea)
    useEffect(() => {
      artifacts.forEach((artifact) => {
        if(userLocation.latitude>artifact.latitude){
          setArtifactNear(artifact)
        }
      })
    }, [userLocation.latitude]); //este useEffect tiene que estar checkeando todo el tiempo



    async function endFindding() {
      try {
          const response = await axios.patch('http://192.168.0.26:3000/api/search/', {
            validation: "pendding"
          });
          const responseData = response.data.data;

          fetchStatus();
          setIsEndFindding(false)
      } catch (error) {
          console.error('Error al obtener el search:', error);
      }
    }

    async function reinicio() {
      try {

          const response = await axios.patch('http://192.168.0.26:3000/api/search/', {
            validation: "searching"
          });
          const response2 = await axios.patch('http://192.168.0.26:3000/api/artifacts/', {
            name: artifacts[3].name,
            found: false
          });
          const responseData = response.data.data;

          fetchStatus();
          fetchArtifacts();

      } catch (error) {
          console.error('Error al obtener el search:', error);
      }
      // console.log(artifactNear)
    }


    return(
      <View >
         {status==="searching" &&(
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
          )}

          <ContainerInfo>

            <RowContainer>
              {/* if distancia entre artefacto y usuario es < 1m */}
              {artifactNear!==null && status==="searching" &&(
                <Button onPress={updateArtifact}>
                  <ButtonText >Recoger Artefacto</ButtonText>
                </Button>
              )}
              {status==="pendding" &&(
                <PendingText>Pending...</PendingText>
              )}
              {/* if (from db) search.sattus */}
            </RowContainer>
            <RowContainer >
            
              {artifacts.map((artifact, index) => (
              <Column key={index}>
                {artifact.found && (
                  <Image source={{ uri: artifact.img }} style={imageStyle} />
                )}
              </Column>
              ))}
            </RowContainer>

            <RowContainer>
                {/* cuando los 4 artefactos sean true */}

                {isEndFindding && status==="searching" &&(
                  <Button onPress={endFindding}>
                    <ButtonText>Fin de búsqueda</ButtonText>
                  </Button>
                )} 
                <Button onPress={reinicio}>
                  <ButtonText>Reinicio</ButtonText>
                </Button>                     
              
            </RowContainer>
            
          </ContainerInfo>
            
        
      </View>
   );
   }


export default Maps