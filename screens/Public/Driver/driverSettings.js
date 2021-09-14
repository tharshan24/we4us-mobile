import React, {useState} from 'react';
import {Dimensions, Text, View, StyleSheet, ScrollView} from 'react-native';
import {
  NativeBaseProvider,
  Select,
  Spinner,
  HStack,
  Switch,
  VStack,
  Input,
} from 'native-base';
import colorConstant from '../../../constants/colorConstant';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function DriverSettings(props) {
  const [bank, setBank] = useState(null);
  const [accNo, setAccNo] = useState(null);
  const [show, setShow] = React.useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const handleClick = () => setShow(!show);
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.paymentType}>
          <View style={styles.headingPayment}>
            <Text style={styles.headingTxt}>PAYMENT TYPE</Text>
          </View>
          <View style={styles.contentSwitch}>
            <View style={styles.contentTxtContainer}>
              <Text style={styles.contentTxt}>
                {isEnabled
                  ? `Now in PAID Driver mode`
                  : 'Now in FREE Driver mode'}
              </Text>
            </View>
            <View style={styles.switchBtn}>
              <HStack>
                <Switch
                  colorScheme="primary"
                  size="lg"
                  onToggle={toggleSwitch}
                  isChecked={isEnabled}
                />
              </HStack>
            </View>
          </View>
        </View>
        <View style={styles.accountDetails}>
          <View style={styles.accountHeading}>
            <Text style={styles.accHeadingTxt}>{`ACCOUNT DETAILS`}</Text>
          </View>
          <View style={styles.selectors}>
            <View style={styles.bankCon}>
              <VStack>
                <Select
                  style={{
                    fontSize: 20,
                    backgroundColor: '#ffffff',
                    borderWidth: 1,
                    borderColor: colorConstant.primaryColor,
                  }}
                  width={Dimensions.get('screen').width / 1.1}
                  selectedValue={bank}
                  placeholder="Select Bank"
                  onValueChange={(itemValue) => setBank(itemValue)}>
                  <Select.Item label="BOC" value="boc" />
                  <Select.Item label="HNB" value="hnb" />
                  <Select.Item label="Commerical" value="com" />
                </Select>
              </VStack>
            </View>
            <View style={styles.accNumber}>
              <View
                style={{
                  flex: 4,
                  justifyContent: 'center',
                  marginRight: 10,
                }}>
                <Input
                  text="password"
                  mode="outlined"
                  placeholder="Account Number"
                  keyboardType="numeric"
                  type={show ? 'text' : 'password'}
                  value={accNo}
                  _focus={{
                    fontSize: 20,
                    backgroundColor: '#ffffff',
                    borderColor: colorConstant.primaryColor,
                  }}
                  style={{
                    height: 60,
                    borderWidth: 1,
                    borderColor: colorConstant.primaryColor,
                    fontSize: 20,
                    backgroundColor: '#ffffff',
                  }}
                  onChangeText={(text) => setAccNo(text)}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <Button
                  mode="contained"
                  onPress={handleClick}
                  style={{
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colorConstant.primaryColor,
                  }}>
                  {show ? (
                    <MaterialCommunityIcons
                      name="eye-outline"
                      color="#ffffff"
                      size={30}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="eye-off-outline"
                      color="#ffffff"
                      size={30}
                    />
                  )}
                </Button>
              </View>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Button
              mode="contained"
              style={{
                width: 120,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colorConstant.primaryColor,
              }}>
              <Text style={{fontFamily: 'Barlow-Bold', fontSize: 20}}>
                Submit
              </Text>
            </Button>
          </View>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 18,
            color: '#aaaaaa',
            fontFamily: 'Barlow-SemiBold',
            textAlign: 'center',
          }}>
          {`Register your Bank Details and \n Account Number to become a Paid Driver`}
        </Text>
      </View>
    </NativeBaseProvider>
  );
}

export default DriverSettings;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: Dimensions.get('window').height / 1.5,
    // backgroundColor: 'red',
    alignItems: 'center',
    // overflow: 'hidden',
  },
  paymentType: {
    // backgroundColor: 'red',
    flex: 0.2,
    marginTop: 30,
    justifyContent: 'center',
    width: Dimensions.get('screen').width / 1.1,
  },
  headingPayment: {
    flex: 1,
    // backgroundColor: '#34ff34',
  },
  contentSwitch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentTxtContainer: {
    flex: 2,
  },
  switchBtn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  accountDetails: {
    flex: 0.8,
    width: Dimensions.get('screen').width / 1.1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
  },
  accountHeading: {
    flex: 0.1,
    marginBottom: 10,
  },
  selectors: {
    flex: 0.5,
  },
  bankCon: {
    flex: 1,
    justifyContent: 'center',
  },
  accNumber: {
    flex: 1,
    flexDirection: 'row',
  },
  btnContainer: {
    flex: 0.1,
    alignItems: 'flex-end',
    marginTop: 15,
  },
  headingTxt: {
    fontFamily: 'Barlow-Bold',
    fontSize: 22,
    color: colorConstant.primaryColor,
  },
  accHeadingTxt: {
    fontFamily: 'Barlow-Bold',
    fontSize: 22,
    color: colorConstant.primaryColor,
  },
  contentTxt: {
    fontFamily: 'Barlow-SemiBold',
    fontSize: 20,
    color: '#585858',
  },
});
