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
import moment from 'moment';

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
        .get(
          constants.BASE_URL + 'availability/exploreAvailabilityByMySessions',
          {
            headers: {
              Authorization: `Bearer ${context.token}`,
            },
          },
        )
        .then(function (response) {
          // console.log(response.data.result.data);
          setData(response.data.result.data);
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
          data.map((values) => (
            <View key={values.session_id} style={styles.mainContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('requestedAvailabilityDetails', {
                    session_id: values.session_id,
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
                    <Text style={styles.headingText}>{values.name}</Text>
                    <Text style={styles.bodyText}>From:{values.user_name}</Text>
                    <Text style={styles.bodyText}>
                      Quantity: {values.quantity}
                    </Text>
                    <Text style={styles.bodyText}>
                      Best Before:
                      {moment(values.best_before).format(
                        'DD-MM-YYYY | HH:mm A',
                      )}
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
