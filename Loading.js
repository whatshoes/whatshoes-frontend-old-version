import {
  View,
  ImageProps,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import Ring from './images/Eclipse.gif';
import Logo from './images/shoesblack.png';
import Circle from './images/circle.png';

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
        style={{position: 'absolute', width: 75, height: 75}}
      />
      <Image
        source={Logo}
        style={{position: 'absolute', width: 60, height: 40}}
      />
      <Image
        source={require('./images/Eclipse.gif')}
        style={{width: 115, height: 115, marginTop: -5}}
      />
      <TouchableOpacity
        onPress={() => {
          setOpen(false);
          fadeIn();
        }}
        style={{
          position: 'absolute',
          bottom: 100,
          fontSize: 16,
          fontWeight: '500',
        }}>
        <Text>로딩 종료</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Loading;
