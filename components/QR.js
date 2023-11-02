import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import RNQRGenerator from 'rn-qr-generator';
import { getData } from '../helpers/localStorage';



const QRCodeGeneratorScreen = () => {
    
  const [imageUri, setImageUri] = useState(null);

  // Función para generar el código QR
  const generateQRCode = async () => {
    const user = await getData();

    console.log("GENERATED QR DATA:")
    console.log(user)

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

  return (
    <Container>
      {imageUri && <QRCodeImage source={{ uri: imageUri }} />}
      
      <GenerateButton onPress={generateQRCode}>
        <ButtonText>Generar QR</ButtonText>
      </GenerateButton>
    </Container>
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
