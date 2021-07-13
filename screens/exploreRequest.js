import React from 'react';
import colorConstant from '../constants/colorConstant';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { Button } from 'react-native-paper';


function ExploreAvailability(props) {
  return (
    <View>
      <View style={styles.AvailabilityCon}>

        <View style={styles.ProfilePicCon}>
          <Image
            style={styles.ProfilePic}
            source={require('../assets/Images/profilePic.jpg')}
          />
         <View>
           <Text style={styles.headingtext}>Wedding Lunch</Text>
           <Text style={styles.bodytext}>From:Theivendram Athavan</Text>
           <Text style={styles.bodytext}>Quantity: 20</Text>
           <Text style={styles.bodytext}>Best Before: 30/05/2021</Text>
           </View> 
         
        </View>
      </View>
      <View style={styles.AvailabilityCon}>

        <View style={styles.ProfilePicCon}>
          <Image
            style={styles.ProfilePic}
            source={require('../assets/Images/profilePic.jpg')}
          />
         <View>
           <Text style={styles.headingtext}>Wedding Lunch</Text>
           <Text style={styles.bodytext}>From:Theivendram Athavan</Text>
           <Text style={styles.bodytext}>Quantity: 20</Text>
           <Text style={styles.bodytext}>Best Before: 30/05/2021</Text>
           </View> 
        </View>
      </View>
    </View>

  );
}


const styles = StyleSheet.create({
  AvailabilityCon: {
    backgroundColor: '#ffffff',
    elevation: 0.5,
    marginTop: 12,
    width: 381,
    height: 99,
    borderRadius: 16,
    left: 14,
    top: 16,
  },

  Heading: {
    left: 23
  },
  AvailabilityHeaderCon: {
    marginRight: 8,
  },
  AvailabilityHeaderTxt: {
    fontFamily: 'Barlow',
    fontSize: 18,
    color: colorConstant.proCharcoal,
  },
  ProfilePicCon: {
    flexDirection: 'row',
    left: 30,
    top: 13
  },
  ProfilePic: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  TextCon: {
    height: 105,
  borderRadius: 16,
  left: 20,

  },
headingtext: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 16,
    color: 'black',
    left:23
  },
  bodytext: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 14,
    color: colorConstant.proGreyLight,
    left:23
  }

});

export default ExploreAvailability;
