import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {Spinner} from 'native-base';
import colorConstant from '../../../constants/colorConstant';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import constants from '../../../constants/constantsProject.';
import SocketContext from '../../../Context/SocketContext';

function HistoryDonation(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const context = useContext(SocketContext);

  // useEffect(() => {
  //   getData();
  // }, []);
  //
  // const getData = async () => {
  //   await axios
  //     .get(constants.BASE_URL + 'public/viewProfile/' + userId, {
  //       headers: {
  //         Authorization: `Bearer ${context.token}`,
  //       },
  //     })
  //     .then(function (response) {
  //       response.data.result.map((val) => {
  //         // console.log(val);
  //         setAccNo(val.account_number);
  //         setDriverStatus(val.driver_status);
  //       });
  //       setLoading(false);
  //     })
  //     .catch(function (e) {
  //       console.log(e);
  //     });
  // };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{margin: 7}}>
        {loading ? (
          <Spinner />
        ) : (
          data.map((values) => (
            <View key={values.id} style={styles.mainContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BrowseAvailability', {
                    availabilityId: values.id,
                  })
                }>
                <View style={styles.AvailabilityCon}>
                  <View style={styles.ProfilePicCon}>
                    <Image
                      style={styles.ProfilePic}
                      source={require('../../../assets/Images/thishan.jpg')}
                    />
                  </View>
                  <View>
                    <Text style={styles.headingText}>{values.name}</Text>
                    <Text style={styles.bodyText}>
                      `From:{values.user_name}`
                    </Text>
                    <Text style={styles.bodyText}>
                      Quantity: {values.available_quantity}
                    </Text>
                    <Text style={styles.bodyText}>
                      `Best Before: {values.best_before.split('T')[0]}`
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

export default HistoryDonation;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
    paddingTop: 10,
  },
  filterBtnContainer: {
    flexDirection: 'row',
  },
  filterTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    marginRight: 10,
    color: colorConstant.primaryColor,
  },
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
  Heading: {
    left: 23,
  },
  AvailabilityHeaderCon: {
    marginRight: 8,
  },
  AvailabilityHeaderTxt: {
    fontFamily: 'Barlow',
    fontSize: 18,
    color: colorConstant.proCharcoal,
  },
  ProfilePicCon: {},
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
