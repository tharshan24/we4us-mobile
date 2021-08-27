import React, {useEffect, useState} from 'react';
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
import {Select, VStack, NativeBaseProvider} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const RequestCreationSetOne = () => {
  const navigation = useNavigation();
  const [title, setTitle] = React.useState('');
  const [requestType, setRequestType] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [date, setDate] = React.useState('DD');
  const [month, setMonth] = React.useState('MM');
  const [year, setYear] = React.useState('YYYY');
  const [hour, setHour] = React.useState('HH');
  const [minute, setMinute] = React.useState('MM');
  const [seconds, setSeconds] = React.useState('SS');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [neededBeforeTime, setNeededBeforeTime] = useState(null);
  const [neededBeforeDate, setNeededBeforeDate] = useState(null);

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

  useEffect(() => {
    requestPermission();
    checkPermissions();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmCooked = (val) => {
    let picker = new Date(val);

    let dateDate = picker.getDate();
    let dateMonth = picker.getMonth() + 1;
    let dateYear = picker.getFullYear();
    let dateHour = picker.getHours();
    let dateMinute = picker.getMinutes();
    let dateSecond = picker.getSeconds();

    setDate(dateDate);
    setMonth(dateMonth);
    setYear(dateYear);
    setHour(dateHour);
    setMinute(dateMinute);
    setSeconds(dateSecond);

    setNeededBeforeDate(dateDate + '/' + dateMonth + '/' + dateYear);
    setNeededBeforeTime(dateHour + ':' + dateMinute + ':' + dateSecond);

    hideDatePicker();
  };

  const validateFields = () => {
    navigation.navigate('RequestCreationSetTwo');
    // if (title === '') {
    //   Alert.alert('Enter Title for your Request');
    // } else if (requestType === '') {
    //   Alert.alert('Select your Request Type');
    // } else if (date === 'DD') {
    //   Alert.alert('Select when you need the Request');
    // } else if (desc === '') {
    //   Alert.alert('Give a Small description about the Request');
    // } else {
    //   const requestInputSetOne = {
    //     title: title,
    //     requestType: requestType,
    //     neededBeforeDate: neededBeforeDate,
    //     neededBeforeTime: neededBeforeTime,
    //     description: desc,
    //   };
    //   storeData(requestInputSetOne);
    //   navigation.navigate('RequestCreationSetTwo');
    // }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@requestInputSetOne', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.textHeader}>
            {'Request for Donations when you\nare in a Needy Situations'}
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
            <Text style={styles.foodTypeText}>Request Type</Text>
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
                  selectedValue={requestType}
                  placeholder="Select Request Type"
                  onValueChange={(itemValue) => setRequestType(itemValue)}>
                  <Select.Item label="Disaster" value="dis" />
                  <Select.Item label="Pandemic" value="pan" />
                </Select>
              </VStack>
            </NativeBaseProvider>
          </View>
        </View>
        <View style={styles.contentContainerNeededBefore}>
          <View style={styles.neededBeforeTextCon}>
            <Text style={styles.neededBeforeText}>Needed Before</Text>
          </View>
          <View
            style={{
              flex: 4,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Button
              mode="contained"
              onPress={showDatePicker}
              style={{
                height: 50,
                justifyContent: 'center',
                backgroundColor: colorConstant.primaryColor,
                marginRight: 15,
              }}>
              <Text
                style={{
                  fontFamily: 'Barlow-Bold',
                  fontSize: 15,
                  color: '#ffffff',
                }}>
                Choose Time
              </Text>
            </Button>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: 'Barlow-Bold',
                  fontSize: 17,
                  color: colorConstant.proGreen,
                }}>
                {date} / {month} / {year}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: 'Barlow-Bold',
                  fontSize: 17,
                  color: colorConstant.proGreen,
                }}>
                {hour}:{minute}:{seconds}
              </Text>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirmCooked}
              onCancel={hideDatePicker}
            />
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
            <Text style={{fontFamily: 'Barlow-Bold', fontSize: 20}}>Next</Text>
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
  contentContainerNeededBefore: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
  },
  neededBeforeTextCon: {
    flex: 1,
  },
  neededBeforeText: {
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

export default RequestCreationSetOne;
