import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colorConstant from '../../constants/colorConstant';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import GOOGLE_API_KEY from '../../constants/constantsProject.';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Button} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';

const findLocationMap = ({route}) => {
  const {location} = route.params;
  const ref = useRef();

  const [initialRegion, setInitialRegion] = useState();
  const [region, setRegion] = useState();
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
  });
  const [mapRender, setMapRender] = useState(2);

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

  const chooseLocationMarker = () => (
    <MapView.Marker
      coordinate={selectedLocation}
      onDragEnd={(checkLoc) => {
        setPickedLocation(checkLoc.nativeEvent.coordinate);
        setMapRender(2.5);
      }}
      onDrag={(val) => {
        setRegion({
          latitude: val.nativeEvent.coordinate.latitude,
          longitude: val.nativeEvent.coordinate.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.003,
        });
        setMapRender(2.5);
      }}
      draggable={true}>
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
    Geolocation.getCurrentPosition(
      (position) => {
        setInitialRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.02,
        });
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    requestPermission();
    checkPermissions();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainerFindLocation}>
      <View style={styles.googleAutoComplete}>
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="Search"
          query={{key: GOOGLE_API_KEY, language: 'en'}}
          debounce={400}
          styles={{
            container: {
              position: 'absolute',
              flex: 1,
              width: Dimensions.get('screen').width,
            },
            textInput: {
              paddingLeft: 20,
              paddingRight: 20,
              fontSize: 18,
              color: colorConstant.proGreyDark,
            },
          }}
          enablePoweredByContainer={false}
          nearbyPlacesAPI="GooglePlacesSearch"
          minLength={2}
          // isFocused={(val) => console.log(val)}
          fetchDetails={true}
          onPress={(data, details = null) => {
            setSelectedLocation({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.03,
              longitudeDelta: 0.02,
            });
          }}
        />
      </View>
      <View
        style={{
          marginTop: mapRender,
          flex: 14,
          zIndex: -10,
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}>
        <MapView
          style={{
            flex: 1,
          }}
          showsUserLocation={true}
          provider={MapView.PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          region={region}
          showsTraffic={false}
          showsMyLocationButton={true}
          loadingEnabled={true}
          followsUserLocation={true}>
          {chooseLocationMarker()}
        </MapView>
      </View>
      {/*<Button*/}
      {/*  onPress={() => {*/}
      {/*    console.log(pickedLocation);*/}
      {/*  }}>*/}
      {/*  Check*/}
      {/*</Button>*/}
    </SafeAreaView>
  );
};

export default findLocationMap;

const styles = StyleSheet.create({
  mainContainerFindLocation: {
    flex: 1,
    flexDirection: 'column',
  },
  googleAutoComplete: {
    // position: 'absolute',
    flex: 1,
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    // marginTop: 10,
    // padding: 10,
  },
});
