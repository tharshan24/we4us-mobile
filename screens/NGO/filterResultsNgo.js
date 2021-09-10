import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import colorConstant from '../../constants/colorConstant';
import {
  Slider,
  Stack,
  Box,
  NativeBaseProvider,
  Select,
  VStack,
  CheckIcon,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function FilterResultsNgo(props) {
  const [mode1, setMode1] = React.useState('contained');
  const [sortMode1, setSortMode1] = React.useState('contained');
  const [sortMode4, setSortMode4] = React.useState('contained');
  const [mode2, setMode2] = React.useState('outlined');
  const [sortMode2, setSortMode2] = React.useState('outlined');
  const [sortMode5, setSortMode5] = React.useState('outlined');
  const [mode3, setMode3] = React.useState('outlined');
  const [sortMode3, setSortMode3] = React.useState('outlined');
  const [sortMode6, setSortMode6] = React.useState('outlined');
  const [onChangeValue, setOnChangeValue] = React.useState(30);
  const [district, setDistrict] = React.useState('Jaffna');
  const [city, setCity] = React.useState('Kokuvil');

  const changeMode1 = () => {
    setMode1('contained');
    setMode2('outlined');
    setMode3('outlined');
  };
  const changeMode2 = () => {
    setMode2('contained');
    setMode1('outlined');
    setMode3('outlined');
  };
  const changeMode3 = () => {
    setMode3('contained');
    setMode2('outlined');
    setMode1('outlined');
  };
  const SortChangeMode1 = () => {
    setSortMode1('contained');
    setSortMode2('outlined');
    setSortMode3('outlined');
  };
  const SortChangeMode2 = () => {
    setSortMode2('contained');
    setSortMode1('outlined');
    setSortMode3('outlined');
  };
  const SortChangeMode3 = () => {
    setSortMode3('contained');
    setSortMode2('outlined');
    setSortMode1('outlined');
  };
  const SortChangeMode4 = () => {
    setSortMode4('contained');
    setSortMode5('outlined');
    setSortMode6('outlined');
  };
  const SortChangeMode5 = () => {
    setSortMode5('contained');
    setSortMode4('outlined');
    setSortMode6('outlined');
  };
  const SortChangeMode6 = () => {
    setSortMode6('contained');
    setSortMode5('outlined');
    setSortMode4('outlined');
  };

  return (
    <NativeBaseProvider>
      <View style={styles.mainContainer}>
        <View style={styles.typeContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingTxt}>Type</Text>
          </View>
          <View style={styles.btnContainer}>
            <Button
              mode={mode1}
              color={colorConstant.primaryColor}
              style={{
                marginRight: 10,
              }}
              onPress={() => changeMode1()}>
              Any
            </Button>
            <Button
              mode={mode2}
              color={colorConstant.primaryColor}
              style={{
                marginRight: 10,
              }}
              onPress={() => changeMode2()}>
              Vegetarian
            </Button>
            <Button
              mode={mode3}
              color={colorConstant.primaryColor}
              onPress={() => changeMode3()}>
              Non-Vegetarian
            </Button>
          </View>
        </View>
        <View style={styles.countContainer}>
          <View style={styles.countTxtContainer}>
            <Text style={styles.headingTxt}>Count</Text>
          </View>
          <View style={styles.sliderContainer}>
            <Stack w="100%">
              <Box w="350">
                <Slider
                  defaultValue={30}
                  colorScheme="blue"
                  onChange={(v) => {
                    setOnChangeValue(Math.floor(v));
                  }}>
                  <Slider.Track>
                    <Slider.FilledTrack bg="#3F51B5" />
                  </Slider.Track>
                  <Slider.Thumb bg="#3F51B5">
                    <Text style={styles.sliderValue}>{onChangeValue}</Text>
                  </Slider.Thumb>
                </Slider>
              </Box>
            </Stack>
          </View>
        </View>
        <View style={styles.districtContainer}>
          <View>
            <Text style={styles.headingTxt}>District</Text>
          </View>
          <View>
            <VStack>
              <Select
                selectedValue={district}
                minWidth={200}
                style={{
                  height: 40,
                }}
                placeholder={district}
                placeholderTextColor={'#3F51B5'}
                onValueChange={(itemValue) => setDistrict(itemValue)}>
                <Select.Item label="JavaScript" value="js" />
                <Select.Item label="TypeScript" value="ts" />
                <Select.Item label="C" value="c" />
                <Select.Item label="Python" value="py" />
                <Select.Item label="Java" value="java" />
              </Select>
            </VStack>
          </View>
        </View>
        <View style={styles.cityContainer}>
          <View>
            <Text style={styles.headingTxt}>City</Text>
          </View>
          <View>
            <VStack>
              <Select
                selectedValue={city}
                minWidth={200}
                style={{
                  height: 40,
                }}
                placeholder={city}
                placeholderTextColor={'#3F51B5'}
                onValueChange={(itemValue) => setCity(itemValue)}>
                <Select.Item label="JavaScript" value="js" />
                <Select.Item label="TypeScript" value="ts" />
                <Select.Item label="C" value="c" />
                <Select.Item label="Python" value="py" />
                <Select.Item label="Java" value="java" />
              </Select>
            </VStack>
          </View>
        </View>
        <View style={styles.sortContainer}>
          <View style={styles.headingContainerSort}>
            <Text style={styles.headingTxt}>Sort</Text>
          </View>
          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeadingTxt}>Low</Text>
            <MaterialCommunityIcons
              name="play"
              color={colorConstant.primaryColor}
              size={20}
              style={{
                margin: 2,
              }}
            />
            <Text style={styles.subHeadingTxt}>High</Text>
          </View>
          <View style={styles.btnSortContainer}>
            <Button
              mode={sortMode1}
              color={colorConstant.primaryColor}
              style={{
                marginRight: 10,
              }}
              onPress={() => SortChangeMode1()}>
              Count
            </Button>
            <Button
              mode={sortMode2}
              color={colorConstant.primaryColor}
              style={{
                marginRight: 10,
              }}
              onPress={() => SortChangeMode2()}>
              Expiry Date
            </Button>
            <Button
              mode={sortMode3}
              color={colorConstant.primaryColor}
              onPress={() => SortChangeMode3()}>
              Distance
            </Button>
          </View>
          <View style={styles.subHeadingContainer}>
            <Text style={styles.subHeadingTxt}>High</Text>
            <MaterialCommunityIcons
              name="play"
              color={colorConstant.primaryColor}
              size={20}
              style={{
                margin: 2,
              }}
            />
            <Text style={styles.subHeadingTxt}>Low</Text>
          </View>
          <View style={styles.btnSortContainer}>
            <Button
              mode={sortMode4}
              color={colorConstant.primaryColor}
              style={{
                marginRight: 10,
              }}
              onPress={() => SortChangeMode4()}>
              Count
            </Button>
            <Button
              mode={sortMode5}
              color={colorConstant.primaryColor}
              style={{
                marginRight: 10,
              }}
              onPress={() => SortChangeMode5()}>
              Expiry Date
            </Button>
            <Button
              mode={sortMode6}
              color={colorConstant.primaryColor}
              onPress={() => SortChangeMode6()}>
              Distance
            </Button>
          </View>
        </View>
        <View style={styles.updateContainer}>
          <Button
            mode="contained"
            color={colorConstant.primaryColor}
            style={{
              width: Dimensions.get('window').width / 2,
            }}>
            Update
          </Button>
        </View>
      </View>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  typeContainer: {
    flex: 2.5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 10,
    marginBottom: 7,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
  },
  countContainer: {
    flex: 2.5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 7,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
  },
  districtContainer: {
    flex: 1.5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  cityContainer: {
    flex: 1.5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  sortContainer: {
    flex: 6,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 5,
    marginBottom: 4,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
  },
  updateContainer: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  headingContainer: {
    marginBottom: 10,
  },
  headingContainerSort: {
    marginBottom: 10,
  },
  countTxtContainer: {
    marginBottom: 10,
  },
  headingTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 23,
    color: colorConstant.primaryColor,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnSortContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
    marginBottom: 13,
  },
  sliderContainer: {
    alignItems: 'center',
  },
  sliderValue: {
    marginTop: 20,
    width: 30,
    fontFamily: 'Barlow-Bold',
    fontSize: 15,
    color: colorConstant.primaryColor,
  },
  subHeadingContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 7,
  },
  subHeadingTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 15,
    color: colorConstant.primaryColor,
  },
});
export default FilterResultsNgo;
