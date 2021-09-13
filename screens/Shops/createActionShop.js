import React from 'react';
import {View, Text, StyleSheet,ScrollView,TouchableOpacity,} from 'react-native';
import colorConstant from '../../constants/colorConstant';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

function CreateActionShop(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerCon}>
        <Text style={styles.mainHeadingTxt}>Create</Text>
      </View>
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.requestContainer}>
          <View style={styles.headingContainerReq}>
            <Text style={styles.headingText}>SELLING POINT</Text>
            <MaterialCommunityIcons
              name="card-account-details-outline"
              color={colorConstant.primaryColor}
              size={30}
              style={{
                marginTop: 2,
              }}
            />
          </View>
          <Text style={styles.bodyText}>
            During pandemic/disasters not everyone affected gets the support
            they need since they get unnoticed or unreachable. So can you create
            request and get a help.
          </Text>
          <View style={styles.btnContainerReq}>
            <Button
              onPress={() => navigation.navigate('sellingpointInputSetOne')}
              color={colorConstant.primaryColor}
              style={{
                borderRadius: 5,
              }}
              mode="contained">
              <Text style={styles.Btn}> Create </Text>
            </Button>
          </View>
        </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 9,
  },
  headerCon: {
    flex: 0.1,
    backgroundColor: colorConstant.primaryColor,
  },
  availabilityContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    elevation: 0.5,
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 44
  },
  requestContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    elevation: 0.5,
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 34
  },
  mainHeadingTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    top: 15,
  },
  headingText: {
    fontFamily: 'Barlow-Bold',
    fontSize: 24,
    color: colorConstant.primaryColor,
    marginRight: 15,
  },
  headingContainerAvailability: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  headingContainerReq: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
  bodyText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.proGreyLight,
    justifyContent: 'center',
    textAlign: 'justify',
    marginBottom: 15,
  },
  header: {
    flex: 1,
    backgroundColor: colorConstant.primaryColor,
  },
  bodyContainer: {
    flex: 8,
  },
  BtnContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 10,
  },
  Btn: {
    flexDirection: 'row',
    fontSize: 18,
    top: 45,
  },
  btnContainerReq: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default CreateActionShop;
