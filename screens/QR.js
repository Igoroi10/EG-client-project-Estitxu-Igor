import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import RNQRGenerator from 'rn-qr-generator';
import { getData } from '../helpers/localStorage';

import QRscanner from '../components/QRscanner';
import CryptModal from '../components/CryptModal';

const QRCodeGeneratorScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [userRole, setUserRole] = useState(null);



  // Función para generar el código QR
  const generateQRCode = async () => {
    const data = await getData();
    const user = data

    RNQRGenerator.generate({
      value: user.email,
      height: 300,
      width: 300,
    })
      .then(response => {
        const { uri, width, height, base64 } = response;
        setImageUri(uri);
        
      })
      .catch(error => console.log('Cannot create QR code', error));
  };

  // Función para mostrar el escáner QR
  const showQRScanner = () => {
    // setGenerateQRButtonVisible(false);
    setShowScanner(true);
  };

  // Función para ocultar el escáner QR
  const hideQRScanner = () => {
    setShowScanner(false);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      const user = data
      // console.log('****************ROLE******************');
      // console.log(user.rol);
      setUserRole(user.rol);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if(userRole === "Acolito"){
      generateQRCode();
    }
    if(userRole ==="Jacob"){
      setShowScanner(true)
    }
  }, [userRole]);

  // if(userRole ==="Jacob"){
  //   setShowScanner(true)
  // }
  
  return (
    // <Container visible= {false}>
    //   {showScanner ? (
    //     <QRscanner onClose={hideQRScanner} />
    //   ) : (
    //     <View >
    //       {imageUri && <QRCodeImage source={{ uri: imageUri }} />}

    //       {userRole==="Jacob" && (
    //         <GenerateButton onPress={showQRScanner }>
    //           <ButtonText>Mostrar Escáner</ButtonText>
    //         </GenerateButton>
    //       )}
          
    //     </View>
    //   )}
    // </Container>

  <CryptModal/>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const QRCodeImage = styled.Image`
  width: 300px;
  height: 300px;
`;

const GenerateButton = styled.TouchableOpacity`
  background-color: blue;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
`;

export default QRCodeGeneratorScreen;