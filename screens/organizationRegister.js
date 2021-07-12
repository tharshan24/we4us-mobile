import React from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { Input, NativeBaseProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';


const OrganizationRegister = (props) => {
  const navigation = useNavigation();
  const [type, setType] = React.useState();
  const [name, setUsername] = React.useState();
  const [district, setDistrict] = React.useState();
  const [city, setCity] = React.useState();
  const [email, setEmail] = React.useState();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show); 
  const [showEmailError, setShowEmailError] = React.useState(false);

  const validateEmail = () => {
    console.log('blur');
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(email, re.test(email));
    setShowEmailError(!re.test(email));
    return re.test(email);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>We4Us</Text>
        <Image source={require('../assets/Images/Organization_image.png')}
          style={{
            width: 200,
            height: 200,
            left: 100,
            alignItems: "center"
          }} />
     
        <ScrollView >
          <NativeBaseProvider>
          <View style={styles.Inputtext}>
              <Input
                style={styles.textInput}
                placeholder="Type"
                onChangeText={(val) => setType(val)}
                value={type}
              />
</View>

            <View style={styles.Inputtext}>
              <Input
                style={styles.textInput}
                placeholder="Username"
                onChangeText={(val) => setUsername(val)}
                value={name}
              />

            </View>
            <View style={styles.Inputtext}>
              <Input
                style={styles.textInput}
                placeholder="District"
                onChangeText={(val) => setDistrict(val)}
                value={district}
              />
            </View>
            <View style={styles.Inputtext}>
              <Input
                style={styles.textInput}
                placeholder="City"
                onChangeText={(val) => setCity(val)}
                value={city}
              />
            </View>
            <View style={styles.Inputtext}>
              <Input
                style={styles.textInput}
                placeholder="Email"
                onChangeText={(val) => setEmail(val)}
                onBlur={() => validateEmail()}
                value={email}
              />
              {showEmailError ? <Text>Enter valid Email</Text> : null}
            </View>
            <View style={styles.Inputtext}>
            <Input
                type={show ? 'text' : 'password'}
                InputRightElement={
                  <Button
                    style={{
                      backgroundColor: '#3F5185',
                      justifyContent: 'center',
                      borderColor:'#3F5185',
                      alignItems: 'center',
                      height: 59,
                    }}
                    roundedRight="md"
                    roundedLeft={0}
                    onPress={handleClick}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                      }}>
                      {show ? 'Hide' : 'Show'}
                    </Text>
                  </Button>
                }
                style={styles.textInput}
                placeholder="Password"
              />
            </View>
            <View style={styles.Inputtext}>
            <Input
                type={show ? 'text' : 'password'}
                InputRightElement={
                  <Button
                    style={{
                      backgroundColor: '#3F5185',
                      justifyContent: 'center',
                      borderColor:'#3F5185',
                      alignItems: 'center',
                      height: 59,
                    }}
                    roundedRight="md"
                    roundedLeft={0}
                    onPress={handleClick}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                      }}>
                      {show ? 'Hide' : 'Show'}
                    </Text>
                  </Button>
                }
                style={styles.textInput}
                placeholder="Confirm Password"
              />
            </View>
          </NativeBaseProvider>
        
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
            top: 1,
            left: 130
          }}
          mode="outlined"
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.Btn}> Submit </Text>
        </Button>
        <View>
          <Text style={styles.bodytext} >Already have an account? </Text>

          <Button
            color="#3F5185"
            style={{
              flexDirection: 'column',
              height: 35,
              width: 100,
              marginTop: 5,
              left: 232,
              alignContent: 'flex-end',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#3F5185',
              backgroundColor: 'white'
            }}
            mode="outlined"
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.Btn}> Sign In </Text>
          </Button>


        </View>
        </ScrollView>
      </View>
      
    </SafeAreaView>
  );
}

export default OrganizationRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    flex: 2,

  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 110,
    paddingHorizontal: 30
  },
  footer_title: {
    fontSize: 25,
    fontStyle: "normal",
    fontFamily: "Barlow",
    color: "#000",
    fontWeight: "bold",
    textAlign: 'center'
  },
  title: {
    fontSize: 45,
    fontStyle: "normal",
    fontFamily: "Barlow",
    color: "#3F51B5",
    fontWeight: "bold",
    textAlign: 'center'
  },
  textInput: {
    height: 59,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#3F5185',
  },
  Inputtext: {
    marginTop: 4,
    marginBottom: 24,
    width: 334,
    left: 40,
  },
  PasswordInput: {
    height: 59,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    borderColor: '#3F5185',
  },
  Btn: {
    fontSize: 14,
  },
  bodytext: {
    top: 31,
    fontSize: 18,
    marginLeft: 16,
    color: '#000'
  },
});
