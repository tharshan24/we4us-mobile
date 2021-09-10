import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import colorConstant from '../../../constants/colorConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AddItemsRequest = ({navigation}) => {
  // const navigation = useNavigation();

  const initialState = {
    name: '',
    count: '',
  };
  const [formValues, setFormValues] = useState([initialState]);

  let handleChange = (i, item, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][item] = e;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, {name: '', count: ''}]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getRequestedItems();
    });
  }, []);

  const getRequestedItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@requestedItems');
      const values = JSON.parse(jsonValue);
      console.log(values);
      if (values === null) {
        console.log('Add items for First Time');
      } else {
        setFormValues(values);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // let handleSubmit = (event) => {
  //   alert(JSON.stringify(formValues));
  // };
  //
  // const getAll = () => {
  //   console.log(formValues);
  // };

  const requestItems = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@requestedItems', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const submitFields = () => {
    formValues.map((val, index) => {
      if (val.name === '') {
        Alert.alert('Add Atleast one Item for Request');
      } else if (val.count === '') {
        Alert.alert('Add the required amount of item needed');
      } else if (index === formValues.length - 1) {
        Alert.alert('Request Submitted Successfully');
        requestItems(formValues);
        navigation.pop(1);
      }
    });
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        {formValues.map((element, index) => (
          <View key={index}>
            <View style={styles.textInputContent}>
              <TextInput
                mode="outlined"
                value={element.name}
                label="Item"
                selectionColor={colorConstant.primaryColor}
                outlineColor={colorConstant.primaryColor}
                underlineColor={colorConstant.primaryColor}
                style={{
                  flex: 3.5,
                  marginRight: 10,
                  fontSize: 20,
                  fontFamily: 'Barlow-Bold',
                  backgroundColor: '#ffffff',
                }}
                onChangeText={(e) => handleChange(index, 'name', e)}
              />
              <TextInput
                mode="outlined"
                label="Qn"
                value={element.count}
                keyboardType="number-pad"
                selectionColor={colorConstant.primaryColor}
                outlineColor={colorConstant.primaryColor}
                underlineColor={colorConstant.primaryColor}
                style={{
                  flex: 1,
                  fontSize: 20,
                  backgroundColor: '#ffffff',
                }}
                onChangeText={(e) => handleChange(index, 'count', e)}
              />
            </View>
            {index ? (
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Button
                  onPress={() => removeFormFields(index)}
                  style={{
                    height: 40,
                    width: Dimensions.get('screen').width / 4,
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f53c3c',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Barlow-SemiBold',
                      fontSize: 15,
                      color: '#ffffff',
                    }}>
                    REMOVE
                  </Text>
                </Button>
              </View>
            ) : null}
          </View>
        ))}

        <View
          style={{
            flex: 1,
            width: Dimensions.get('screen').width / 1.1,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button
            mode="contained"
            onPress={() => addFormFields()}
            style={{
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              width: Dimensions.get('screen').width / 2.5,
              backgroundColor: colorConstant.proGreen,
            }}>
            <Text style={{fontFamily: 'Barlow-SemiBold', fontSize: 20}}>
              ADD ITEMS
            </Text>
          </Button>
          <Button
            mode="contained"
            onPress={() => submitFields()}
            style={{
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              width: Dimensions.get('screen').width / 2.5,
              backgroundColor: colorConstant.primaryColor,
            }}>
            <Text style={{fontFamily: 'Barlow-SemiBold', fontSize: 20}}>
              SUBMIT
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddItemsRequest;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  textInputContent: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width / 1.1,
    marginBottom: 10,
  },
});
