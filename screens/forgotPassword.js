import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';

function ChangePwd({navigation}) {
  return (
    <View>
      <Text>Athavan</Text>
      <TouchableOpacity>
        <Button
          title="password"
          onPress={() => navigation.navigate('Password')}
        />
      </TouchableOpacity>

      <View>
        <Text>abthjhvjhb</Text>
      </View>
    </View>
  );
}

export default ChangePwd;
