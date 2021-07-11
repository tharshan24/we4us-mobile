import React from 'react';
import {Text, View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';


function SettingsPublic(props) {
    const navigation = useNavigation();
  return (
    <View>
      <Text> Setting Check</Text>
      <Button
        title="check"
        onPress={() => navigation.navigate('History-Donation')}
      />
    </View>
  );
}

export default SettingsPublic;
