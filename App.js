/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './navigation/Routes';
import {io} from 'socket.io-client';
import SocketContext from './Context/SocketContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner} from 'native-base';
import {NativeBaseProvider} from 'native-base/src/core/NativeBaseProvider';

export default function App() {
  const [values, setValues] = useState({socket: '', token: '', values: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socketConnection = io('http://10.0.2.2:8000');
    const getUser = async () => {
      console.log('rrrrrrrrrrr');
      try {
        const value = await AsyncStorage.getItem('user');
        const parsedValue = JSON.parse(value);
        if (parsedValue !== null) {
          setValues({
            token: parsedValue.token,
            socket: socketConnection,
            values: parsedValue.result,
          });
          setLoading(false);
          console.log(parsedValue);
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, []);

  return (
    <NativeBaseProvider>
      {loading ? (
        <Spinner />
      ) : (
        <SocketContext.Provider value={values}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </SocketContext.Provider>
      )}
    </NativeBaseProvider>
  );
}
