import React, { Component, useEffect, useState } from 'react';

import Toast from 'react-native-toast-message';
import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from 'axios';

import RNQRGenerator from 'rn-qr-generator';


const ScanScreen = ({ onClose }) => {
  const onSuccess = async (e) => {
    const checkedEmail = e.data;

    const validEmail = await sendEmail(checkedEmail);
    // console.log(validEmail);

    if (validEmail) {
      const towerState= validEmail.data[0].towerAccess;
        let userText;
        if(towerState === true)
          userText = 'El acólito tiene acceso al torreón'
        else
          userText = 'Se le ha revocado el acceso al torreón al acólito'

      Toast.show({
        type: 'success', // Toast type
        position: 'bottom', // Toast position
        text1: 'QR SCANNED', // Title
        text2: "EL USUARIO ES VALIDO", // Message
        text2: userText // Message
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
        onRead={onSuccess}
      />
     
    );
  };



export default ScanScreen;
