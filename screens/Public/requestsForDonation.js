import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colorConstant from '../../constants/colorConstant';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import constants from '../../constants/constantsProject.';
import SocketContext from '../../Context/SocketContext';
import {Modal} from 'native-base';
import moment from 'moment';

function RequestForDonation({route}) {
  const {availability_id} = route.params;
  const context = useContext(SocketContext);
  const navigation = useNavigation();
  const [btnState, setBtnState] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSizeClick = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    requestForAvailabilities();
    return navigation.addListener('focus', () => {
      console.log(availability_id);
    });
  }, []);

  const requestForAvailabilities = async () => {
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
          setData(response.data.result.row, 'lllllll');
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={{margin: 7}}>
      {data.map((value) => (
        <View key={value.id} style={styles.mainContainer}>
          <View style={styles.AvailabilityCon}>
            <View style={{flexDirection: 'row', paddingBottom: 12}}>
              <View style={styles.ProfilePicCon}>
                <Image
                  style={styles.ProfilePic}
                  source={require('../../assets/Images/thishan.jpg')}
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
                <Text style={styles.bodyText}>Quantity: {value.quantity}</Text>
                <Text style={styles.bodyText}>
                  Created:
                  {moment(value.created_at).format('DD-MM-YYYY | HH:mm A')}
                </Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <Button
                mode="contained"
                onPress={() => handleSizeClick()}
                style={{
                  marginRight: 15,
                  backgroundColor: colorConstant.primaryColor,
                }}>
                Details
              </Button>
              {btnState ? (
                <Button
                  mode="contained"
                  onPress={() => {
                    setBtnState(false);
                  }}
                  style={{
                    marginRight: 15,
                    backgroundColor: colorConstant.proGreen,
                  }}>
                  Donate
                </Button>
              ) : (
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('DonationTrackingMap')}
                  style={{
                    backgroundColor: colorConstant.proRed,
                  }}>
                  View on Map
                </Button>
              )}
            </View>
          </View>
          <View style={{flex: 1}}>
            <Modal isOpen={modalVisible} onClose={setModalVisible} size="lg">
              <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>REQUEST DETAILS</Modal.Header>
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
                        {value.quantity}
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
                        {value.user_name}
                      </Text>
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
                        {value.requester_delivery_option === 0
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
                          backgroundColor: colorConstant.proRed,
                          color: '#ffffff',
                          width: 140,
                          alignItems: 'center',
                        }}
                        onPress={() =>
                          navigation.navigate('viewRequesterOnMap', {
                            longitude: value.longitude,
                            latitude: value.latitude,
                          })
                        }>
                        <Text>View on Map</Text>
                      </Button>
                    </View>
                  </View>
                </Modal.Body>
                <Modal.Footer>
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
                    <Text style={{fontSize: 17, color: '#ffffff'}}>CLOSE</Text>
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </View>
        </View>
      ))}
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
