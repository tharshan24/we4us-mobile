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

function browseSellingPointsPublic(props) {
  const {selling_point} = props.route.params;
  const context = useContext(SocketContext);
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(selling_point);
    getCurrentUser();
  }, []);

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

  useEffect(() => {
    // browseAvailability();
    return navigation.addListener('focus', () => {
      browseCollectionPoints();
    });
  }, []);

  const browseCollectionPoints = async () => {
    try {
      await axios
        .get(constants.BASE_URL + 'org/getSellingPointsById/' + selling_point, {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          setData(response.data.result.data[0]);
          setLoading(false);
        });
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
                <Text style={styles.headingTxt}>{data.name}</Text>
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
                  <Text style={styles.subHeadingTxt}>Title :</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.resultsTxt}>{data.name}</Text>
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
                  <Text style={styles.subHeadingTxt}>Start on :</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.resultsTxt}>
                    {moment(data.start_time).format('DD-MM-YYYY   HH:mm A')}
                  </Text>
                </View>
              </View>
              {/*txt4*/}
              <View style={styles.txtContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.subHeadingTxt}>End on :</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.resultsTxt}>
                    {moment(data.end_time).format('DD-MM-YYYY   HH:mm A')}
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
                      navigation.navigate('ViewOnMapCollectionPoints', {
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

export default browseSellingPointsPublic;
