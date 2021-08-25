import React from 'react';
import {Alert, Center, NativeBaseProvider} from 'native-base';

const alertBox = ({status, title, content}) => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Alert status={status} w="100%">
          <Alert.Icon />
          <Alert.Title>{title}</Alert.Title>
          <Alert.Description>{content}</Alert.Description>
        </Alert>
      </Center>
    </NativeBaseProvider>
  );
};

export default alertBox;
