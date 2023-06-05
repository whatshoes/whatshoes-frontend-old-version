import React, {
  Suspense,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Canvas,
  events,
  useFrame,
  useLoader,
  extend,
  group,
} from '@react-three/fiber/native';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {TextureLoader} from 'expo-three';
import useControls from 'r3f-native-orbitcontrols';

function Shoe(props) {
  const modelPath = {
    1: {
      texture: require('../../assets/shoes/class1.jpg'),
      material: require('../../assets/shoes/class1.mtl'),
      object: require('../../assets/shoes/class1.obj'),
    },
    2: {
      texture: require('../../assets/shoes/class2.jpg'),
      material: require('../../assets/shoes/class2.mtl'),
      object: require('../../assets/shoes/class2.obj'),
    },
    3: {
      texture: require('../../assets/shoes/class3.jpg'),
      material: require('../../assets/shoes/class3.mtl'),
      object: require('../../assets/shoes/class3.obj'),
    },
    4: {
      texture: require('../../assets/shoes/class4.jpg'),
      material: require('../../assets/shoes/class4.mtl'),
      object: require('../../assets/shoes/class4.obj'),
    },
    5: {
      texture: require('../../assets/shoes/class5.jpg'),
      material: require('../../assets/shoes/class5.mtl'),
      object: require('../../assets/shoes/class5.obj'),
    },
    6: {
      texture: require('../../assets/shoes/class6.jpg'),
      material: require('../../assets/shoes/class6.mtl'),
      object: require('../../assets/shoes/class6.obj'),
    },
    7: {
      texture: require('../../assets/shoes/class7.jpg'),
      material: require('../../assets/shoes/class7.mtl'),
      object: require('../../assets/shoes/class7.obj'),
    },
    8: {
      texture: require('../../assets/shoes/class8.jpg'),
      material: require('../../assets/shoes/class8.mtl'),
      object: require('../../assets/shoes/class8.obj'),
    },
    9: {
      texture: require('../../assets/shoes/class9.jpg'),
      material: require('../../assets/shoes/class9.mtl'),
      object: require('../../assets/shoes/class9.obj'),
    },
    10: {
      texture: require('../../assets/shoes/class10.jpg'),
      material: require('../../assets/shoes/class10.mtl'),
      object: require('../../assets/shoes/class10.obj'),
    },
  };

  const base = useLoader(TextureLoader, modelPath[props.modelNum].texture);
  const material = useLoader(MTLLoader, modelPath[props.modelNum].material);

  const obj = useLoader(OBJLoader, modelPath[props.modelNum].object, loader => {
    material.preload();
    loader.setMaterials(material);
  });

  useLayoutEffect(() => {
    obj.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.material.map = base;
      }
    });
  }, [obj]);

  const mesh = useRef();
  const copiedScene = useMemo(() => obj.clone(), [obj]);
  return (
    <mesh ref={mesh} rotation={[0, 2, 0]}>
      <primitive object={copiedScene} scale={9} />
    </mesh>
  );
}

function ShoesView({navigation, route}) {
  const [OrbitControls, events] = useControls();
  const [modelNum, setModelNum] = useState(route.params.classNum);

  useEffect(() => {
    setModelNum(route.params.classNum);
  }, [route.params.classNum]);

  return (
    <>
      <View {...events} style={{flex: 1, width: '100%'}}>
        <View style={{height: '100%', justifyContent: 'center'}}>
          <Canvas>
            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 3} />
            <ambientLight />
            {/* <pointLight position={[1, 1, 1]} /> */}
            <Suspense>
              <Shoe modelNum={modelNum} />
            </Suspense>
          </Canvas>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 60,
          left: '5%',
          backgroundColor: 'black',
          width: '90%',
          height: 90,
          borderRadius: 20,
          paddingLeft: 20,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: '500', color: 'white'}}>
          {route.params.brand}
        </Text>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '900',
            marginTop: 1,
            color: 'white',
          }}>
          {route.params.name}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: '8%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 40,
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
              //navigation.reset({routes: [{name: 'Main'}]});
              navigation.goBack();
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
            style={[styles.button, {marginLeft: '1%', zIndex: 1}]}>
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
    </>
  );
}

const styles = StyleSheet.create({
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
    zIndex: 10,
  },
});

export default React.memo(ShoesView);
