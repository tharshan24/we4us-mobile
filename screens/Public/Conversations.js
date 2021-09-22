import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import {Spinner, Center, NativeBaseProvider, Heading} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import colorConstant from '../../constants/colorConstant';

const Conversations = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    getUser();
    getConversations();
    return navigation.addListener('focus', () => {
      getUser();
      getConversations();
    });
  }, [userId]);

  const getConversations = async () => {
    setData([]);
    try {
      await axios
        .get('http://10.0.2.2:8000/conversation/' + userId)
        .then(function (response) {
          // console.log(response.data);
          response.data.map((val) => {
            setData((prev) => [
              ...prev,
              {
                id: val._id,
                title: userName,
                sender: val.members[0],
                receiver: val.members[1],
              },
            ]);
          });
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const parsedValue = JSON.parse(jsonValue);
      if (parsedValue !== null) {
        setUserName(parsedValue.result.userName);
        setUserId(parsedValue.result.id);
      }
    } catch (e) {
      console.log(e);
    }

    console.log('Done.');
  };

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#7086e3' : '#e1e5ee';
    const color = item.id === selectedId ? 'white' : '#555454';

    const sendProps = (id) => {
      const value = data.find((val) => val.id === id);
      const senderReceiver = {
        sender: value.sender,
        receiver: value.receiver,
        conversationId: id,
        userId: userId,
      };
      navigation.navigate('chatComponent', {senderReceiver});
    };

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          sendProps(item.id);
        }}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <NativeBaseProvider>
      {data.length === 0 ? (
        <Center flex={1}>
          <Spinner size="lg" color={colorConstant.primaryColor} style={{}} />
          <Heading
            color="#BAC2C9"
            alignSelf={{
              base: 'center',
              md: 'flex-start',
            }}>
            No conversations to Show
          </Heading>
        </Center>
      ) : (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </SafeAreaView>
      )}
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    marginTop: 10,
    // width: Dimensions.get('screen').width,
  },
  item: {
    padding: 20,
    marginBottom: 7,
  },
  title: {
    fontSize: 25,
  },
});

export default Conversations;
