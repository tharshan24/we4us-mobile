import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, Alert} from 'react-native';
import colorConstant from '../../constants/colorConstant';
import {Input, Spinner} from 'native-base';
import {Button} from 'react-native-paper';
import axios from 'axios';
import constants from '../../constants/constantsProject.';
import SocketContext from '../../Context/SocketContext';

function ChangePassword(props) {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const context = useContext(SocketContext);

  const submit = async () => {
    if (oldPwd === '') {
      Alert.alert('Enter Old Password');
    } else if (newPwd === '') {
      Alert.alert('Enter New Password');
    } else if (confirmPwd === '') {
      Alert.alert('Confirm New Password');
    } else if (confirmPwd !== newPwd) {
      Alert.alert('New password and confirm password are not matching ');
    } else {
      setLoading(true);
      const pwd = {
        old_password: oldPwd,
        new_password: confirmPwd,
      };
      try {
        await axios({
          url: constants.BASE_URL + 'user/changeUserPass',
          method: 'post',
          data: pwd,
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        }).then(function (response) {
          if (response.data.status_code === 0) {
            console.log(response.data, 'rrrrrrrrrrrrr');
            Alert.alert('Password Changed Successfully');
            setOldPwd('');
            setNewPwd('');
            setConfirmPwd('');
            setLoading(false);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <View style={styles.mainContainer}>
      <View style={styles.oldPwdCon}>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt}>Current Password :</Text>
        </View>
        <View style={styles.oldPwdInput}>
          <Input
            size="sm"
            placeholder="Current Password"
            type="password"
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
            type="password"
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
            type="password"
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
          style={{
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colorConstant.primaryColor,
          }}>
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
