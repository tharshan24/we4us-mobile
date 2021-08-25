import React from 'react';
import {Alert, Center, NativeBaseProvider} from 'native-base';

const successfullySubmitted = () => {
  return (
    <NativeBaseProvider>
      <Alert
        status="warning"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        <Alert.Icon boxSize="40px" mr={0} />
        <Alert.Title mt={2} mb={2}>
          This is a success alert
        </Alert.Title>
        <Alert.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Alert.Description>
      </Alert>
    </NativeBaseProvider>
  );
};

export default successfullySubmitted;
