import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { storeData, getData } from '../helpers/localStorage';
import styled from 'styled-components/native';
import axios from 'axios';

import RNQRGenerator from 'rn-qr-generator';


class ScanScreen extends Component {

  onSuccess = async (e) => {
    // Si es otro tipo de contenido, muestra el texto en una alerta
    // alert('QR Code Content: ' + e.data);

    const checkedEmail = e.data;
  
    const validEmail = await this.sendEmail(checkedEmail);
    console.log(validEmail);

    if(validEmail){
      alert("Valid user!")

    }
    else{
      alert("User not valid")
    }
//  const data2 = [];
//     console.log("DATA: " + validEmail.data + "y" + data2)
   
//     if(validEmail.data !== data2){
//       alert("VALID USER")
//     }
//     else{
//       alert("INVALID USER")
//       //volver a checkear
//     }

// if(validEmail== false){
  this.props.onClose(); //cuando escanéa cuanquier cosa se cierra
// }


  };

  sendEmail = async (checkedEmail) => {

    try {
      // const response = await axios.post('http://192.168.1.168:3000/api/users/verifyQR', {
        const response = await axios.post('https://fly-eg-staging.fly.dev/api/users/verifyQR', {
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


export default ScanScreen;
