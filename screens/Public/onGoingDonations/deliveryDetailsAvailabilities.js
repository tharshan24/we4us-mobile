import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import colorConstant from '../../../constants/colorConstant';
import {Input, Spinner} from 'native-base';
import axios from 'axios';
import constants from '../../../constants/constantsProject.';
import SocketContext from '../../../Context/SocketContext';
import moment from 'moment';

const DeliveryDetailsAvailabilities = (props) => {
  const navigation = useNavigation();
  const {session_id} = props.route.params;
  const context = useContext(SocketContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(session_id, 'ppppppppppppp');
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      await axios
        .get(
          constants.BASE_URL +
            'availability/getAVailabilityDeliveries/' +
            session_id,
          {
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        )
        .then(function (response) {
          console.log('lllll');
          setData(response.data.result.data[0]);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const submit = () => {
    console.log('ok');
  };

  return loading ? (
    <Spinner />
  ) : (
    <View style={styles.mainContainer}>
      <View style={styles.oldPwdCon}>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt}>Availability Name:</Text>
        </View>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt1}>
            {data.creator_first_name + ' ' + data.creator_last_name}
          </Text>
        </View>
      </View>
      <View style={styles.oldPwdCon}>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt}>Created at:</Text>
        </View>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt1}>
            {moment(data.availability_created_at).format('YYYY-MM-DD HH:mm A')}
          </Text>
        </View>
      </View>
      <View style={styles.oldPwdCon}>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt}>Creator:</Text>
        </View>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt1}>
            {data.creator_first_name + ' ' + data.creator_last_name}
          </Text>
        </View>
      </View>
      <View style={styles.oldPwdCon}>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt}>Driver Name :</Text>
        </View>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt1}>
            {data.driver_first_name + '  ' + data.driver_last_name}
          </Text>
        </View>
      </View>
      <View style={styles.oldPwdCon}>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt}>Requester Name :</Text>
        </View>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt1}>
            {data.requester_first_name + '  ' + data.requester_last_name}
          </Text>
        </View>
      </View>
      <View style={styles.oldPwdCon}>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt}>Requester Message :</Text>
        </View>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt1}>{data.requester_message}</Text>
        </View>
      </View>
      <View style={styles.oldPwdCon}>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt}>Delivery vehicle :</Text>
        </View>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt1}>{data.delivery_vehicle_option}</Text>
        </View>
      </View>
      <View style={styles.oldPwdCon}>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt}>Requested Quantity :</Text>
        </View>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt1}>{data.request_quantity}</Text>
        </View>
      </View>
      <View style={styles.oldPwdCon}>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt}>Storage :</Text>
        </View>
        <View style={styles.oldPwdTxt}>
          <Text style={styles.txt1}>{data.storage_description}</Text>
        </View>
      </View>
      <View style={styles.btn}>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('DonationTrackingMap', {
              creatorLatitude: data.created_latitude,
              createdLongitude: data.created_longitude,
              requesterLatitude: data.requested_latitude,
              requesterLongitude: data.requested_longitude,
              driver_id: data.driver_id,
            })
          }
          style={{
            marginBottom: 20,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colorConstant.proYellow,
          }}>
          <Text>Map</Text>
        </Button>
      </View>
    </View>
  );
};

export default DeliveryDetailsAvailabilities;

const styles = StyleSheet.create({
  mainContainer: {
    // width: Dimensions.get('screen').width / 1.1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  oldPwdCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  txt: {
    fontSize: 17,
    fontFamily: 'Barlow-SemiBold',
    color: '#585454',
  },
  txt1: {
    fontSize: 17,
    fontFamily: 'Barlow-SemiBold',
    color: colorConstant.primaryColor,
  },
  oldPwdTxt: {
    flex: 1,
    justifyContent: 'center',
  },
  oldPwdInput: {
    flex: 1.5,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
});
