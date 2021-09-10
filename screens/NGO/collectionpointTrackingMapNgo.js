import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colorConstant from '../../constants/colorConstant';
import MapViewDirections from 'react-native-maps-directions';
import GOOGLE_API_KEY from '../../constants/constantsProject.';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Button} from 'react-native-paper';

function DonationTrackingMap(props) {
  const [fromLocation, setFromLocation] = useState();
  const [toLocation, setToLocation] = useState(null);
  const [duration, setDuration] = useState();
  const [region, setRegion] = useState();
  const [isReady, setIsReady] = useState(false);
  const [angle, setAngle] = useState();

  const mapView = React.useRef();

  const mainFromLocation = {
    streetName: 'Vanniyasingam Road',
    gps: {
      longitude: 80.01702189445497,
      latitude: 9.711674411735867,
    },
  };

  const mainToLocation = {
    streetName: 'Hospital Road',
    gps: {
      longitude: 80.00869631767274,
      latitude: 9.712377653975071,
    },
  };

  useEffect(() => {
    let fromLocRegion = mainFromLocation.gps;
    let toLocRegion = mainToLocation.gps;

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
              console.log(
                'The permission is limited: some actions are possible',
              );
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    let mapRegion = {
      latitude: (fromLocRegion.latitude + toLocRegion.latitude) / 2,
      longitude: (fromLocRegion.longitude + toLocRegion.longitude) / 2,
      latitudeDelta:
        Math.abs(fromLocRegion.latitude - toLocRegion.latitude) * 2,
      longitudeDelta:
        Math.abs(fromLocRegion.longitude - toLocRegion.longitude) * 2,
    };

    setRegion(mapRegion);
    setToLocation(toLocRegion);
    setFromLocation(fromLocRegion);

    requestPermission();
    checkPermissions();
  }, []);

  const locationMarker = () => (
    <MapView.Marker coordinate={toLocation}>
      <View
        style={{
          // backgroundColor: 'red',
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            // backgroundColor: 'blue',
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="map-marker-radius-outline"
            color={colorConstant.proGreen}
            size={40}
            style={{
              marginTop: 2,
            }}
          />
        </View>
      </View>
    </MapView.Marker>
  );
 
  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        style={{flex: 1}}
        followsUserLocation={true}
        showsUserLocation={true}
        showsMyLocationButton={true}>
        
        {locationMarker()}
        
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  deliveryDetailsContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryDetailsContent: {
    elevation: 0.5,
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').width * 0.95,
    borderRadius: 10,
    padding: 10,
    height: Dimensions.get('window').height / 4.5,
    justifyContent: 'center',
  },
  driverDetailContainer: {
    flex: 3,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  BtnContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  imageContainer: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  detailContainer: {
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'center',
  },
  nameTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.proCharcoal,
  },
  detailsTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 15,
    color: '#a0a0a0',
  },
  ratingTxt: {
    fontFamily: 'Barlow-Bold',
    fontSize: 15,
    color: colorConstant.proYellow,
  },
});
export default DonationTrackingMap;
