import React, {useState, useCallback, useEffect, useContext} from 'react';
import {View, ImageBackground} from 'react-native';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import colorConstant from '../../constants/colorConstant';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import SocketContext from '../../Context/SocketContext';

const ChatComponent = ({route}) => {
  const socket = useContext(SocketContext);
  const {senderReceiver} = route.params;
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    socket.on('getMessage', (data) => {
      setArrivalMessage({
        _id: data.msgId,
        user: {
          _id: data.senderId,
        },
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    setMessages((val) => [...val, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    socket.emit('addUser', senderReceiver.userId);
  }, [senderReceiver.userId]);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colorConstant.primaryColor,
            borderRadius: 5,
            marginBottom: 20,
            elevation: 2,
          },
          left: {
            backgroundColor: '#fcfbfb',
            borderRadius: 5,
            marginBottom: 20,
            elevation: 1.3,
            marginLeft: 0,
          },
        }}
        textStyle={{
          right: {
            color: '#ffffff',
            fontFamily: 'Barlow-Regular',
            fontSize: 18,
          },
          left: {
            fontFamily: 'Barlow-Regular',
            fontSize: 18,
          },
        }}
      />
    );
  };

  const renderSend = (values) => {
    return (
      <Send {...values}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 5,
            marginRight: 6,
          }}>
          <MaterialCommunityIcons
            name="send-circle"
            size={50}
            color={colorConstant.primaryColor}
          />
        </View>
      </Send>
    );
  };

  const scrollToBottom = (values) => {
    return (
      <MaterialCommunityIcons
        name="chevron-double-down"
        size={25}
        color={colorConstant.primaryColor}
      />
    );
  };

  const inputToolBar = (values) => {
    return (
      <InputToolbar
        {...values}
        containerStyle={{
          // marginLeft: 15,
          // marginRight: 15,
          // marginBottom: 10,
          // borderWidth: 0.5,
          elevation: 0,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: 10,
          // borderColor: 'grey',
          // borderRadius: 25,
        }}
      />
    );
  };

  const getMessages = async () => {
    try {
      await axios
        .get('http://10.0.2.2:5000/messages/' + senderReceiver.conversationId)
        .then(function (response) {
          response.data.map((val) => {
            setMessages((prev) => [...prev, val]);
          });
        });
    } catch (e) {
      console.log(e);
    }
  };

  const onSend = useCallback(async (text) => {
    setMessages((previousMessages) =>
      GiftedChat.prepend(previousMessages, text),
    );

    if (senderReceiver.userId !== parseInt(senderReceiver.receiver)) {
      socket.emit('sendMessage', {
        msgId: text[0]._id,
        senderId: senderReceiver.userId,
        receiverId: parseInt(senderReceiver.receiver),
        text: text[0].text,
        conversationId: senderReceiver.conversationId,
      });
    } else {
      socket.emit('sendMessage', {
        msgId: text[0]._id,
        senderId: senderReceiver.userId,
        receiverId: parseInt(senderReceiver.sender),
        text: text[0].text,
        conversationId: senderReceiver.conversationId,
      });
    }

    // await axios
    //   .post('http://10.0.2.2:5000/messages', {
    //     conversationId: senderReceiver.conversationId,
    //     text: text[0].text,
    //     user: {
    //       _id: text[0].user._id,
    //     },
    //   })
    //   .then(function (response) {
    //     // console.log(response.data);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
  }, []);

  return (
    <>
      <ImageBackground
        source={require('../../assets/Images/chatBg.jpg')}
        resizeMode="cover"
        style={{flex: 1, justifyContent: 'center'}}>
        <GiftedChat
          messages={messages}
          onSend={(text) => onSend(text)}
          user={{
            _id: senderReceiver.userId,
          }}
          renderBubble={renderBubble}
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          alignTop={true}
          inverted={false}
          scrollToBottomComponent={scrollToBottom}
          infiniteScroll
          maxInputLength={200}
          renderInputToolbar={inputToolBar}
          isTyping={true}
          // renderAvatar={renderAvatar}
          renderAvatar={() => null}
          showAvatarForEveryMessage={true}
          textInputStyle={{
            fontFamily: 'Barlow-Regular',
            color: '#000000',
            fontSize: 20,
          }}
        />
      </ImageBackground>
    </>
  );
};

export default ChatComponent;
