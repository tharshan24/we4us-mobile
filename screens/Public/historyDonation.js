import React from 'react';
import {Text, View} from 'react-native';
import MapView from 'react-native-maps';

function HistoryDonation(props) {
  return (
    <View style={{flex: 1}}>
      <Text> Donation </Text>
      <MapView style={{flex: 1}} />
    </View>
  );
}

export default HistoryDonation;
