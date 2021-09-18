
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

} from 'react-native';
import {Button} from 'react-native-paper';
import constants from '../../constants/constantsProject.';
import axios from 'axios';
import SocketContext from '../../Context/SocketContext';
import colorConstant from '../../constants/colorConstant';

const Addmember = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const context = useContext(SocketContext);
const [id,setId] = useState();
const [user_id,setUserid] = useState(); 
 

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
          setLoading(false);
          setId(response.data.result.row.id);
          console.log(id);
        });
    } catch (e) {
      console.log(e);
    }
  };


  const searchFilterFunction = (text) => {
   setSearch(text);
  };

  const ItemView = ({item}) => {
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

  const getItem = (item) => {

   setUserid(item.id);
   console.log(user_id);
  };

  const validateFieldsTwo = async () => {
    
      
      const memberData = new FormData();

      memberData.append('user_id', user_id);
      memberData.append('organization_id', id);
  
      await axios({
        url: constants.BASE_URL + 'org/addMembers',
        method: 'post',
        data: memberData,
        headers: {
          Authorization:`UserData ${context.token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          console.log(response.data);
          alert('Add member Successfully');
          navigation.popToTop();
          removeAllInputs();
          
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
        <TouchableOpacity onPress={() => {
                  validateFieldsTwo();
                }}>
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
});

export default Addmember;