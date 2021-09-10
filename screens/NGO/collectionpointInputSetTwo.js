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
import colorConstant from '../../constants/colorConstant';
import {NativeBaseProvider, Select, VStack} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const availabilityInputSetThreeNgo = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState('');
  const [imageLoc, setImageLoc] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [fromLocation, setFromLocation] = useState();

  
  const [quantity, setQuantity] = React.useState('');
  const [date, setDate] = React.useState('DD');
  const [month, setMonth] = React.useState('MM');
  const [year, setYear] = React.useState('YYYY');
  const [hour, setHour] = React.useState('HH');
  const [minute, setMinute] = React.useState('MM');
  const [seconds, setSeconds] = React.useState('SS');
  const [storageDesc, setStorageDesc] = React.useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleBestBefore, setDatePickerVisibilityBestBefore] =
    useState(false);
  const [mode, setMode] = useState('');
  const [dateBestBefore, setDateBestBefore] = React.useState('DD');
  const [monthBestBefore, setMonthBestBefore] = React.useState('MM');
  const [yearBestBefore, setYearBestBefore] = React.useState('YYYY');
  const [hourBestBefore, setHourBestBefore] = React.useState('HH');
  const [minuteBestBefore, setMinuteBestBefore] = React.useState('MM');
  const [secondsBestBefore, setSecondsBestBefore] = React.useState('SS');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePickerBestBefore = () => {
    setDatePickerVisibilityBestBefore(true);
  };

  const hideDatePickerEndTime = () => {
    setDatePickerVisibilityBestBefore(false);
  };

  const handleConfirmStart = (date) => {
    console.log(date);
    let picker = new Date(date);

    let dateDate = picker.getDate();
    let dateMonth = picker.getMonth() + 1;
    let dateYear = picker.getFullYear();
    let dateHour = picker.getHours();
    let dateMinute = picker.getMinutes();
    let dateSecond = picker.getSeconds();

    setDate(dateDate);
    setMonth(dateMonth);
    setYear(dateYear);
    setHour(dateHour);
    setMinute(dateMinute);
    setSeconds(dateSecond);

    hideDatePicker();
  };

  const handleConfirmBestBefore = (dateBestBefore) => {
    let picker = new Date(dateBestBefore);

    let dateDate = picker.getDate();
    let dateMonth = picker.getMonth() + 1;
    let dateYear = picker.getFullYear();
    let dateHour = picker.getHours();
    let dateMinute = picker.getMinutes();
    let dateSecond = picker.getSeconds();

    setDateBestBefore(dateDate);
    setMonthBestBefore(dateMonth);
    setYearBestBefore(dateYear);
    setHourBestBefore(dateHour);
    setMinuteBestBefore(dateMinute);
    setSecondsBestBefore(dateSecond);

    hideDatePickerEndTime();
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
    navigation.navigate('CollectionpointTrackingMapNgo', {location});
  };

  const validateFieldsTwo = () => {
    if (fromLocation === undefined) {
      Alert.alert('Select the From Location');
    } else if (deliveryOption === '') {
      Alert.alert('Select Delivery Option');
    } else if (vehicle === '') {
      Alert.alert('Select Delivery Vehicle');
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
      return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const getDataInputTwo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@inputSetTwo');
      return jsonValue != null ? console.log(JSON.parse(jsonValue)) : null;
    } catch (e) {}
  };

  const getDataSelectedLocation = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@selectedLocation');
      if (jsonValue != null) {
        setFromLocation(JSON.parse(jsonValue));
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

  return (
    <ScrollView>
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
        
        <View style={styles.contentContainerCookedTime}>
          <View style={styles.cookedTimeTextCon}>
            <Text style={styles.cookedTimeText}>
              Start time
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              // backgroundColor: 'red',
            }}>
            <Button
              mode="contained"
              onPress={showDatePicker}
              style={{
                height: 50,
                justifyContent: 'center',
                backgroundColor: colorConstant.primaryColor,
                marginRight: 15,
              }}>
              <Text
                style={{
                  fontFamily: 'Barlow-Bold',
                  fontSize: 15,
                  color: '#ffffff',
                }}>
                Choose Time
              </Text>
            </Button>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: 'Barlow-Bold',
                  fontSize: 17,
                  color: colorConstant.proGreen,
                }}>
                {date} / {month} / {year}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: 'Barlow-Bold',
                  fontSize: 17,
                  color: colorConstant.proGreen,
                }}>
                {hour}:{minute}:{seconds}
              </Text>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="time"
              onConfirm={handleConfirmStart}
              onCancel={hideDatePicker}
            />
          </View>
        </View>
        <View style={styles.contentContainerBestBefore}>
          <View style={styles.bestBeforeTextCon}>
            <Text style={styles.bestBeforeText}>End time</Text>
          </View>
          <View
            style={{
              flex: 0.6,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              // backgroundColor: 'red',
            }}>
            <Button
              mode="contained"
              onPress={showDatePickerBestBefore}
              style={{
                height: 50,
                justifyContent: 'center',
                backgroundColor: colorConstant.primaryColor,
                marginRight: 15,
              }}>
              <Text
                style={{
                  fontFamily: 'Barlow-Bold',
                  fontSize: 15,
                  color: '#ffffff',
                }}>
                Choose Time
              </Text>
            </Button>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: 'Barlow-Bold',
                  fontSize: 17,
                  color: colorConstant.proRed,
                }}>
                {dateBestBefore} / {monthBestBefore} / {yearBestBefore}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: 'Barlow-Bold',
                  fontSize: 17,
                  color: colorConstant.proRed,
                }}>
                {hourBestBefore}:{minuteBestBefore}:{secondsBestBefore}
              </Text>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisibleBestBefore}
              mode="time"
              onConfirm={handleConfirmBestBefore}
              onCancel={hideDatePickerEndTime}
            />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  //main Container
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
  contentContainerVehicle: {
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
  
  contentContainerQuantity: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInputQuantity: {
    width: Dimensions.get('screen').width / 1.1,
  },
  quantityText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  quantityTextCon: {
    flex: 0.6,
  },
  //cooked Time
  contentContainerCookedTime: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
  },
  cookedTimeTextCon: {
    flex: 0.3,
  },
  cookedTimeText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //cater
  contentContainerBestBefore: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
  },
  bestBeforeTextCon: {
    flex: 0.3,
  },
  bestBeforeText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //description
  contentContainerStorage: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
  },
  descriptionHeading: {
    flexDirection: 'column',
  },
  storageDescriptionText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  storageDescriptionTextCon: {
    flex: 0.6,
  },
  textInputStorageDesc: {
    flex: 4,
    width: Dimensions.get('screen').width / 1.1,
  },
  //button
  contentContainerBtnTwo: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
    width: Dimensions.get('screen').width / 1.1,
  },
});

export default availabilityInputSetThreeNgo;
