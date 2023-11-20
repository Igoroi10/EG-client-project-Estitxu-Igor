import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { storeData, getData } from '../helpers/localStorage';
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, View, Image } from 'react-native';

import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';

import GetLocation from 'react-native-get-location';
import axios from 'axios';


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
          interval: 10000,
          fastestInterval: 2000,
          
        }
      );
      // GetLocation.getCurrentPosition({
      //   enableHighAccuracy: true,
      //   timeout: 60000,
      // })
      // .then(location => {
      //   console.log(location);
      //   let lat = location.latitude;
      //   let lon = location.longitude;
      //   console.log('******COORDS*********')
      //   console.log(lat)
      //   console.log(lon)
      //   // console.log(location.latitude)
      //   setLocation({"latitude":lat, "longitude":lon})
      //   console.log('LOCATION ON STATE')
      //   console.log(userLocation)
      // })
      // .catch(error => {
      //   const { code, message } = error;
      //   console.warn(code, message);
      // })
      fetchArtifacts();
      fetchStatus();

    },[])


    useEffect(()=> {
      console.log('************* CAMBIO EN LOCATION STATE****************')
      console.log(userLocation.latitude)
      console.log(userLocation.longitude)


      artifacts.forEach((artifact) => {
        if(artifact.found === false){
          const distanceBetween= haversine_distance(userLocation, artifact);

          if(distanceBetween <= 0.01){ //en km
            setArtifactNear(artifact)
          }
        }
      })

      if(artifactNear){
        const distanceBetween= haversine_distance(userLocation, artifactNear);
        if(distanceBetween > 0.01){
          setArtifactNear(null)
        }
      }
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
          const response = await axios.get('https://fly-eg-staging.fly.dev/api/artifacts/');
          const responseData = response.data.data;
          setArtifacts(responseData);
      } catch (error) {
          console.error('Error al obtener los artefactos:', error);
      }
    }

    async function fetchStatus() {
      try {
          const response = await axios.get('https://fly-eg-staging.fly.dev/api/search/');
          const responseData = response.data.data[0].validation;
          setStatus(responseData);
      } catch (error) {
          console.error('Error al obtener el search:', error);
      }
    }


    async function updateArtifact() {
      try {
          const response = await axios.patch('https://fly-eg-staging.fly.dev/api/artifacts/', {
            name: artifactNear.name,
            found: "true"
          });
          const responseData = response.data.data[0];

          const newArtifacts = artifacts.map((artifact) => {
              if(artifact.name == responseData.name){
                artifact = responseData;
              }
              return artifact;
          })
          setArtifacts(newArtifacts);
          setArtifactNear(null) //esto está comentado para que el boton de reinicio funcione mientras no este puesta la lógica de cercanía al artefacto
      } catch (error) {
          console.error('Error al obtener el search:', error);
      }
    }

    async function endFindding() {
      try {
          const response = await axios.patch('https://fly-eg-staging.fly.dev/api/search/', {
            validation: "pendding"
          });
          const responseData = response.data.data[0].validation;
          setStatus(responseData);
          setIsEndFindding(false)
      } catch (error) {
          console.error('Error al obtener el search:', error);
      }
    }

    async function reinicio() {
      try {

          const response = await axios.patch('https://fly-eg-staging.fly.dev/api/search/', {
            validation: "searching"
          });
          const responseDataStatus = response.data.data[0].validation;



          const newArtifacts=[];
          for (const artifact of artifacts) {
            // if(artifact.slot === 1){
              try {
                const response2 = await axios.patch('https://fly-eg-staging.fly.dev/api/artifacts/', {
                  name: artifact.name,
                  found: false
                });
  
                const responseDataArtifact = response2.data.data[0];
                newArtifacts.push(responseDataArtifact);
              } catch (error) {
                // Handle errors here
                console.error(`Error updating artifact: ${artifact.name}`, error);
              }
            // }
            // else{
            //   newArtifacts.push(artifact);

            // }
            
          }
          // console.log(newArtifacts)

          setArtifacts(newArtifacts);
          setStatus(responseDataStatus);
          setIsEndFindding(false)

      } catch (error) {
          console.error('Error al obtener el search:', error);
      }
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
      <View >
         {status==="searching" &&(
            <MapContainer>
                <MapView
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={styles.map}
                  options={{enableHighAccuracy: true,
                    distanceFilter: 0,
                    interval: 1000000,
                    fastestInterval: 200000,}}
                  region={{
                    latitude: userLocation.latitude?userLocation.latitude:0,
                    longitude: userLocation.longitude?userLocation.longitude:0,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }}
                  showsUserLocation={true}  //marcador del userLocation
                  customMapStyle={customedMapStyle} //stylo del mapa
                  // loadingEnabled={true} //spinner de carga del mapa
                  // followsUserLocation={true}
                >

                  {/* Markers of artifats */}

                  {artifacts.map((artifact) =>
                      artifact.found==false ? (
                        <Marker
                          key={artifact.slot}
                          coordinate={{
                            latitude: artifact.latitude,
                            longitude: artifact.longitude,
                          }}
                          title={artifact.name}
                          description={artifact.description_es}
                        >
                          <Image
                            source={{ uri: artifact.img }}  //aqui va la img del atributo TODO
                            style={{ width: 20, height: 20 }}
                          />
                        </Marker>
                      ) : null
                  )}

                </MapView>
            </MapContainer>
          )}

          <ContainerInfo>

            <RowContainer>
              {/* if distancia entre artefacto y usuario es < 1m */}
              {artifactNear!==null && status==="searching" &&(
                <Button onPress={updateArtifact}>
                  <ButtonText >Collect artifact</ButtonText>
                </Button>
              )}
              {status==="pendding" &&(
                <PendingText>Pending...</PendingText>
              )}
            </RowContainer>
            <RowContainer >

              {artifacts.map((artifact, index) => (
              <Column key={index}>
                {artifact.found && (
                  <Image source={{ uri: artifact.img }} style={imageStyle} /> //aqui va la img del atributo TODO
                )}
              </Column>
              ))}
            </RowContainer>

            <RowContainer>
                {/* cuando los 4 artefactos sean true */}

                {isEndFindding && status==="searching" &&(
                  <Button onPress={endFindding}>
                    <ButtonText>End findding</ButtonText>
                  </Button>
                )}
                <Button onPress={reinicio}>
                  <ButtonText>Reboot</ButtonText>
                </Button>

            </RowContainer>

          </ContainerInfo>


      </View>
   );
  }


export default Maps








const customedMapStyle= [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]