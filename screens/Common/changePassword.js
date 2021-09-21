import React, {useState} from 'react';
import {Text, View, StyleSheet, Dimensions, Alert} from 'react-native';
import colorConstant from '../../constants/colorConstant';
import {Input} from 'native-base';
import {Button} from 'react-native-paper';

function ChangePassword(props) {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const submit = () => {
    if (oldPwd === '') {
      Alert.alert('Enter Old Password');
    } else if (newPwd === '') {
      Alert.alert('Enter New Password');
    } else if (confirmPwd === '') {
      Alert.alert('Confirm New Password');
    } else if (confirmPwd !== newPwd) {
      Alert.alert('New password and confirm password are not matching ');
    } else {
      console.log('ok');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.oldPwdCon}>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt}>Old Password :</Text>
        </View>
        <View style={styles.oldPwdInput}>
          <Input
            size="sm"
            placeholder="Old Password"
            value={oldPwd}
            onChangeText={(val) => setOldPwd(val)}
            _light={{
              placeholderTextColor: 'blueGray.400',
            }}
            _dark={{
              placeholderTextColor: 'blueGray.50',
            }}
          />
        </View>
      </View>
      <View style={styles.oldPwdCon}>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt}>New Password :</Text>
        </View>
        <View style={styles.oldPwdInput}>
          <Input
            size="sm"
            placeholder="New Password"
            value={newPwd}
            onChangeText={(val) => setNewPwd(val)}
            _light={{
              placeholderTextColor: 'blueGray.400',
            }}
            _dark={{
              placeholderTextColor: 'blueGray.50',
            }}
          />
        </View>
      </View>
      <View style={styles.oldPwdCon}>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt}>Confirm Password :</Text>
        </View>
        <View style={styles.oldPwdInput}>
          <Input
            size="sm"
            placeholder="Confirm Password"
            value={confirmPwd}
            onChangeText={(val) => setConfirmPwd(val)}
            _light={{
              placeholderTextColor: 'blueGray.400',
            }}
            _dark={{
              placeholderTextColor: 'blueGray.50',
            }}
          />
        </View>
      </View>
      <View style={styles.btn}>
        <Button
          mode="contained"
          onPress={() => submit()}
          style={{height: 45, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Submit</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get('screen').height / 2,
    marginTop: 20,
  },
  oldPwdCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  txt: {
    fontSize: 18,
    fontFamily: 'Barlow-SemiBold',
    color: colorConstant.primaryColor,
  },
  oldPwdTxt: {
    flex: 1,
    justifyContent: 'center',
  },
  oldPwdInput: {
    flex: 1.5,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
});

export default ChangePassword;
