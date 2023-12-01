import React, { useEffect, useState, useContext} from 'react'
import styled from 'styled-components/native'
import { Text, StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Context } from '../AppContext';

import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import axios from 'axios';

import socket from '../helpers/socket';
// import SocketListener from './components/SocketListener';



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

const foundByImgStyle = {
  top: 50,
  left: 50,
  width: 40,
  height: 40,
  borderRadius: 30,
  zIndex: 1,
  position: 'absolute',
};




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
    const{globalState, handleGlobalState} = useContext(Context)
    const [userLocation, setLocation] = useState(null);
    const [artifactNear, setArtifactNear] = useState(null);
    const [isEndFinding, setIsEndFinding] = useState(false);
    const [initLocation, setInitLocation] = useState({latitude: 10, longitude: 10});



    useEffect(()=>{
      console.log('*************CARGA INICIAL DE POSICIÓN****************')
      Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});

        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 0,
          interval: 6000,
          fastestInterval: 2000,
        }
      );
      // fetchArtifacts();
      // fetchStatus();
    },[])

    useEffect(()=> {
      if(initLocation.latitude === 10 && userLocation !== null) {
        const initLat = userLocation.latitude
        const initLong = userLocation.longitude
        setInitLocation({latitude: initLat, longitude: initLong})
      }
      // console.log("position (lat & long):")
      // console.log(userLocation.latitude)
      // console.log(userLocation.longitude)


      globalState.artifacts.forEach((artifact) => {
        if(artifact){
          if(artifact.found === false && userLocation){
            const distanceBetween= haversine_distance(userLocation, artifact);

            if(distanceBetween <= 20 && distanceBetween >=-20){ //en km (0.1)

              setArtifactNear(artifact)
            }
          }
        }

      })

      if(artifactNear && userLocation){
        const distanceBetween= haversine_distance(userLocation, artifactNear);
        if(distanceBetween > 20 || distanceBetween <-20){
          setArtifactNear(null)
        }
      }
    },[userLocation])

    useEffect(() => {
      let kont=0;
      globalState.artifacts.forEach((artifact) => {
        if(artifact){
          if(artifact.found === true)
          kont++;
        }

      })
      if(kont===globalState.artifacts.length && kont!==0){
        setIsEndFinding(true)

      }
      else{
        setIsEndFinding(false)

      }

    }, [Object.values(globalState)])


    // async function fetchArtifacts() {
    //   try {
    //       const response = await axios.get('https://fly-eg-staging.fly.dev/api/artifacts/');
    //       const responseData = response.data.data;
    //       setArtifacts(responseData);
    //   } catch (error) {
    //       console.error('Error al obtener los artefactos:', error);
    //   }
    // }

    // async function fetchStatus() {
    //   try {
    //       const response = await axios.get('https://fly-eg-staging.fly.dev/api/search/');
    //       const responseData = response.data.data[0].validation;
    //       setStatus(responseData);
    //   } catch (error) {
    //       console.error('Error al obtener el search:', error);
    //   }
    // }


    async function updateArtifact() {
      try {
          const artifactsData = globalState.artifacts.concat({"artifactName": artifactNear.name, "isFound": true, "foundByEmail": globalState.user.email})
          console.log(artifactsData)

          socket.emit('artifacts', artifactsData);
          setArtifactNear(null) //esto está comentado para que el boton de reinicio funcione mientras no este puesta la lógica de cercanía al artefacto
      } catch (error) {
          console.error('Error al updetear los artifacts:', error);
      }
    }

    async function endFinding() {
      try {
        socket.emit('search', 
            "pending"
          );
          setIsEndFinding(false)
      } catch (error) {
          console.error('Error al obtener el search:', error);
      }
    }

    async function reinicio() {
        socket.emit('search', "searching");

          const artifactsData = globalState.artifacts.concat({"artifactName": " ", "isFound": false, "foundByEmail": "reboot"})
          console.log(artifactsData)

          socket.emit('artifacts', artifactsData);

        


          setIsEndFinding(false)

      // console.log(artifactNear)
    }


    // Para calcular la distancia entre dos puntos
    function toRadians(degrees) {
      var pi = Math.PI;
      return degrees * (pi / 180);
    }
    function haversine_distance(origin, destination) {
      const lat1 = origin.latitude;
      const lon1 = origin.longitude;
      const lat2 = destination.latitude;
      const lon2 = destination.longitude;

      radius = 6371; // earth radius in km

      dlat = toRadians(lat2 - lat1);
      dlon = toRadians(lon2 - lon1);
      a =

        Math.sin(dlat / 2) * Math.sin(dlat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dlon / 2) *
          Math.sin(dlon / 2);
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      d = radius * c;

      return d; //ditancia en km
    }




    return(
      <>
        {globalState.search !== "validated" && (

          <View>
          {globalState.search === "searching" && (
            <MapContainer>
              <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                options={{
                  enableHighAccuracy: true,
                  distanceFilter: 0,
                  interval: 1000000,
                  fastestInterval: 200000,
                }}
                region={{
                  latitude: initLocation.latitude,
                  longitude: initLocation.longitude,
                  latitudeDelta: 0.0020,
                  longitudeDelta: 0.0020,
                }}
                showsUserLocation={true} //marcador del userLocation
                customMapStyle={customedMapStyle} //stylo del mapa
              >


                {globalState.artifacts.map((artifact) => artifact ? (
                  artifact.found == false ? (

                    <Marker
                      key={artifact.slot}
                      coordinate={{
                        latitude: artifact.latitude,
                        longitude: artifact.longitude,
                      }}
                      title={artifact.name}
                    >
                      <Image
                        source={{ uri: artifact.img }} //aqui va la img del atributo TODO
                        style={{ width: 40, height: 40 }} />
                    </Marker>
                  ) : null
                ) : null
                )}
                
                    {globalState.userList.map((user, index) => user ? (
                      // (user.latitude !== 0 || user.longitude !== 0) ? (

                        <Marker
                          key={index}
                          coordinate={{
                            latitude: user.latitude,
                            longitude: user.longitude,
                          }}
                          title={user.name}
                        >
                          <Image
                            source={{ uri: user.imgURL }} 
                            style={{ width: 40, height: 40 }} />
                        </Marker>
                      ) : null
                    // ) : null
                    )}
                  
              </MapView>
            </MapContainer>
          )}
          {globalState.search !== "validated" && (

            <ContainerInfo>
              <RowContainer>
                {/* if distancia entre artefacto y usuario es < 1m */}
                {artifactNear !== null && globalState.search === "searching" && globalState.user.rol == "Acolito" && (
                  <Button onPress={updateArtifact}>
                    <ButtonText>Collect artifact</ButtonText>
                  </Button>
                )}
                {globalState.search === "pending" && (
                  <PendingText>Pending...</PendingText>
                )}
              </RowContainer>
              <RowContainer>

                {globalState.artifacts.map((artifact, index) => (
                  <Column key={index}>
                    {artifact && (
                      artifact.found && (
                        <Image source={{ uri: artifact.img }} style={imageStyle} /> //aqui va la img del atributo TODO
                      ))}
                    {artifact.foundBy[0].imgURL && (
                        <Image source={{ uri: artifact.foundBy[0].imgURL }} style={foundByImgStyle} /> 

                    )}
                  </Column>
                ))}
              </RowContainer>

              <RowContainer>
                {/* cuando los 4 artefactos sean true */}

                {isEndFinding && globalState.search === "searching" && globalState.user.rol == "Acolito" && (
                  <Button onPress={endFinding}>
                    <ButtonText>End finding</ButtonText>
                  </Button>
                )}
                {globalState.user.rol === "Mortimer" &&(
                  <>
                    {globalState.search === "pending"&&(
                      <><Button onPress={validate}>
                      <ButtonText>Validate</ButtonText>
                      </Button></>
                    )}
                    <Button onPress={reinicio}>
                        <ButtonText>Reboot</ButtonText>
                      </Button>
                  </>

               
                )}
              </RowContainer>
            </ContainerInfo>
          )}
      
        </View>
        )}

      {globalState.search === "validated" && (

        <Background source={require('../assets/tombEntrance.png')}>  
        {globalState.user.rol == "Mortimer" && globalState.search == "validated"&& (
          <Button onPress={reinicio}>
            <ButtonText>Reboot</ButtonText>
          </Button>
          
        )}
        </Background> 
      )}
    </> 
   );
  }


  async function validate() {
    socket.emit('search', 
        "validated"
      );
}


export default Maps





const Background = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;


const customedMapStyle= [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#EBE3CD"
      }
    ]
  },
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#F5F1E6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#C9B2A6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#DCD2BE"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#AE9E90"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#DFD2AE"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#DFD2AE"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817C"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#A5B076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#F5F1E6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#FDFCF8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#F8C967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#E9BC62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#E98D58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#DB8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806B63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#DFD2AE"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8F7D77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#EBE3CD"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#DFD2AE"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#B9D3C2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998D"
      }
    ]
  }
]