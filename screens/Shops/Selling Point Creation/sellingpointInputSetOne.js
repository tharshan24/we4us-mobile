import React from 'react';
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
import colorConstant from '../../../constants/colorConstant';
import {Select, VStack, NativeBaseProvider} from 'native-base';

const sellingpointInputSetOne = () => {
  const navigation = useNavigation();

  const [title, setTitle] = React.useState('');
  const [member, setMember] = React.useState('');
  const [desc, setDesc] = React.useState('');

  const validateFields = () => {
    navigation.navigate('sellingpointInputSetTwo');
    // if (title === '') {
    //   Alert.alert('Enter Title for your Donation');
    // } else if (foodType === '') {
    //   Alert.alert('Select your Donation Food Type');
    // } else if (foodCater === '') {
    //   Alert.alert('Select your Donation Food Category');
    // } else if (desc === '') {
    //   Alert.alert('Give a Small description for your Donation');
    // } else {
    //   navigation.navigate('availabilityInputSetTwo');
    // }
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.textHeader}>
            {'During pandamic/disaster time '}
          </Text>
        </View>
        <View style={styles.contentContainerName}>
          <View style={styles.nameTextCon}>
            <Text style={styles.nameText}>Title</Text>
          </View>
          <View style={styles.textInputContent}>
            <TextInput
              mode="outlined"
              label="Title"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={title}
              style={{
                fontSize: 20,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
        </View>
        <View style={styles.contentContainerCater}>
          <View style={styles.foodCateTextCon}>
            <Text style={styles.foodCateText}>Assigned To</Text>
          </View>
          <View style={{flex: 3}}>
            <NativeBaseProvider>
              <VStack>
                <Select
                  style={{
                    fontSize: 20,
                    backgroundColor: '#ffffff',
                    borderWidth: 1,
                    borderColor: colorConstant.primaryColor,
                  }}
                  width={Dimensions.get('screen').width / 1.1}
                  selectedValue={member}
                  placeholder="Select Member"
                  onValueChange={(itemValue) => setMember(itemValue)}>
                  <Select.Item label="Mithula Tharmarasa" value="mithula" />
                  <Select.Item label="Mathura Muthulingam" value="mathura" />
                  <Select.Item label="Balachandaran Piriyatharshan" value="piriyatharshan" />
                  <Select.Item label="Theivendram Athavan" value="athavan" />
                  <Select.Item label="Thishan Jude" value="thishan" />
                </Select>
              </VStack>
            </NativeBaseProvider>
          </View>
        </View>
        <View style={styles.contentContainerDes}>
          <View style={styles.descriptionTextCon}>
            <Text style={styles.descriptionText}>Description</Text>
          </View>
          <View style={styles.textInputDes}>
            <TextInput
              mode="outlined"
              label="Describe your Selling Point"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={desc}
              multiline={true}
              numberOfLines={10}
              style={{
                fontSize: 20,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setDesc(text)}
            />
          </View>
        </View>
        <View style={styles.contentContainerBtn}>
          <Button
            mode="contained"
            onPress={() => validateFields()}
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
  contentContainerName: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textInputContent: {
    width: Dimensions.get('screen').width / 1.1,
  },
  nameText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  nameTextCon: {
    flex: 0.6,
  },
  //type
  contentContainerType: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  foodTypeTextCon: {
    flex: 1.5,
  },
  foodTypeText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //cater
  contentContainerCater: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  foodCateTextCon: {
    flex: 1.5,
  },
  foodCateText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  //description
  contentContainerDes: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 20,
  },
  descriptionHeading: {
    flexDirection: 'column',
  },
  descriptionText: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: colorConstant.primaryColor,
  },
  descriptionTextCon: {
    flex: 0.6,
  },
  textInputDes: {
    flex: 4,
    width: Dimensions.get('screen').width / 1.1,
  },
  //button
  contentContainerBtn: {
    flexDirection: 'row-reverse',
    marginBottom: 20,
    width: Dimensions.get('screen').width / 1.1,
  },
});

export default sellingpointInputSetOne;
