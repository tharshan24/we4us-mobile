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
import {Spinner} from 'native-base';
import moment from 'moment';

function Notifications(props) {
  const navigation = useNavigation();
  const context = useContext(SocketContext);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

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

  return (
    <ScrollView style={{margin: 7}}>
      {loading ? (
        <Spinner />
      ) : (
        <View style={styles.mainContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DonationTrackingMap')}>
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
      )}
    </ScrollView>
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
