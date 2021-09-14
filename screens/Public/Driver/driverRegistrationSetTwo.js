import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {Spinner, Center, NativeBaseProvider} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colorConstant from '../../../constants/colorConstant';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
// import * as Progress from 'react-native-progress';
// import RNFS from 'react-native-fs';

function driverRegistrationSetTwo() {
  const navigation = useNavigation();
  const [imageLocLicense, setImageLocLicense] = useState();
  const [imageLocVehicle, setImageLocVehicle] = useState();
  const [token, setToken] = useState();
  const [inputSetOne, setInputSetOne] = useState();
  const [progress, setProgress] = useState(null);

  const imagePickerLicense = async () => {
    if (!imageLocLicense) {
      try {
        const results = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        if (results) {
          //   for (const res of results) {
          //     setImageLocLicense((arr) => [...arr, res.uri]);
          //   }
          // } else if (results.length < 2 && imageLocLicense.length === 1) {
          //   for (const res of results) {
          setImageLocLicense(results[0].uri);
          //   }
        } else {
          Alert.alert('Upload Front Image of License');
        }
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
    } else {
      Alert.alert('Only can select one Image');
    }
    return <Text>Success</Text>;
  };

  const imagePickerVehicle = async () => {
    if (!imageLocVehicle) {
      try {
        const results = await DocumentPicker.pick({
          type: [DocumentPicker.types.images],
        });
        if (results) {
          // console.log(results);
          //   for (const res of results) {
          //     setImageLocVehicle((arr) => [...arr, res.uri]);
          //   }
          // } else if (results.length < 2 && imageLocVehicle.length === 1) {
          //   for (const res of results) {
          setImageLocVehicle(results[0].uri);
          //   }
        } else {
          Alert.alert('Upload Front Image of Vehicle Book');
        }
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
    } else {
      Alert.alert('You can Select only one Image');
    }
    return <Text>Success</Text>;
  };

  const removeImageLicense = () => {
    // const index = imageLocLicense.indexOf(item);
    // let tempArray;
    if (imageLocLicense) {
      // tempArray = imageLocLicense.filter((item, pos) => pos !== index);
      setImageLocLicense();
    } else {
      Alert.alert('No Images to Delete');
    }
  };

  const removeImageVehicle = () => {
    // const index = imageLocVehicle.indexOf(item);
    // let tempArray;
    if (imageLocVehicle) {
      // tempArray = imageLocVehicle.filter((item, pos) => pos !== index);
      setImageLocVehicle();
    } else {
      Alert.alert('No Images to Delete');
    }
  };

  const validateFields = async () => {
    setProgress(1);
    if (!imageLocLicense) {
      Alert.alert('Upload License Proof');
    } else if (!imageLocVehicle) {
      Alert.alert('Upload Vehicle book Proof');
    } else {
      const formData = new FormData();
      formData.append('files', {
        name: new Date() + 'LicenseProof',
        uri: imageLocLicense,
        type: 'image/jpeg',
      });
      formData.append('license_no', inputSetOne.licenseNumber);

      const formDataLic = new FormData();
      formDataLic.append('files', {
        name: new Date() + 'LicenseProof',
        uri: imageLocVehicle,
        type: 'image/jpeg',
      });
      formDataLic.append('vehicle_type', inputSetOne.vehicleType);
      formDataLic.append('vehicle_no', inputSetOne.vehicleNumber);
      formDataLic.append('brand', inputSetOne.vehicleBrand);
      formDataLic.append('model', inputSetOne.vehicleModel);
      formDataLic.append('color', inputSetOne.vehicleColor);

      await axios
        .all([
          await axios({
            url: 'http://10.0.2.2:8000/public/driverRegister',
            method: 'post',
            data: formData,
            headers: {
              Authorization: `Driver ${token}`,
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: ({loaded, total}) => {
              let percent = Math.floor((loaded * 100) / total);
              setProgress(percent);
            },
          }),
          await axios({
            url: 'http://10.0.2.2:8000/public/vehicleRegister',
            method: 'post',
            data: formDataLic,
            headers: {
              Authorization: `Driver ${token}`,
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: ({loaded, total}) => {
              let percent = Math.floor((loaded * 100) / total);
              setProgress(percent);
            },
          }),
        ])
        .then(
          axios.spread((response1, response2) => {
            if (
              response1.data.status_code === 0 &&
              response2.data.status_code === 0
            ) {
              navigation.popToTop();
              Alert.alert('Submitted Successfully');
              removeValue('@DriverInputSetOne');
            } else {
              setProgress(null);
              Alert.alert('Driver Registration Failed');
            }
          }),
        )
        .catch(function (error) {
          console.log(error, 'pppppppppppppppppp');
          setProgress(null);
        });
      //vehicle proof
      // await axios({
      //   url: 'http://10.0.2.2:8000/public/driverRegister',
      //   method: 'post',
      //   data: formData,
      //   headers: {
      //     Authorization: `Driver ${token}`,
      //     Accept: 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   onUploadProgress: ({loaded, total}) => {
      //     let percent = Math.floor((loaded * 100) / total);
      //     setProgress(percent);
      //   },
      // })
      //   .then(function (response) {
      //     if (response.data.status_code === 0) {
      //       setResponseOne(response.data.status_code);
      //     } else {
      //       // Alert.alert('Driver Registration Failed');
      //       setProgress(null);
      //     }
      //   })
      //   .catch(function (error) {
      //     setProgress(null);
      //     console.log(error);
      //     Alert.alert('Error in Creating availability');
      //   });
      //license proof
      // await axios({
      //   url: 'http://10.0.2.2:8000/public/vehicleRegister',
      //   method: 'post',
      //   data: formDataLic,
      //   headers: {
      //     Authorization: `Driver ${token}`,
      //     Accept: 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   onUploadProgress: ({loaded, total}) => {
      //     let percent = Math.floor((loaded * 100) / total);
      //     setProgress(percent);
      //   },
      // })
      //   .then(function (response) {
      //     if (response.data.status_code === 0) {
      //       setResponseTwo(response.data.status_code);
      //     } else {
      //       // Alert.alert('Driver Registration Failed');
      //       setProgress(null);
      //     }
      //   })
      //   .catch(function (error) {
      //     setProgress(null);
      //     console.log(error);
      //     Alert.alert('Error in Creating availability');
      //   });
    }
  };

  const removeValue = async ({key}) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }

    console.log('Done.');
  };

  useEffect(() => {
    getDataInputOne();
    getUser();
    return navigation.addListener('focus', () => {
      getDataLicense();
      getDataVehicle();
    });
  }, []);

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      const parsedValue = JSON.parse(value);
      if (parsedValue !== null) {
        setToken(parsedValue.token);
      }
    } catch (e) {
      // error reading value
    }
  };

  const getDataInputOne = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@DriverInputSetOne');
      return jsonValue != null ? setInputSetOne(JSON.parse(jsonValue)) : null;
    } catch (e) {}
  };

  const getDataLicense = async () => {
    try {
      const value = await AsyncStorage.getItem('@LicenseProof');
      if (value !== null) {
        setImageLocLicense(value);
        await AsyncStorage.removeItem('@LicenseProof');
      }
    } catch (e) {
      console.log(e, 'three');
    }
  };

  const getDataVehicle = async () => {
    try {
      const value = await AsyncStorage.getItem('@VehicleProof');
      if (value !== null) {
        setImageLocVehicle(value);
        await AsyncStorage.removeItem('@VehicleProof');
      }
    } catch (e) {
      console.log(e, 'three');
    }
  };

  const cameraLicense = () => {
    if (!imageLocLicense) {
      navigation.navigate('CameraLicenseProof');
    } else {
      Alert.alert('Two Images cannot be Uploaded');
    }
  };

  const cameraVehicle = () => {
    if (!imageLocVehicle) {
      navigation.navigate('CameraVehicleProof');
    } else {
      Alert.alert('Two Images cannot be Uploaded');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {progress === null ? (
        <>
          <View style={styles.LicenseProof}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Upload License Front Image</Text>
            </View>
            <View style={styles.chooseContainer}>
              <View style={{flex: 1, marginRight: 30}}>
                <Button
                  mode="contained"
                  style={{backgroundColor: colorConstant.primaryColor}}
                  onPress={() => cameraLicense()}>
                  Camera
                </Button>
              </View>
              <View style={{flex: 1}}>
                <Button
                  mode="contained"
                  style={{backgroundColor: colorConstant.primaryColor}}
                  onPress={() => imagePickerLicense()}>
                  Choose File
                </Button>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <View style={{flex: 1}}>
                <View style={styles.imageContainer}>
                  <View style={styles.contentImageCon}>
                    <Image
                      style={styles.contentImage}
                      source={{uri: imageLocLicense}}
                    />
                    {imageLocLicense ? (
                      <Button
                        mode="contained"
                        style={{
                          position: 'absolute',
                          backgroundColor: '#f53c3c',
                        }}
                        onPress={() => removeImageLicense()}>
                        <MaterialCommunityIcons
                          name="delete-outline"
                          color="#ffffff"
                          size={25}
                        />
                      </Button>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.vehicleProof}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Upload Vehicle Book Proof</Text>
            </View>
            <View style={styles.chooseContainer}>
              <View style={{flex: 1, marginRight: 30}}>
                <Button
                  mode="contained"
                  style={{backgroundColor: colorConstant.primaryColor}}
                  onPress={() => cameraVehicle()}>
                  Camera
                </Button>
              </View>
              <View style={{flex: 1}}>
                <Button
                  mode="contained"
                  style={{backgroundColor: colorConstant.primaryColor}}
                  onPress={() => imagePickerVehicle()}>
                  Choose File
                </Button>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <View style={{flex: 1}}>
                <View style={styles.imageContainer}>
                  <View style={styles.contentImageCon}>
                    <Image
                      style={styles.contentImage}
                      source={{uri: imageLocVehicle}}
                    />
                    {imageLocVehicle ? (
                      <Button
                        mode="contained"
                        style={{
                          position: 'absolute',
                          backgroundColor: '#f53c3c',
                        }}
                        onPress={() => removeImageVehicle()}>
                        <MaterialCommunityIcons
                          name="delete-outline"
                          color="#ffffff"
                          size={25}
                        />
                      </Button>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Button
              mode="contained"
              onPress={() => {
                validateFields();
              }}
              style={{
                width: 120,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colorConstant.primaryColor,
              }}>
              <Text style={{fontFamily: 'Barlow-Bold', fontSize: 20}}>
                Submit
              </Text>
            </Button>
          </View>
        </>
      ) : (
        <NativeBaseProvider>
          <Center flex={1}>
            <Spinner color="danger.400" />
            <Text>Image Uploading</Text>
          </Center>
        </NativeBaseProvider>
      )}
    </ScrollView>
  );
}

export default driverRegistrationSetTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('screen').height,
    marginTop: 20,
    marginBottom: 10,
    // backgroundColor: '#12166c'
  },
  LicenseProof: {
    flex: 1,
    // backgroundColor: '#126c62',
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  vehicleProof: {
    flex: 1,
    // backgroundColor: '#0e0f47',
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  btnContainer: {
    flex: 0.2,
    // backgroundColor: '#c6bd25',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    // width: Dimensions.get('screen').width / 1.1,
  },
  titleContainer: {
    flex: 0.3,
    // backgroundColor: 'red',
    marginBottom: 15,
  },
  titleText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  imageContainer: {
    flex: 0.7,
    // backgroundColor: 'green',
  },
  chooseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  contentImageCon: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width,
    // marginRight: 10,
  },
  contentImage: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width,
  },
});
