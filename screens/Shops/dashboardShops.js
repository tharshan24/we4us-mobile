/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import colorConstant from '../../constants/colorConstant';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import {Switch, HStack, Center, NativeBaseProvider, Spinner} from 'native-base';
import axios from 'axios';
import constants from '../../constants/constantsProject.';
import SocketContext from '../../Context/SocketContext';

const DashboardShops = (props) => {
  const navigation = useNavigation();
  const [loadingProfile, setLoadingProfile] = useState(true);
  useEffect(() => {
    viewProfile();
  }, []);

  const viewProfile = async () => {
    try {
      await axios
        .get(constants.BASE_URL + 'org/viewProfile/' + context.values.id, {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          setData(response.data.result);
          setLoadingProfile(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return loadingProfile ? (
    <Spinner />
  ) : (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor={colorConstant.primaryColor} />
      <View style={styles.HeaderContainer}>
        <View style={styles.HeaderTxtCon}>
          <Text style={styles.HeaderTxt}>Profile</Text>
        </View>
        <View style={styles.ProfilePicCon}>
          <Image
            style={styles.ProfilePic}
            source={require('../../assets/Images/keels.jpg')}
          />
        </View>
        <View style={styles.UserDetails}>
          <Text style={styles.UserName}>  {data[0].user_name} </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={({marginRight: 15}, {marginTop: 3})}>
              <MaterialCommunityIcons name="email" color="#ffffff" size={13} />
            </View>
            <View style={{marginLeft: 8}}>
              <Text style={styles.Email}>Keells@gmail.com </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={({marginRight: 15}, {marginTop: 3})}>
              <MaterialCommunityIcons name="phone" color="#ffffff" size={13} />
            </View>
            <View style={{marginLeft: 3}}>
              <Text style={styles.Mobile}> +94 77 123 4567 </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.BottomContainer}>
        <View style={styles.OverviewCon}>
          <View style={styles.OverviewTxtCon}>
            <Text style={styles.OverviewTxt}>Overview</Text>
          </View>
          <View style={styles.OverviewIcon}>
            <MaterialCommunityIcons
              name="chart-timeline-variant"
              color={colorConstant.primaryColor}
              size={43}
            />
          </View>
        </View>
        <View style={styles.ContentCon}>
          <View style={styles.MainActions}>
            <View style={styles.Donations}>
              <View style={styles.DonationHeader}>
                <View style={styles.DonationHeaderTxtCon}>
                  <Text style={styles.DonationHeaderTxt}>SELLING POINTS</Text>
                </View>
                <View style={styles.DonationHeaderIcon}>
                  <MaterialCommunityIcons
                    name="shopping-outline"
                    color={colorConstant.proGreen}
                    size={27}
                  />
                </View>
              </View>
              <View style={styles.DonationCount}>
                <Text style={styles.DonationCountTxt}>7</Text>
                <Text style={styles.DonationSuccess}>SUCCESSFUL DONATIONS</Text>
              </View>
              <View style={styles.ButtonsCon}>
                <Button
                  color={colorConstant.proRed}
                  mode="contained"
                  style={{
                    marginTop: 10,
                    height: 40,
                    width: 170,
                    justifyContent: 'center',
                  }}
                  onPress={() => navigation.navigate('OngoingSellingpoint')}>
                  <Text style={styles.BtnTxt2}>Progress</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colorConstant.primaryColor,
  },
  HeaderContainer: {
    flex: 1,
  },
  BottomContainer: {
    flex: 2,
    backgroundColor: '#f8f8f8',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  HeaderTxtCon: {
    flex: 0.25,
    alignItems: 'center',
  },
  HeaderTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: '#ffffff',
  },
  ProfilePicCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 35,
  },
  ProfilePic: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  UserDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 7,
  },
  UserName: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: '#ffffff',
  },
  Email: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 13,
    color: '#ffffff',
  },
  Mobile: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 13,
    color: '#ffffff',
  },
  OverviewCon: {
    marginTop: 15,
    flexDirection: 'row',
    marginBottom: 18,
  },
  OverviewTxtCon: {
    marginLeft: 25,
  },
  OverviewTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 30,
    color: colorConstant.primaryColor,
  },
  OverviewIcon: {
    marginLeft: 10,
  },
  ContentCon: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  //   MainActions: {
  //     // marginLeft: 5,
  //     flexDirection: 'column',
  //     // width: 411,
  //     justifyContent: 'space-around',
  //     // marginTop: 5,
  //   },
  Donations: {
    backgroundColor: '#ffffff',
    elevation: 0.7,
    // height: 210,
    marginLeft: 10,
    width: Dimensions.get('screen').width / 1.1,
    height: Dimensions.get('screen').height / 2.4,
    borderRadius: 16,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingBottom: 15,
  },

  DonationHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  DonationHeaderTxtCon: {
    marginRight: 8,
  },
  DonationHeaderTxt: {
    fontFamily: 'Barlow-Bold',
    fontSize: 22,
    color: colorConstant.proGreen,
  },
  RequestHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  RequestHeaderTxtCon: {
    marginRight: 8,
  },
  RequestHeaderTxt: {
    fontFamily: 'Barlow-Bold',
    fontSize: 18,
    color: colorConstant.proRed,
  },
  DonationCount: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  DonationCountTxt: {
    fontFamily: 'Barlow-Bold',
    fontSize: 80,
  },
  DonationSuccess: {
    fontFamily: 'Barlow-Bold',
    fontSize: 17,
    color: colorConstant.primaryColor,
  },

  ButtonsCon: {
    alignItems: 'center',
    // marginTop: 5,
  },
  BtnTxt: {
    alignItems: 'center',
    fontSize: 16,
  },
  BtnTxt2: {
    alignItems: 'center',
    fontSize: 17,
  },
  ButtonsConRequest: {
    alignItems: 'center',
    marginTop: 5,
    // flexDirection: 'row',
  },
  ButtonsConDonationCamp: {
    alignItems: 'center',
    marginTop: 5,
    // flexDirection: 'row',
  },
});

export default DashboardShops;
