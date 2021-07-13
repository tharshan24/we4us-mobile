import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Notification(props) {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Notification</Text>
      <Button
        title="check"
        onPress={() => navigation.navigate('PublicSetting')}
      />
    </View>
  );
}

export default Notification;
