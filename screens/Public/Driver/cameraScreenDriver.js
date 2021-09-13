import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {Button} from 'react-native-paper';
import RNFS from 'react-native-fs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CameraScreenDriver = ({page, storeKey}) => {
  const navigation = useNavigation();

  const [{cameraRef, autoFocus, autoFocusPoint}, {takePicture}] = useCamera();
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    askPermission().then((r) => console.log(r));
  }, []);

  const askPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'We4Us Camera Permission',
          message: 'Your app needs permission.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        console.log('Camera permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      const filePath = data.uri;
      const checkDir = RNFS.ExternalStorageDirectoryPath + '/DCIM/Camera/Proof';
      let exists = await RNFS.exists(checkDir);

      if (exists) {
        let name = new Date();
        const fileName =
          'Proof-' +
          name.getHours() +
          name.getMinutes() +
          name.getSeconds() +
          name.getMilliseconds();
        const newFilePath =
          RNFS.ExternalStorageDirectoryPath +
          '/DCIM/Camera/Proof' +
          '/' +
          fileName +
          '.jpg';
        setImageUri('file://' + newFilePath);
        RNFS.moveFile(filePath, newFilePath);
      } else {
        const AppFolder = 'Proof';
        const DirectoryPath =
          RNFS.ExternalStorageDirectoryPath + '/DCIM/Camera/' + AppFolder;
        RNFS.mkdir(DirectoryPath);

        let name = new Date();
        const fileName =
          'Proof-' +
          name.getHours() +
          name.getMinutes() +
          name.getSeconds() +
          name.getMilliseconds();
        const newFilePath =
          RNFS.ExternalStorageDirectoryPath +
          '/DCIM/Camera/Proof' +
          '/' +
          fileName +
          '.jpg';
        setImageUri('file://' + newFilePath);
        RNFS.moveFile(filePath, newFilePath);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sendCapturedImage = () => {
    navigation.navigate(page);
    // const val = JSON.stringify(imageUri);
    storeData(imageUri);
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(storeKey, value);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1}}>
      {imageUri === null ? (
        <RNCamera
          ref={cameraRef}
          autoFocus={autoFocus}
          autoFocusPointOfInterest={autoFocusPoint.normalized}
          type={RNCamera.Constants.Type.back}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: 'red',
          }}>
          <Button
            mode="outlined"
            onPress={() => captureHandle()}
            style={styles.captureBtn}>
            <MaterialCommunityIcons
              name="camera-iris"
              color="#ffffff"
              size={50}
            />
          </Button>
        </RNCamera>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <Image
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
            }}
            source={{uri: imageUri}}
          />
          <View style={styles.btnContainer}>
            <Button
              mode="contained"
              style={{
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setImageUri(null)}>
              <MaterialCommunityIcons name="cancel" color="#ffffff" size={30} />
            </Button>
            <Button
              mode="contained"
              style={{
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => sendCapturedImage()}>
              <MaterialCommunityIcons name="send" color="#ffffff" size={30} />
            </Button>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default CameraScreenDriver;

const styles = StyleSheet.create({
  captureBtn: {
    marginBottom: 40,
    borderRadius: 100,
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  btnContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 30,
    marginTop: Dimensions.get('window').height / 1.25,
    width: Dimensions.get('window').width,
  },
});
