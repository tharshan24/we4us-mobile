import React, {useEffect} from 'react';
import {View, Text, Button, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {useNavigation} from '@react-navigation/native';

const DeliveryDetailsAvailabilities = () => {
  const navigation = useNavigation();
  PushNotification.configure({
    onNotification: function () {
      navigation.navigate('Notification');
    },
    requestPermissions: Platform.OS === 'ios',
  });

  useEffect(() => {
    createNotification();
  }, []);

  const createNotification = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'check',
      message: 'working',
    });
  };

  return (
    <View>
      <Button title="check" onPress={() => handleNotification()} />
    </View>
  );
};

export default DeliveryDetailsAvailabilities;
