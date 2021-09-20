import React, {useContext, useEffect, useState} from 'react';
import {
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
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import constants from '../../../constants/constantsProject.';
import SocketContext from '../../../Context/SocketContext';
import {Spinner} from 'native-base';
import moment from 'moment';

function ongoingRequestDetails(props) {
  const {req_id} = props.route.params;
  const context = useContext(SocketContext);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // browseMyAvailability();
    return navigation.addListener('focus', () => {
      browseMyRequest();
    });
  }, []);

  const browseMyRequest = async () => {
    try {
      await axios
        .get(constants.BASE_URL + 'request/exploreRequestById/' + req_id, {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          setData(response.data.result.data[0]);
          setItems(response.data.result.items);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const cancelMyRequest = async () => {
    try {
      await axios
        .get(constants.BASE_URL + 'request/cancelRequest/' + req_id, {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          console.log(response.data, 'ppppppppp');
          if (response.data.status_code === 0) {
            console.log('Cancelled');
            navigation.pop(1);
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
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => cancelMyRequest()}
                activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name="delete-outline"
                  color="#ffffff"
                  size={30}
                  style={{
                    backgroundColor: colorConstant.proRed,
                    borderRadius: 100,
                    padding: 7,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate('donationForMyRequests', {
                    req_id: req_id,
                  })
                }>
                <MaterialCommunityIcons
                  name="account-group"
                  color="#ffffff"
                  size={30}
                  style={{
                    backgroundColor: colorConstant.proGreen,
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
                <Text style={styles.subHeadingTxt}>Need Before</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.resultsTxt}>
                  {moment(data.need_before).format('DD-MM-YYYY   HH:mm A')}
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
                    navigation.navigate('viewOnMapMyRequest', {
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
            {/*txt8*/}
            <View style={styles.txtContainer}>
              <View style={{flex: 1}}>
                <Text style={styles.subHeadingTxt}>Description :</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.resultsTxt}>{data.description}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: 'Barlow-SemiBold',
                    fontSize: 20,
                    color: '#727E8E',
                  }}>
                  Items :
                </Text>
              </View>
              {items.map((values) => (
                <View
                  key={values.id}
                  style={{flex: 1, marginTop: 5, marginLeft: 10}}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontFamily: 'Barlow-SemiBold',
                          fontSize: 20,
                          color: '#727E8E',
                        }}>
                        {values.name}
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text
                        style={{
                          fontFamily: 'Barlow-SemiBold',
                          fontSize: 20,
                          color: colorConstant.primaryColor,
                        }}>
                        {values.needed_quantity}
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
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontFamily: 'Barlow-SemiBold',
    color: '#ffffff',
    fontSize: 20,
  },
});

export default ongoingRequestDetails;
