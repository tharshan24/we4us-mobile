import React from 'react';
import {Alert, Text, View} from 'react-native';
import PayHere from '@payhere/payhere-mobilesdk-reactnative';
import {Button} from 'react-native-paper';

function HistoryRequest() {
  const paymentObject = {
    sandbox: true, // true if using Sandbox Merchant ID
    merchant_id: '1218607', // Replace your Merchant ID
    merchant_secret: '4ZCqUzqy7CX8bLOyoHT7by8X11t9phWao8Rjot4JIN40', // See step 4e
    return_url: 'http://sample.com/return',
    cancel_url: 'http://sample.com/cancel',
    notify_url: 'http://sample.com/cancel',
    order_id: 45093488,
    items: 'Hello from React Native!',
    amount: '50.00',
    currency: 'LKR',
    first_name: 'Saman',
    last_name: 'Perera',
    email: 'samanp@gmail.com',
    phone: '0771234567',
    address: 'No.1, Galle Road',
    city: 'Colombo',
    country: 'Sri Lanka',
    delivery_address: 'No. 46, Galle road, Kalutara South',
    delivery_city: 'Kalutara',
    delivery_country: 'Sri Lanka',
  };

  const checkPayment = () => {
    PayHere.startPayment(
      paymentObject,
      (paymentId) => {
        console.log('Payment Completed', paymentId);
      },
      (errorData) => {
        Alert.alert('PayHere Error', errorData);
      },
      () => {
        console.log('Payment Dismissed');
      },
    );
    console.log(paymentObject);
  };

  return (
    <View>
      <Button
        title="Check"
        onPress={() => checkPayment()}
        style={{backgroundColor: 'red'}}
      />
    </View>
  );
}

export default HistoryRequest;
