import React, {useContext, useEffect, useState} from 'react';
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
import axios from 'axios';
import constants from '../../../constants/constantsProject.';
import SocketContext from '../../../Context/SocketContext';
import {Spinner} from 'native-base';

function RequestCreationSetTwoHome(props) {
  const navigation = useNavigation();
  const context = useContext(SocketContext);
  const [location, setLocation] = useState('');
  const [address, setAddress] = React.useState('');
  const [locationFromMap, setLocationFromMap] = useState();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [reqType, setReqType] = useState();
  const [needBefore, setNeedBefore] = useState();
  const [loading, setLoading] = useState(false);
  const initialState = {
    name: '',
    quantity: '',
  };
  const [formValues, setFormValues] = useState([initialState]);

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
    getData();
    return navigation.addListener('focus', () => {
      getDataSelectedLocation();
      getRequestedItems();
    });
  }, []);

  const getRequestedItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@requestedItemsHome');
      const values = JSON.parse(jsonValue);
      console.log(values, 'pppppppppppppp');
      if (values === null) {
        setFormValues([initialState]);
      } else {
        setFormValues(values);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@requestInputSetOneHome');
      const values = JSON.parse(jsonValue);
      if (values !== null) {
        setTitle(values.title);
        setDesc(values.description);
        setReqType(values.requestType);
        setNeedBefore(values.neededBefore);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const currentLocation = () => {
    navigation.navigate('findLocationMapRequestHome', {location});
  };

  const validateFieldsTwo = async () => {
    setLoading(true);
    if (locationFromMap === undefined) {
      Alert.alert(
        'Choose Location from the Map, Where you need to Deliver your request',
      );
    } else if (address === '') {
      Alert.alert(
        'Provide your Address where you need to Deliver your request',
      );
    } else if (
      formValues === null ||
      formValues[0].name === '' ||
      formValues[0].quantity === ''
    ) {
      Alert.alert('Add atleast on Item to request');
    } else {
      console.log('egetger');
      const requestData = {
        name: title,
        request_type: reqType,
        description: desc,
        need_before: needBefore,
        latitude: location.latitude,
        longitude: location.longitude,
        location: address,
        items: formValues,
      };
      await axios({
        url: constants.BASE_URL + 'request/createRequest',
        method: 'post',
        data: requestData,
        headers: {
          Authorization: `UserData ${context.token}`,
          Accept: 'application/json',
        },
      })
        .then(function (response) {
          console.log(response.data, 'oooooooooooooooo');
          Alert.alert('Requested Created Successfully');
          navigation.popToTop();
          removeAllInputsRequest();
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const removeAllInputsRequest = async () => {
    const keys = [
      '@requestInputSetOneHome',
      '@selectedLocationRequestHome',
      '@requestCreationImageHome',
      '@requestedItemsHome',
    ];
    try {
      await AsyncStorage.multiRemove(keys);
      setLocationFromMap();
    } catch (e) {
      console.log(e);
    }
    console.log('Done');
  };

  const getDataSelectedLocation = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@selectedLocationRequestHome');
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
      {loading ? (
        <Spinner />
      ) : (
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
                {locationFromMap === undefined ? (
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
                ) : (
                  <Button
                    mode="contained"
                    onPress={() => currentLocation()}
                    style={{
                      height: 43,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f53c3c',
                      width: Dimensions.get('screen').width / 1.1,
                    }}>
                    <Text style={{fontFamily: 'Barlow-Bold', fontSize: 17}}>
                      EDIT CHOOSEN LOCATION
                    </Text>
                  </Button>
                )}
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
          <View style={styles.addItems}>
            {formValues[0].name === '' || formValues[0].quantity === '' ? (
              <Button
                mode="contained"
                onPress={() => navigation.navigate('AddItemsRequestHome')}
                style={{
                  height: 43,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colorConstant.primaryColor,
                  width: Dimensions.get('screen').width / 1.1,
                }}>
                <Text style={{fontFamily: 'Barlow-SemiBold', fontSize: 17}}>
                  ADD ITEMS FOR REQUEST
                </Text>
              </Button>
            ) : (
              <Button
                mode="contained"
                onPress={() => navigation.navigate('AddItemsRequestHome')}
                style={{
                  height: 43,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f53c3c',
                  width: Dimensions.get('screen').width / 1.1,
                }}>
                <Text style={{fontFamily: 'Barlow-SemiBold', fontSize: 17}}>
                  EDIT ITEMS
                </Text>
              </Button>
            )}
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
  );
}

export default RequestCreationSetTwoHome;

const styles = StyleSheet.create({
  mainContainer: {
    height: Dimensions.get('screen').height / 1.7,
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
  addItems: {
    marginBottom: 20,
  },
});
