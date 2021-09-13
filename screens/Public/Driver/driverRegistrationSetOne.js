import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {Select, VStack, NativeBaseProvider} from 'native-base';
import colorConstant from '../../../constants/colorConstant';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const driverRegistrationSetOne = () => {
  const navigation = useNavigation();

  const [vehicleType, setVehicleType] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  const validateFields = () => {
    // navigation.navigate('registerDriverTwo');
    if (vehicleType === '') {
      Alert.alert('Select Vehicle Type');
    } else if (vehicleBrand === '') {
      Alert.alert('Give your Vehicle Brand');
    } else if (vehicleModel === '') {
      Alert.alert('Give your Vehicle Model');
    } else if (vehicleNumber === '') {
      Alert.alert('Give your Vehicle Number');
    } else if (vehicleColor === '') {
      Alert.alert('Give your Vehicle Color');
    } else if (licenseNumber === '') {
      Alert.alert('Give your Vehicle License Number');
    } else {
      const driverRegisterOne = {
        vehicleType: vehicleType,
        vehicleBrand: vehicleBrand,
        vehicleModel: vehicleModel,
        vehicleNumber: vehicleNumber,
        vehicleColor: vehicleColor,
        licenseNumber: licenseNumber,
      };
      storeData(driverRegisterOne);
      navigation.navigate('registerDriverTwo');
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@DriverInputSetOne', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      const parsedValue = JSON.parse(value);
      if (parsedValue !== null) {
        setToken(parsedValue.token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getVehicleType = () => {
    axios
      .get('http://10.0.2.2:8000/system/getVehicleTypes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        setVehicleTypes(response.data.result.rows);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
    getVehicleType();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.vehicleType}>
        <View style={styles.nameTextCon}>
          <Text style={styles.nameText}>Vehicle Type</Text>
        </View>
        <View style={styles.vehicleTypeContainer}>
          <View>
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
                  selectedValue={vehicleType}
                  placeholder="Select Vehicle Type"
                  onValueChange={(itemValue) => setVehicleType(itemValue)}>
                  {vehicleTypes.map((types) => (
                    <Select.Item
                      label={types.name}
                      value={types.id}
                      key={types.id}
                    />
                  ))}

                  {/*<Select.Item label="Non-Vegetarian" value="nonveg" />*/}
                  {/*<Select.Item label="Mixed" value="mix" />*/}
                </Select>
              </VStack>
            </NativeBaseProvider>
          </View>
        </View>
      </View>
      <View style={styles.vehicleBrand}>
        <View style={styles.nameTextCon}>
          <Text style={styles.nameText}>Vehicle Brand</Text>
        </View>
        <View style={styles.textInputContent}>
          <TextInput
            mode="outlined"
            placeholder="Vehicle Brand"
            selectionColor={colorConstant.primaryColor}
            outlineColor={colorConstant.primaryColor}
            underlineColor={colorConstant.primaryColor}
            value={vehicleBrand}
            style={{
              fontSize: 20,
              backgroundColor: '#ffffff',
            }}
            onChangeText={(text) => setVehicleBrand(text)}
          />
        </View>
      </View>
      <View style={styles.vehicleModel}>
        <View style={styles.nameTextCon}>
          <Text style={styles.nameText}>Vehicle Model</Text>
        </View>
        <View style={styles.textInputContent}>
          <TextInput
            mode="outlined"
            placeholder="Vehicle Model"
            selectionColor={colorConstant.primaryColor}
            outlineColor={colorConstant.primaryColor}
            underlineColor={colorConstant.primaryColor}
            value={vehicleModel}
            style={{
              fontSize: 20,
              backgroundColor: '#ffffff',
            }}
            onChangeText={(text) => setVehicleModel(text)}
          />
        </View>
      </View>
      <View style={styles.vehicleNumber}>
        <View style={styles.nameTextCon}>
          <Text style={styles.nameText}>Vehicle Number</Text>
        </View>
        <View style={styles.textInputContent}>
          <TextInput
            mode="outlined"
            placeholder="Vehicle Number"
            keyboardType="numeric"
            selectionColor={colorConstant.primaryColor}
            outlineColor={colorConstant.primaryColor}
            underlineColor={colorConstant.primaryColor}
            value={vehicleNumber}
            style={{
              fontSize: 20,
              backgroundColor: '#ffffff',
            }}
            onChangeText={(text) => setVehicleNumber(text)}
          />
        </View>
      </View>
      <View style={styles.vehicleColor}>
        <View style={styles.nameTextCon}>
          <Text style={styles.nameText}>Vehicle Color</Text>
        </View>
        <View style={styles.textInputContent}>
          <TextInput
            mode="outlined"
            placeholder="Vehicle Color"
            selectionColor={colorConstant.primaryColor}
            outlineColor={colorConstant.primaryColor}
            underlineColor={colorConstant.primaryColor}
            value={vehicleColor}
            style={{
              fontSize: 20,
              backgroundColor: '#ffffff',
            }}
            onChangeText={(text) => setVehicleColor(text)}
          />
        </View>
      </View>
      <View style={styles.licenseNumber}>
        <View style={styles.nameTextCon}>
          <Text style={styles.nameText}>License Number</Text>
        </View>
        <View style={styles.textInputContent}>
          <TextInput
            mode="outlined"
            placeholder="License Number"
            keyboardType="numeric"
            selectionColor={colorConstant.primaryColor}
            outlineColor={colorConstant.primaryColor}
            underlineColor={colorConstant.primaryColor}
            value={licenseNumber}
            style={{
              fontSize: 20,
              backgroundColor: '#ffffff',
            }}
            onChangeText={(text) => setLicenseNumber(text)}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Button
          mode="contained"
          onPress={() => validateFields()}
          style={{
            width: 120,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colorConstant.primaryColor,
          }}>
          <Text style={{fontFamily: 'Barlow-Bold', fontSize: 20}}>Next</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default driverRegistrationSetOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('screen').height,
    marginTop: 20,
    marginBottom: 10,
    // backgroundColor: 'red',
  },
  vehicleType: {
    flex: 1,
    // backgroundColor: '#8e2701',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10,
  },
  vehicleBrand: {
    flex: 1,
    // backgroundColor: '#2eaa7a',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  vehicleModel: {
    flex: 1,
    // backgroundColor: '#655e13',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  vehicleNumber: {
    flex: 1,
    // backgroundColor: '#6c1268',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  vehicleColor: {
    flex: 1,
    // backgroundColor: '#0e0f47',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  licenseNumber: {
    flex: 1,
    // backgroundColor: '#b30e0e',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  btnContainer: {
    flex: 0.7,
    flexDirection: 'row-reverse',
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  nameText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  nameTextCon: {
    flex: 0.3,
    marginBottom: 15,
    // backgroundColor: 'red',
  },
  vehicleTypeContainer: {
    width: Dimensions.get('screen').width / 1.1,
    flex: 0.7,
  },
});
