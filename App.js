import React, {useEffect, useState, useRef} from 'react';
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
  Linking,
  Animated,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import BarcodeMask from 'react-native-barcode-mask';
import ImageEditor from '@react-native-community/image-editor';
import AutoHeightImage from 'react-native-auto-height-image';
import titleImage from './images/What.png';
import subImage from './images/Shoe.png';
import shoesImage from './images/shoes.png';
import SubInfo from './subInfo';
import air from './images/air.png';
import openURL from './openURL';
import Loading from './Loading';

function App() {
  // const camera = useRef(null);
  // const devices = useCameraDevices('wide-angle-camera');
  // const device = devices.back;
  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 1000,
    }).start();
  };

  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   async function getPermission() {
  //     const newCameraPermission = await Camera.requestCameraPermission();
  //     console.log(newCameraPermission);
  //   }
  //   getPermission();
  // }, []);

  useEffect(() => {
    if (isModalVisible == false) {
      setFadeAnimation(new Animated.Value(0));
    }
  }, [isModalVisible]);

  async function capturePhoto() {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setShowCamera(false);
      Image.getSize(
        photo.path,
        (Width, Height) => {
          let WidthBorder =
            Width -
            (Height * Dimensions.get('window').width) /
              Dimensions.get('window').height;
          let imageWidgh = Width - WidthBorder;
          let imageHeight = Height;
          const cropData = {
            offset: {
              x: parseInt(imageWidgh * 0.025 + WidthBorder / 2),
              y: parseInt(imageHeight * 0.5 - imageWidgh * 0.2375),
            },
            size: {
              width: parseInt(imageWidgh * 0.95),
              height: parseInt(imageWidgh * 0.475),
            },
          };
          ImageEditor.cropImage(photo.path, cropData).then(url => {
            setImageSource(url);
            savePhoto(url);
          });
        },
        error => {
          console.log(error);
        },
      );
    }
  }
  async function savePhoto(data: string) {
    const filename = 'test.jpeg';
    await RNFS.moveFile(data, `${RNFS.PicturesDirectoryPath}/${filename}`);
  }

  // if (device == null) {
  //   return <Text>Camera not available</Text>;
  // }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          {/* <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
          /> */}
          <BarcodeMask
            width={Dimensions.get('window').width * 0.95}
            height={Dimensions.get('window').width * 0.475}
            showAnimatedLine={false}
            outerMaskOpacity={0.85}
            edgeWidth="100%"
            edgeHeight="100%"
            edgeColor={'#FFFFFF'}
            edgeBorderWidth={5}
          />
          <View style={styles.title}>
            <AutoHeightImage
              width={Dimensions.get('window').width * 0.2}
              source={shoesImage}
            />
            <AutoHeightImage
              width={Dimensions.get('window').width * 0.25}
              source={titleImage}
            />
            <AutoHeightImage
              width={Dimensions.get('window').width * 0.25}
              source={subImage}
            />
          </View>
          <View style={styles.photobox}>
            <View
              style={{
                width: '100%',
                height: 7,
                backgroundColor: 'white',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '97%',
                  height: 2,
                  backgroundColor: '#eceff1',
                }}></View>
            </View>
          </View>
          <View style={styles.guide}>
            <View
              style={{
                backgroundColor: 'white',
                width: Dimensions.get('window').width * 0.95,
                height: '15%',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: '400',
                  marginRight: 5,
                }}>
                여기에 신발을 맞춰주세요.
              </Text>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 11,
                  fontWeight: '200',
                  marginRight: 5,
                }}>
                ₩ 000,000,000
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.camButton}
              onPress={() => {
                capturePhoto();
                setIsModalVisible(true);
                setOpen(true);
              }}
            />
          </View>
        </>
      ) : null}
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
          console.log('modal appearance');
        }}
        presentationStyle={'pageSheet'}>
        {open == false ? (
          <Animated.View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              opacity: fadeAnimation,
            }}>
            {imageSource !== '' ? (
              <AutoHeightImage
                width={Dimensions.get('window').width * 0.9}
                source={{uri: imageSource}}
              />
            ) : null}
            <View
              style={{
                width: '90%',
                height: '40%',
              }}>
              <View
                style={{
                  width: '100%',
                  height: '30%',
                  marginTop: '10%',
                }}>
                <Text style={{fontSize: 25, fontWeight: '500'}}>나이키</Text>
                <Text style={{fontSize: 50, fontWeight: '900', marginTop: 5}}>
                  에어포스
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: '60%',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: '70%',
                    height: '90%',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <AutoHeightImage
                    width={Dimensions.get('window').width * 0.7}
                    source={air}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                width: '90%',
                height: 3,
                backgroundColor: 'black',
                marginTop: 20,
                marginBottom: 20,
              }}></View>
            <SubInfo title={'브랜드'} detail={'나이키'} />
            <SubInfo title={'카테고리'} detail={'운동화'} />
            <SubInfo title={'상품코드'} detail={'DV0788-100'} />
            <SubInfo title={'색상'} detail={'흰색'} />
            <SubInfo title={'가격'} detail={'₩ 139,000'} />
            <View
              style={{
                position: 'absolute',
                bottom: 30,
                width: '100%',
                height: '9%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: 'white',
                      borderColor: 'black',
                      borderWidth: 2,
                      marginRight: '1%',
                    },
                  ]}
                  onPress={() => {
                    setShowCamera(true);
                    setIsModalVisible(false);
                    fadeOut();
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '600',
                      fontSize: 20,
                    }}>
                    돌아가기
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, {marginLeft: '1%'}]}
                  onPress={() =>
                    openURL(
                      'https://www.nike.com/kr/t/에어-포스-1-07-남성-신발-EJLt1dnh/DV0788-100?utm_source=Google&utm_medium=PS&utm_campaign=365DIGITAL_Google_SP_pMAX_all_all&utm_term=pMax.af1&cp=19808619078_sh_&gclid=Cj0KCQjwi46iBhDyARIsAE3nVrbls9h4XcUxGCU97ZY0FgsMYX0wEnIqOxt1JXa0gMmthtNrBROZqAwaAvEvEALw_wcB',
                    )
                  }>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      fontSize: 20,
                    }}>
                    사러가기
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        ) : (
          <Loading setOpen={setOpen} fadeIn={fadeIn} />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5dc',
  },
  camerastyle: {
    flex: 1,
  },
  title: {
    height:
      (Dimensions.get('window').height / 2 -
        (Dimensions.get('window').width * 0.475) / 2) *
      0.75,
    width: '45%',
    position: 'absolute',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    top: 0,
  },
  photobox: {
    height:
      Dimensions.get('window').height / 2 -
      (Dimensions.get('window').width * 0.475) / 2,
    width: '95%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: 0,
  },
  button: {
    width: '48%',
    height: '85%',
    //marginBottom: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.0,
    elevation: 5,
  },
  guide: {
    height:
      Dimensions.get('window').height / 2 -
      (Dimensions.get('window').width * 0.475) / 2,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    bottom: 60,
    padding: 20,
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 10,
    // backgroundColor: 'white',
    alignSelf: 'center',
  },
  image: {
    width: '90%',
    height: 'auto',
    resizeMode: 'cover',
  },
});

export default App;
