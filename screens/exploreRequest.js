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

function ExploreRequest(props) {
  return (
    <View>
    <View style={styles.AvailabilityCon}>

      <View style={styles.ProfilePicCon}>
        <Image
          style={styles.ProfilePic}
          source={require('../assets/Images/profilePic.jpg')}
        />
        <View style={styles.TextCon}>
          <View style={styles.bodytext}>
            <Text>Wedding lunch</Text>
          </View>

          <View style={styles.bodytext}>
            <Text >From:Theivendram Athavan</Text>
          </View>
          <View style={styles.bodytext}>
            <Text>Quantity: 20</Text>
          </View>
          <View style={styles.bodytext}>
            <Text>Best Before: 30/05/2021</Text>
          </View>
        </View>
      </View>
    </View>
    <View style={styles.AvailabilityCon}>

      <View style={styles.ProfilePicCon}>
        <Image
          style={styles.ProfilePic}
          source={require('../assets/Images/profilePic.jpg')}
        />
        <View style={styles.TextCon}>
          <View style={styles.bodytext}>
            <Text>Wedding lunch</Text>
          </View>

          <View style={styles.bodytext}>
            <Text >From:Theivendram Athavan</Text>
          </View>
          <View style={styles.bodytext}>
            <Text>Quantity: 20</Text>
          </View>
          <View style={styles.bodytext}>
            <Text>Best Before: 30/05/2021</Text>
          </View>
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
  marginTop: 6,
  width: 381,
  height: 135,
  borderRadius: 16,
  left: 14,
  top: 16
},

Heading: {
  left: 23
},
AvailabilityHeaderCon: {
  marginRight: 8,
},
AvailabilityHeaderTxt: {
  fontFamily: 'Barlow-Bold',
  fontSize: 18,
  color: colorConstant.proCharcoal,
},
ProfilePicCon: {
  flexDirection: 'row',
  left: 30,
  top: 25
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
bodytext: {
  fontFamily: 'Barlow-SemiBold',
  fontSize: 20,
  color: '#ffffff',
}

});

export default ExploreRequest;
