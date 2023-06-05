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
import titleImage from '../../images/What.png';
import subImage from '../../images/Shoe.png';
import shoesImage from '../../images/shoes.png';
import SubInfo from '../modules/subInfo';
import air from '../../images/converse2.png';
import openURL from '../modules/openURL';
import Loading from '../modules/Loading';
import axios from 'axios';
import image1 from '../../images/shoes/1.jpg';
import image2 from '../../images/shoes/2.jpg';
import image3 from '../../images/shoes/3.jpg';
import image4 from '../../images/shoes/4.jpg';
import image5 from '../../images/shoes/5.jpg';
import image6 from '../../images/shoes/6.jpg';
import image7 from '../../images/shoes/7.jpg';
import image8 from '../../images/shoes/8.jpg';
import image9 from '../../images/shoes/9.jpg';
import image10 from '../../images/shoes/10.jpg';
import image11 from '../../images/shoes/11.jpg';
import image12 from '../../images/shoes/12.jpg';
import image13 from '../../images/shoes/13.jpg';

function Main({navigation}) {
  const camera = useRef(null);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0));
  const [afterEncoding, setAfterEncoding] = useState();

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
  const [activeView, setActiveView] = useState(false);
  const [shoesName, setShoesName] = useState('');
  const [shoesCode, setShoesCode] = useState('');
  const [shoesBrand, setShoesBrand] = useState('');
  const [shoesCategory, setShoesCategory] = useState('');
  const [shoesColor, setShoesColor] = useState('');
  const [shoesPrice, setShoesPrice] = useState('');
  const [shoesURL, setShoesURL] = useState('');
  const [shoesClass, setShoesClass] = useState('');

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    }
    getPermission();
  }, []);

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
            fetch(url)
              .then(response => response.blob())
              .then(blob => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                  const base64data = reader.result;
                  const regex =
                    /data:image\/(?<extension>[\w]+);base64,(?<image>[\w+/=]+)/;
                  const match = base64data.match(regex);
                  const imageData = match.groups.image;
                  axios
                    .post('http://211.62.179.135:4000/fsl/test', {
                      img: imageData,
                    })
                    .then(response => {
                      setShoesName(response.data.name);
                      setShoesBrand(response.data.brand);
                      setShoesCategory(response.data.category);
                      setShoesCode(response.data.productcode);
                      setShoesColor(response.data.color);
                      setShoesPrice(response.data.price);
                      setShoesURL(response.data.url);
                      setShoesClass(response.data.shoesclass);
                      setOpen(false);
                      fadeIn();
                    })
                    .catch(error => {
                      console.error(error);
                    });
                };
              });
            // ImgToBase64.getBase64String(url) //is is where you put image url from the ImagePicker
            //   .then(base64String => {
            //     setAfterEncoding(base64String);
            //     console.log('진입');
            //     console.log(base64String);
            //     console.log('성공했어요...', afterEncoding);
            //   })
            //   .catch(err => console.log('에러났어요...', err));
          });
        },
        error => {
          console.log(error);
        },
      );
    }
  }
  async function savePhoto(data) {
    const filename = 'test.jpeg';
    await RNFS.moveFile(data, `${RNFS.PicturesDirectoryPath}/${filename}`);
  }

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
          />
          <BarcodeMask
            width={Dimensions.get('window').width * 0.95}
            height={Dimensions.get('window').width * 0.475}
            showAnimatedLine={false}
            outerMaskOpacity={0.75}
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
          setShowCamera(true);
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
            {/* {imageSource !== '' ? (
              <AutoHeightImage
                width={Dimensions.get('window').width * 0.9}
                source={{uri: imageSource}}
              />
            ) : null} */}
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
                <Text style={{fontSize: 25, fontWeight: '500'}}>
                  {shoesBrand}
                </Text>
                <Text style={{fontSize: 50, fontWeight: '900', marginTop: 5}}>
                  {shoesName}
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
                  {shoesClass == '1' ? (
                    <AutoHeightImage
                      width={Dimensions.get('window').width * 0.7}
                      source={image1}
                    />
                  ) : shoesClass == '2' ? (
                    <AutoHeightImage
                      width={Dimensions.get('window').width * 0.7}
                      source={image2}
                    />
                  ) : shoesClass == '3' ? (
                    <AutoHeightImage
                      width={Dimensions.get('window').width * 0.7}
                      source={image3}
                    />
                  ) : shoesClass == '4' ? (
                    <AutoHeightImage
                      width={Dimensions.get('window').width * 0.7}
                      source={image4}
                    />
                  ) : shoesClass == '5' ? (
                    <AutoHeightImage
                      width={Dimensions.get('window').width * 0.7}
                      source={image5}
                    />
                  ) : shoesClass == '6' ? (
                    <AutoHeightImage
                      width={Dimensions.get('window').width * 0.7}
                      source={image6}
                    />
                  ) : shoesClass == '7' ? (
                    <AutoHeightImage
                      width={Dimensions.get('window').width * 0.7}
                      source={image7}
                    />
                  ) : shoesClass == '8' ? (
                    <AutoHeightImage
                      width={Dimensions.get('window').width * 0.7}
                      source={image8}
                    />
                  ) : shoesClass == '9' ? (
                    <AutoHeightImage
                      width={Dimensions.get('window').width * 0.7}
                      source={image9}
                    />
                  ) : shoesClass == '10' ? (
                    <AutoHeightImage
                      width={Dimensions.get('window').width * 0.7}
                      source={image10}
                    />
                  ) : shoesClass == '11' ? (
                    <AutoHeightImage
                      width={Dimensions.get('window').width * 0.7}
                      source={image11}
                    />
                  ) : shoesClass == '12' ? (
                    <AutoHeightImage
                      width={Dimensions.get('window').width * 0.7}
                      source={image12}
                    />
                  ) : shoesClass == '13' ? (
                    <AutoHeightImage
                      width={Dimensions.get('window').width * 0.7}
                      source={image13}
                    />
                  ) : (
                    <></>
                  )}
                  <TouchableOpacity
                    style={{
                      borderColor: 'gray',
                      borderWidth: 1,
                      width: '40%',
                      height: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 30,
                    }}
                    onPress={() => {
                      setIsModalVisible(false);
                      setShowCamera(true);
                      navigation.navigate('View', {
                        classNum: shoesClass,
                        name: shoesName,
                        brand: shoesBrand,
                      });
                    }}>
                    <Text style={{fontSize: 20}}>3D View</Text>
                  </TouchableOpacity>
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
            <SubInfo title={'브랜드'} detail={shoesBrand} />
            <SubInfo title={'카테고리'} detail={shoesCategory} />
            <SubInfo title={'상품코드'} detail={shoesCode} />
            <SubInfo title={'색상'} detail={shoesColor} />
            <SubInfo title={'가격'} detail={shoesPrice} />
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
                  onPress={() => openURL(shoesURL)}>
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
    width: '50%',
    position: 'absolute',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    top: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.8,
    shadowRadius: 30,
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

export default Main;
