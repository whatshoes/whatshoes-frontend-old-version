import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  Modal,
} from 'react-native';

function SubInfo({title, detail}) {
  return (
    <View
      style={{
        width: '85%',
        height: '7%',
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: '30%',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: '800'}}>{title}</Text>
      </View>
      <View
        style={{
          width: '70%',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <Text style={{fontSize: 20, fontWeight: '300'}}>{detail}</Text>
      </View>
    </View>
  );
}

export default SubInfo;
