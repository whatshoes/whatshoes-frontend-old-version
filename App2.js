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
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import BarcodeMask from 'react-native-barcode-mask';
import ImageEditor from '@react-native-community/image-editor';
import AutoHeightImage from 'react-native-auto-height-image';

function App2() {
  const camera = useRef(null);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const [showCamera, setShowCamera] = useState(true);
  const [imageWidth, setImageWidth] = useState();
  const [imageHeight, setImageHeight] = useState();
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    }
    getPermission();
  }, []);

  async function capturePhoto() {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setShowCamera(false);
      Image.getSize(
        photo.path,
        (Width, Height) => {
          const cropData = {
            offset: {
              x: parseInt(Width * 0.025),
              y: parseInt(Height * 0.5 - Width * 0.2375),
            },
            size: {
              width: parseInt(Width * 0.95),
              height: parseInt(Width * 0.475),
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
            outerMaskOpacity={0.5}
            edgeWidth="100%"
            edgeHeight="100%"
            edgeColor={'#FFFFFF'}
            edgeBorderWidth={5}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.camButton}
              onPress={() => capturePhoto()}
            />
          </View>
        </>
      ) : (
        <>
          <Button title="Launch Camera" onPress={() => setShowCamera(true)} />
          {imageSource !== '' ? (
            <AutoHeightImage
              width={Dimensions.get('window').width * 0.9}
              source={{uri: imageSource}}
            />
          ) : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camerastyle: {
    flex: 1,
  },
  button: {
    backgroundColor: 'gray',
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  image: {
    width: '90%',
    height: 'auto',
    resizeMode: 'cover',
  },
});

export default App2;
