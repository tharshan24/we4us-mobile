import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import colorConstant from '../../../constants/colorConstant';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import constants from '../../../constants/constantsProject.';
import SocketContext from '../../../Context/SocketContext';
import {Center, Heading, Modal, Select, Spinner, VStack} from 'native-base';
import moment from 'moment';

function donationForMyRequests({route}) {
  const {req_id} = route.params;
  const context = useContext(SocketContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [donateVisible, setDonateVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingTwo, setLoadingTwo] = useState(true);
  const [state, setState] = useState('Accept');
  const [stateTwo, setStateTwo] = useState('Set Delivered');

  const modalDetail = (value) => {
    console.log(data.status);
    setModalVisible(!modalVisible);
    getItems(value);
  };

  const modalAccept = (value) => {
    setDonateVisible(!donateVisible);
    acceptDonation(value);
  };

  useEffect(() => {
    donationsForRequest();
    // return navigation.addListener('focus', () => {
    //   console.log(availability_id);
    // });
  }, [state, stateTwo]);

  const donationsForRequest = async () => {
    try {
      await axios
        .get(constants.BASE_URL + 'request/getSessions/' + req_id, {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          setData(response.data.result.row);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const rejectDonations = async (val) => {
    try {
      await axios
        .get(constants.BASE_URL + 'request/rejectReqSession/' + val, {
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

  const getItems = async (value) => {
    try {
      await axios
        .get(constants.BASE_URL + 'request/getSession/' + value, {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          setItems(response.data.result.items);
          setLoadingTwo(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const acceptDonation = async (value) => {
    try {
      await axios
        .get(constants.BASE_URL + 'request/acceptReqSession/' + value, {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          console.log(response.data, 'qqqqqqqqqqqqqqqqqqqqqqq');
          if (response.data.status_code === 0) {
            setState('Accepted');
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const deliverDetails = async (value) => {
    try {
      await axios
        .get(constants.BASE_URL + 'request/deliverReqSession/' + value, {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          if (response.data.status_code === 0) {
            setStateTwo('Delivered');
          }
        });
    } catch (e) {
      console.log(e);
    }
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
        No Donations to Show
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
                    source={require('../../../assets/Images/thishan.jpg')}
                  />
                </View>
                <View style={{flex: 5}}>
                  <Text style={styles.headingText}>{value.user_name}</Text>
                  <Text style={styles.bodyText}>
                    Message :{value.attender_message}
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
                      modalAccept(value.id);
                    }}
                    style={{
                      marginRight: 15,
                      backgroundColor: colorConstant.proGreen,
                    }}>
                    <Text>{state}</Text>
                  </Button>
                ) : (
                  <Button
                    mode="contained"
                    onPress={() => {
                      deliverDetails(value.id);
                    }}
                    style={{
                      marginRight: 15,
                      backgroundColor: colorConstant.proGreen,
                    }}>
                    <Text>{stateTwo}</Text>
                  </Button>
                )}
              </View>
            </View>
            <View style={{flex: 1}}>
              <Modal isOpen={modalVisible} onClose={setModalVisible} size="lg">
                <Modal.Content>
                  <Modal.CloseButton />
                  <Modal.Header>DETAILS</Modal.Header>
                  <Modal.Body>
                    <View style={{flexDirection: 'column', marginTop: 20}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 15,
                        }}>
                        <Text style={{fontSize: 17, color: '#616161'}}>
                          Donated by
                        </Text>
                        <Text
                          style={{
                            fontSize: 17,
                            color: colorConstant.primaryColor,
                            fontWeight: 'bold',
                          }}>
                          {value.user_name}
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
                            Message
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 0.7,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <Text
                            style={{
                              fontSize: 17,
                              color: colorConstant.primaryColor,
                              fontWeight: 'bold',
                            }}>
                            {value.attender_message}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <View style={{flex: 1}}>
                          <Text style={{fontSize: 20, color: '#616161'}}>
                            Items
                          </Text>
                        </View>
                        {loadingTwo ? (
                          <Spinner />
                        ) : (
                          items.map((val) => (
                            <View
                              key={val.id}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                flex: 1,
                                marginTop: 10,
                                width: 200,
                              }}>
                              <Text style={{fontSize: 18, color: '#616161'}}>
                                {val.name}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 18,
                                  color: colorConstant.primaryColor,
                                }}>
                                {val.quantity}
                              </Text>
                            </View>
                          ))
                        )}
                      </View>
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
                      {value.status === 0 ? (
                        <Button
                          mode="contained"
                          style={{
                            backgroundColor: colorConstant.proRed,
                            marginBottom: 20,
                          }}
                          onPress={() => rejectDonations(value.id)}
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

export default donationForMyRequests;

{
  /*<View style={styles.AvailabilityCon}>*/
}
{
  /*  <View style={{flexDirection: 'row', paddingBottom: 12}}>*/
}
{
  /*    <View style={styles.ProfilePicCon}>*/
}
{
  /*      <Image*/
}
{
  /*        style={styles.ProfilePic}*/
}
{
  /*        source={require('../../assets/Images/thishan.jpg')}*/
}
{
  /*      />*/
}
{
  /*    </View>*/
}
{
  /*    <View style={{flex: 5}}>*/
}
{
  /*      <Text style={styles.headingText}>Thishan Jude</Text>*/
}
{
  /*      <Text style={styles.bodyText}>Location: Jaffna</Text>*/
}
{
  /*      <Text style={styles.bodyText}>Quantity: 20</Text>*/
}
{
  /*      <Text style={styles.bodyText}>*/
}
{
  /*        Need Before: 30/05/2021 | 5.00 PM*/
}
{
  /*      </Text>*/
}
{
  /*    </View>*/
}
{
  /*  </View>*/
}
{
  /*  <View style={styles.btnContainer}>*/
}
{
  /*    <Button*/
}
{
  /*      mode="contained"*/
}
{
  /*      style={{*/
}
{
  /*        marginRight: 15,*/
}
{
  /*        backgroundColor: colorConstant.primaryColor,*/
}
{
  /*      }}>*/
}
{
  /*      Details*/
}
{
  /*    </Button>*/
}
{
  /*    <Button*/
}
{
  /*      mode="contained"*/
}
{
  /*      onPress={() => navigation.navigate('DonationTrackingMap')}*/
}
{
  /*      style={{*/
}
{
  /*        backgroundColor: colorConstant.proRed,*/
}
{
  /*      }}>*/
}
{
  /*      View on Map*/
}
{
  /*    </Button>*/
}
{
  /*  </View>*/
}
{
  /*</View>*/
}
