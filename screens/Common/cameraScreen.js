import React from 'react';
import {Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {Button} from 'react-native-paper';
import RNFS from 'react-native-fs';

const cameraScreen = () => {
  const [{cameraRef}, {takePicture}] = useCamera();

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      const filePath = data.uri;

      let name = new Date();
      const fileName =
        'We4Us-' +
        name.getHours() +
        name.getMinutes() +
        name.getSeconds() +
        name.getMilliseconds();
      const newFilePath =
        RNFS.ExternalStorageDirectoryPath +
        '/DCIM/Camera' +
        '/' +
        fileName +
        '.jpg';
      RNFS.moveFile(filePath, newFilePath);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'red',
        }}>
        <Button mode="contained" onPress={() => captureHandle()}>
          Capture
        </Button>
      </RNCamera>
    </View>
  );
};

export default cameraScreen;
