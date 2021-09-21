
import React, {useState, useEffect,useContext} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  InteractionManager,
StatusBar,
Alert 
} from 'react-native';
import {Button} from 'react-native-paper';
import constants from '../../constants/constantsProject.';
import axios from 'axios';
import SocketContext from '../../Context/SocketContext';
import colorConstant from '../../constants/colorConstant';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Addmember = ({route}) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const context = useContext(SocketContext);
const [id,setId] = useState();
const [userId,setUserid] = useState(0); 
const [data, setData] = useState(0);
 

  const getMemberData = async () => {
    try {
      await axios
        .get(constants.BASE_URL + 'org/getMembers/'+ search, {
          headers: {
            Authorization: `UserData ${context.token}`
            ,
          },
        })
        .then(function (response) {
          console.log(response.data);
          setFilteredDataSource(response.data.result.row);
          setMasterDataSource(response.data.result.row);
         setData(response.data.authData.user.id);
         // console.log(id);
        });
    } catch (e) {
      console.log(e);
    }
  };


  const searchFilterFunction = (text) => {
   setSearch(text);
  };

  const ItemView = ({item}) => {
    setUserid(item.id);
    return (
   
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
       
       
        {item.first_name}
        {'  '}
        {item.last_name}
      
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
 // useEffect(() => {
   // setId();
  //});
  const getItem = (item) => {

    Alert.alert(   "Add Member",
    (userId+" "+item.first_name+"  "+item.last_name),
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Add", onPress: () =>{
        validateFieldsTwo();
      } }
    ]);
  };
 // useEffect(() => {
   // getDataOne();
  //}, []);

  
  const validateFieldsTwo = async () => {
    const memberData={
      'user_id':userId,
      'organization_id':data
    }
      await axios({
        url: constants.BASE_URL + 'org/addMembers',
        method: 'post',
        data: memberData,
        headers: {
          Authorization:`UserData ${context.token}`,
          Accept: 'application/json',
        },
      })
        .then(function (response) {
          console.log(response.data);
          alert('Add member Successfully');
          navigation.popToTop();
         
          
        })
        .catch(function (error) {
          console.log(error);
          alert('Error ');
         
        });
    
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => {getMemberData(text),searchFilterFunction(text)}}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        
        <TouchableOpacity>
          <Text>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        
        />
        </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Addmember;