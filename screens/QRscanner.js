import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { storeData, getData } from './../helpers/localStorage';
import axios from 'axios';

class ScanScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scanning: true, // Initially set to true to start scanning
      scannedData: null, // Store the scanned data
    };
  }

  onSuccess = async (e) => {
    // Si es otro tipo de contenido, muestra el texto en una alerta
    // alert('QR Code Content: ' + e.data);

    const checkedEmail = e.data;
  
    const validEmail = await this.sendEmail(checkedEmail);
 const data2 = [];
    console.log("DATA: " + validEmail.data + "y" + data2)
   
    if(validEmail.data !== data2){
      alert("VALID USER")
    }
    else{
      alert("INVALID USER")
      //volver a checkear
    }


  };

  sendEmail = async (checkedEmail) => {

    try {
      const response = await axios.post('http://192.168.1.164:3000/api/users/verifyQR', {
        email: checkedEmail
      });
      console.log('Email sent successfully:', response.data);
      return response.data;

    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  

  

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
      />
    );
  }
}

// const styles = StyleSheet.create({
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777'
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000'
//   },
//   buttonText: {
//     fontSize: 21,
//     color: 'rgb(0,122,255)'
//   },
//   buttonTouchable: {
//     padding: 16
//   }
// });


export default ScanScreen;
