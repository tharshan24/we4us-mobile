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
import {TextInput, Modal, Portal, Provider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

  // const initialValue [{label:"username", edit:false, currentValue:""}]

  const [actionVal, setActionVal] = React.useState(true);

  return (
    <Provider>
      <ScrollView style={styles.MainContainer}>
        <View style={styles.ProfilePicCon}>
          {/* <ImageBackground source={require('../assets/Images/profilePic.jpg')} /> */}
          <Image
            style={styles.ProfilePic}
            source={require('../assets/Images/profilePic.jpg')}
          />
          <TouchableOpacity onPress={() => FilePic()}>
            <Text style={styles.ChangeTxt}>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActionVal(false)}>
            <Text style={styles.ChangeTxt}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.BottomContainer}>
          <View style={styles.Content}>
            <Text style={styles.ContentTxt}>First Name</Text>
            <View style={styles.EditContent}>
              <TextInput
                placeholder="Athavan"
                disabled={actionVal}
                // value={textUsername}
                // onChangeText={(Username) => setTextUsername(Username)}
                selectionColor={colorConstant.primaryColor}
                underlineColor={colorConstant.proGreyLight}
                style={{
                  height: 40,
                  width: '90%',
                  backgroundColor: '#ffffff',
                  borderColor: 'red',
                }}
                pressRetentionOffset={console.log('rj;;;g ')}
              />
            </View>
          </View>
          <View style={styles.Content}>
            <Text style={styles.ContentTxt}>Last Name</Text>
            <View style={styles.EditContent}>
              <TextInput
                placeholder="Theivendram"
                disabled={actionVal}
                // value={textUsername}
                // onChangeText={(Username) => setTextUsername(Username)}
                selectionColor={colorConstant.primaryColor}
                underlineColor={colorConstant.proGreyLight}
                style={{
                  height: 40,
                  width: '90%',
                  backgroundColor: '#ffffff',
                  borderColor: 'red',
                }}
                pressRetentionOffset={console.log('rj;;;g ')}
              />
            </View>
          </View>
          <View style={styles.Content}>
            <Text style={styles.ContentTxt}>Address</Text>
            <View style={styles.EditContent}>
              <TextInput
                placeholder="Jaffna, SriLanka"
                disabled={actionVal}
                // value={textUsername}
                // onChangeText={(Username) => setTextUsername(Username)}
                selectionColor={colorConstant.primaryColor}
                underlineColor={colorConstant.proGreyLight}
                style={{
                  height: 40,
                  width: '90%',
                  backgroundColor: '#ffffff',
                  borderColor: 'red',
                }}
                pressRetentionOffset={console.log('rj;;;g ')}
              />
            </View>
          </View>
          <View style={styles.Content}>
            <Text style={styles.ContentTxt}>District</Text>
            <View style={styles.EditContent}>
              <TextInput
                placeholder="Jaffna"
                disabled={actionVal}
                // value={textUsername}
                // onChangeText={(Username) => setTextUsername(Username)}
                selectionColor={colorConstant.primaryColor}
                underlineColor={colorConstant.proGreyLight}
                style={{
                  height: 40,
                  width: Dimensions.get('window').width / 1.7,
                  backgroundColor: '#ffffff',
                  borderColor: 'red',
                }}
                pressRetentionOffset={console.log('rj;;;g ')}
              />
            </View>
          </View>
          <View style={styles.Content}>
            <Text style={styles.ContentTxt}>City</Text>
            <View style={styles.EditContent}>
              <TextInput
                placeholder="Jaffna"
                disabled={actionVal}
                // value={textUsername}
                // onChangeText={(Username) => setTextUsername(Username)}
                selectionColor={colorConstant.primaryColor}
                underlineColor={colorConstant.proGreyLight}
                style={{
                  height: 40,
                  width: Dimensions.get('window').width / 1.7,
                  backgroundColor: '#ffffff',
                  borderColor: 'red',
                }}
                pressRetentionOffset={console.log('rj;;;g ')}
              />
            </View>
          </View>
          <View style={styles.Content}>
            <Text style={styles.ContentTxt}>ZipCode</Text>
            <View style={styles.EditContent}>
              <TextInput
                placeholder="40000"
                disabled={actionVal}
                // value={textUsername}
                // onChangeText={(Username) => setTextUsername(Username)}
                selectionColor={colorConstant.primaryColor}
                underlineColor={colorConstant.proGreyLight}
                style={{
                  height: 40,
                  width: Dimensions.get('window').width / 1.7,
                  backgroundColor: '#ffffff',
                  borderColor: 'red',
                }}
                pressRetentionOffset={console.log('rj;;;g ')}
              />
            </View>
          </View>
          <View style={styles.Content}>
            <Text style={styles.ContentTxt}>Landline Number</Text>
            <View style={styles.EditContent}>
              <TextInput
                placeholder="021 224 1234"
                disabled={actionVal}
                // value={textUsername}
                // onChangeText={(Username) => setTextUsername(Username)}
                selectionColor={colorConstant.primaryColor}
                underlineColor={colorConstant.proGreyLight}
                style={{
                  height: 40,
                  width: Dimensions.get('window').width / 1.7,
                  backgroundColor: '#ffffff',
                  borderColor: 'red',
                }}
                pressRetentionOffset={console.log('rj;;;g ')}
              />
            </View>
          </View>
          {/* <View style={styles.Content}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={showModal}
              disabled={disValue}>
              <Text style={styles.ContentTxt}>Email</Text>
              <View style={styles.EditContent}>
                <TextInput
                  placeholder="Aaketk21"
                  disabled={true}
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
            </TouchableOpacity>
            <Portal style={styles.PortalContainer}>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                style={styles.containerStyle}>
                <View style={styles.ModalContentCon}>
                  <Text style={styles.ModalContentTxt}>
                    You cant change the verified fields. Contact administrators
                    for further information
                  </Text>
                </View>
              </Modal>
            </Portal>
          </View> */}
        </View>
      </ScrollView>
    </Provider>
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
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 5,
    // flex: 1,
    marginTop: Dimensions.get('window').width / 2,
    marginLeft: Dimensions.get('window').width / 15,
  },
  ModalContentCon: {
    //  marginLeft: 10,
    justifyContent: 'center',
  },
  ModalContentTxt: {
    fontSize: 18,
    fontFamily: 'Barlow-Regular',
    color: colorConstant.primaryColor,
    flexDirection: 'column',
    // alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

export default EditProfile;
