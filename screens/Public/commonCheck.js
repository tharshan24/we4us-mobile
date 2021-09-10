import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

function CommonCheck({route}) {
  const {senderReceiver} = route.params;

  useEffect(() => {
    console.log(senderReceiver);
  }, []);

  return (
    <View>
      <Text>Common Check</Text>
    </View>
  );
}

export default CommonCheck;
