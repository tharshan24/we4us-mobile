import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import colorConstant from '../constants/colorConstant';
import { Button } from 'react-native-paper';

function AddAction(props) {
  return (
    <View style={styles.screenCon}>
      <View style={styles.headerCon}>
        <Text style={styles.heading}>Create</Text>
      </View>
      <View style={styles.bodyCon}>
        <View style={styles.AvailabilityCon}>

          <View>
            <Text style={styles.headingtext}>Create Availabiity</Text>
            <Text style={styles.bodytext}>Nowadays worldwide a lot of people are starving without adequate food.
              At the same time, many people are wasting the extra food in their functions, events, and restaurants.
              So can you create and help others.
            </Text>
            <View style={styles.BtnContainer}>
              <Button
                color='green'
                style={{
                  flexDirection: 'column',
                  height: 50,
                  width: 180,
                  marginTop: 6,
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: colorConstant.proGreen,
                }}
                mode="contained"
                onPress={() => create()}>
                <Text style={styles.Btn}> Create </Text>
              </Button>
            </View>
          </View>

        </View>
        <View style={styles.AvailabilityCon2}>

          <View>
            <Text style={styles.headingtext}>Create Request</Text>
            <Text style={styles.bodytext}>During pandemic/disasters not everyone affected gets the support they need since they get unnoticed or unreachable. So can you create request and get a help. 


            </Text>
            <View style={styles.BtnContainer2}>
              <Button
                color='red'
                style={{
                  flexDirection: 'column',
                  height: 50,
                  width: 180,
                  marginTop: 6,
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: 'red',
                }}
                mode="contained"
                onPress={() => create()}>
                <Text style={styles.Btn}> Create </Text>
              </Button>
            </View>
          </View>

        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  screenCon: {
    flex: 9,
  },
  headerCon: {
    flex: 1,
    backgroundColor: colorConstant.primaryColor,
  },
  bodyCon: {
    flex: 8,
  },
  AvailabilityCon: {
    backgroundColor: '#ffffff',
    elevation: 0.5,
    marginTop: 12,
    width: 381,
    height: 259,
    borderRadius: 16,
    left: 14,
    top: 6,
    borderLeftColor: 'green',
    borderLeftWidth:5
  },
  AvailabilityCon2: {
    backgroundColor: '#ffffff',
    elevation: 0.5,
    marginTop: 12,
    width: 381,
    height: 229,
    borderRadius: 16,
    left: 14,
    top: 6,
    borderLeftColor: 'red',
    borderLeftWidth:5
  },
  heading: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    top: 15
  },
  headingtext: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 24,
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center'
  },
  bodytext: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.proGreyLight,
    justifyContent: 'center',
    textAlign: 'center',
    top: 13
  },
  header: {
    flex: 1,
    backgroundColor: colorConstant.primaryColor,
  },
  bodyCon: {
    flex: 8
  },
  BtnContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    left: 95,
    top: 16
  },
  Btn: {
    flexDirection: 'row',
    fontSize: 18,
    top: 45
  },
  BtnContainer2: {
    justifyContent: 'center',
    alignContent: 'center',
    left: 95,
    top: 25
  },

});

export default AddAction;
