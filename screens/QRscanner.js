import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import axios from 'axios';

class ScanScreen extends Component {
  onSuccess = e => {
    // Si es otro tipo de contenido, muestra el texto en una alerta
    // alert('QR Code Content: ' + e.data);

    // Puedes acceder a this.props.responseData para utilizar los datos pasados
    console.log('Response Data:', this.props.responseData);

    const usersEmails = this.props.responseData;
    const checkedEmail = e.data;

    usersEmails.map(email => {
        if(checkedEmail === email){
            alert("SAME EMAIL")
            //aqui tiene que hacer los cambios en la base de datos y volver a home
        }
    })
    



  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

const QRScannerWithAPI = () => {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('https://fly-eg-staging.fly.dev/api/users/');
        const responseData = response.data.data.map(user => user.email);

        // Establece responseData en el estado
        setResponseData(responseData);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    }

    fetchUsers();
  }, []);

  return <ScanScreen responseData={responseData} />;
};

export default QRScannerWithAPI;
