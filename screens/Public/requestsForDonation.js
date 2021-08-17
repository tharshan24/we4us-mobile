import React, {useEffect} from 'react';
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

function RequestForDonation(props) {
  const navigation = useNavigation();

  return (
    <ScrollView style={{margin: 7}}>
      <View style={styles.mainContainer}>
        <View style={styles.AvailabilityCon}>
          <View style={{flexDirection: 'row', paddingBottom: 12}}>
            <View style={styles.ProfilePicCon}>
              <Image
                style={styles.ProfilePic}
                source={require('../../assets/Images/thishan.jpg')}
              />
            </View>
            <View style={{flex: 5}}>
              <Text style={styles.headingText}>Thishan Jude</Text>
              <Text style={styles.bodyText}>Location: Jaffna</Text>
              <Text style={styles.bodyText}>Quantity: 20</Text>
              <Text style={styles.bodyText}>
                Need Before: 30/05/2021 | 5.00 PM
              </Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Button
              mode="contained"
              style={{
                marginRight: 15,
                backgroundColor: colorConstant.primaryColor,
              }}>
              Details
            </Button>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('DonationTrackingMap')}
              style={{
                backgroundColor: colorConstant.proRed,
              }}>
              View on Map
            </Button>
          </View>
        </View>
        <View style={styles.AvailabilityCon}>
          <View style={{flexDirection: 'row', paddingBottom: 12}}>
            <View style={styles.ProfilePicCon}>
              <Image
                style={styles.ProfilePic}
                source={require('../../assets/Images/mathura.jpg')}
              />
            </View>
            <View style={{flex: 5}}>
              <Text style={styles.headingText}>Mathura Muththulingam</Text>
              <Text style={styles.bodyText}>Location: Sarasalai</Text>
              <Text style={styles.bodyText}>Quantity: 30</Text>
              <Text style={styles.bodyText}>
                Need Before: 20/05/2021 | 3.00 PM
              </Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Button
              mode="contained"
              style={{
                marginRight: 15,
                backgroundColor: colorConstant.primaryColor,
              }}>
              Details
            </Button>
            <Button
              mode="contained"
              style={{
                marginRight: 15,
                backgroundColor: colorConstant.proGreen,
              }}>
              Donate
            </Button>
          </View>
        </View>
      </View>
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
