import React, {useContext, useEffect, useRef, useState} from 'react';
import colorConstant from '../../../constants/colorConstant';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import constants from '../../../constants/constantsProject.';
import SocketContext from '../../../Context/SocketContext';
import {Spinner} from 'native-base';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function collectionPoints({route}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const context = useContext(SocketContext);
  const navigation = useNavigation();

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getCollectionPoints();
    });
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const getCollectionPoints = async () => {
    try {
      await axios
        .get(constants.BASE_URL + 'org/getCollectionPoints', {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        })
        .then(function (response) {
          // console.log(response.data.result.row);
          setData(response.data.result.row);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCollectionPoints();
    wait(3000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{margin: 7}}>
      {loading ? (
        <Spinner />
      ) : (
        data.map((values) => (
          <View key={values.id} style={styles.mainContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('BrowseCollectionPointsPublic', {
                  collection_id: values.id,
                })
              }>
              <View style={styles.AvailabilityCon}>
                <View style={styles.ProfilePicCon}>
                  <Image
                    style={styles.ProfilePic}
                    source={require('../../../assets/Images/profilePic.jpg')}
                  />
                </View>
                <View>
                  <Text style={styles.headingText}>{values.name}</Text>
                  <Text style={styles.bodyText}>From:{values.user_name}</Text>
                  <Text style={styles.bodyText}>
                    Start on: {values.start_time}
                  </Text>
                  <Text style={styles.bodyText}>
                    End on: {values.end_time.split('T')[0]}
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

export default collectionPoints;
