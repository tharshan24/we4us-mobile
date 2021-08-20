import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, TextInput} from 'react-native-paper';
import colorConstant from '../../constants/colorConstant';
import {Select, VStack, NativeBaseProvider} from 'native-base';
import DocumentPicker from 'react-native-document-picker';

const availabilityInputSetThree = () => {
  const navigation = useNavigation();

  const [address, setAddress] = React.useState('');
  const [imageLoc, setImageLoc] = React.useState('');
  const [deliveryOption, setDeliveryOption] = React.useState('');
  const [vehicle, setVehicle] = React.useState('');

  const imagePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
    return <Text>Success</Text>;
  };

  const validateFieldsTwo = () => {
    console.log('Submitted Successfully');
    // navigation.navigate('availabilityInputSetThree');
    // if (quantity === '') {
    //   Alert.alert('Enter Amount of your Donation');
    // } else if (hour === 'HH') {
    //   Alert.alert('Select Cooked / Manufactured Time');
    // } else if (hourBestBefore === 'HH') {
    //   Alert.alert('Select Expiry or Best Before Time');
    // } else if (storageDesc === '') {
    //   Alert.alert('Give a Short Description about the Utensils');
    // } else {
    //   navigation.navigate('availabilityInputSetThree');
    // }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.textHeader}>
            {'Share Surplus food with the \nNeeded persons'}
          </Text>
        </View>
        <View style={styles.contentContainerFrom}>
          <View style={styles.fromTextCon}>
            <Text style={styles.fromText}>From Address</Text>
          </View>
          <View style={styles.fromAddress}>
            <View style={{flex: 4}}>
              <TextInput
                keyboardType="number-pad"
                mode="outlined"
                label="Address"
                selectionColor={colorConstant.primaryColor}
                outlineColor={colorConstant.primaryColor}
                underlineColor={colorConstant.primaryColor}
                value={address}
                style={{
                  fontSize: 20,
                  backgroundColor: '#ffffff',
                  marginRight: 10,
                }}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('findLocationMap')}
                style={{
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colorConstant.proYellow,
                }}>
                <Text style={{fontFamily: 'Barlow-SemiBold', fontSize: 17}}>
                  Map
                </Text>
              </Button>
            </View>
          </View>
        </View>
        <View style={styles.contentContainerDelivery}>
          <View style={styles.deliveryTextCon}>
            <Text style={styles.deliveryText}>Delivery</Text>
          </View>
          <View style={{flex: 3}}>
            <NativeBaseProvider>
              <VStack>
                <Select
                  style={{
                    fontSize: 20,
                    backgroundColor: '#ffffff',
                    borderWidth: 1,
                    borderColor: colorConstant.primaryColor,
                  }}
                  width={Dimensions.get('screen').width / 1.1}
                  selectedValue={deliveryOption}
                  placeholder="Select Delivery Option"
                  onValueChange={(itemValue) => setDeliveryOption(itemValue)}>
                  <Select.Item label="Self Delivery" value="self" />
                  <Select.Item label="Volunteer Driver" value="volunteer" />
                  <Select.Item label="Paid Driver" value="paid" />
                </Select>
              </VStack>
            </NativeBaseProvider>
          </View>
        </View>
        <View style={styles.contentContainerVehicle}>
          <View style={styles.vehicleTextCon}>
            <Text style={styles.vehicleText}>Needed Vehicle</Text>
          </View>
          <View style={{flex: 3}}>
            <NativeBaseProvider>
              <VStack>
                <Select
                  style={{
                    fontSize: 20,
                    backgroundColor: '#ffffff',
                    borderWidth: 1,
                    borderColor: colorConstant.primaryColor,
                  }}
                  width={Dimensions.get('screen').width / 1.1}
                  selectedValue={vehicle}
                  placeholder="Select Needed Vehicle"
                  onValueChange={(itemValue) => setVehicle(itemValue)}>
                  <Select.Item label="MotorBike" value="mb" />
                  <Select.Item label="Three Wheeler" value="tw" />
                  <Select.Item label="Truck" value="tr" />
                </Select>
              </VStack>
            </NativeBaseProvider>
          </View>
        </View>
        <View style={styles.contentContainerImage}>
          <View style={styles.ImageTextCon}>
            <Text style={styles.ImageText}>Upload Image</Text>
          </View>
          <View style={styles.chosenImageContainer}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <View style={{flex: 1, marginRight: 30}}>
                <Button
                  mode="contained"
                  // style={{width: 160}}
                  onPress={() => navigation.navigate('cameraScreen')}>
                  Camera
                </Button>
              </View>
              <View style={{flex: 1}}>
                <Button
                  mode="contained"
                  // style={{width: 160}}
                  onPress={() => imagePicker()}>
                  Choose File
                </Button>
              </View>
            </View>
            <View style={{flex: 5}}>
              <View style={styles.pickedImageContainer}></View>
            </View>
          </View>
        </View>
        <View style={styles.contentContainerSubmit}>
          <Button
            mode="contained"
            onPress={() => validateFieldsTwo()}
            style={{
              width: 120,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colorConstant.primaryColor,
            }}>
            <Text style={{fontFamily: 'Barlow-Bold', fontSize: 20}}>
              Submit
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  //main Container
  mainContainer: {
    height: Dimensions.get('screen').height,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff',
  },
  //heading
  headingContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    flex: 0.1,
  },
  textHeader: {
    fontFamily: 'Barlow-Bold',
    textAlign: 'center',
    fontSize: 22,
    color: colorConstant.primaryColor,
  },
  //name
  contentContainerFrom: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  fromAddress: {
    width: Dimensions.get('screen').width / 1.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fromText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  fromTextCon: {
    flex: 0.6,
  },
  //cooked Time
  contentContainerDelivery: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
  },
  deliveryTextCon: {
    flex: 1.5,
  },
  deliveryText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //cater
  contentContainerVehicle: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
  },
  vehicleTextCon: {
    flex: 1.5,
  },
  vehicleText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //description
  contentContainerImage: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
  },
  descriptionHeading: {
    flexDirection: 'column',
  },
  ImageText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  ImageTextCon: {
    flex: 0.6,
  },
  chosenImageContainer: {
    flex: 4,
    width: Dimensions.get('screen').width / 1.1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  //button
  contentContainerSubmit: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: Dimensions.get('screen').width / 1.1,
  },
  pickedImageContainer: {
    width: Dimensions.get('screen').width / 1.1,
  },
});

export default availabilityInputSetThree;
