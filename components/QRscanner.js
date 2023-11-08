import React, { Component, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import Toast from 'react-native-toast-message';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { storeData, getData } from '../helpers/localStorage';
import styled from 'styled-components/native';
import axios from 'axios';

import RNQRGenerator from 'rn-qr-generator';


const ScanScreen = ({ onClose }) => {
  const onSuccess = async (e) => {
    const checkedEmail = e.data;

    const validEmail = await sendEmail(checkedEmail);
    console.log(validEmail);

    if (validEmail) {
      Toast.show({
        type: 'success', // Toast type
        position: 'bottom', // Toast position
        text1: 'QR SCANNED', // Title
        text2: "EL USUARIO ES VALIDO", // Message
    });

    }
    else{
      // alert("User not valid")

      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'QR SCANNED',
        text2: "EL USUARIO NO ES VALIDO",
      });
    }
    onClose();
  };

  const sendEmail = async (checkedEmail) => {
    try {
      const response = await axios.post('https://fly-eg-staging.fly.dev/api/users/verifyQR', {
        email: checkedEmail,
      });
      console.log('Email sent successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

    return (
      <QRCodeScanner
        onRead={this.onSuccess}
      />
     
    );
  };



export default ScanScreen;
