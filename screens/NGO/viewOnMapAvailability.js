import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colorConstant from '../../constants/colorConstant';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const ViewOnMapAvailability = (props) => {
  const {longitude, latitude} = props.route.params;
  const [region, setRegion] = useState();
  const [valueMargin, setValueMargin] = useState(5);

  const chooseLocationMarker = () => (
    <MapView.Marker coordinate={{latitude: latitude, longitude: longitude}}>
      <View
        style={{
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            color={colorConstant.proRed}
            size={40}
            style={{
              marginTop: 2,
            }}
          />
        </View>
      </View>
    </MapView.Marker>
  );

  useEffect(() => {
    console.log(longitude);
    console.log(latitude);
    setRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.02,
    });

    requestPermission();
    checkPermissions();
  }, []);

  useEffect(() => {
    setTimeout(() => setValueMargin(0), 5);
  }, []);

  const requestPermission = () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {});
    console.log('Permission Already Granted');
  };

  const checkPermissions = () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{
          flex: 1,
          marginTop: valueMargin,
        }}
        showsUserLocation={true}
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={region}
        region={region}
        showsTraffic={false}
        showsMyLocationButton={true}
        loadingEnabled={true}
        followsUserLocation={true}>
        {chooseLocationMarker()}
      </MapView>
    </View>
  );
};

export default ViewOnMapAvailability;
