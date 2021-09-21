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
import { SettingsOutlined } from '@material-ui/icons';

const sellingpointInputSetThreeNgo = () => {
  const navigation = useNavigation();

  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [madeOn, setMadeOn] = useState(null);
  const [bestBefore, setBestBefore] = useState(null);
  const [description, setDescription] = useState(null);
  const [imageLoc, setImageLoc] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [fromLocation, setFromLocation] = useState();
  const [token, setToken] = React.useState();
  const [progress, setProgress] = useState(null);
  const [member, setMember] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [userId, setUserId] = useState(null);
  
  const getDataInputOne = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@inputSetOneSel');
      const value = JSON.parse(jsonValue);
      if (value !== null) {
        console.log(value, 'first');
        setUserId(value.id);
        setTitle(value.title);
        setMember(value.member);
        setDescription(value.description);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getDataInputTwo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@inputSetTwoSel');
      const value = JSON.parse(jsonValue);
      console.log(value, 'two');
      if (value !== null) {
        
        setMadeOn(value.madeOn);
        setBestBefore(value.bestBefore);
      }
    } catch (e) {}
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
    getUser();
    return navigation.addListener('focus', () => {
      getData();
      getDataSelectedLocation();
      getUser();
    });
  }, []);


  



  const currentLocation = () => {
    navigation.navigate('findLocationMapSellingpoint', {location});
  };

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const parsedValue = JSON.parse(jsonValue);
      if (parsedValue !== null) {
        setToken(parsedValue.token);
      }
    } catch (e) {
      console.log(e);
    }
    console.log('Done.');
  };

  const validateFieldsTwo = async () => {
    if (fromLocation === undefined) {
      Alert.alert('Select the From Location');
    } else if (selectedDistrict === '') {
      Alert.alert('Select your District');
    } else if (selectedCity === '') {
      Alert.alert('Select your City');;
    } else {
      setLoading(true);
      const availabilityData = {
        'ngo_id':userId,
      'name':title,
      'assigned_to':member,
      'description':description,
      'start_time':madeOn,
      'end_time':bestBefore,
      'latitude': fromLocation.latitude,
      'longitude': fromLocation.longitude,
      'city': selectedCity}
      await axios({
        url: constants.BASE_URL + 'org/createSellingPoint',
        method: 'post',
        data: availabilityData,
        headers: {
          Authorization: `OrganizationData ${token}`,
          Accept: 'application/json',
        },
        
      })
        .then(function (response) {
          console.log(response.data);
          Alert.alert('Selling Point Created Successfully');
          navigation.popToTop();
          removeAllInputs();
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          Alert.alert('Error in Selling Collection Points');
          setLoading(false);
        });
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

  
  const getDataSelectedLocation = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@selectedLocationSel');
      if (jsonValue != null) {
        setFromLocation(JSON.parse(jsonValue));
        await AsyncStorage.removeItem('@selectedLocationSel');
      } else {
        console.log('No Location Selected');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeAllInputs = async () => {
    const keys = [
      '@inputSetTwoSel',
      '@inputSetOneSel',
      '@selectedLocationSel',
    ];
    try {
      await AsyncStorage.multiRemove(keys);
      setFromLocation();
    } catch (e) {
      console.log(e);
    }
    console.log('Done');
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
    return navigation.addListener('focus', () => {
      loadDistrict();
    });
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
                {'During pandemic/disaters time \ncollect things \nHelp Needed persons'}
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
                <Text style={styles.deliveryText}></Text>
              </View>
              <View style={styles.contentContainerImage}>
              
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

export default sellingpointInputSetThreeNgo;
