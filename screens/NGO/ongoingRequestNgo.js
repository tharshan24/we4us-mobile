import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import colorConstant from '../../constants/colorConstant';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import constants from '../../constants/constantsProject.';
import SocketContext from '../../Context/SocketContext';
import {Spinner} from 'native-base';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function OngoingRequest(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const context = useContext(SocketContext);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAvailabilityData();
    wait(3000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getAvailabilityData();
    });
  }, []);

  const getAvailabilityData = async () => {
    try {
      await axios
        .get(constants.BASE_URL + 'request/exploreMyRequest', {
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
    <ScrollView
      style={{margin: 7}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {loading ? (
        <Spinner />
      ) : (
        data.map((data) => (
          <View key={data.id} style={styles.mainContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ongoingRequestDetails', {
                  req_id: data.id,
                });
              }}>
              <View style={styles.AvailabilityCon}>
                <View style={styles.ProfilePicCon}>
                  <Image
                    style={styles.ProfilePic}
                    source={require('../../assets/Images/logo.png')}
                  />
                </View>
                <View>
                  <Text style={styles.headingText}>{data.name}</Text>
                  <Text style={styles.bodyText}>From:{data.user_name}</Text>
                  <Text style={styles.bodyText}>
                    Type: {data.request_type_name}
                  </Text>
                  <Text style={styles.bodyText}>
                    Best Before: {data.need_before.split('T')[0]}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))
      )}
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

export default OngoingRequest;
