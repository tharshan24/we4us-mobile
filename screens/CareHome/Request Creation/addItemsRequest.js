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

const AddItemsRequestHome = ({navigation}) => {
  // const navigation = useNavigation();

  const initialState = {
    name: '',
    quantity: '',
  };
  const [formValues, setFormValues] = useState([initialState]);

  let handleChange = (i, item, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][item] = e;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, {name: '', quantity: ''}]);
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
      const jsonValue = await AsyncStorage.getItem('@requestedItemsHome');
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
      await AsyncStorage.setItem('@requestedItemsHome', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const submitFields = () => {
    // console.log(formValues);
    formValues.map((val, index) => {
      if (val.name === '') {
        Alert.alert('Add Item for Request');
      } else if (val.quantity === '') {
        Alert.alert('Add the required amount of item needed');
      } else if (index === formValues.length - 1) {
        requestItems(formValues);
        navigation.pop();
      }
    });
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@requestedItemsHome');
      console.log('success');
    } catch (e) {
      console.log(e);
    }
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
                value={element.quantity}
                keyboardType="number-pad"
                selectionColor={colorConstant.primaryColor}
                outlineColor={colorConstant.primaryColor}
                underlineColor={colorConstant.primaryColor}
                style={{
                  flex: 1,
                  fontSize: 20,
                  backgroundColor: '#ffffff',
                }}
                onChangeText={(e) => handleChange(index, 'quantity', e)}
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
        {formValues.length === 1 ? (
          <View
            style={{
              marginTop: 20,
              alignItems: 'flex-end',
              width: Dimensions.get('screen').width / 1.1,
            }}>
            <Button
              mode="contained"
              onPress={() => {
                setFormValues([initialState]);
                removeValue();
              }}
              style={{
                height: 40,
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: Dimensions.get('screen').width / 2.5,
                backgroundColor: colorConstant.primaryColor,
              }}>
              <Text style={{fontFamily: 'Barlow-SemiBold', fontSize: 15}}>
                CLEAR INPUT
              </Text>
            </Button>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default AddItemsRequestHome;

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
