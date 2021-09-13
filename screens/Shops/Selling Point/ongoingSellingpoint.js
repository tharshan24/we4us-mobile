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
import colorConstant from '../../../constants/colorConstant';
import {useNavigation} from '@react-navigation/native';

function OngoingSellingpoint(props) {
  const navigation = useNavigation();

  return (
    <ScrollView style={{margin: 7}}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('OngoingSellingpointDetails');
          }}>
          <View style={styles.AvailabilityCon}>
            <View style={styles.ProfilePicCon}>
              <Image
                style={styles.ProfilePic}
                source={require('../../../assets/Images/keels.jpg')}
              />
            </View>
            <View>
              <Text style={styles.headingText}>Selling Point</Text>
              <Text style={styles.bodyText}>From:Keells</Text>
              <Text style={styles.bodyText}>Location: Jaffna</Text>
              <Text style={styles.bodyText}>Start Date: 30/05/2021</Text>
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

export default OngoingSellingpoint;
