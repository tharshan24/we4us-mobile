import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import colorConstant from '../../../constants/colorConstant';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import constants from '../../../constants/constantsProject.';
import SocketContext from '../../../Context/SocketContext';
import {Center, Heading, Modal, Select, Spinner, VStack} from 'native-base';
import moment from 'moment';

function RequestForDonation({route}) {
  const {availability_id} = route.params;
  const context = useContext(SocketContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [donateVisible, setDonateVisible] = useState(false);
  const [position, setPosition] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingSession, setLoadingSession] = useState(true);
  const [values, setValues] = useState();

  const modalDetail = (value) => {
    setModalVisible(!modalVisible);
    getSessionData(value);
  };

  const modalDonate = (value) => {
    setDonateVisible(!donateVisible);
    setValues(value);
  };

  useEffect(() => {
    console.log(availability_id);
    getVehicleTypes();
    requestsForAvailabilities();
    // return navigation.addListener('focus', () => {
    //   console.log(availability_id);
    // });
  }, []);

  const requestsForAvailabilities = async () => {
    try {
      await axios
        .get(
          constants.BASE_URL + 'availability/getSessions/' + availability_id,
          {
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        )
        .then(function (response) {
          setData(response.data.result.row);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getSessionData = async (data) => {
    try {
      await axios
        .get(constants.BASE_URL + 'availability/getSession/' + data, {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          if (response.data.status_code === 0) {
            setLoadingSession(false);
            setSessionData(response.data.result.row[0]);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const rejectAvailabilities = async (value) => {
    try {
      await axios
        .get(constants.BASE_URL + 'availability/rejectAvailSession/' + value, {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          if (response.data.status_code === 0) {
            navigation.pop(1);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const acceptRequest = async (value) => {
    try {
      await axios
        .get(
          constants.BASE_URL +
            'availability/acceptAvailSession/' +
            value +
            '?delivery_vehicle_option=' +
            position,
          {
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        )
        .then(function (response) {
          console.log(response.data, 'ooooooooooooooooooooo');
          if (response.data.status_code === 0) {
            setDonateVisible(false);
            requestsForAvailabilities();
          } else if (response.data.status_code === 1) {
            Alert.alert(response.data.message);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getVehicleTypes = async () => {
    try {
      await axios
        .get(constants.BASE_URL + 'system/getVehicleTypes', {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          setVehicleTypes(response.data.result.rows);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const closeModal = () => {
    setDonateVisible(false);
    setPosition();
  };

  return data.length === 0 ? (
    <Center flex={1}>
      <Spinner size="lg" color={colorConstant.primaryColor} />
      <Heading
        color="#BAC2C9"
        alignSelf={{
          base: 'center',
          md: 'flex-start',
        }}>
        No Requests to Show
      </Heading>
    </Center>
  ) : (
    <ScrollView style={{margin: 7}}>
      {loading ? (
        <Spinner size="lg" color={colorConstant.primaryColor} />
      ) : (
        data.map((value) => (
          <View key={value.id} style={styles.mainContainer}>
            <View style={styles.AvailabilityCon}>
              <View style={{flexDirection: 'row', paddingBottom: 12}}>
                <View style={styles.ProfilePicCon}>
                  <Image
                    style={styles.ProfilePic}
                    source={{uri: value.profile_picture_path.toString()}}
                  />
                </View>
                <View style={{flex: 5}}>
                  <Text style={styles.headingText}>{value.user_name}</Text>
                  <Text style={styles.bodyText}>
                    Delivery :
                    {value.requester_delivery_option === 0
                      ? 'Self Delivery'
                      : value.requester_delivery_option === 1
                      ? 'Free Delivery'
                      : value.requester_delivery_option === 2
                      ? 'Paid Driver'
                      : null}
                  </Text>
                  <Text style={styles.bodyText}>
                    Quantity: {value.quantity}
                  </Text>
                  <Text style={styles.bodyText}>
                    Created:
                    {moment(value.created_at).format('DD-MM-YYYY | HH:mm A')}
                  </Text>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <Button
                  mode="contained"
                  onPress={() => modalDetail(value.id)}
                  style={{
                    marginRight: 15,
                    backgroundColor: colorConstant.primaryColor,
                  }}>
                  Details
                </Button>
                {value.status === 0 ? (
                  <Button
                    mode="contained"
                    onPress={() => {
                      modalDonate(value.id);
                    }}
                    style={{
                      marginRight: 15,
                      backgroundColor: colorConstant.proGreen,
                    }}>
                    Donate
                  </Button>
                ) : value.status === 1 ? (
                  <Button
                    mode="contained"
                    onPress={() => {
                      navigation.navigate('DeliveryDetailsAvailabilities', {
                        session_id: value.id,
                      });
                    }}
                    style={{
                      marginRight: 15,
                      color: '#000000',
                      backgroundColor: colorConstant.proRed,
                    }}>
                    Track
                  </Button>
                ) : null}
              </View>
              <View style={{flex: 1}}>
                <Modal
                  isOpen={modalVisible}
                  onClose={setModalVisible}
                  size="lg">
                  <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>REQUEST DETAILS</Modal.Header>
                    {loadingSession ? (
                      <Spinner />
                    ) : (
                      <Modal.Body>
                        <View style={{flexDirection: 'column', marginTop: 20}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 15,
                            }}>
                            <Text style={{fontSize: 17, color: '#616161'}}>
                              Requested Amount
                            </Text>
                            <Text
                              style={{
                                fontSize: 17,
                                color: colorConstant.primaryColor,
                                fontWeight: 'bold',
                              }}>
                              {sessionData.quantity}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 15,
                            }}>
                            <Text style={{fontSize: 17, color: '#616161'}}>
                              Requested by
                            </Text>
                            <Text
                              style={{
                                fontSize: 17,
                                color: colorConstant.primaryColor,
                                fontWeight: 'bold',
                              }}>
                              {sessionData.user_name}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 15,
                            }}>
                            <View style={{flex: 1}}>
                              <Text style={{fontSize: 17, color: '#616161'}}>
                                Requester Message
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 0.7,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Text
                                style={{
                                  fontSize: 17,
                                  color: colorConstant.primaryColor,
                                  fontWeight: 'bold',
                                }}>
                                {sessionData.requester_message}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: 15,
                            }}>
                            <Text style={{fontSize: 17, color: '#616161'}}>
                              Preferred Delivery
                            </Text>
                            <Text
                              style={{
                                fontSize: 17,
                                color: colorConstant.primaryColor,
                                fontWeight: 'bold',
                              }}>
                              {sessionData.requester_delivery_option === 0
                                ? 'Self Delivery'
                                : value.requester_delivery_option === 1
                                ? 'Free Delivery'
                                : value.requester_delivery_option === 2
                                ? 'Paid Driver'
                                : null}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}>
                            <Text style={{fontSize: 17, color: '#616161'}}>
                              Requester Location
                            </Text>
                            <Button
                              mode="contained"
                              style={{
                                backgroundColor: colorConstant.proYellow,
                                color: '#ffffff',
                                width: 140,
                                alignItems: 'center',
                              }}
                              onPress={() =>
                                navigation.navigate('viewRequesterOnMap', {
                                  longitude: sessionData.longitude,
                                  latitude: sessionData.latitude,
                                })
                              }>
                              <Text>View on Map</Text>
                            </Button>
                          </View>
                        </View>
                      </Modal.Body>
                    )}
                    <Modal.Footer>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: 320,
                          alignItems: 'center',
                        }}>
                        {value.status === 0 ? (
                          <Button
                            mode="contained"
                            style={{
                              backgroundColor: colorConstant.proRed,
                              marginBottom: 20,
                            }}
                            onPress={() => {
                              rejectAvailabilities(sessionData.id);
                              // console.log(sessionData.id);
                            }}
                            colorScheme="muted">
                            <Text style={{fontSize: 17, color: '#ffffff'}}>
                              REJECT
                            </Text>
                          </Button>
                        ) : null}
                        <Button
                          mode="contained"
                          style={{
                            backgroundColor: colorConstant.primaryColor,
                            marginBottom: 20,
                          }}
                          onPress={() => {
                            setModalVisible(!modalVisible);
                          }}
                          colorScheme="muted">
                          <Text style={{fontSize: 17, color: '#ffffff'}}>
                            CANCEL
                          </Text>
                        </Button>
                      </View>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
              </View>
              <View style={{flex: 1}}>
                <Modal
                  isOpen={donateVisible}
                  onClose={() => closeModal()}
                  size="lg">
                  <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>ACCEPT REQUEST</Modal.Header>
                    <Modal.Body>
                      <View style={{flexDirection: 'column'}}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#616161',
                            fontFamily: 'Barlow-SemiBold',
                          }}>
                          Select Required Vehicle
                        </Text>
                        <Center flex={1}>
                          <VStack
                            space={6}
                            alignSelf="flex-start"
                            w="100%"
                            style={{marginTop: 20}}>
                            <Select
                              placeholder="Select Vehicle Option"
                              selectedValue={position}
                              onValueChange={(nextValue) =>
                                setPosition(nextValue)
                              }>
                              {vehicleTypes.map((values) => (
                                <Select.Item
                                  label={values.name}
                                  value={values.id}
                                  key={values.id}
                                />
                              ))}
                            </Select>
                          </VStack>
                        </Center>
                      </View>
                    </Modal.Body>
                    <Modal.Footer>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: 320,
                          alignItems: 'center',
                        }}>
                        <Button
                          mode="contained"
                          style={{
                            backgroundColor: colorConstant.proGreen,
                            marginBottom: 20,
                          }}
                          onPress={() => acceptRequest(values)}
                          colorScheme="muted">
                          <Text style={{fontSize: 17, color: '#ffffff'}}>
                            ACCEPT
                          </Text>
                        </Button>
                        <Button
                          mode="contained"
                          style={{
                            backgroundColor: colorConstant.primaryColor,
                            marginBottom: 20,
                          }}
                          onPress={() => {
                            setPosition();
                            setDonateVisible(!donateVisible);
                          }}
                          colorScheme="muted">
                          <Text style={{fontSize: 17, color: '#ffffff'}}>
                            CANCEL
                          </Text>
                        </Button>
                      </View>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AvailabilityCon: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    elevation: 0.5,
    width: Dimensions.get('window').width / 1.05,
    height: Dimensions.get('window').height / 4.5,
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderLeftColor: colorConstant.proGreen,
    borderLeftWidth: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    flex: 1,
  },
  ProfilePicCon: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfilePic: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  headingText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 17,
    color: 'black',
    left: 23,
  },
  bodyText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 15,
    color: colorConstant.proGreyLight,
    left: 23,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default RequestForDonation;
