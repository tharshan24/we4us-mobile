/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import colorConstant from '../../constants/colorConstant';

function SplashScreen(props) {
  const navigation = useNavigation();
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (JSON.parse(user) !== null) {
        if (JSON.parse(user).result.userType === 1) {
          navigation.navigate('Dashboard');
        } else if (JSON.parse(user).result.userType === 2) {
          navigation.navigate('DashboardNgo');
        }
      } else {
        navigation.navigate('Welcome_page');
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View
      style={{
        backgroundColor: colorConstant.primaryColor,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{fontFamily: 'Poppins-Bold', fontSize: 60, color: '#ffffff'}}>
        We4Us
      </Text>
    </View>
  );
}

export default SplashScreen;
