import React, {useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

function BrowseAvailability(props) {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [receiverId, setReceiverId] = useState(20);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    getConversations();
    return navigation.addListener('focus', () => {
      getConversations();
    });
  }, [userId]);

  const chatWindow = async () => {
    // console.log(conversations.length, 'ppppppppppppppppp');
    let flag = 0;
    conversations.map((val) => {
      if (
        val.members[0] === userId.toString() &&
        val.members[1] === receiverId.toString()
      ) {
        const senderReceiver = {
          sender: val.members[0],
          receiver: val.members[1],
          conversationId: val._id,
          userId: userId,
        };
        navigation.navigate('chatComponent', {senderReceiver});
      } else if (userId === receiverId) {
        const senderReceiver = {
          sender: val.members[0],
          receiver: val.members[1],
          conversationId: val._id,
          userId: userId,
        };
        navigation.navigate('chatComponent', {senderReceiver});
      } else {
        // console.log('varaatha');
        flag = flag + 1;
        // console.log(flag, 'mmmmmmmmmmmmm');
      }
    });

    if (conversations.length === flag) {
      await axios
        .post('http://10.0.2.2:5000/conversation', {
          senderId: userId.toString(),
          receiverId: receiverId.toString(),
        })
        .then(function (response) {
          const senderReceiver = {
            sender: userId.toString(),
            receiver: receiverId.toString(),
            conversationId: response.data._id,
            userId: userId,
          };
          navigation.navigate('chatComponent', {senderReceiver});
          flag = 0;
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  const getCurrentUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue !== null) {
        const value = JSON.parse(jsonValue);
        setUserId(value.result.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getConversations = async () => {
    try {
      await axios
        .get('http://10.0.2.2:5000/conversation/' + userId)
        .then(function (response) {
          // console.log(response.data);
          setConversations(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <View style={styles.txtCon}>
            <Text style={styles.headingTxt}>Wedding Lunch</Text>
          </View>
          {userId === receiverId ? null : (
            <View style={styles.iconCon}>
              <TouchableOpacity style={{marginRight: 20}} activeOpacity={0.7}>
                <MaterialCommunityIcons
                  name="phone"
                  color="#ffffff"
                  size={30}
                  style={{
                    backgroundColor: colorConstant.primaryColor,
                    borderRadius: 100,
                    padding: 7,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => chatWindow()}>
                <MaterialCommunityIcons
                  name="message-reply-text"
                  color="#ffffff"
                  size={30}
                  style={{
                    backgroundColor: colorConstant.primaryColor,
                    borderRadius: 100,
                    padding: 7,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
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
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Type :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>Vegetarian</Text>
            </View>
          </View>
          {/*txt2*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Created by :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>Theivendram Athavan</Text>
            </View>
          </View>
          {/*txt3*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Cooked Around :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}> 29/05/2021 | 02:00 PM</Text>
            </View>
          </View>
          {/*txt4*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Best before :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>29/05/2021 | 09:00 PM</Text>
            </View>
          </View>
          {/*txt5*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Count :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>45</Text>
            </View>
          </View>
          {/*txt6*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Location :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>Inuvil, Jaffna</Text>
            </View>
          </View>
          {/*txt7*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Event :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>Wedding Function</Text>
            </View>
          </View>
          {/*txt8*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Description :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>
                Rice meal with Dhal , Brinjal , Beans , Potato and Panneer
                Curries. Catering taken from MAHENDRANS.
              </Text>
            </View>
          </View>
          {/*txt9*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Delivery :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>Self Delivery</Text>
            </View>
          </View>
          {/*txt10*/}
          <View style={styles.txtContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.subHeadingTxt}>Utensils :</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.resultsTxt}>
                Utensils : Separate Containers for Rice and each Curries. All
                together 6 containers
              </Text>
            </View>
          </View>
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
                source={require('../../../assets/Images/food1.jpg')}
              />
            </View>
            <View style={styles.contentImageCon}>
              <Image
                style={styles.contentImage}
                source={require('../../../assets/Images/food2.jpg')}
              />
            </View>
            <View style={styles.contentImageCon}>
              <Image
                style={styles.contentImage}
                source={require('../../../assets/Images/food3.jpg')}
              />
            </View>
            <View style={styles.contentImageCon}>
              <Image
                style={styles.contentImage}
                source={require('../../../assets/Images/food4.jpg')}
              />
            </View>
          </Swiper>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
            <Text style={styles.btnTxt}>Accept</Text>
          </TouchableOpacity>
        </View>
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

export default BrowseAvailability;
