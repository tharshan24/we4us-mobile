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
import {backgroundColor} from 'styled-system';

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

  const destinationMarker = () => (
    <MapView.Marker coordinate={toLocation}>
      {/*onDragEnd={(checkLoc) => console.log(checkLoc.nativeEvent.coordinate)} draggable={true}*/}
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
            name="map-marker"
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
  const fromLocationMarker = () => (
    <MapView.Marker
      coordinate={fromLocation}
      flat={true}
      anchor={{x: 0.5, y: 0.5}}
      rotation={angle}>
      <View
        style={{
          // backgroundColor: 'red',
          height: 60,
          width: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 100,
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="navigation"
            size={40}
            color={colorConstant.proRed}
          />
        </View>
      </View>
    </MapView.Marker>
  );

  function calculateAngle(coordinates) {
    let startLat = coordinates[0]['latitude'];
    let startLng = coordinates[0]['longitude'];
    let endLat = coordinates[1]['latitude'];
    let endLng = coordinates[1]['latitude'];

    let dx = endLat - startLat;
    let dy = endLng - startLng;

    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        style={{flex: 1}}
        followsUserLocation={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        toolbarEnabled={true}
        zoomEnabled={true}
        rotateEnabled={true}>
        <MapViewDirections
          origin={fromLocation}
          destination={toLocation}
          strokeColor={colorConstant.primaryColor}
          strokeWidth={4}
          apikey={GOOGLE_API_KEY}
          optimizeWaypoints={true}
          onReady={(result) => {
            setDuration(result.duration);
            if (!isReady) {
              //fit route into maps
              mapView.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: Dimensions.get('window').width / 20,
                  left: Dimensions.get('window').width / 8,
                  top: Dimensions.get('window').height / 20,
                  bottom: Dimensions.get('window').height / 4,
                },
              });

              //reposition the car icon
              let nextLoc = {
                latitude: result.coordinates[0]['latitude'],
                longitude: result.coordinates[0]['longitude'],
              };

              if (result.coordinates.length >= 2) {
                let angle = calculateAngle(result.coordinates);
                setAngle(angle);
              }

              setFromLocation(nextLoc);
              setIsReady(true);
            }
          }}
        />
        {destinationMarker()}
        {fromLocationMarker()}
      </MapView>
      <View style={styles.deliveryDetailsContainer}>
        <View style={styles.deliveryDetailsContent}>
          <View style={styles.driverDetailContainer}>
            <View style={styles.imageContainer}>
              <TouchableOpacity activeOpacity={0.7}>
                <Image
                  source={require('../../assets/Images/assets.jpg')}
                  style={styles.profilePicture}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.detailContainer}>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.nameTxt}> Priyatharshan </Text>
                <Text style={styles.detailsTxt}> Volunteer Driver </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.BtnContainer}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deliveryDetailsContainer: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryDetailsContent: {
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').width * 0.95,
    borderRadius: 10,
    padding: 10,
    height: Dimensions.get('window').height / 5,
  },
  driverDetailContainer: {
    flex: 3,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  BtnContainer: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: 'blue',
  },
  imageContainer: {
    height: 70,
    width: 70,
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
});
export default DonationTrackingMap;
