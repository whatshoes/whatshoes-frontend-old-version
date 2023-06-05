import {
  View,
  ImageProps,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import Logo from '../../images/shoesblack.png';
import Circle from '../../images/circle.png';

const Loading = ({setOpen, fadeIn}) => {
  return (
    <View
      style={{
        posotion: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}>
      <Image
        source={Circle}
        style={{position: 'absolute', width: 65, height: 65}}
      />
      <Image
        source={Logo}
        style={{position: 'absolute', width: 52, height: 32}}
      />
      <TouchableOpacity
        onPress={() => {
          setOpen(false);
          fadeIn();
        }}>
        <Image
          source={require('../../assets/ring.gif')}
          style={{width: 98, height: 98, marginTop: -4}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Loading;
