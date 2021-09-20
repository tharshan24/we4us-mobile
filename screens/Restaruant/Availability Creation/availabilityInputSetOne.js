import React, {useEffect} from 'react';
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
import colorConstant from '../../../constants/colorConstant';
import {Select, VStack, NativeBaseProvider, Spinner} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import moment from 'moment';
import axios from 'axios';
import constants from '../../../constants/constantsProject.';

const availabilityInputSetOne = () => {
  const navigation = useNavigation();
  const [title, setTitle] = React.useState('');
  const [foodType, setFoodType] = React.useState('');
  const [foodCater, setFoodCater] = React.useState('');
  const [selectedFoodCater, setSelectedFoodCater] = React.useState(0);
  const [desc, setDesc] = React.useState('');
  const [now, setNow] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [token, setToken] = React.useState();
  const [userId, setUserId] = React.useState();

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

  const validateFields = () => {
    // const inputSetOne = {
    //   title: title,
    //   foodType: foodType,
    //   category: selectedFoodCater,
    //   description: desc,
    // };
    // storeData(inputSetOne);
    // navigation.navigate('availabilityInputSetTwo');
    if (title === '') {
      Alert.alert('Enter Title for your Donation');
    } else if (foodType === '') {
      Alert.alert('Select your Donation Food Type');
    } else if (foodCater === '') {
      Alert.alert('Select your Donation Food Category');
    } else if (desc === '') {
      Alert.alert('Give a Small description for your Donation');
    } else {
      const inputSetOne = {
        title: title,
        foodType: foodType,
        category: selectedFoodCater,
        description: desc,
      };
      storeData(inputSetOne);
      navigation.navigate('availabilityInputSetTwoRest');
    }
  };

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const parsedValue = JSON.parse(jsonValue);
      if (parsedValue !== null) {
        setToken(parsedValue.token);
        setUserId(parsedValue.result.id);
      }
    } catch (e) {
      console.log(e);
    }
    console.log('Done.');
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@inputSetOneRest', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const loadAvailabilityTypes = async () => {
    await axios
      .get(constants.BASE_URL + 'system/getAvailabilityType', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        setFoodCater(response.data.result.rows);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    requestPermission();
    checkPermissions();
  }, []);

  useEffect(() => {
    loadAvailabilityTypes();
    // return navigation.addListener('focus', () => {
    //   loadAvailabilityTypes();
    // });
  }, [token]);

  useEffect(() => {
    getUser();
    const now = moment().format('HH');
    setNow(now);
    return navigation.addListener('focus', () => {
      const now = moment().format('HH');
      setNow(now);
    });
  }, []);

  return (
    <NativeBaseProvider>
      <ScrollView>
        {loading ? (
          <Spinner color="blue.500" />
        ) : (
          <View style={styles.mainContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.textHeader}>
                {'Share Surplus food with the \nNeeded persons'}
              </Text>
            </View>
            <View style={styles.contentContainerName}>
              <View style={styles.nameTextCon}>
                <Text style={styles.nameText}>Title</Text>
              </View>
              <View style={styles.textInputContent}>
                <TextInput
                  mode="outlined"
                  label="Title"
                  selectionColor={colorConstant.primaryColor}
                  outlineColor={colorConstant.primaryColor}
                  underlineColor={colorConstant.primaryColor}
                  value={title}
                  style={{
                    fontSize: 20,
                    backgroundColor: '#ffffff',
                  }}
                  onChangeText={(text) => setTitle(text)}
                />
              </View>
            </View>
            <View style={styles.contentContainerType}>
              <View style={styles.foodTypeTextCon}>
                <Text style={styles.foodTypeText}>Food Type</Text>
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
                      selectedValue={foodType}
                      placeholder="Select Food Type"
                      onValueChange={(itemValue) => setFoodType(itemValue)}>
                      <Select.Item label="Vegetarian" value="veg" />
                      <Select.Item label="Non-Vegetarian" value="nonveg" />
                      <Select.Item label="Mixed" value="mix" />
                    </Select>
                  </VStack>
                </NativeBaseProvider>
              </View>
            </View>
            <View style={styles.contentContainerCater}>
              <View style={styles.foodCateTextCon}>
                <Text style={styles.foodCateText}>Food Category</Text>
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
                      selectedValue={selectedFoodCater}
                      placeholder="Select Food Category"
                      onValueChange={(itemValue) =>
                        setSelectedFoodCater(itemValue)
                      }>
                      {foodCater.map((val) => (
                        <Select.Item
                          label={val.name}
                          value={val.id}
                          key={val.id}
                        />
                      ))}
                    </Select>
                  </VStack>
                </NativeBaseProvider>
              </View>
            </View>
            <View style={styles.contentContainerDes}>
              <View style={styles.descriptionTextCon}>
                <Text style={styles.descriptionText}>Description</Text>
              </View>
              <View style={styles.textInputDes}>
                <TextInput
                  mode="outlined"
                  label="Describe your Donation"
                  selectionColor={colorConstant.primaryColor}
                  outlineColor={colorConstant.primaryColor}
                  underlineColor={colorConstant.primaryColor}
                  value={desc}
                  multiline={true}
                  numberOfLines={10}
                  style={{
                    fontSize: 20,
                    backgroundColor: '#ffffff',
                  }}
                  onChangeText={(text) => setDesc(text)}
                />
              </View>
            </View>
            {now >= 23 && selectedFoodCater === 1 ? (
              <View style={styles.contentContainerBtn}>
                <Button
                  mode="contained"
                  onPress={() => {
                    Alert.alert(
                      'You can not Donate Cooked food after 11PM Local Time',
                    );
                    console.log(now);
                    console.log(selectedFoodCater);
                  }}
                  style={{
                    width: 120,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fc6e6e',
                  }}>
                  <Text style={{fontFamily: 'Barlow-Bold', fontSize: 20}}>
                    Next
                  </Text>
                </Button>
              </View>
            ) : (
              <View style={styles.contentContainerBtn}>
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
                  <Text style={{fontFamily: 'Barlow-Bold', fontSize: 20}}>
                    Next
                  </Text>
                </Button>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </NativeBaseProvider>
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
  contentContainerName: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInputContent: {
    width: Dimensions.get('screen').width / 1.1,
  },
  nameText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  nameTextCon: {
    flex: 0.6,
  },
  //type
  contentContainerType: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  foodTypeTextCon: {
    flex: 1.5,
  },
  foodTypeText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //cater
  contentContainerCater: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  foodCateTextCon: {
    flex: 1.5,
  },
  foodCateText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //description
  contentContainerDes: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
  },
  descriptionHeading: {
    flexDirection: 'column',
  },
  descriptionText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  descriptionTextCon: {
    flex: 0.6,
  },
  textInputDes: {
    flex: 4,
    width: Dimensions.get('screen').width / 1.1,
  },
  //button
  contentContainerBtn: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
    width: Dimensions.get('screen').width / 1.1,
  },
});

export default availabilityInputSetOne;
