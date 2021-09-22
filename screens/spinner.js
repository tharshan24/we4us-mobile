import React, {useContext, useEffect, useState} from 'react';
import {
  Spinner,
  HStack,
  Heading,
  Center,
  NativeBaseProvider,
} from 'native-base';
import axios from 'axios';
import constants from '../constants/constantsProject.';
import {useNavigation} from '@react-navigation/native';
import SocketContext from '../Context/SocketContext';

const spinnerLoading = ({route}) => {
  const {paramm} = route.params;
  const navigation = useNavigation();
  const context = useContext(SocketContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getParams();
  }, []);

  const getParams = async () => {
    await axios({
      url:
        constants.BASE_URL + 'availability/getAVailabilityDeliveries/' + paramm,
      method: 'get',
      headers: {
        Authorization: `loading ${context.token}`,
      },
    })
      .then(function (response) {
        console.log(response.data, 'qqqqqqqqqqqqqqqqqqqqqqqq');
        if (response.data.status_code === 0) {
          console.log(
            response.data.result,
            'llllllrrrrrrrrrrrrrrrrrljjjllvvvvvvvvlllll',
          );
          navigation.navigate('DonationTrackingMap', {
            info: response.data.result,
          });
        } else {
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return loading ? (
    <Spinner />
  ) : (
    <NativeBaseProvider>
      <Center>
        <HStack space={2} alignItems="center">
          <Heading color="primary.500" fontSize="md">
            Loading
          </Heading>
        </HStack>
      </Center>
    </NativeBaseProvider>
  );
};

export default spinnerLoading;
