/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import {Input, NativeBaseProvider} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import colorConstant from '../../constants/colorConstant';
import {Button} from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../constants/constantsProject.';

// import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
// import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';

const Login = (props) => {
  const navigation = useNavigation();
  const [show, setShow] = React.useState(false);
  // const [showEmailError, setShowEmailError] = React.useState(false);
  const [pwd, setPwd] = React.useState();
  const [email, setEmail] = React.useState();
  const handleClick = () => setShow(!show);

  const login = () => {
    axios
      .post(constants.BASE_URL + 'user/login', {
        user_name: email,
        password: pwd,
      })
      .then(function (response) {
        if (response.data.status_code === 0) {
          const user = {
            result: response.data.result,
            token: response.data.token,
          };
          storeData(user);
          // storeData(response.data.user);
          // storeData(response.data.result.userType);
          if (response.data.result.userType === 1) {
            navigation.replace('Dashboard');
          } else if (response.data.result.userType === 2) {
            navigation.replace('DashboardNgo');
          } else if (response.data.result.userType === 3) {
            navigation.replace('DashboardHome');
          } else if (JSON.parse(user).result.userType === 4) {
            navigation.navigate('DashboardShops');
          } else if (JSON.parse(user).result.userType === 5) {
            navigation.navigate('DashboardRestaurant');
          }
        } else {
          Alert.alert('Enter valid Credentials');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.Container}>
        <StatusBar backgroundColor={colorConstant.primaryColor} />

        <View style={styles.HeaderContainer}>
          <Text style={styles.Heading}>We4Us</Text>
        </View>
        <View style={styles.BottomContainer}>
          <Text style={styles.HeaderTxt}>SignIn</Text>
          <View>
            <View style={styles.InputUsername}>
              <Input
                style={styles.UsernameInput}
                placeholder="Username"
                onChangeText={(val) => setEmail(val)}
                // onBlur={() => validateEmail()}
                value={email}
              />
              {/* {showEmailError ? <Text>Enter valid Email</Text> : null} */}
            </View>
            <View>
              <Input
                type={show ? 'text' : 'password'}
                InputRightElement={
                  <Button
                    style={{
                      backgroundColor: colorConstant.primaryColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 59,
                    }}
                    roundedRight="md"
                    roundedLeft={0}
                    onPress={handleClick}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 13,
                      }}>
                      {show ? 'Hide' : 'Show'}
                    </Text>
                  </Button>
                }
                style={styles.PasswordInput}
                placeholder="Password"
                onChangeText={(val) => setPwd(val)}
              />
            </View>
          </View>
          <View style={styles.ForgotPwdContainer}>
            <Button
              mode="text"
              uppercase={false}
              onPress={() => navigation.navigate('forgotPassword')}>
              <Text style={styles.ForgotPwdText}>ForgotPassword</Text>
            </Button>
            <View style={styles.SigninBtnContainer}>
              <Button
                color={colorConstant.primaryColor}
                style={{
                  flexDirection: 'column',
                  height: 50,
                  width: 100,
                  marginTop: 5,
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colorConstant.primaryColor,
                }}
                mode="contained"
                onPress={() => login()}>
                <Text style={styles.SigninBtn}> Sign in </Text>
              </Button>
            </View>
          </View>
          <View style={styles.DontHaveAccContainer}>
            <View style={styles.SignupContainer}>
              <Text style={styles.DontHaveAccTxt}>Don't have an Account</Text>
              <Button
                color={colorConstant.primaryColor}
                style={{
                  flexDirection: 'column',
                  height: 30,
                  width: 100,
                  marginTop: 5,
                  justifyContent: 'center',
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: colorConstant.primaryColor,
                }}
                mode="outlined"
                onPress={() => navigation.navigate('Registration')}>
                <Text style={styles.SignupBtn}> Sign up </Text>
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colorConstant.primaryColor,
  },
  HeaderContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  Heading: {
    fontFamily: 'Barlow-Bold',
    fontSize: 48,
    color: '#FFFFFF',
  },
  BottomContainer: {
    flex: 2.5,
    backgroundColor: '#FFFFFF',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    padding: 10,
  },
  InputUsername: {
    marginTop: 4,
    marginBottom: 20,
  },
  HeaderTxt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    color: colorConstant.primaryColor,
    left: 5,
  },
  UsernameInput: {
    height: 59,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    borderWidth: 1,
    borderColor: colorConstant.primaryColor,
    // paddingLeft: 20,
  },
  PasswordInput: {
    height: 59,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 0,
    borderColor: colorConstant.primaryColor,
  },
  ForgotPwdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    // marginBottom: 5,
  },
  ForgotPwdText: {
    fontFamily: 'Poppins-Medium',
    color: colorConstant.primaryColor,
    fontSize: 14,
  },
  DontHaveAccContainer: {
    // flex: 1,
    marginTop: 50,
    // flexDirection: 'row',
    // justifyContent: 'space-between',

    // paddingBottom: 20,
  },
  SignupContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  DontHaveAccTxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: colorConstant.proCharcoal,
    justifyContent: 'center',
  },
  SignupBtn: {
    fontSize: 12,
  },
  SigninBtnContainer: {},
  SigninBtn: {
    flexDirection: 'row',
    fontSize: 14,
  },
});

export default Login;
