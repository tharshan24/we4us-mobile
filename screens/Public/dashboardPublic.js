/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import colorConstant from '../../constants/colorConstant';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import {Switch, HStack, Center, NativeBaseProvider} from 'native-base';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../constants/constantsProject.';
import axios from 'axios';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import SocketContext from '../../Context/SocketContext';

const DashboardPublic = (props) => {
  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [driverStatus, setDriverStatus] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [permission, setPermission] = useState(null);
  const [accNo, setAccNo] = useState(null);

  useEffect(() => {
    getUser();
    getDriverStatus();
  }, [userId]);

  useEffect(() => {
    requestPermission();
    checkPermissions();
  }, [permission]);

  const requestPermission = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
      setPermission(result);
    });
    // console.log('Permission Already Granted');
  };

  const checkPermissions = () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            getOneTimeLocation();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const parsedValue = JSON.parse(jsonValue);
      if (parsedValue !== null) {
        setToken(parsedValue.token);
        setUserId(parsedValue.result.id);
      }
    } catch (e) {
      console.log(e);
    }
    console.log('Done.');
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        // console.log(position);
        // console.log(position);
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const getDriverStatus = async () => {
    await axios
      .get(constants.BASE_URL + 'public/viewProfile/' + userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        response.data.result.map((val) => {
          // console.log(val);
          setAccNo(val.account_number);
          setDriverStatus(val.driver_status);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     sendData();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [isEnabled, driverStatus, currentLongitude, accNo, currentLatitude]);

  const sendData = async () => {
    console.log(isEnabled);
    const data = {
      longitude: currentLongitude,
      latitude: currentLatitude,
      driverMode: isEnabled,
      isDriver: null,
      paymentType: null,
      socketId: socket.id,
    };
    {
      driverStatus === 1 ? (data.isDriver = 1) : (data.isDriver = 0);
    }
    {
      accNo === null ? (data.paymentType = 0) : (data.paymentType = 1);
    }
    // console.log(data, 'wwwwwwwwwwwwwwwwwwwwwwwwwwwww');
    await axios({
      url: constants.BASE_URL + 'user/updateRealUser',
      method: 'post',
      data: data,
      headers: {
        Authorization: `UserData ${token}`,
      },
    })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={colorConstant.primaryColor} />
      <View style={styles.HeaderContainer}>
        <View style={styles.HeaderTxtCon}>
          <Text style={styles.HeaderTxt}>Profile</Text>
        </View>
        <View style={styles.ProfilePicCon}>
          <Image
            style={styles.ProfilePic}
            source={require('../../assets/Images/profilePic.jpg')}
          />
        </View>
        <View style={styles.UserDetails}>
          <Text style={styles.UserName}> Theivendram Athavan </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={({marginRight: 15}, {marginTop: 3})}>
              <MaterialCommunityIcons name="email" color="#ffffff" size={13} />
            </View>
            <View style={{marginLeft: 8}}>
              <Text style={styles.Email}>thavanthya@gmail.com </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={({marginRight: 15}, {marginTop: 3})}>
              <MaterialCommunityIcons name="phone" color="#ffffff" size={13} />
            </View>
            <View style={{marginLeft: 3}}>
              <Text style={styles.Mobile}> +94 77 946 2554 </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.BottomContainer}>
        <View style={styles.OverviewCon}>
          <View style={styles.OverviewTxtCon}>
            <Text style={styles.OverviewTxt}>Overview</Text>
          </View>
          <View style={styles.OverviewIcon}>
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              color={colorConstant.primaryColor}
              size={43}
            />
          </View>
        </View>
        <View style={styles.ContentCon}>
          <View style={styles.MainActions}>
            <View style={styles.Donations}>
              <View style={styles.DonationHeader}>
                <View style={styles.DonationHeaderTxtCon}>
                  <Text style={styles.DonationHeaderTxt}>DONATIONS</Text>
                </View>
                <View style={styles.DonationHeaderIcon}>
                  <MaterialCommunityIcons
                    name="handshake"
                    color={colorConstant.proGreen}
                    size={25}
                  />
                </View>
              </View>
              <View style={styles.DonationCount}>
                <Text style={styles.DonationCountTxt}>17</Text>
                <Text style={styles.DonationSuccess}>SUCCESSFUL DONATIONS</Text>
              </View>
              <View style={styles.ButtonsCon}>
                <Button
                  color={colorConstant.primaryColor}
                  mode="contained"
                  style={{
                    marginTop: 9,
                    height: 25,
                    width: 100,
                    justifyContent: 'center',
                  }}
                  onPress={() => navigation.navigate('History-Donation')}>
                  <Text style={styles.BtnTxt}>History</Text>
                </Button>
                <Button
                  color={colorConstant.proRed}
                  mode="contained"
                  style={{
                    marginTop: 10,
                    height: 30,
                    width: 150,
                    justifyContent: 'center',
                  }}
                  onPress={() => navigation.navigate('OngoingDonation')}>
                  <Text style={styles.BtnTxt2}>2 in Progress</Text>
                </Button>
              </View>
            </View>
            <View style={styles.Requests}>
              <View style={styles.RequestHeader}>
                <View style={styles.RequestHeaderTxtCon}>
                  <Text style={styles.RequestHeaderTxt}>REQUESTS</Text>
                </View>
                <View style={styles.RequestHeaderIcon}>
                  <MaterialCommunityIcons
                    name="bullhorn-outline"
                    color={colorConstant.proRed}
                    size={25}
                  />
                </View>
              </View>
              <View style={styles.RequestCount}>
                <Text style={styles.RequestCountTxt}>5</Text>
                <Text style={styles.RequestSuccess}>REQUESTS CREATED</Text>
              </View>
              <View style={styles.ButtonsConRequest}>
                <Button
                  color={colorConstant.primaryColor}
                  mode="contained"
                  style={{
                    marginTop: 9,
                    height: 25,
                    width: 100,
                    justifyContent: 'center',
                  }}
                  onPress={() => navigation.navigate('History-Request')}>
                  {/*onPress={() => navigation.navigate('chatComponent')}>*/}
                  <Text style={styles.BtnTxtRequest}>History</Text>
                </Button>
                <Button
                  color={colorConstant.proRed}
                  mode="contained"
                  style={{
                    marginTop: 10,
                    height: 30,
                    width: 150,
                    justifyContent: 'center',
                  }}
                  onPress={() => navigation.navigate('OngoingRequest')}>
                  <Text style={styles.BtnTxt2Request}>3 on request</Text>
                </Button>
              </View>
            </View>
          </View>
          <View style={styles.RegisterDriverCon}>
            <View style={styles.Heading}>
              <View style={styles.DriverHeaderCon}>
                <Text style={styles.DriverHeaderTxt}>DELIVERIES</Text>
              </View>
              <View>
                <MaterialCommunityIcons
                  name="truck-fast-outline"
                  color={colorConstant.proCharcoal}
                  size={25}
                />
              </View>
            </View>
            <View style={styles.ImageCon}>
              <Image
                style={styles.DeliveryImage}
                source={require('../../assets/Images/registerDriver.png')}
              />
              {driverStatus === 0 ? (
                <Button
                  color={colorConstant.primaryColor}
                  mode="contained"
                  style={{
                    marginTop: 5,
                    width: 205,
                    height: 30,
                    justifyContent: 'center',
                  }}
                  onPress={() => navigation.navigate('registerDriverOne')}>
                  <Text>REGISTER AS A DRIVER</Text>
                </Button>
              ) : driverStatus === 1 ? (
                <View>
                  <NativeBaseProvider>
                    <HStack alignItems="center" space={8}>
                      {isEnabled ? (
                        <Text
                          style={{
                            fontSize: 20,
                            fontFamily: 'Barlow-SemiBold',
                            color: '#157918',
                          }}>
                          Driver Mode is ON
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: 20,
                            fontFamily: 'Barlow-SemiBold',
                            color: '#5f5f5f',
                          }}>
                          Enable Driving Mode
                        </Text>
                      )}
                      <Switch
                        colorScheme="emerald"
                        size="lg"
                        onToggle={toggleSwitch}
                        isChecked={isEnabled}
                      />
                    </HStack>
                  </NativeBaseProvider>
                </View>
              ) : driverStatus === 2 ? (
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Barlow-SemiBold',
                    color: '#b8b6b6',
                  }}>
                  Your Driver Application is Pending
                </Text>
              ) : null}
            </View>
          </View>
        </View>
      </View>
      {/*<Button*/}
      {/*  onPress={() => clearInterval(myInterval)}*/}
      {/*  mode="contained"*/}
      {/*  title="lklklklk"*/}
      {/*/>*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colorConstant.primaryColor,
  },
  HeaderContainer: {
    flex: 1,
  },
  BottomContainer: {
    flex: 2,
    backgroundColor: '#f8f8f8',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  HeaderTxtCon: {
    flex: 0.25,
    alignItems: 'center',
  },
  HeaderTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: '#ffffff',
  },
  ProfilePicCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 35,
  },
  ProfilePic: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  UserDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 7,
  },
  UserName: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: '#ffffff',
  },
  Email: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 13,
    color: '#ffffff',
  },
  Mobile: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 13,
    color: '#ffffff',
  },
  OverviewCon: {
    // marginTop: 4,
    flexDirection: 'row',
  },
  OverviewTxtCon: {
    marginLeft: 25,
  },
  OverviewTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 30,
    color: colorConstant.primaryColor,
  },
  OverviewIcon: {
    marginLeft: 10,
  },
  ContentCon: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  MainActions: {
    marginLeft: 5,
    flexDirection: 'row',
    width: 411,
    justifyContent: 'space-around',
    marginTop: 5,
  },
  Donations: {
    backgroundColor: '#ffffff',
    elevation: 1,
    height: 210,
    marginLeft: 10,
    width: 185,
    borderRadius: 16,
  },
  Requests: {
    backgroundColor: '#ffffff',
    elevation: 1,
    marginRight: 10,
    height: 210,
    width: 185,
    borderRadius: 16,
  },
  RegisterDriverCon: {
    backgroundColor: '#ffffff',
    elevation: 0.5,
    marginTop: 6,
    width: 381,
    height: 135,
    borderRadius: 16,
  },
  DonationHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  DonationHeaderTxtCon: {
    marginRight: 8,
  },
  DonationHeaderTxt: {
    fontFamily: 'Barlow-Bold',
    fontSize: 18,
    color: colorConstant.proGreen,
  },
  RequestHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  RequestHeaderTxtCon: {
    marginRight: 8,
  },
  RequestHeaderTxt: {
    fontFamily: 'Barlow-Bold',
    fontSize: 18,
    color: colorConstant.proRed,
  },
  DonationCount: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  DonationCountTxt: {
    fontFamily: 'Barlow-Bold',
    fontSize: 50,
  },
  DonationSuccess: {
    fontFamily: 'Barlow-Bold',
    fontSize: 10,
    color: colorConstant.primaryColor,
  },
  RequestCount: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  RequestCountTxt: {
    fontFamily: 'Barlow-Bold',
    fontSize: 50,
  },
  RequestSuccess: {
    fontFamily: 'Barlow-Bold',
    fontSize: 10,
    color: colorConstant.primaryColor,
  },
  ButtonsCon: {
    alignItems: 'center',
    marginTop: 5,
  },
  BtnTxt: {
    alignItems: 'center',
    fontSize: 12,
  },
  BtnTxt2: {
    alignItems: 'center',
    fontSize: 14,
  },
  ButtonsConRequest: {
    alignItems: 'center',
    marginTop: 5,
  },
  BtnTxtRequest: {
    alignItems: 'center',
    fontSize: 12,
  },
  BtnTxt2Request: {
    alignItems: 'center',
    fontSize: 14,
  },
  Heading: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  DriverHeaderCon: {
    marginRight: 8,
  },
  DriverHeaderTxt: {
    fontFamily: 'Barlow-Bold',
    fontSize: 18,
    color: colorConstant.proCharcoal,
  },
  ImageCon: {
    alignItems: 'center',
  },
  DeliveryImage: {
    height: 60,
    width: 60,
  },
});

export default DashboardPublic;
