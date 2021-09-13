import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import colorConstant from '../../../constants/colorConstant';
import {
  CheckIcon,
  NativeBaseProvider,
  Select,
  Spinner,
  VStack,
} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import constants from '../../../constants/constantsProject.';

const availabilityInputSetThree = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(null);
  const [madeOn, setMadeOn] = useState(null);
  const [bestBefore, setBestBefore] = useState(null);
  const [storageDesc, setStorageDesc] = useState(null);
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [foodType, SetFoodType] = useState(null);
  const [description, setDescription] = useState(null);
  const [imageLoc, setImageLoc] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [fromLocation, setFromLocation] = useState();
  const [deliveryOption, setDeliveryOption] = useState('');

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
    getDataInputTwo();
    getDataInputOne();
    return navigation.addListener('focus', () => {
      getData();
      getDataSelectedLocation();
    });
  }, []);

  const currentLocation = () => {
    navigation.navigate('findLocationMap', {location});
  };

  const validateFieldsTwo = () => {
    if (fromLocation === undefined) {
      Alert.alert('Select the From Location');
    } else if (selectedDistrict === '') {
      Alert.alert('Select your District');
    } else if (selectedCity === '') {
      Alert.alert('Select your City');
    } else if (deliveryOption === '') {
      Alert.alert('Select Delivery Option');
    } else if (imageLoc.length === 0) {
      Alert.alert('Add Images of Donation. Maximum of 5 Images');
    } else {
      Alert.alert('Submitted Successfully');
      navigation.popToTop();
      removeAllInputs();
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@imageLocation');
      if (value !== null) {
        setImageLoc((ar) => [...ar, value]);
        await AsyncStorage.removeItem('@imageLocation');
      }
    } catch (e) {
      console.log(e, 'three');
    }
  };

  const getDataInputOne = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@inputSetOne');
      const value = JSON.parse(jsonValue);
      if (value !== null) {
        setTitle(value.title);
        setCategory(value.foodType);
        SetFoodType(value.category);
        setDescription(value.description);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getDataInputTwo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@inputSetTwo');
      const value = JSON.parse(jsonValue);
      console.log(value);
      if (value !== null) {
        setQuantity(value.quantity);
        setMadeOn(value.madeOn);
        setBestBefore(value.bestBefore);
        setStorageDesc(value.storageDesc);
      }
    } catch (e) {}
  };

  const getDataSelectedLocation = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@selectedLocation');
      if (jsonValue != null) {
        setFromLocation(JSON.parse(jsonValue));
        console.log(JSON.parse(jsonValue), 'location');
        await AsyncStorage.removeItem('@selectedLocation');
      } else {
        console.log('No Location Selected');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeAllInputs = async () => {
    const keys = [
      '@imageLocation',
      '@inputSetTwo',
      '@inputSetOne',
      '@selectedLocation',
    ];
    try {
      await AsyncStorage.multiRemove(keys);
      setFromLocation();
    } catch (e) {
      console.log(e);
    }
    console.log('Done');
  };

  const cameraScreen = () => {
    if (imageLoc.length < 5) {
      navigation.navigate('cameraScreen');
    } else {
      Alert.alert('Five Images can be Uploaded');
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

  return (
    <NativeBaseProvider>
      <ScrollView>
        {loading ? (
          <Spinner color="blue.500" />
        ) : (
          <View style={styles.mainContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.textHeader}>
                {'Share Surplus food with the \nNeeded persons'}
              </Text>
            </View>
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
            <View style={styles.contentContainerDistrict}>
              <View style={styles.vehicleTextCon}>
                <Text style={styles.vehicleText}>District</Text>
              </View>
              <View style={{flex: 3}}>
                <VStack>
                  <Select
                    style={{
                      fontSize: 20,
                      backgroundColor: '#ffffff',
                      borderWidth: 1,
                      borderColor: colorConstant.primaryColor,
                    }}
                    width={Dimensions.get('screen').width / 1.1}
                    selectedValue={selectedDistrict}
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
            </View>
            <View style={styles.contentContainerCity}>
              <View style={styles.cityTextCon}>
                <Text style={styles.cityText}>City</Text>
              </View>
              <View style={{flex: 3}}>
                <VStack>
                  <Select
                    style={{
                      fontSize: 20,
                      backgroundColor: '#ffffff',
                      borderWidth: 1,
                      borderColor: colorConstant.primaryColor,
                    }}
                    width={Dimensions.get('screen').width / 1.1}
                    selectedValue={selectedCity}
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
            </View>
            <View style={styles.contentContainerDelivery}>
              <View style={styles.deliveryTextCon}>
                <Text style={styles.deliveryText}>Delivery</Text>
              </View>
              <View style={{flex: 3}}>
                <NativeBaseProvider>
                  <VStack>
                    <Select
                      style={{
                        fontSize: 20,
                        backgroundColor: '#ffffff',
                        borderWidth: 1,
                        borderColor: colorConstant.primaryColor,
                      }}
                      width={Dimensions.get('screen').width / 1.1}
                      selectedValue={deliveryOption}
                      placeholder="Select Delivery Option"
                      onValueChange={(itemValue) =>
                        setDeliveryOption(itemValue)
                      }>
                      <Select.Item label="Self Delivery" value="self" />
                      <Select.Item label="Volunteer Driver" value="volunteer" />
                      <Select.Item label="Paid Driver" value="paid" />
                    </Select>
                  </VStack>
                </NativeBaseProvider>
              </View>
            </View>
            <View style={styles.contentContainerImage}>
              <View style={styles.ImageTextCon}>
                <Text style={styles.ImageText}>Upload Image</Text>
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
                  <View style={styles.pickedImageContainer}>
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
                        {imageLoc.map((item, i) => (
                          <View style={styles.contentImageCon} key={i}>
                            <Image
                              style={styles.contentImage}
                              source={{uri: item}}
                            />
                            <Button
                              mode="contained"
                              style={{
                                position: 'absolute',
                                backgroundColor: '#f53c3c',
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
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  //main Containe
  mainContainer: {
    height: Dimensions.get('screen').height,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff',
  },
  //heading
  headingContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    flex: 0.1,
  },
  textHeader: {
    fontFamily: 'Barlow-Bold',
    textAlign: 'center',
    fontSize: 22,
    color: colorConstant.primaryColor,
  },
  //name
  contentContainerFrom: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  fromAddress: {
    width: Dimensions.get('screen').width / 1.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fromText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  fromTextCon: {
    flex: 0.6,
  },
  //cooked Time
  contentContainerDelivery: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
    zIndex: -1000,
  },
  deliveryTextCon: {
    flex: 1.5,
  },
  deliveryText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //cater
  contentContainerDistrict: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
  },
  vehicleTextCon: {
    flex: 1.5,
  },
  vehicleText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //description
  contentContainerImage: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
  },
  descriptionHeading: {
    flexDirection: 'column',
  },
  ImageText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  ImageTextCon: {
    flex: 0.6,
  },
  chosenImageContainer: {
    flex: 4,
    width: Dimensions.get('screen').width / 1.1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  //button
  contentContainerSubmit: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: Dimensions.get('screen').width / 1.1,
  },
  pickedImageContainer: {
    flex: 1,
    width: Dimensions.get('screen').width / 1.1,
  },
  imageContainer: {
    flex: 1,
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
  contentContainerCity: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
  },
  cityTextCon: {
    flex: 1.5,
  },
  cityText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
});

export default availabilityInputSetThree;
