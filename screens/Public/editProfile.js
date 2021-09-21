/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import colorConstant from '../../constants/colorConstant';
import DocumentPicker from 'react-native-document-picker';
import {TextInput, Provider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Select, VStack, Spinner, NativeBaseProvider} from 'native-base';
import constants from '../../constants/constantsProject.';
import SocketContext from '../../Context/SocketContext';

const EditProfile = (props) => {
  const [actionVal, setActionVal] = React.useState(true);
  const context = useContext(SocketContext);
  const [txtVal, setTxtVal] = React.useState('Edit');
  const [submitTxt, setSubmitTxt] = React.useState();
  const [token, setToken] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [state, setState] = React.useState(1);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [mobile, setMobile] = React.useState('');

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
      console.log(e);
    }
  };

  const FilePic = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      uploadProfilePic(res[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Error in choosing Image');
      } else {
        throw err;
      }
    }
    return <Text>Success</Text>;
  };

  const uploadProfilePic = async (value) => {
    setLoading(true);
    const proPic = new FormData();
    proPic.append('files', {
      name: new Date() + 'profilePic',
      uri: value,
      type: 'image/jpeg',
    });
    try {
      await axios({
        url: constants.BASE_URL + 'user/updateProfPic',
        method: 'post',
        data: proPic,
        headers: {
          Authorization: `proPic ${context.token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }).then(function (response) {
        if (response.data.status_code === 0) {
          Alert.alert('Profile Picture Upload Success');
          setLoading(false);
          setState(state + 1);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    userDetails();
  }, [state, token]);

  const userDetails = async () => {
    try {
      await axios({
        url: constants.BASE_URL + 'public/viewProfile',
        method: 'get',
        headers: {
          Authorization: `proPic ${context.token}`,
        },
      }).then(function (response) {
        if (response.data.status_code === 0) {
          console.log(response.data.result[0]);
          setData(response.data.result[0]);
          setLoading(false);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

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
                  source={{uri: data.profile_picture_path.toString()}}
                />
                <TouchableOpacity onPress={() => FilePic()}>
                  <Text style={styles.ChangeTxt}>Change</Text>
                </TouchableOpacity>
                <View style={styles.submitCon}>
                  <TouchableOpacity
                    style={{marginRight: 50}}
                    onPress={() => {
                      setActionVal(false);
                      txtChange();
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
                      placeholder={data.first_name}
                      disabled={actionVal}
                      selectionColor={colorConstant.primaryColor}
                      underlineColor={colorConstant.proGreyLight}
                      value={firstName}
                      onChangeText={(val) => setFirstName(val)}
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
                      placeholder={data.last_name}
                      disabled={actionVal}
                      value={lastName}
                      onChangeText={(val) => setLastName(val)}
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
                  <Text style={styles.ContentTxt}>Mobile Number</Text>
                  <View style={styles.EditContent}>
                    <TextInput
                      placeholder={data.mobile_number.toString()}
                      disabled={actionVal}
                      value={mobile}
                      onChangeText={(val) => setMobile(val)}
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
                  <Text style={styles.ContentTxt}>Gender</Text>
                  <View style={styles.EditContent}>
                    <TextInput
                      placeholder={
                        data.gender === 1
                          ? 'Male'
                          : data.gender === 2
                          ? 'Female'
                          : 'other'
                      }
                      disabled={true}
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
                  <Text style={styles.ContentTxt}>City</Text>
                  <View style={styles.EditContent}>
                    <TextInput
                      placeholder={data.name_en}
                      disabled={true}
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
