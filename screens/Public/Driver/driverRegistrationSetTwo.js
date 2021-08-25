import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function driverRegistrationSetTwo() {
  const navigation = useNavigation();

  useEffect(() => {
    getDataInputOne();
  }, []);

  const getDataInputOne = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@DriverInputSetOne');
      return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.LicenseProof}></View>
      <View style={styles.vehicleProof}></View>
      <View style={styles.btnContainer}></View>
    </View>
  );
}

export default driverRegistrationSetTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('screen').height,
    marginTop: 20,
    marginBottom: 10,
    // backgroundColor: '#12166c'
  },
  LicenseProof: {
    flex: 1,
    // backgroundColor: '#126c62',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  vehicleProof: {
    flex: 1,
    backgroundColor: '#0e0f47',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  btnContainer: {
    flex: 0.2,
    backgroundColor: '#c6bd25',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
