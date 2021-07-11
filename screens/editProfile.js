/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import colorConstant from '../constants/colorConstant';
import DocumentPicker from 'react-native-document-picker';
import {TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EditProfile = (props) => {
  const [text, setText] = React.useState('');
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
  const [edit, setEdit] = React.useState(true);
  const [val, setVal] = React.useState(true);
  const EnableEdit = () => {
    setEdit(false);
    setVal(false);
  };
  const DisableEdit = () => {
    setEdit(true);
    setVal(true);
  };

  const [hideTxt, setHideTxt] = React.useState(false);

  return (
    <ScrollView style={styles.MainContainer}>
      <View style={styles.ProfilePicCon}>
        <Image
          style={styles.ProfilePic}
          source={require('../assets/Images/profilePic.jpg')}
        />
        <TouchableOpacity onPress={() => FilePic()}>
          <Text style={styles.ChangeTxt}>Change</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Content}>
        <Text style={styles.ContentTxt}>Username</Text>
        <View style={styles.EditContent}>
          <TextInput
            placeholder="Aaketk21"
            disabled={edit}
            autoFocus={val}
            value={text}
            onChangeText={(text) => setText(text)}
            selectionColor={colorConstant.primaryColor}
            underlineColor={colorConstant.proGreyLight}
            style={{
              height: 40,
              width: Dimensions.get('window').width / 1.7,
              backgroundColor: '#ffffff',
              borderColor: 'red',
            }}
            onBlur={() => {
              DisableEdit(edit, val);
              setHideTxt(!hideTxt);
            }}
          />

          {hideTxt ? (
            <View style={styles.IconContainer}>
              <TouchableOpacity
                onPress={() => {
                  setHideTxt(!hideTxt);
                  DisableEdit(edit, val);
                }}>
                <MaterialCommunityIcons
                  name="check-bold"
                  style={{marginLeft: 5}}
                  color={colorConstant.proGreen}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHideTxt(!hideTxt);
                  DisableEdit(edit, val);
                }}>
                <MaterialCommunityIcons
                  name="close-thick"
                  style={{marginLeft: 30}}
                  color={colorConstant.proRed}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.EditBtn}
              onPress={() => {
                EnableEdit(edit, val);
                setHideTxt(!hideTxt);
              }}>
              <Text style={styles.EditTxt}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
        
      </View>
      <View style={styles.Content}>
        <Text style={styles.ContentTxt}>Username</Text>
        <View style={styles.EditContent}>
          <TextInput
            placeholder="Aaketk21"
            disabled={edit}
            autoFocus={val}
            value={text}
            onChangeText={(text) => setText(text)}
            selectionColor={colorConstant.primaryColor}
            underlineColor={colorConstant.proGreyLight}
            style={{
              height: 40,
              width: Dimensions.get('window').width / 1.7,
              backgroundColor: '#ffffff',
              borderColor: 'red',
            }}
            onBlur={() => {
              DisableEdit(edit, val);
              setHideTxt(!hideTxt);
            }}
          />

          {hideTxt ? (
            <View style={styles.IconContainer}>
              <TouchableOpacity
                onPress={() => {
                  setHideTxt(!hideTxt);
                  DisableEdit(edit, val);
                }}>
                <MaterialCommunityIcons
                  name="check-bold"
                  style={{marginLeft: 5}}
                  color={colorConstant.proGreen}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHideTxt(!hideTxt);
                  DisableEdit(edit, val);
                }}>
                <MaterialCommunityIcons
                  name="close-thick"
                  style={{marginLeft: 30}}
                  color={colorConstant.proRed}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.EditBtn}
              onPress={() => {
                EnableEdit(edit, val);
                setHideTxt(!hideTxt);
              }}>
              <Text style={styles.EditTxt}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    // backgroundColor: 'red',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 25,
    backgroundColor: '#f8f8f8',
  },
  Content: {
    backgroundColor: '#ffffff',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'column',
    // borderColor: 'green',
    // borderWidth: 10,
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
  },
  ProfilePic: {
    height: 100,
    width: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  ChangeTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 17,
    color: colorConstant.primaryColor,
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
});

export default EditProfile;
