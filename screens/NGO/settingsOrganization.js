/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import colorConstant from '../../constants/colorConstant';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsOrganization = (props) => {
  const navigation = useNavigation();

  const logout = async () => {
    // let c = Alert.Alert('Are you sure ?');
    // if (c) {
    try {
      await AsyncStorage.removeItem('user');
      navigation.replace('Auth', {
        screen: 'Login',
      });
    } catch (e) {
      // remove error
    }
    // }
    console.log('Done.');
  };

  const con = () => {
    Alert.alert('Logout', 'Are you sure to Logout ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => logout()},
    ]);
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.TopContainer}>
        <View style={styles.SettingIconContainer}>
          <MaterialCommunityIcons
            name="cog-outline"
            color="#ffffff"
            size={50}
          />
        </View>
        <View style={styles.SettingTextContainer}>
          <Text style={styles.SettingHeader}>Settings</Text>
        </View>
      </View>
      <View style={styles.BottomContainer}>
        {/* Account setting header */}
        <View style={styles.HeaderContainer}>
          <Text style={styles.HeaderTxt}>ACCOUNT SETTINGS</Text>
        </View>
        {/* Account setting contents */}
        <View style={styles.SettingContents}>
          <TouchableOpacity
            style={styles.SettingProfileCon}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.SettingProfileTxt}>Edit Profile</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              style={{
                marginTop: 5,
              }}
              color={colorConstant.proCharcoal}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SettingProfileCon}
            onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={styles.SettingProfileTxt}>Change Password</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              style={{
                marginTop: 5,
              }}
              color={colorConstant.proCharcoal}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SettingProfileCon}
            onPress={() => navigation.navigate('DriverSettings')}>
            <Text style={styles.SettingProfileTxt}>Driver Option</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              style={{
                marginTop: 5,
              }}
              color={colorConstant.proCharcoal}
              size={30}
            />
          </TouchableOpacity>
        </View>
        {/* More setting Header */}
        <View style={styles.HeaderContainer}>
          <Text style={styles.HeaderTxt}>MORE</Text>
        </View>
        {/* More setting contents */}
        <View style={styles.SettingContents}>
          <TouchableOpacity
            style={styles.SettingProfileCon}
            onPress={() => navigation.navigate('AboutUs')}>
            <Text style={styles.SettingProfileTxt}>About Us</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              style={{
                marginTop: 5,
              }}
              color={colorConstant.proCharcoal}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SettingProfileCon}
            onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={styles.SettingProfileTxt}>Privacy Policy</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              style={{
                marginTop: 5,
              }}
              color={colorConstant.proCharcoal}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SettingProfileCon}
            onPress={() => navigation.navigate('TermsCondition')}>
            <Text style={styles.SettingProfileTxt}>Terms and Conditions</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              style={{
                marginTop: 5,
              }}
              color={colorConstant.proCharcoal}
              size={30}
            />
          </TouchableOpacity>
        </View>
        {/* LogOut button  */}
        <View style={styles.LogoutContainer}>
          <Button
            color={colorConstant.primaryColor}
            mode="outlined"
            style={{
              marginTop: 5,
              height: 35,
              borderColor: colorConstant.proRed,
              borderWidth: 1.5,
              width: Dimensions.get('window').width / 1.2,
              justifyContent: 'center',
            }}
            onPress={() => con()}>
            <Text style={styles.BtnTxtLogout}>LogOut</Text>
          </Button>
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
  TopContainer: {
    flex: 1,
    backgroundColor: colorConstant.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  BottomContainer: {
    flex: 4,
    backgroundColor: '#f8f8f8',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    paddingLeft: 30,
    paddingTop: 15,
    paddingRight: 30,
    flexDirection: 'column',
  },
  SettingTextContainer: {
    marginLeft: 15,
  },
  SettingHeader: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 40,
    color: '#ffffff',
  },
  SettingIconContainer: {
    marginTop: 8,
  },
  HeaderContainer: {
    flex: 0.5,
  },
  LogoutContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginBottom: 10,
  },
  HeaderTxt: {
    fontFamily: 'Barlow-Bold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  SettingContents: {
    flex: 2,
    flexDirection: 'column',
    marginTop: 0,
    backgroundColor: '#ffffff',
    padding: 4,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 5,
  },
  SettingProfileCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    // backgroundColor: 'red',
  },
  SettingProfileTxt: {
    fontFamily: 'Barlow-Medium',
    fontSize: 18,
    color: colorConstant.proCharcoal,
  },
  BtnTxtLogout: {
    fontFamily: 'Barlow-Bold',
    color: colorConstant.proRed,
    fontSize: 20,
  },
});

export default SettingsOrganization;
