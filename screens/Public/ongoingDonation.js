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

function OngoingDonation(props) {
  const navigation = useNavigation();

  return (
    <ScrollView style={{margin: 7}}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('OngoingDeliveryDetails');
          }}>
          <View style={styles.AvailabilityCon}>
            <View style={styles.ProfilePicCon}>
              <Image
                style={styles.ProfilePic}
                source={require('../../assets/Images/profilePic.jpg')}
              />
            </View>
            <View>
              <Text style={styles.headingText}>Wedding Lunch</Text>
              <Text style={styles.bodyText}>From:Theivendram Athavan</Text>
              <Text style={styles.bodyText}>Quantity: 20</Text>
              <Text style={styles.bodyText}>Best Before: 30/05/2021</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
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
  ProfilePicCon: {},
  ProfilePic: {
    height: 80,
    width: 80,
    borderRadius: 100,
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

export default OngoingDonation;
