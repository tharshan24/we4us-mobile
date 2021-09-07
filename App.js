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

export default function App() {
  // const socket = useRef();
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socketConnection = io('http://10.0.2.2:5500');
    setSocket(socketConnection);
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SocketContext.Provider>
  );
}
