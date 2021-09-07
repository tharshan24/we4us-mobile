/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import colorConstant from '../../constants/colorConstant';
import DocumentPicker from 'react-native-document-picker';
import {TextInput, Provider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Select, VStack, Spinner, NativeBaseProvider} from 'native-base';

const EditProfile = (props) => {
  // functions
  const FilePic = async () => {
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

  const [actionVal, setActionVal] = React.useState(true);
  const [txtVal, setTxtVal] = React.useState('Edit');
  const [submitTxt, setSubmitTxt] = React.useState();
  const [token, setToken] = React.useState();
  const [cities, setCities] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedCity, setSelectedCity] = React.useState(true);

  const loadCities = () => {
    axios
      .get('http://10.0.2.2:8000/system/districts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        setCities(response.data.result.rows);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const txtChange = () => {
    if (txtVal === 'Edit') {
      setTxtVal('Cancel');
      setSubmitTxt('Submit');
    } else {
      setTxtVal('Edit');
      setActionVal(true);
      setSubmitTxt();
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
    loadCities();
  }, []);

  return (
    <NativeBaseProvider>
      <Provider>
        <ScrollView style={styles.MainContainer}>
          {loading ? (
            <Spinner color="blue.500" />
          ) : (
            <>
              <View style={styles.ProfilePicCon}>
                <Image
                  style={styles.ProfilePic}
                  source={require('../../assets/Images/profilePic.jpg')}
                />
                <TouchableOpacity onPress={() => FilePic()}>
                  <Text style={styles.ChangeTxt}>Change</Text>
                </TouchableOpacity>
                <View style={styles.submitCon}>
                  <TouchableOpacity
                    style={{marginRight: 50}}
                    onPress={() => {
                      setActionVal(false), txtChange();
                    }}>
                    <Text style={styles.ChangeTxt}>{txtVal}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => submitChanges()}>
                    <Text style={styles.SubmitTxt}>{submitTxt}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.BottomContainer}>
                <View style={styles.Content}>
                  <Text style={styles.ContentTxt}>First Name</Text>
                  <View style={styles.EditContent}>
                    <TextInput
                      placeholder="Athavan"
                      disabled={actionVal}
                      selectionColor={colorConstant.primaryColor}
                      underlineColor={colorConstant.proGreyLight}
                      style={{
                        height: 40,
                        width: '90%',
                        backgroundColor: '#ffffff',
                        borderColor: 'red',
                      }}
                    />
                  </View>
                </View>
                <View style={styles.Content}>
                  <Text style={styles.ContentTxt}>Last Name</Text>
                  <View style={styles.EditContent}>
                    <TextInput
                      placeholder="Theivendram"
                      disabled={actionVal}
                      selectionColor={colorConstant.primaryColor}
                      underlineColor={colorConstant.proGreyLight}
                      style={{
                        height: 40,
                        width: '90%',
                        backgroundColor: '#ffffff',
                        borderColor: 'red',
                      }}
                    />
                  </View>
                </View>
                <View style={styles.Content}>
                  <Text style={styles.ContentTxt}>Address</Text>
                  <View style={styles.EditContent}>
                    <TextInput
                      placeholder="Jaffna, SriLanka"
                      disabled={actionVal}
                      selectionColor={colorConstant.primaryColor}
                      underlineColor={colorConstant.proGreyLight}
                      style={{
                        height: 40,
                        width: '90%',
                        backgroundColor: '#ffffff',
                        borderColor: 'red',
                      }}
                    />
                  </View>
                </View>
                <View style={styles.Content}>
                  <Text style={styles.ContentTxt}>District</Text>
                  <VStack alignItems="center" space={4}>
                    <Select
                      minWidth={330}
                      selectedValue={selectedCity}
                      style={styles.textInput}
                      placeholder="District"
                      onValueChange={(val) => setSelectedCity(val)}>
                      {cities.map((city) => (
                        <Select.Item label={city.name_en} value={city.id} />
                      ))}
                    </Select>
                  </VStack>
                </View>
                <View style={styles.Content}>
                  <Text style={styles.ContentTxt}>City</Text>
                  <View style={styles.EditContent}>
                    <TextInput
                      placeholder="Jaffna"
                      disabled={actionVal}
                      selectionColor={colorConstant.primaryColor}
                      underlineColor={colorConstant.proGreyLight}
                      style={{
                        height: 40,
                        width: Dimensions.get('window').width / 1.7,
                        backgroundColor: '#ffffff',
                        borderColor: 'red',
                      }}
                    />
                  </View>
                </View>
                <View style={styles.Content}>
                  <Text style={styles.ContentTxt}>ZipCode</Text>
                  <View style={styles.EditContent}>
                    <TextInput
                      placeholder="40000"
                      disabled={actionVal}
                      selectionColor={colorConstant.primaryColor}
                      underlineColor={colorConstant.proGreyLight}
                      style={{
                        height: 40,
                        width: Dimensions.get('window').width / 1.7,
                        backgroundColor: '#ffffff',
                        borderColor: 'red',
                      }}
                    />
                  </View>
                </View>
                <View style={styles.Content}>
                  <Text style={styles.ContentTxt}>Landline Number</Text>
                  <View style={styles.EditContent}>
                    <TextInput
                      placeholder="021 224 1234"
                      disabled={actionVal}
                      selectionColor={colorConstant.primaryColor}
                      underlineColor={colorConstant.proGreyLight}
                      style={{
                        height: 40,
                        width: Dimensions.get('window').width / 1.7,
                        backgroundColor: '#ffffff',
                        borderColor: 'red',
                      }}
                    />
                  </View>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </Provider>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  Content: {
    backgroundColor: '#ffffff',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'column',
    flex: 2,
  },
  ContentTxt: {
    fontFamily: 'Barlow',
    fontSize: 18,
  },
  ProfilePicCon: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    backgroundColor: colorConstant.primaryColor,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 15,
  },
  BottomContainer: {
    flex: 3,
    paddingLeft: 13,
    paddingRight: 13,
  },
  ProfilePic: {
    height: 130,
    width: 130,
    borderRadius: 100,
    marginBottom: 10,
    marginTop: 10,
  },
  ChangeTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 17,
    color: '#ffffff',
    marginBottom: 15,
  },
  SubmitTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 17,
    color: '#ffffff',
    marginBottom: 15,
  },
  EditContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  EditTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 15,
    color: colorConstant.primaryColor,
  },
  IconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  containerStyle: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 20,
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').width / 1.2,
    borderRadius: 5,
    marginTop: Dimensions.get('window').width / 2,
    marginLeft: Dimensions.get('window').width / 15,
  },
  ModalContentCon: {
    justifyContent: 'center',
  },
  ModalContentTxt: {
    fontSize: 18,
    fontFamily: 'Barlow-Regular',
    color: colorConstant.primaryColor,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  submitCon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditProfile;
