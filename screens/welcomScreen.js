/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, Dimensions, StyleSheet, Image, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Button} from 'react-native-paper';

const Welcome_page = ({navigation}) => (
  <View style={styles.container}>
    <SwiperFlatList
      showPagination
      paginationDefaultColor="#CACFE7"
      paginationActiveColor="#3F5185"
      paginationStyle={{width: 0.5, height: 56}}>
      <View style={styles.child}>
        <View style={styles.slide}>
          <Text style={styles.title}>Welcome</Text>
          <Image
            source={require('../assets/Images/Welcome_page_image1.png')}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height/2,
              top: 14,
              left: 12,
              alignItems: 'center',
            }}
          />
          <View style={styles.desc}>
            <Text style={styles.description}>
              Thank you for installing. Get more into We4Us and explore the
              features and give hands.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.child}>
        <View style={styles.slide}>
          <Text style={styles.title}>Welcome</Text>
          <Image
            source={require('../assets/Images/Welcome_page_image2.png')}
            style={{
              width: 339,
              height: 309,
              top: 16,
              left: 12,
              alignItems: 'center',
            }}
          />
          <View style={styles.desc}>
            <Text style={styles.description}>
              We4Us! We are here for all of us. Connect with everyone,share that
              is going as waste and identify others needs and fulfill them.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.child}>
        <View style={styles.slide}>
          <Text style={styles.title}>Welcome</Text>
          <Image
            source={require('../assets/Images/Welcome_page_image3.png')}
            style={{
              width: 359,
              height: 309,
              top: 14,
              left: 12,
              alignItems: 'center',
            }}
          />
          <View style={styles.desc}>
            <Text style={styles.description}>
              Don't waste your excess food. Share it with the people who are
              suffering to get food.Your every sharing can feed.Your every
              sharing can feed people who are struggling to get better foods
              onece a day.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.child}>
        <View style={styles.slide}>
          <Text style={styles.title}>Welcome</Text>
          <Image
            source={require('../assets/Images/Welcome_page_image4.png')}
            style={{
              width: 389,
              height: 339,
              top: 14,
              left: 12,
              alignItems: 'center',
            }}
          />
          <View style={styles.desc}>
            <Text style={styles.description}>
              Request your needs during disaster and pandemic situation and
              Obtain the nearby your place.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.child}>
        <View style={styles.slide}>
          <Text style={styles.title}>Welcome</Text>
          <Image
            source={require('../assets/Images/Welcome_page_image5.png')}
            style={{
              width: 329,
              height: 269,
              top: 14,
              left: 20,
              alignItems: 'center',
            }}
          />
          <View style={styles.desc}>
            <Text style={styles.description}>
              Organize a camp or fund programme for collecting and donating
              required thiing for the people in need.
            </Text>
          </View>
          <View
            style={{
              top: 10,
              left: 100,
              width: 150,
              height: 50,
              borderRadius: 20,
              paddingHorizontal: 30,
              paddingVertical: -40,
            }}>
            <Button
              color="white"
              style={{
                flexDirection: 'column',
                height: 60,
                width: 150,
                marginTop: 5,
                justifyContent: 'center',
                borderRadius: 5,
                borderWidth: 1,
                backgroundColor: '#3F5185',
              }}
              mode="outlined"
              onPress={() => navigation.navigate('Registration')}>
              <Text style={styles.Btn}> Get started </Text>
            </Button>
          </View>
        </View>
      </View>
    </SwiperFlatList>
  </View>
);

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  child: {
    width,
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center',
  },
  slide: {
    width: 232,
    height: 72,
    top: 21,
    left: 7,
  },
  title: {
    fontSize: 55,
    fontStyle: 'normal',
    fontFamily: 'Barlow',
    color: '#3F51B5',
    fontWeight: 'bold',
  },
  description: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  desc: {
    left: 12,
    width: 350,
    height: 117,
    top: 33,
    alignItems: 'center',
  },
  Btn: {
    fontSize: 12,
    fontSize: 14,
  },
});

export default Welcome_page;
