/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {RadioButton, Button} from 'react-native-paper';

const Registration = ({navigation}) => {
  const [value, setValue] = React.useState('person');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>We4Us</Text>
        <Image
          source={require('../assets/Images/Registration_image.png')}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height / 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footer_title}>Are You?</Text>
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PersonRegister')}
            style={styles.radioButton}>
            <View style={styles.radioButtonIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PersonRegister')}>
            <Text style={styles.radioButtonText}>A Person</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.radioButtonText1}>
            General user/ Volunteer / Driver
          </Text>
        </View>
        <View style={styles.radioButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrganizationRegister')}
            style={styles.radioButton}>
            <View style={styles.radioButtonIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('OrganizationRegister')}>
            <Text style={styles.radioButtonText}>Organization</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.radioButtonText1}>
            NGO / Charity Org/ Restaurant / Shop
          </Text>
          <View>
            <Text style={styles.bodytext}>Already have an account? </Text>

            <Button
              color="#3F5185"
              style={{
                flexDirection: 'column',
                height: 60,
                width: 100,
                marginTop: 5,
                left: 232,
                alignContent: 'flex-end',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#3F5185',
                backgroundColor: 'white',
                bottom: 15, 
              }}
              mode="outlined"
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.Btn}> Sign In </Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
  },
  footer: {
    flex: 1,
    backgroundColor: '#3F51B5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  footer_title: {
    fontSize: 25,
    fontStyle: 'normal',
    fontFamily: 'Barlow',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 45,
    fontStyle: 'normal',
    fontFamily: 'Barlow',
    color: '#3F51B5',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 45,
    height: 40,
  },
  radioButton: {
    height: 20,
    width: 20,
    backgroundColor: '#3F51B5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
  },
  radioButtonText: {
    fontSize: 23,
    marginLeft: 16,
    color: '#fff',
  },
  radioButtonText1: {
    fontSize: 20,
    marginLeft: 16,
    color: '#F5A623',
  },
  bodytext: {
    top: 25,
    fontSize: 18,
    marginLeft: 16,
    color: '#fff',
  },
  Btn: {
    fontSize: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
