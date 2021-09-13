import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colorConstant from '../../../constants/colorConstant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';

function OngoingSellingpointDetails(props) {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <View style={styles.txtCon}>
            <Text style={styles.headingTxt}>{'Selling Point'}</Text>
          </View>
          <View style={styles.iconCon}>
            <TouchableOpacity style={{marginRight: 20}} activeOpacity={0.7}>
              <MaterialCommunityIcons
                name="delete-outline"
                color="#ffffff"
                size={30}
                style={{
                  backgroundColor: colorConstant.proRed,
                  borderRadius: 100,
                  padding: 7,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: colorConstant.proGreen,
            borderBottomWidth: 3,
            marginLeft: 15,
            marginRight: 15,
            marginTop: 15,
          }}
        />
        <View style={styles.contentContainer}>
          {/*txt2*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Created by :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>Rotaract Club</Text>
            </View>
          </View>
          {/*txt3*/}
          {/*txt4*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Assigned to :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>Mithula Tharmarasa</Text>
            </View>
          </View>
          {/*txt5*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Start Time :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>29/05/2021 | 09:00 AM</Text>
            </View>
          </View>
           {/*txt*/}
           <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>End Time :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>29/05/2021 | 06:00 PM</Text>
            </View>
          </View>
          {/*txt6*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Count :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>45</Text>
            </View>
          </View>
          {/*txt7*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Location :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>Valvettithurai, Jaffna</Text>
            </View>
          </View>
          {/*txt8*/}
          {/*txt9*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Description :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>
                Biscuit
              </Text>
            </View>
          </View>
          {/*txt10*/}
          {/*txt11*/}
        </View>
        <View style={styles.imageContainer}>
          <Swiper
            showsPagination={false}
            showsButtons={false}
            style={{
              height: Dimensions.get('window').height / 3,
              borderRadius: 10,
            }}>
            <View style={styles.contentImageCon}>
              <Image
                style={styles.contentImage}
                source={require('../../../assets/Images/collection.png')}
              />
            </View>
          </Swiper>
        </View>
        {/*<View style={styles.btnContainer}>*/}
        {/*  <TouchableOpacity style={styles.btn} activeOpacity={0.8}>*/}
        {/*    <Text style={styles.btnTxt}>Accept</Text>*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 100,
  },
  headingContainer: {
    flex: 5,
    paddingLeft: 20,
    paddingRight: 25,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 25,
    color: colorConstant.primaryColor,
  },
  contentContainer: {
    flex: 70,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 13,
    flexDirection: 'column',
  },
  imageContainer: {
    padding: 10,
    flex: 1,
    width: Dimensions.get('window').width,
  },
  txtCon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeadingTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 16,
    color: '#727E8E',
  },
  txtContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  resultsTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 16,
    color: '#727E8E',
  },
  contentImageCon: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width,
    marginRight: 10,
  },
  contentImage: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width,
  },
  btnContainer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: colorConstant.proGreen,
    padding: 10,
    width: Dimensions.get('window').width / 3,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontFamily: 'Barlow-SemiBold',
    color: '#ffffff',
    fontSize: 20,
  },
});

export default OngoingSellingpointDetails;
