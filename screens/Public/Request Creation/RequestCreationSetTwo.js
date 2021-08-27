import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import colorConstant from '../../../constants/colorConstant';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker';

function RequestCreationSetTwo(props) {
  const navigation = useNavigation();
  const [location, setLocation] = useState('');
  const [address, setAddress] = React.useState('');
  const [imageLoc, setImageLoc] = useState([]);
  const [locationFromMap, setLocationFromMap] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    // return navigation.addListener('focus', () => {
    getData();
    // getDataSelectedLocation();
    // });
    return navigation.addListener('focus', () => {
      getDataCamera();
      getDataSelectedLocation();
    });
  }, []);

  const getDataCamera = async () => {
    try {
      const value = await AsyncStorage.getItem('@requestCreationImage');
      if (value !== null) {
        setImageLoc((ar) => [...ar, value]);
        await AsyncStorage.removeItem('@requestCreationImage');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@requestInputSetOne');
      return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;
    } catch (e) {}
  };

  const currentLocation = () => {
    navigation.navigate('findLocationMapRequest', {location});
  };

  const imagePicker = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      if (results.length < 6 && imageLoc.length === 0) {
        for (const res of results) {
          setImageLoc((arr) => [...arr, res.uri]);
        }
      } else if (results.length < 5 && imageLoc.length === 1) {
        for (const res of results) {
          setImageLoc((arr) => [...arr, res.uri]);
        }
      } else if (results.length < 4 && imageLoc.length === 2) {
        for (const res of results) {
          setImageLoc((arr) => [...arr, res.uri]);
        }
      } else if (results.length < 3 && imageLoc.length === 3) {
        for (const res of results) {
          setImageLoc((arr) => [...arr, res.uri]);
        }
      } else if (results.length < 2 && imageLoc.length === 4) {
        for (const res of results) {
          setImageLoc((arr) => [...arr, res.uri]);
        }
      } else {
        Alert.alert('You can Choose upto 5 Images only');
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

  const removeImage = (item) => {
    const index = imageLoc.indexOf(item);
    let tempArray;
    if (imageLoc.length > -1) {
      tempArray = imageLoc.filter((item, pos) => pos !== index);
      setImageLoc(tempArray);
    } else {
      Alert.alert('No Images to Delete');
    }
  };

  const validateFieldsTwo = () => {
    // navigation.navigate('AddItemsRequest');
    if (locationFromMap === undefined) {
      Alert.alert(
        'Choose Location from the Map, Where you need to Deliver your request',
      );
    } else if (address === '') {
      Alert.alert(
        'Provide your Address where you need to Deliver your request',
      );
    } else {
      Alert.alert('Request has been Placed.');
      navigation.popToTop();
      removeAllInputsRequest();
    }
  };

  const removeAllInputsRequest = async () => {
    const keys = [
      '@requestInputSetOne',
      '@selectedLocationRequest',
      '@requestCreationImage',
    ];
    try {
      await AsyncStorage.multiRemove(keys);
      setLocationFromMap();
    } catch (e) {
      console.log(e);
    }
    console.log('Done');
  };

  const cameraScreen = () => {
    if (imageLoc.length < 5) {
      navigation.navigate('cameraScreenRequest');
    } else {
      Alert.alert('Five Images can be Uploaded');
    }
  };

  const getDataSelectedLocation = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@selectedLocationRequest');
      if (jsonValue != null) {
        console.log(jsonValue);
        setLocationFromMap(JSON.parse(jsonValue));
      } else {
        console.log('No Location Selected');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.contentContainerFrom}>
          <View style={styles.fromTextCon}>
            <Text style={styles.fromText}>From Address</Text>
          </View>
          <View style={styles.fromAddress}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button
                mode="contained"
                onPress={() => currentLocation()}
                style={{
                  height: 43,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colorConstant.primaryColor,
                  width: Dimensions.get('screen').width / 1.1,
                }}>
                <Text style={{fontFamily: 'Barlow-Bold', fontSize: 17}}>
                  Choose from Map
                </Text>
              </Button>
            </View>
          </View>
        </View>
        <View style={styles.contentContainerAddress}>
          <View style={styles.addressTextCon}>
            <Text style={styles.addressText}>Address</Text>
          </View>
          <View style={styles.textInputContent}>
            <TextInput
              mode="outlined"
              label="Address"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={address}
              numberOfLines={5}
              multiline={true}
              style={{
                fontSize: 20,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
        </View>
        <View style={styles.contentContainerImage}>
          <View style={styles.ImageTextCon}>
            <Text style={styles.ImageText}>Upload Image (Optional)</Text>
          </View>
          <View style={styles.chosenImageContainer}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <View style={{flex: 1, marginRight: 30}}>
                <Button
                  mode="contained"
                  style={{backgroundColor: colorConstant.primaryColor}}
                  onPress={() => cameraScreen()}>
                  Camera
                </Button>
              </View>
              <View style={{flex: 1}}>
                <Button
                  mode="contained"
                  style={{backgroundColor: colorConstant.primaryColor}}
                  onPress={() => imagePicker()}>
                  Choose File
                </Button>
              </View>
            </View>
            <View style={{flex: 5}}>
              <View style={styles.imageContainer}>
                <Swiper
                  showsPagination={false}
                  showsButtons={false}
                  index={0}
                  loop={false}
                  style={{
                    height: Dimensions.get('window').height / 2,
                    borderRadius: 10,
                  }}>
                  {imageLoc.map((item, i) => (
                    <View style={styles.contentImageCon} key={i}>
                      <Image style={styles.contentImage} source={{uri: item}} />
                      <Button
                        mode="contained"
                        style={{
                          position: 'absolute',
                          backgroundColor: '#f53c3c',
                          borderTopLeftRadius: 10,
                        }}
                        onPress={() => removeImage(item)}>
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
        <View style={styles.contentContainerSubmit}>
          <Button
            mode="contained"
            onPress={() => {
              validateFieldsTwo();
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
      </View>
    </ScrollView>
  );
}

export default RequestCreationSetTwo;

const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get('screen').height,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff',
    paddingTop: 20,
  },

  contentContainerFrom: {
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  contentContainerAddress: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contentContainerImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
  },

  fromTextCon: {
    flex: 0.2,
  },
  fromAddress: {
    width: Dimensions.get('screen').width / 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.8,
  },
  fromText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },

  addressTextCon: {
    flex: 1,
    // backgroundColor: 'red',
  },
  textInputContent: {
    width: Dimensions.get('screen').width / 1.1,
    flex: 4,
    // backgroundColor: 'blue',
  },
  addressText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },

  ImageTextCon: {
    flex: 0.6,
    // backgroundColor: 'red',
  },
  ImageText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  chosenImageContainer: {
    flex: 4,
    width: Dimensions.get('screen').width / 1.1,
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  imageContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: colorConstant.primaryColor,
    borderRadius: 10,
  },
  contentImageCon: {
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width,
    borderRadius: 10,
    // marginRight: 10,
  },
  contentImage: {
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width,
    borderRadius: 10,
  },

  contentContainerSubmit: {
    flex: 0.12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
    width: Dimensions.get('screen').width / 1.1,
    // backgroundColor: 'red',
  },
});
