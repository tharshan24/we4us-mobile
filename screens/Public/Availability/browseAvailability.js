import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colorConstant from '../../../constants/colorConstant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import SocketContext from '../../../Context/SocketContext';
import constants from '../../../constants/constantsProject.';
import moment from 'moment';
import {Center, Input, Modal, Select, Spinner, VStack} from 'native-base';
import {Button, TextInput} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base/src/core/NativeBaseProvider';
import Geolocation from 'react-native-geolocation-service';

function BrowseAvailability(props) {
  const {availabilityId} = props.route.params;
  const context = useContext(SocketContext);
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [receiverId, setReceiverId] = useState(21);
  const [conversations, setConversations] = useState([]);
  const [images, setImages] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [paymentMode, setPaymentMode] = useState();
  const [location, setLocation] = useState('');
  const [requesterLocation, setRequesterLocation] = useState('');

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getConversations();
    });
  }, [userId]);

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
    return navigation.addListener('focus', () => {
      getDataSelectedLocation();
    });
  }, [userId]);

  const chatWindow = async () => {
    // console.log(conversations.length, 'ppppppppppppppppp');
    let flag = 0;
    conversations.map((val) => {
      if (
        val.members[0] === userId.toString() &&
        val.members[1] === receiverId.toString()
      ) {
        const senderReceiver = {
          sender: val.members[0],
          receiver: val.members[1],
          conversationId: val._id,
          userId: userId,
        };
        navigation.navigate('chatComponent', {senderReceiver});
      } else if (userId === receiverId) {
        const senderReceiver = {
          sender: val.members[0],
          receiver: val.members[1],
          conversationId: val._id,
          userId: userId,
        };
        navigation.navigate('chatComponent', {senderReceiver});
      } else {
        // console.log('varaatha');
        flag = flag + 1;
        // console.log(flag, 'mmmmmmmmmmmmm');
      }
    });

    if (conversations.length === flag) {
      await axios
        .post('http://10.0.2.2:5000/conversation', {
          senderId: userId.toString(),
          receiverId: receiverId.toString(),
        })
        .then(function (response) {
          const senderReceiver = {
            sender: userId.toString(),
            receiver: receiverId.toString(),
            conversationId: response.data._id,
            userId: userId,
          };
          navigation.navigate('chatComponent', {senderReceiver});
          flag = 0;
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  const getCurrentUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue !== null) {
        const value = JSON.parse(jsonValue);
        setUserId(value.result.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getConversations = async () => {
    try {
      await axios
        .get('http://10.0.2.2:5000/conversation/' + userId)
        .then(function (response) {
          // console.log(response.data);
          setConversations(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      browseAvailability();
    });
  }, []);

  const browseAvailability = async () => {
    try {
      await axios
        .get(
          constants.BASE_URL +
            'availability/exploreAvailabilityById/' +
            availabilityId,
          {
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        )
        .then(function (response) {
          setImages(response.data.result.images);
          setData(response.data.result.data[0]);
          setReceiverId(response.data.result.data[0].user_id);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getDataSelectedLocation = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@selectedLocation');
      if (jsonValue != null) {
        setRequesterLocation(JSON.parse(jsonValue));
        console.log(jsonValue);
        await AsyncStorage.removeItem('selectedLocationRequest');
      } else {
        console.log('No Location Selected');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        {loading ? (
          <Spinner />
        ) : (
          <View style={styles.mainContainer}>
            <View style={styles.headingContainer}>
              <View style={styles.txtCon}>
                <Text style={styles.headingTxt}>Wedding Lunch</Text>
              </View>
              <View style={styles.iconCon}>
                <TouchableOpacity style={{marginRight: 20}} activeOpacity={0.7}>
                  <MaterialCommunityIcons
                    name="phone"
                    color="#ffffff"
                    size={30}
                    style={{
                      backgroundColor: colorConstant.primaryColor,
                      borderRadius: 100,
                      padding: 7,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => chatWindow()}>
                  <MaterialCommunityIcons
                    name="message-reply-text"
                    color="#ffffff"
                    size={30}
                    style={{
                      backgroundColor: colorConstant.primaryColor,
                      borderRadius: 100,
                      padding: 7,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: colorConstant.proGreen,
                borderBottomWidth: 3,
                marginLeft: 15,
                marginRight: 15,
                marginTop: 15,
              }}
            />
            <View style={styles.contentContainer}>
              <View style={styles.txtContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.subHeadingTxt}>Availability Name:</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.resultsTxt}>{data.name}</Text>
                </View>
              </View>
              <View style={styles.txtContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.subHeadingTxt}>Type :</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.resultsTxt}>
                    {data.food_type === 0
                      ? 'Vegetarian'
                      : data.food_type === 1
                      ? 'Non-Vegetarian'
                      : data.food_type === 2
                      ? 'Mixed'
                      : null}
                  </Text>
                </View>
              </View>
              {/*txt1*/}
              <View style={styles.txtContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.subHeadingTxt}>Category :</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.resultsTxt}>
                    {data.availability_type_name}
                  </Text>
                </View>
              </View>
              {/*txt2*/}
              <View style={styles.txtContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.subHeadingTxt}>Created by :</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.resultsTxt}>{data.user_name}</Text>
                </View>
              </View>
              {/*txt3*/}
              <View style={styles.txtContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.subHeadingTxt}>Cooked Around :</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.resultsTxt}>
                    {moment(data.cooked_time).format('DD-MM-YYYY   HH:mm A')}
                  </Text>
                </View>
              </View>
              {/*txt4*/}
              <View style={styles.txtContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.subHeadingTxt}>Best before :</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.resultsTxt}>
                    {moment(data.best_before).format('DD-MM-YYYY   HH:mm A')}
                  </Text>
                </View>
              </View>
              {/*txt5*/}
              <View style={styles.txtContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.subHeadingTxt}>Count :</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.resultsTxt}>
                    {data.available_quantity}
                  </Text>
                </View>
              </View>
              {/*txt6*/}
              <View style={styles.txtContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.subHeadingTxt}>Location :</Text>
                </View>
                <View style={{flex: 1}}>
                  <Button
                    mode="contained"
                    onPress={() =>
                      navigation.navigate('ViewOnMapAvailability', {
                        longitude: data.longitude,
                        latitude: data.latitude,
                      })
                    }
                    style={{
                      backgroundColor: colorConstant.proRed,
                      width: 140,
                      height: 30,
                      padding: 0,
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.resultsTxtBtn}>View on Map</Text>
                  </Button>
                </View>
              </View>
              {/*txt7*/}
              <View style={styles.txtContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.subHeadingTxt}>Description :</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.resultsTxt}>
                    {data.description}
                    {/*Rice meal with Dhal , Brinjal , Beans , Potato and Panneer*/}
                    {/*Curries. Catering taken from MAHENDRANS.*/}
                  </Text>
                </View>
              </View>
              {/*txt8*/}
              <View style={styles.txtContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.subHeadingTxt}>Delivery :</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.resultsTxt}>
                    {data.creator_delivery_option === 0
                      ? 'Self Delivery'
                      : data.creator_delivery_option === 1
                      ? 'Free Driver Delivery'
                      : data.creator_delivery_option === 2
                      ? 'Paid Driver Delivery'
                      : null}
                  </Text>
                </View>
              </View>
              {/*txt9*/}
              <View style={styles.txtContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.subHeadingTxt}>Utensils :</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.resultsTxt}>
                    {data.storage_description}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Swiper
                showsPagination={false}
                showsButtons={false}
                style={{
                  height: Dimensions.get('window').height / 3,
                  borderRadius: 10,
                }}>
                <View style={styles.contentImageCon}>
                  <Image
                    style={styles.contentImage}
                    source={{
                      uri: images[0].image_path.split(' ')[0].toString(),
                    }}
                  />
                </View>
                <View style={styles.contentImageCon}>
                  <Image
                    style={styles.contentImage}
                    source={{
                      uri: images[1].image_path.split(' ')[0].toString(),
                    }}
                  />
                </View>
                <View style={styles.contentImageCon}>
                  <Image
                    style={styles.contentImage}
                    source={{
                      uri: images[2].image_path.split(' ')[0].toString(),
                    }}
                  />
                </View>
                <View style={styles.contentImageCon}>
                  <Image
                    style={styles.contentImage}
                    source={{
                      uri: images[3].image_path.split(' ')[0].toString(),
                    }}
                  />
                </View>
                <View style={styles.contentImageCon}>
                  <Image
                    style={styles.contentImage}
                    source={{
                      uri: images[4].image_path.split(' ')[0].toString(),
                    }}
                  />
                </View>
              </Swiper>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.btnTxt}>Request</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <View>
                <>
                  <Modal isOpen={modalVisible} onClose={setModalVisible}>
                    <Modal.Content>
                      <Modal.CloseButton />
                      <Modal.Header>
                        <Text
                          style={{
                            fontSize: 25,
                            fontFamily: 'Barlow-SemiBold',
                            color: colorConstant.primaryColor,
                          }}>
                          Request from Creator
                        </Text>
                      </Modal.Header>
                      <Modal.Body>
                        <Text
                          style={{
                            fontSize: 15,
                            color: colorConstant.proGreyDark,
                          }}>
                          {data.available_quantity} Items are available, Give
                          how many items you needed
                        </Text>
                        <Input
                          onChangeText={(e) => console.log(e)}
                          keyboardType="numeric"
                          type="text"
                          mt={4}
                          placeholder="Give the Count"
                        />
                        <Input
                          onChangeText={(e) => console.log(e)}
                          type="text"
                          multiline
                          numberOfLines={4}
                          mt={4}
                          placeholder="Requester Message"
                        />
                        <VStack>
                          <Select
                            mt={4}
                            selectedValue={paymentMode}
                            placeholder="Select Payment Mode"
                            onValueChange={(itemValue) =>
                              setPaymentMode(itemValue)
                            }>
                            <Select.Item label="Self Delivery" value={0} />
                            <Select.Item label="Free Driver" value={1} />
                            <Select.Item label="Paid Driver" value={2} />
                          </Select>
                        </VStack>
                        <Button
                          style={{
                            marginTop: 20,
                            backgroundColor: colorConstant.primaryColor,
                            marginRight: 20,
                            width: 250,
                          }}
                          mode="contained"
                          onPress={() =>
                            navigation.navigate(
                              'requestAvailabilityLocationMap',
                              {location},
                            )
                          }>
                          <Text>Select your Location</Text>
                        </Button>
                      </Modal.Body>
                      <Modal.Footer style={{marginBottom: 10}}>
                        <Button
                          style={{
                            backgroundColor: colorConstant.proGreen,
                            marginRight: 20,
                          }}
                          mode="contained"
                          onPress={() => {
                            setModalVisible(!modalVisible);
                          }}>
                          <Text>SAVE</Text>
                        </Button>
                        <Button
                          style={{backgroundColor: colorConstant.proRed}}
                          mode="contained"
                          onPress={() => {
                            setModalVisible(!modalVisible);
                          }}>
                          <Text>CLOSE</Text>
                        </Button>
                      </Modal.Footer>
                    </Modal.Content>
                  </Modal>
                </>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 100,
  },
  headingContainer: {
    flex: 5,
    paddingLeft: 20,
    paddingRight: 25,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 25,
    color: colorConstant.primaryColor,
  },
  contentContainer: {
    flex: 70,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 13,
    flexDirection: 'column',
  },
  imageContainer: {
    padding: 10,
    flex: 1,
    width: Dimensions.get('window').width,
  },
  txtCon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeadingTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 16,
    color: '#727E8E',
  },
  txtContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  resultsTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 16,
    color: '#727E8E',
  },
  resultsTxtBtn: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 13,
    color: '#ffffff',
  },
  contentImageCon: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width,
    marginRight: 10,
  },
  contentImage: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width,
  },
  btnContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: colorConstant.proGreen,
    padding: 10,
    width: Dimensions.get('window').width / 3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontFamily: 'Barlow-SemiBold',
    color: '#ffffff',
    fontSize: 20,
  },
});

export default BrowseAvailability;
