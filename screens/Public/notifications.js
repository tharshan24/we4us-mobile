import React, {useContext, useEffect, useRef, useState} from 'react';
import colorConstant from '../../constants/colorConstant';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import constants from '../../constants/constantsProject.';
import SocketContext from '../../Context/SocketContext';
import {Center, Modal, Select, Spinner, VStack} from 'native-base';
import moment from 'moment';
import {Button} from 'react-native-paper';

function Notifications(props) {
  const navigation = useNavigation();
  const context = useContext(SocketContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [donateVisible, setDonateVisible] = useState(false);
  const [parameter, setParameter] = useState();

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getNotification();
    });
  }, []);

  const getNotification = async () => {
    try {
      await axios
        .get(constants.BASE_URL + 'system/getAllNotifications', {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          if (response.data.status_code === 0) {
            setData(response.data.result.rows[0]);
            setLoading(false);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const navigateToMap = async (value) => {
    navigation.navigate('DonationTrackingMap');
  };

  const closeModal = () => {
    setDonateVisible(false);
  };

  return loading ? (
    <Spinner />
  ) : (
    <>
      <View
        style={{
          alignItems: 'center',
          width: Dimensions.get('screen').width,
          height: 45,
          backgroundColor: colorConstant.primaryColor,
        }}>
        <Text
          style={{
            fontFamily: 'Barlow-SemiBold',
            color: '#ffffff',
            fontSize: 20,
          }}>
          Notifications
        </Text>
      </View>
      <ScrollView style={{margin: 7}}>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={() => setDonateVisible(!donateVisible)}>
            <View style={styles.AvailabilityCon}>
              <View style={styles.ProfilePicCon}>
                <Image
                  style={styles.ProfilePic}
                  source={{uri: data.profile_picture_path}}
                />
              </View>
              <View>
                <Text style={styles.headingText}>{data.message}</Text>
                <Text style={styles.bodyText}>{data.text}</Text>
                <Text style={styles.bodyText}>From: {data.from_name}</Text>
                <Text style={styles.bodyText}>
                  Created At:{' '}
                  {moment(data.created_at).format('YYYY-MM-DD  HH:mm A')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{flex: 1}}>
        <Modal isOpen={donateVisible} onClose={() => closeModal()} size="lg">
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>DELIVERY REQUEST</Modal.Header>
            <Modal.Body>
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#616161',
                    fontFamily: 'Barlow-SemiBold',
                  }}>
                  Are you accepting the Delivery Request or Not
                </Text>
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
                  onPress={() => navigateToMap()}
                  colorScheme="muted">
                  <Text style={{fontSize: 17, color: '#ffffff'}}>ACCEPT</Text>
                </Button>
                <Button
                  mode="contained"
                  style={{
                    backgroundColor: colorConstant.primaryColor,
                    marginBottom: 20,
                  }}
                  onPress={() => {
                    setDonateVisible(!donateVisible);
                  }}
                  colorScheme="muted">
                  <Text style={{fontSize: 17, color: '#ffffff'}}>CANCEL</Text>
                </Button>
              </View>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
    paddingTop: 10,
  },
  filterBtnContainer: {
    flexDirection: 'row',
  },
  filterTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    marginRight: 10,
    color: colorConstant.primaryColor,
  },
  mainContainer: {
    height: Dimensions.get('window').height / 6.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  AvailabilityCon: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    elevation: 0.5,
    width: Dimensions.get('window').width / 1.05,
    height: Dimensions.get('window').height / 7,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 16,
    borderLeftColor: colorConstant.proGreen,
    borderLeftWidth: 6,
    paddingLeft: 10,
  },
  Heading: {
    left: 23,
  },
  AvailabilityHeaderCon: {
    marginRight: 8,
  },
  AvailabilityHeaderTxt: {
    fontFamily: 'Barlow',
    fontSize: 18,
    color: colorConstant.proCharcoal,
  },
  ProfilePicCon: {},
  ProfilePic: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  TextCon: {
    height: 105,
    borderRadius: 16,
    left: 20,
  },
  headingText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 16,
    color: 'black',
    left: 23,
  },
  bodyText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 14,
    color: colorConstant.proGreyLight,
    left: 23,
  },
});

export default Notifications;
