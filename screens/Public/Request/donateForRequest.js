import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Alert, StyleSheet, Dimensions} from 'react-native';
import {Center, Input, Modal, Select, Spinner, VStack} from 'native-base';
import colorConstant from '../../../constants/colorConstant';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import constants from '../../../constants/constantsProject.';
import {useNavigation} from '@react-navigation/native';
import SocketContext from '../../../Context/SocketContext';

const DonateForRequest = ({route}) => {
  const {info} = route.params;
  const navigation = useNavigation();
  const context = useContext(SocketContext);
  const [addedItems, setAddedItems] = useState([]);
  const [message, setMessage] = useState('');
  const [dupArr, setDupArr] = useState(JSON.parse(JSON.stringify(info.items)));
  const orgArr = JSON.parse(JSON.stringify(info.items));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(info.items, 'qqqqqqqqqqqqqqqqq');
    dupArr.map((val, i) => {
      dupArr[i].needed_quantity = '';
    });
  }, []);

  // const countFunction = (val) => {
  //   if (info.quantity < val) {
  //     Alert.alert('You can not select more than available Quantity');
  //     setCount();
  //   } else {
  //     setCount(val);
  //   }
  // };

  const addItems = (count, name, quantity) => {
    if (count <= quantity) {
      const objIndex = dupArr.findIndex((obj) => obj.name === name);
      dupArr[objIndex].needed_quantity = count;
    } else {
      Alert.alert('You can not Donate more than requested');
    }
  };

  const donatingRequest = async () => {
    // console.log(dupArr, 'rrrrrrrrrrrrrrrrrrrrrrrr');
    setLoading(true);
    const data = {
      items: dupArr,
      attender_message: message,
      request_id: info.request_id,
    };
    await axios({
      url: constants.BASE_URL + 'request/createReqSession',
      method: 'post',
      data: data,
      headers: {
        Authorization: `Bearer ${context.token}`,
      },
    })
      .then(function (response) {
        console.log(response.data, 'tttttttttttttttttttt');
        if (response.data.status_code === 0) {
          Alert.alert('Successfully notified to the requester');
          navigation.pop(1);
          setLoading(false);
        } else {
          console.log(response.data);
          Alert.alert('Error creating in Donation');
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return loading ? (
    <Spinner />
  ) : (
    <View style={styles.mainContainer}>
      <View
        style={{
          width: Dimensions.get('screen').width / 1.1,
          marginTop: 10,
          marginBottom: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: colorConstant.proGreyDark,
            fontFamily: 'Barlow-SemiBold',
            textAlign: 'center',
          }}>
          Select Items you can donate to the Requester
        </Text>
      </View>
      {orgArr.map((values) => (
        <View
          key={values.id}
          style={{
            width: Dimensions.get('screen').width / 1.1,
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                fontSize: 20,
                color: colorConstant.proGreyDark,
                fontFamily: 'Barlow-SemiBold',
              }}>
              {values.name}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Input
              onChangeText={(val) =>
                addItems(val, values.name, values.needed_quantity)
              }
              keyboardType="numeric"
              type="text"
              mt={4}
              placeholder={values.needed_quantity.toString()}
              style={{
                borderWidth: 0.5,
                borderColor: colorConstant.primaryColor,
              }}
            />
          </View>
        </View>
      ))}
      <View style={{width: Dimensions.get('screen').width / 1.1}}>
        <Input
          onChangeText={(value) => setMessage(value)}
          type="text"
          multiline
          numberOfLines={4}
          mt={4}
          value={message}
          placeholder="Message"
          style={{
            borderWidth: 0.5,
            borderColor: colorConstant.primaryColor,
          }}
        />
      </View>
      <View
        style={{
          width: Dimensions.get('screen').width / 1.1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 20,
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
            donatingRequest();
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
            navigation.navigate('BrowseAvailability');
          }}>
          <Text>CLOSE</Text>
        </Button>
      </View>
    </View>
  );
};

export default DonateForRequest;

const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get('screen').height / 1.75,
    alignItems: 'center',
    // width: Dimensions.get('screen').width / 1.1,
    // justifyContent: 'center',
    // backgroundColor: 'red',
    marginLeft: 15,
    marginRight: 15,
  },
});
