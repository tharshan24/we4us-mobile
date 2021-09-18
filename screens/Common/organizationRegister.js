/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {
  Select,
  VStack,
  CheckIcon,
  NativeBaseProvider,
  Input,
  Spinner,
  Center,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import constants from '../../constants/constantsProject.';
import { clearConfigCache } from 'prettier';


const OrganizationRegister = (props) => {
  const navigation = useNavigation();
  const [name, setUsername] = React.useState();
  const [type, setType] = React.useState(null);
  const [district, setDistrict] = React.useState();
  const [city, setCity] = React.useState([]);
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
  const [loading, setLoading] = React.useState(true);
  const [selectedCity, setSelectedCity] = React.useState(true);
  const [selectedDistrict, setSelectedDistrict] = React.useState(true);

  let flag = 0;

  const validateEmail = () => {
    console.log('blur');
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setShowEmailError(!re.test(email));
    if (re.test(email)) {
      flag = 1;
    } else {
      flag = 0;
    }
    return re.test(email);
  };

  const validateMobile = () => {
    const reg = /^(\+\d{1,3}[- ]?)?\d{9}$/;
    setShowMobileError(!reg.test(mobile));
    if (reg.test(mobile)) {
      flag = 1;
    } else {
      flag = 0;
    }
    return reg.test(mobile);
  };

  const validatePassword = () => {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8}$/;
    setShowPasswordError(!reg.test(password));
    if (reg.test(password)) {
      flag = 1;
    } else {
      flag = 0;
    }
    return reg.test(password);
  };

  const confirmPassword = () => {
    if (checkPassword === password) {
      setConfirmShowPasswordError(false);
      flag = 1;
      return true;
    } else {
      setConfirmShowPasswordError(true);
      flag = 0;
      return false;
    }
  };

  const loadDistrict = () => {
    axios
      .get(constants.BASE_URL + 'system/districts')
      .then(function (response) {
        setDistrict(response.data.result.rows);
        setLoading(false);
      })
      .catch(function (error) {



        
        console.log(error);
      });
  };

  const loadCities = (districtId) => {
    axios
      .get(constants.BASE_URL + `system/citiesByDistrict/${districtId}`)
      .then(function (response) {
        setCity(response.data.result.rows);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    loadDistrict();
  }, []);

  const changeDistrict = (districtId) => {
    setSelectedDistrict(districtId);
    loadCities(districtId);
  };

  const validateOnSubmit = () => {
    if (flag === 1) {
      RegisterUser();
    } else {
      Alert.alert('Enter valid Credentials');
      navigation.replace('Auth', {
        screen: 'OrganizationRegister',
      });
    }
  };

  const RegisterUser = () => {
    console.log(type,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    axios
      .post(constants.BASE_URL + 'user/orgRegister', {
        user_name: name,
        email: email,
        mobile_number: mobile,
        city: selectedCity,
        organization_type: type,
        password: checkPassword,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.status_code === 0) {
          navigation.replace('Auth', {
            screen: 'Login',
          });
        } else {
          Alert.alert('Organization Registration Failed');
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <NativeBaseProvider>
    <ScrollView>
      {loading?<Spinner/>:
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>We4Us</Text>
          <Image
            source={require('../../assets/Images/Organization_image.png')}
            style={{
              width: 200,
              height: 200,
              left: 100,
              alignItems: 'center',
            }}
          />
            <View style={styles.Inputtext}>
              <VStack alignItems="center" space={4}>
                <Select
                  selectedValue={type}
                  minWidth={330}
                  style={styles.textInput}
                  placeholder="Type"
                  onValueChange={(itemValue) => setType(itemValue)}
                  _selectedItem={{
                    bg: 'cyan.600',
                    endIcon: <CheckIcon size={15} />,
                  }}>
                  <Select.Item label="NGO" value={2} />
                  <Select.Item label="Shops" value={3} />
                  <Select.Item label="Restaurants" value={4} />
                  <Select.Item label="Care Homes" value={5} />
                </Select>
              </VStack>
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
                <Input
                  style={styles.textInput}
                  placeholder="Username"
                  onChangeText={(val) => setUsername(val)}
                  value={name}
                />
              </View>
            <View style={styles.Inputtext}>
                <VStack alignItems="center" space={4}>
                  <Select
                    selectedValue={selectedDistrict}
                    minWidth={330}
                    style={styles.textInput}
                    placeholder="District"
                    onValueChange={(itemValue) => changeDistrict(itemValue)}
                    _selectedItem={{
                      bg: 'cyan.600',
                      endIcon: <CheckIcon size={15} />,
                    }}>
                    {district.map((distVal) => (
                      <Select.Item
                        label={distVal.name_en}
                        value={distVal.id}
                        key={distVal.id}
                      />
                    ))}
                  </Select>
                </VStack>
              </View>
            <View style={styles.Inputtext}>
                <VStack alignItems="center" space={4}>
                  <Select
                    selectedValue={selectedCity}
                    minWidth={330}
                    style={styles.textInput}
                    placeholder="City"
                    onValueChange={(itemValue) => setSelectedCity(itemValue)}
                    _selectedItem={{
                      bg: 'cyan.600',
                      endIcon: <CheckIcon size={15} />,
                    }}>
                    {city.map((cityVal) => (
                      <Select.Item
                        label={cityVal.name_en}
                        value={cityVal.id}
                        key={cityVal.id}
                      />
                    ))}
                  </Select>
                </VStack>
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
                onPress={validateOnSubmit}>
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
        </View>
      </SafeAreaView>}
    </ScrollView>
    </NativeBaseProvider>
  );
};

export default OrganizationRegister;

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
