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
import colorConstant from '../../constants/colorConstant';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import axios from 'axios';
import constants from '../../constants/constantsProject.';
import SocketContext from '../../Context/SocketContext';
import {Spinner} from 'native-base';
import moment from 'moment';

function requestedAvailabilityDetails(props) {
  const {session_id} = props.route.params;
  const context = useContext(SocketContext);
  const navigation = useNavigation();
  const [images, setImages] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(session_id);
    return navigation.addListener('focus', () => {
      browseMyRequestedAvailability();
    });
  }, []);

  const browseMyRequestedAvailability = async () => {
    try {
      await axios
        .get(
          constants.BASE_URL +
            'availability/exploreAvailabilityByMySession/' +
            session_id,
          {
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        )
        .then(function (response) {
          setImages(response.data.result.images);
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
        .get(
          constants.BASE_URL + 'availability/cancelAvailSession/' + session_id,
          {
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        )
        .then(function (response) {
          // console.log(response.data);
          navigation.pop(1);
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
              {data.session_status === 0 || data.session_status === 1 ? (
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
                    ? 'Non - Vegetarian'
                    : data.food_type === 2
                    ? 'Mixed'
                    : null}
                </Text>
              </View>
            </View>
            {/*txt2*/}
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
                <Text style={styles.resultsTxt}>{data.quantity}</Text>
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
                    navigation.navigate('myRequestedAvailabilityLocationMap', {
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
            {/*txt9*/}
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
            {/*txt10*/}
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
          {data.session_status === 1 &&
          data.final_delivery_option === 0 &&
          data.payment_by === 2 ? (
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                <Text style={styles.btnTxt}>Start</Text>
              </TouchableOpacity>
            </View>
          ) : data.session_status === 2 || data.session_status === 3 ? (
            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                <Text style={styles.btnTxt}>Track</Text>
              </TouchableOpacity>
            </View>
          ) : null}
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

export default requestedAvailabilityDetails;
