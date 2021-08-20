import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, TextInput} from 'react-native-paper';
import colorConstant from '../../constants/colorConstant';

const availabilityInputSetThree = () => {
  const navigation = useNavigation();

  const [quantity, setQuantity] = React.useState('');
  const [storageDesc, setStorageDesc] = React.useState('');

  const validateFieldsTwo = () => {
    navigation.navigate('availabilityInputSetThree');
    // if (quantity === '') {
    //   Alert.alert('Enter Amount of your Donation');
    // } else if (hour === 'HH') {
    //   Alert.alert('Select Cooked / Manufactured Time');
    // } else if (hourBestBefore === 'HH') {
    //   Alert.alert('Select Expiry or Best Before Time');
    // } else if (storageDesc === '') {
    //   Alert.alert('Give a Short Description about the Utensils');
    // } else {
    //   navigation.navigate('availabilityInputSetThree');
    // }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.textHeader}>
            {'Share Surplus food with the \nNeeded persons'}
          </Text>
        </View>
        <View style={styles.contentContainerQuantity}>
          <View style={styles.quantityTextCon}>
            <Text style={styles.quantityText}>Quantity</Text>
          </View>
          <View style={styles.textInputQuantity}>
            <TextInput
              keyboardType="number-pad"
              mode="outlined"
              label="Quantity"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={quantity}
              style={{
                fontSize: 20,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setQuantity(text)}
            />
          </View>
        </View>
        <View style={styles.contentContainerCookedTime}>
          <View style={styles.cookedTimeTextCon}>
            <Text style={styles.cookedTimeText}>
              Cooked / Manufactured Time
            </Text>
          </View>
        </View>
        <View style={styles.contentContainerBestBefore}>
          <View style={styles.bestBeforeTextCon}>
            <Text style={styles.bestBeforeText}>Best Before / Expiry Date</Text>
          </View>
        </View>
        <View style={styles.contentContainerStorage}>
          <View style={styles.storageDescriptionTextCon}>
            <Text style={styles.storageDescriptionText}>
              Storage Description
            </Text>
          </View>
          <View style={styles.textInputStorageDesc}>
            <TextInput
              mode="outlined"
              label="Storage Description"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={storageDesc}
              multiline={true}
              numberOfLines={10}
              style={{
                fontSize: 20,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setStorageDesc(text)}
            />
          </View>
        </View>
        <View style={styles.contentContainerBtnTwo}>
          <Button
            mode="contained"
            onPress={() => validateFieldsTwo()}
            style={{
              width: 120,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colorConstant.primaryColor,
            }}>
            <Text style={{fontFamily: 'Barlow-Bold', fontSize: 20}}>Next</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  //main Container
  mainContainer: {
    height: Dimensions.get('screen').height,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff',
  },
  //heading
  headingContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    flex: 0.1,
  },
  textHeader: {
    fontFamily: 'Barlow-Bold',
    textAlign: 'center',
    fontSize: 22,
    color: colorConstant.primaryColor,
  },
  //name
  contentContainerQuantity: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInputQuantity: {
    width: Dimensions.get('screen').width / 1.1,
  },
  quantityText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  quantityTextCon: {
    flex: 0.6,
  },
  //cooked Time
  contentContainerCookedTime: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
  },
  cookedTimeTextCon: {
    flex: 0.3,
  },
  cookedTimeText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //cater
  contentContainerBestBefore: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
  },
  bestBeforeTextCon: {
    flex: 0.3,
  },
  bestBeforeText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //description
  contentContainerStorage: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
  },
  descriptionHeading: {
    flexDirection: 'column',
  },
  storageDescriptionText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  storageDescriptionTextCon: {
    flex: 0.6,
  },
  textInputStorageDesc: {
    flex: 4,
    width: Dimensions.get('screen').width / 1.1,
  },
  //button
  contentContainerBtnTwo: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
    width: Dimensions.get('screen').width / 1.1,
  },
});

export default availabilityInputSetThree;
