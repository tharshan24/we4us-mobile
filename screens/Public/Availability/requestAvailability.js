import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Alert, StyleSheet, Dimensions} from 'react-native';
import {Center, Input, Modal, Select, VStack} from 'native-base';
import colorConstant from '../../../constants/colorConstant';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import constants from '../../../constants/constantsProject.';
import {useNavigation} from '@react-navigation/native';
import SocketContext from '../../../Context/SocketContext';

const RequestAvailability = ({route}) => {
  const {info} = route.params;
  const navigation = useNavigation();
  const context = useContext(SocketContext);
  const [paymentMode, setPaymentMode] = useState(null);
  const [location, setLocation] = useState('');
  const [requesterLocation, setRequesterLocation] = useState('');
  const [count, setCount] = useState(null);
  const [reqMessage, setReqMessage] = useState('');

  useEffect(() => {
    return navigation.addListener('focus', (e) => {
      getDataSelectedLocation();
    });
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  const countFunction = (val) => {
    if (info.quantity < val) {
      Alert.alert('You can not select more than available Quantity');
      setCount();
    } else {
      setCount(val);
    }
  };

  const requestFunction = (val) => {
    setReqMessage(val);
  };

  const requestingAvailability = async () => {
    if (count === null) {
      Alert.alert('Give the amount of items you needed');
    } else if (reqMessage === '') {
      Alert.alert('Give a short Message to creator');
    } else if (paymentMode === null) {
      Alert.alert('Select Driver mode');
    } else if (requesterLocation === '') {
      Alert.alert('Select your Location to deliver');
    } else {
      console.log('yyyyyyyyyyyy');
      const data = {
        quantity: count,
        requester_message: reqMessage,
        availability_id: info.availability_id,
        latitude: requesterLocation.latitude,
        longitude: requesterLocation.longitude,
        requester_delivery_option: paymentMode,
      };
      await axios({
        url: constants.BASE_URL + 'availability/createAvailSession',
        method: 'post',
        data: data,
        headers: {
          Authorization: `Bearer ${context.token}`,
        },
      })
        .then(function (response) {
          if (response.data.status_code === 0) {
            console.log();
            Alert.alert('Successfully Requested to the Creator');
            navigation.popToTop();
          } else {
            console.log(response.data);
            Alert.alert('Error in Requesting Availability');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const getDataSelectedLocation = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('selectedLocationRequest');
      if (jsonValue != null) {
        setRequesterLocation(JSON.parse(jsonValue));
        console.log(jsonValue);
        await AsyncStorage.removeItem('selectedLocationRequest');
      } else {
        console.log('No Location Selected');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{width: Dimensions.get('screen').width / 1.1}}>
        <Text
          style={{
            fontSize: 20,
            color: colorConstant.proGreyDark,
            fontFamily: 'Barlow-SemiBold',
            textAlign: 'center',
          }}>
          {info.quantity} Items are available, Give how many items you needed
        </Text>
      </View>
      <View style={{width: Dimensions.get('screen').width / 1.1}}>
        <Input
          onChangeText={(value) => countFunction(value)}
          keyboardType="numeric"
          type="text"
          mt={4}
          placeholder="Give the Count"
          value={count}
          style={{
            borderWidth: 0.5,
            borderColor: colorConstant.primaryColor,
          }}
        />
      </View>
      <View style={{width: Dimensions.get('screen').width / 1.1}}>
        <Input
          onChangeText={(value) => requestFunction(value)}
          type="text"
          multiline
          numberOfLines={4}
          mt={4}
          value={reqMessage}
          placeholder="Requester Message"
          style={{
            borderWidth: 0.5,
            borderColor: colorConstant.primaryColor,
          }}
        />
      </View>
      <View style={{width: Dimensions.get('screen').width / 1.1}}>
        <VStack>
          <Select
            mt={4}
            style={{
              borderWidth: 0.5,
              borderColor: colorConstant.primaryColor,
            }}
            selectedValue={paymentMode}
            placeholder="Select Payment Mode"
            onValueChange={(itemValue) => setPaymentMode(itemValue)}>
            <Select.Item label="Self Delivery" value={0} />
            <Select.Item label="Free Driver" value={1} />
            <Select.Item label="Paid Driver" value={2} />
          </Select>
        </VStack>
      </View>
      <View style={{width: Dimensions.get('screen').width / 1.1}}>
        <Button
          style={{
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: colorConstant.primaryColor,
            marginRight: 20,
            height: 45,
            width: Dimensions.get('screen').width / 1.1,
            justifyContent: 'center',
          }}
          mode="contained"
          onPress={() => {
            navigation.navigate('requestAvailabilityLocationMap', {
              location,
            });
          }}>
          <Text>Select your Location</Text>
        </Button>
      </View>
      <View
        style={{
          width: Dimensions.get('screen').width / 1.1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <Button
          style={{
            backgroundColor: colorConstant.proGreen,
            marginRight: 20,
            height: 45,
            justifyContent: 'center',
          }}
          mode="contained"
          onPress={() => {
            requestingAvailability();
          }}>
          <Text>SEND REQUEST</Text>
        </Button>
        <Button
          style={{
            backgroundColor: colorConstant.proRed,
            height: 45,
            justifyContent: 'center',
          }}
          mode="contained"
          onPress={() => {
            setCount();
            setReqMessage();
            setRequesterLocation();
            setPaymentMode();
            navigation.navigate('BrowseAvailability');
          }}>
          <Text>CLOSE</Text>
        </Button>
      </View>
    </View>
  );
};

export default RequestAvailability;

const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get('screen').height / 1.75,
    alignItems: 'center',
    // width: Dimensions.get('screen').width / 1.1,
    justifyContent: 'center',
    // backgroundColor: 'red',
    marginLeft: 15,
    marginRight: 15,
  },
});
