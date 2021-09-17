import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import constants from '../../constants/constantsProject.';
import SocketContext from '../../Context/SocketContext';
import {Spinner} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import colorConstant from '../../constants/colorConstant';

function RequestedAvailabilities(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const context = useContext(SocketContext);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      RequestedAvailabilityData();
    });
  }, []);

  const RequestedAvailabilityData = async () => {
    try {
      await axios
        .get(constants.BASE_URL + 'availability/exploreMyAvailability', {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          setData(response.data.result.row);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <ScrollView style={{margin: 7}}>
        {loading ? (
          <Spinner />
        ) : (
          <View style={styles.mainContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('requestedAvailabilityDetails', {
                  availability_id: data[0].id,
                });
              }}>
              <View style={styles.AvailabilityCon}>
                <View style={styles.ProfilePicCon}>
                  <Image
                    style={styles.ProfilePic}
                    source={require('../../assets/Images/profilePic.jpg')}
                  />
                </View>
                <View>
                  <Text style={styles.headingText}>{data[0].name}</Text>
                  <Text style={styles.bodyText}>From:{data[0].user_name}</Text>
                  <Text style={styles.bodyText}>
                    Quantity: {data[0].available_quantity}
                  </Text>
                  <Text style={styles.bodyText}>
                    Best Before: {data[0].best_before.split('T')[0]}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
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

export default RequestedAvailabilities;
