import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, View } from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

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
    container: {
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
    return(
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>
   );
   }


export default Maps