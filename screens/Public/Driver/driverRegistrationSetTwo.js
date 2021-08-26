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
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colorConstant from '../../../constants/colorConstant';
import {Button} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';

function driverRegistrationSetTwo() {
  const navigation = useNavigation();
  const [imageLocLicense, setImageLocLicense] = useState([]);
  const [imageLocVehicle, setImageLocVehicle] = useState([]);

  const imagePickerLicense = async () => {
    try {
      console.log(imageLocLicense);
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      if (results.length < 3 && imageLocLicense.length === 0) {
        for (const res of results) {
          setImageLocLicense((arr) => [...arr, res.uri]);
        }
      } else if (results.length < 2 && imageLocLicense.length === 1) {
        for (const res of results) {
          setImageLocLicense((arr) => [...arr, res.uri]);
        }
      } else {
        Alert.alert(
          'Upload Front and Back Side only. Two images are allowed to upload',
        );
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
    return <Text>Success</Text>;
  };

  const imagePickerVehicle = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      if (results.length < 3 && imageLocVehicle.length === 0) {
        for (const res of results) {
          setImageLocVehicle((arr) => [...arr, res.uri]);
        }
      } else if (results.length < 2 && imageLocVehicle.length === 1) {
        for (const res of results) {
          setImageLocVehicle((arr) => [...arr, res.uri]);
        }
      } else {
        Alert.alert(
          'Upload Front and Back Side only. Two images are allowed to upload',
        );
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
    return <Text>Success</Text>;
  };

  const removeImageLicense = (item) => {
    const index = imageLocLicense.indexOf(item);
    let tempArray;
    if (imageLocLicense.length > -1) {
      tempArray = imageLocLicense.filter((item, pos) => pos !== index);
      setImageLocLicense(tempArray);
    } else {
      Alert.alert('No Images to Delete');
    }
  };

  const removeImageVehicle = (item) => {
    const index = imageLocVehicle.indexOf(item);
    let tempArray;
    if (imageLocVehicle.length > -1) {
      tempArray = imageLocVehicle.filter((item, pos) => pos !== index);
      setImageLocVehicle(tempArray);
    } else {
      Alert.alert('No Images to Delete');
    }
  };

  const validateFields = () => {
    if (imageLocLicense.length === 0) {
      Alert.alert('Upload License Proof, Font and Back Side of License');
    } else if (imageLocVehicle.length === 0) {
      Alert.alert('Upload Vehicle book Proof');
    } else {
      Alert.alert('Submitted Successfully');
      navigation.popToTop();
      removeValue('@DriverInputSetOne');
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

    return navigation.addListener('focus', () => {
      getDataLicense();
      getDataVehicle();
    });
  }, []);

  const getDataInputOne = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@DriverInputSetOne');
      return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;
    } catch (e) {}
  };

  const getDataLicense = async () => {
    try {
      const value = await AsyncStorage.getItem('@LicenseProof');
      if (value !== null) {
        setImageLocLicense((ar) => [...ar, value]);
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
        setImageLocVehicle((ar) => [...ar, value]);
        await AsyncStorage.removeItem('@VehicleProof');
      }
    } catch (e) {
      console.log(e, 'three');
    }
  };

  const cameraLicense = () => {
    if (imageLocLicense.length < 2) {
      navigation.navigate('CameraLicenseProof');
    } else {
      Alert.alert('Two Images can be Uploaded');
    }
  };

  const cameraVehicle = () => {
    if (imageLocVehicle.length < 2) {
      navigation.navigate('CameraVehicleProof');
    } else {
      Alert.alert('Two Images can be Uploaded');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.LicenseProof}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            Upload License Front and Back Image
          </Text>
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
              <Swiper
                showsPagination={false}
                showsButtons={false}
                index={0}
                loop={false}
                style={{
                  height: Dimensions.get('window').height / 3,
                  borderRadius: 10,
                }}>
                {imageLocLicense.map((item, i) => (
                  <View style={styles.contentImageCon} key={i}>
                    <Image style={styles.contentImage} source={{uri: item}} />
                    <Button
                      mode="contained"
                      style={{
                        position: 'absolute',
                        backgroundColor: '#f53c3c',
                      }}
                      onPress={() => removeImageLicense(item)}>
                      <MaterialCommunityIcons
                        name="delete-outline"
                        color="#ffffff"
                        size={25}
                      />
                    </Button>
                  </View>
                ))}
              </Swiper>
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
              <Swiper
                showsPagination={false}
                showsButtons={false}
                index={0}
                loop={false}
                style={{
                  height: Dimensions.get('window').height / 3,
                  borderRadius: 10,
                }}>
                {imageLocVehicle.map((item, i) => (
                  <View style={styles.contentImageCon} key={i}>
                    <Image style={styles.contentImage} source={{uri: item}} />
                    <Button
                      mode="contained"
                      style={{
                        position: 'absolute',
                        backgroundColor: '#f53c3c',
                      }}
                      onPress={() => removeImageVehicle(item)}>
                      <MaterialCommunityIcons
                        name="delete-outline"
                        color="#ffffff"
                        size={25}
                      />
                    </Button>
                  </View>
                ))}
              </Swiper>
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
          <Text style={{fontFamily: 'Barlow-Bold', fontSize: 20}}>Submit</Text>
        </Button>
      </View>
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
