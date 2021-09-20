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
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import constants from '../../../constants/constantsProject.';
import SocketContext from '../../../Context/SocketContext';
import {Spinner} from 'native-base';
import moment from 'moment';

function DonationForRequestsDetails(props) {
  const {session_id} = props.route.params;
  const context = useContext(SocketContext);
  const navigation = useNavigation();
  const [images, setImages] = useState();
  const [data, setData] = useState([]);
  const [donated, setDonated] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      browseMyDonations();
    });
  }, []);

  const browseMyDonations = async () => {
    try {
      await axios
        .get(
          constants.BASE_URL +
            'request/exploreRequestByMySession/' +
            session_id,
          {
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        )
        .then(function (response) {
          setDonated(response.data.result.items);
          setItems(response.data.result.items_creator);
          setData(response.data.result.data[0]);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const cancelSession = async () => {
    try {
      await axios
        .get(constants.BASE_URL + 'request/cancelReqSession/' + session_id, {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          console.log(response.data);
          if (response.data.status_code === 0) {
            navigation.pop(1);
            Alert.alert('Donation Cancelled');
          } else {
            Alert.alert('Error in Cancelling Donation');
          }
        });
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
          <View style={styles.headingContainer}>
            <View style={styles.txtCon}>
              <Text style={styles.headingTxt}>{data.name}</Text>
            </View>
            <View style={styles.iconCon}>
              {data.session_status === 0 ? (
                <Button
                  onPress={() => cancelSession()}
                  style={{backgroundColor: '#e84545'}}>
                  <Text
                    style={{fontFamily: 'Barlow-SemiBold', color: '#ffffff'}}>
                    Cancel
                  </Text>
                </Button>
              ) : null}
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
                <Text style={styles.subHeadingTxt}>Request Name:</Text>
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
                <Text style={styles.resultsTxt}>{data.request_type_name}</Text>
              </View>
            </View>
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
                <Text style={styles.subHeadingTxt}>need Before:</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.resultsTxt}>
                  {moment(data.need_before).format('DD-MM-YYYY   HH:mm A')}
                </Text>
              </View>
            </View>
            {/*txt5*/}
            <View style={styles.txtContainer}>
              <View style={{flex: 1}}>
                <Text style={styles.subHeadingTxt}>Location :</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.resultsTxt}>{data.location}</Text>
              </View>
            </View>
            {/*txt8*/}
            <View style={styles.txtContainer}>
              <View style={{flex: 1}}>
                <Text style={styles.subHeadingTxt}>Description :</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.resultsTxt}>{data.description}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', marginBottom: 10}}>
              <View style={{flex: 1, marginBottom: 10}}>
                <Text
                  style={{
                    fontFamily: 'Barlow-SemiBold',
                    fontSize: 17,
                    color: '#0e4590',
                  }}>
                  Requested Items :
                </Text>
              </View>
              {items.map((values) => (
                <View key={values.id} style={{flex: 1}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontFamily: 'Barlow-SemiBold',
                          fontSize: 16,
                          color: '#727E8E',
                        }}>
                        {values.name}
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontFamily: 'Barlow-SemiBold',
                          fontSize: 16,
                          color: '#727E8E',
                        }}>
                        {values.needed_quantity}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
            <View style={{flexDirection: 'column', marginBottom: 10}}>
              <View style={{flex: 1, marginBottom: 10}}>
                <Text
                  style={{
                    fontFamily: 'Barlow-SemiBold',
                    fontSize: 17,
                    color: '#0e4590',
                  }}>
                  Accepted Items :
                </Text>
              </View>
              {donated.map((values) => (
                <View key={values.id} style={{flex: 1}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontFamily: 'Barlow-SemiBold',
                          fontSize: 16,
                          color: '#727E8E',
                        }}>
                        {values.name}
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontFamily: 'Barlow-SemiBold',
                          fontSize: 16,
                          color: '#727E8E',
                        }}>
                        {values.quantity}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
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

export default DonationForRequestsDetails;
