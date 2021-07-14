import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {backgroundColor, styles} from 'styled-system';
import colorConstant from '../constants/colorConstant';

function SplashScreen(props) {
  const navigation = useNavigation();
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        navigation.navigate('Dashboard');
      } else {
        navigation.navigate('Welcome_page');
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={{backgroundColor: colorConstant.primaryColor,flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontFamily:'Poppins-Bold',fontSize:60,color:'#ffffff'}}> We4Us</Text>
    </View>
  );
}

export default SplashScreen;
