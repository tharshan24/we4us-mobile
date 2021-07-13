/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {
  Select,
  VStack,
  CheckIcon,
  Center,
  NativeBaseProvider,
  Input,
} from 'native-base';

const PersonRegister = (props) => {
  const navigation = useNavigation();
  const [name, setUsername] = React.useState();
  const [gender, setGender] = React.useState();
  const [email, setEmail] = React.useState();
  const [mobile, setMobile] = React.useState();
  const [password, setPassword] = React.useState();
  const [checkPassword, setCheckPassword] = React.useState();
  const [show, setShow] = React.useState(false);
  const [showEmailError, setShowEmailError] = React.useState(false);
  const [showMobileError, setShowMobileError] = React.useState(false);
  const [showPasswordError, setShowPasswordError] = React.useState(false);
  const [showConfirmPasswordError, setConfirmShowPasswordError] =
    React.useState(false);
  const handleClick = () => setShow(!show);
  // const [gender, setGender] = React.useState('');

  const validateEmail = () => {
    console.log('blur');
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(email, re.test(email));
    setShowEmailError(!re.test(email));
    return re.test(email);
  };

  const validateMobile = () => {
    const reg = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    setShowMobileError(!reg.test(mobile));
    return reg.test(mobile);
  };
  const validatePassword = () => {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    setShowPasswordError(!reg.test(password));
    return reg.test(password);
  };

  const confirmPassword = () => {
    if (checkPassword === password) {
      setConfirmShowPasswordError(false);
    } else {
      setConfirmShowPasswordError(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>We4Us</Text>
        <Image
          source={require('../assets/Images/Person_image.png')}
          style={{
            width: 200,
            height: 200,
            left: 100,
            alignItems: 'center',
          }}
        />

        <ScrollView>
          <NativeBaseProvider>
            <View style={styles.Inputtext}>
              <Input
                style={styles.textInput}
                placeholder="Username"
                onChangeText={(val) => setUsername(val)}
                value={name}
              />
            </View>
            <View style={styles.Inputtext}>
              <Input
                style={styles.textInput}
                placeholder="Email"
                onChangeText={(val) => setEmail(val)}
                onBlur={() => validateEmail()}
                value={email}
              />
              {showEmailError ? (
                <Text style={{color: 'red', fontFamily: 'Barlow-Regular'}}>
                  Enter valid Email
                </Text>
              ) : null}
            </View>
            <View style={styles.Inputtext}>
              <Input
                style={styles.textInput}
                placeholder="Mobile No"
                keyboardType="numeric"
                value={mobile}
                onChangeText={(val) => setMobile(val)}
                onBlur={() => validateMobile()}
              />
              {showMobileError ? (
                <Text style={{color: 'red', fontFamily: 'Barlow-Regular'}}>
                  Enter valid Mobile Number
                </Text>
              ) : null}
            </View>
            <View style={styles.Inputtext}>
              <VStack alignItems="center" space={4}>
                <Select
                  selectedValue={gender}
                  minWidth={330}
                  style={styles.textInput}
                  placeholder="Gender"
                  onValueChange={(itemValue) => setGender(itemValue)}
                  _selectedItem={{
                    bg: 'cyan.600',
                    endIcon: <CheckIcon size={15} />,
                  }}>
                  <Select.Item label="Male" value="js" />
                  <Select.Item label="Female" value="ts" />
                  <Select.Item label="Other" value="c" />
                </Select>
              </VStack>
            </View>
            <View style={styles.Inputtext}>
              <Input
                type={show ? 'text' : 'password'}
                InputRightElement={
                  <Button
                    style={{
                      backgroundColor: '#3F5185',
                      justifyContent: 'center',
                      borderColor: '#3F5185',
                      alignItems: 'center',
                      height: 59,
                    }}
                    roundedRight="md"
                    roundedLeft={0}
                    onPress={handleClick}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                      }}>
                      {show ? 'Hide' : 'Show'}
                    </Text>
                  </Button>
                }
                style={styles.textInput}
                placeholder="Password"
                value={password}
                onChangeText={(pwd) => setPassword(pwd)}
                onBlur={() => validatePassword()}
              />
              {showPasswordError ? (
                <Text style={{color: 'red', fontFamily: 'Barlow-Regular'}}>
                  {
                    'Password must at least 8 characters long\n1 uppercase & 1 lowercase character  and 1 number'
                  }
                </Text>
              ) : null}
            </View>
            <View style={styles.Inputtext}>
              <Input
                type={show ? 'text' : 'password'}
                InputRightElement={
                  <Button
                    style={{
                      backgroundColor: '#3F5185',
                      justifyContent: 'center',
                      borderColor: '#3F5185',
                      alignItems: 'center',
                      height: 59,
                    }}
                    roundedRight="md"
                    roundedLeft={0}
                    onPress={handleClick}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                      }}>
                      {show ? 'Hide' : 'Show'}
                    </Text>
                  </Button>
                }
                style={styles.textInput}
                placeholder="Confirm Password"
                value={checkPassword}
                onChangeText={(checkPwd) => setCheckPassword(checkPwd)}
                onBlur={() => confirmPassword()}
              />
              {showConfirmPasswordError ? (
                <Text style={{color: 'red', fontFamily: 'Barlow-Regular'}}>
                  Password not Matched
                </Text>
              ) : null}
            </View>
          </NativeBaseProvider>

          <Button
            color="white"
            style={{
              flexDirection: 'column',
              height: 60,
              width: 150,
              marginTop: 5,
              justifyContent: 'center',
              borderRadius: 5,
              borderWidth: 1,
              backgroundColor: '#3F5185',
              top: 1,
              left: 130,
            }}
            mode="outlined"
            onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.Btn}> Submit </Text>
          </Button>
          <View>
            <Text style={styles.bodytext}>Already have an account? </Text>

            <Button
              color="#3F5185"
              style={{
                flexDirection: 'column',
                height: 35,
                width: 100,
                marginTop: 5,
                left: 232,
                alignContent: 'flex-end',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#3F5185',
                backgroundColor: 'white',
              }}
              mode="outlined"
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.Btn}> Sign In </Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PersonRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 110,
    paddingHorizontal: 30,
  },
  footer_title: {
    fontSize: 25,
    fontStyle: 'normal',
    fontFamily: 'Barlow',
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 45,
    fontStyle: 'normal',
    fontFamily: 'Barlow',
    color: '#3F51B5',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    height: 59,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#3F5185',
  },
  Inputtext: {
    marginTop: 4,
    marginBottom: 24,
    width: 334,
    left: 40,
  },
  PasswordInput: {
    height: 59,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    borderColor: '#3F5185',
  },
  Btn: {
    fontSize: 14,
  },
  bodytext: {
    top: 31,
    fontSize: 18,
    marginLeft: 16,
    color: '#000',
  },
});
