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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const availabilityInputSetTwoNgo = ({route}) => {
  const navigation = useNavigation();

  const [quantity, setQuantity] = React.useState('');
  const [storageDesc, setStorageDesc] = React.useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisibleBestBefore, setDatePickerVisibilityBestBefore] =
    useState(false);
  const [madeTime, setMadeTime] = useState('HH:MM:SS');
  const [madeDate, setMadeDate] = useState('YYYY-MM-DD');
  const [beforeDate, setBeforeDate] = useState('YYYY-MM-DD');
  const [beforeTime, setBeforeTime] = useState('HH:MM:SS');
  const [dataOne, setDataOne] = useState('');
  const [condition, setCondition] = useState('');
  const [assignMade, setAssignMade] = useState(null);
  const [assignBest, setAssignBest] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePickerBestBefore = () => {
    setDatePickerVisibilityBestBefore(true);
  };

  const hideDatePickerBestBefore = () => {
    setDatePickerVisibilityBestBefore(false);
  };

  const handleConfirmCooked = (val) => {
   
      setCondition(val);
      const chooseTime = moment(val).format('HH:mm:00');
      const assignMade = moment(val).format('YYYY-MM-DD HH:mm:00');
      setMadeTime(chooseTime);
      setAssignMade(assignMade);
    
    hideDatePicker();
  };

  const handleConfirmBestBefore = (BestBefore) => {
  
      const chooseTime = moment(BestBefore).format('HH:mm:00');
      const a = moment(condition);
      const b = moment(BestBefore);
        const assignBefore = moment(BestBefore).format('YYYY-MM-DD HH:mm:00');
        setBeforeTime(chooseTime);
        setAssignBest(assignBefore);
    hideDatePickerBestBefore();
  };

  const validateFieldsTwo = () => {
    // navigation.navigate('availabilityInputSetThree');
     if (madeTime === 'HH:MM:SS') {
      Alert.alert('Select Cooked Time');
    } else if ( beforeTime === 'HH:MM:SS') {
      Alert.alert('Select Expiry Time');
    } else {
      const inputSetTwo = {
        madeOn: assignMade,
        bestBefore: assignBest,
        
      };
      storeData(inputSetTwo);
      navigation.navigate('collectionpointInputSetThree');
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@inputSetTwoColl', jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataOne();
  }, []);

  const getDataOne = async () => {
    try {
      const value = await AsyncStorage.getItem('@inputSetOneColl');
      const val = JSON.parse(value);
      if (value !== null) {
        console.log(value);
        setDataOne(val);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
              <Text style={styles.textHeader}>
                {'During pandemic/disaters time \ncollect things \nHelp Needed persons'}
              </Text>
            </View>
        <View style={styles.contentContainerCookedTime}>
          <View style={styles.cookedTimeTextCon}>
            <Text style={styles.cookedTimeText}>
              {'Start Time' }
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              // backgroundColor: 'red',
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
                {'Choose Time'}
              </Text>
            </Button>
            <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontFamily: 'Barlow-Bold',
                    fontSize: 17,
                    color: colorConstant.proGreen,
                  }}>
                  {madeTime}
                </Text>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode={'time'}
              onConfirm={handleConfirmCooked}
              onCancel={hideDatePicker}
            />
          </View>
        </View>
        <View style={styles.contentContainerBestBefore}>
          <View style={styles.bestBeforeTextCon}>
            <Text style={styles.bestBeforeText}>
              {'End Time' }
            </Text>
          </View>
          <View
            style={{
              flex: 0.6,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              // backgroundColor: 'red',
            }}>
            <Button
              mode="contained"
              onPress={showDatePickerBestBefore}
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
                {'Choose Time' }
              </Text>
            </Button>
            <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontFamily: 'Barlow-Bold',
                    fontSize: 17,
                    color: colorConstant.proRed,
                  }}>
                  {beforeTime}
                </Text>
             
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisibleBestBefore}
              mode={'time' }
              onConfirm={handleConfirmBestBefore}
              onCancel={hideDatePickerBestBefore}
            />
          </View>
        </View>
        <View style={styles.contentContainerFrom}>
              <View style={styles.fromTextCon}>
                <Text style={styles.fromText}></Text>
              </View>
            </View>
        <View style={styles.contentContainerBtnTwo}>
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
            <Text style={{fontFamily: 'Barlow-Bold', fontSize: 20}}>Next</Text>
          </Button>
        </View>
      </View>
      <View style={styles.contentContainerFrom}>
              <View style={styles.fromTextCon}>
                <Text style={styles.fromText}></Text>
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
  contentContainerQuantity: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInputQuantity: {
    width: Dimensions.get('screen').width / 1.1,
  },
  quantityText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  quantityTextCon: {
    flex: 0.6,
  },
  //cooked Time
  contentContainerCookedTime: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
  },
  cookedTimeTextCon: {
    flex: 0.3,
  },
  cookedTimeText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //cater
  contentContainerBestBefore: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
  },
  bestBeforeTextCon: {
    flex: 0.3,
  },
  bestBeforeText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //description
  contentContainerStorage: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
  },
  descriptionHeading: {
    flexDirection: 'column',
  },
  storageDescriptionText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  storageDescriptionTextCon: {
    flex: 0.6,
  },
  textInputStorageDesc: {
    flex: 4,
    width: Dimensions.get('screen').width / 1.1,
  },
  //button
  contentContainerBtnTwo: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
    width: Dimensions.get('screen').width / 1.1,
  },
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
  contentContainerCity: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
  },
  cityTextCon: {
    flex: 1.5,
  },
  cityText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
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
});

export default availabilityInputSetTwoNgo;
