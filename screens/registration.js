import React from 'react';
import {View, Text, Button} from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';

function Registration({navigation}) {
  return (
    <View>
      <Text>Athavan</Text>
      <Button title="change" onPress={() => navigation.navigate('Password')} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

export default Registration;
