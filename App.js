import React from 'react';
//import RootRouter from './src/Router';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './src/screens/Main';
import ViewScreen1 from './src/modules/viewModules/Shoe1';
import ViewScreen2 from './src/modules/viewModules/Shoe2';
import ViewScreen3 from './src/modules/viewModules/Shoe3';
import ViewScreen4 from './src/modules/viewModules/Shoe4';
import ViewScreen5 from './src/modules/viewModules/Shoe5';
import ViewScreen6 from './src/modules/viewModules/Shoe6';
import ViewScreen7 from './src/modules/viewModules/Shoe7';
import ViewScreen8 from './src/modules/viewModules/Shoe8';
import ViewScreen9 from './src/modules/viewModules/Shoe9';
import ViewScreen10 from './src/modules/viewModules/Shoe10';

function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="View1" component={ViewScreen1} />
        <Stack.Screen name="View2" component={ViewScreen2} />
        <Stack.Screen name="View3" component={ViewScreen3} />
        <Stack.Screen name="View4" component={ViewScreen4} />
        <Stack.Screen name="View5" component={ViewScreen5} />
        <Stack.Screen name="View6" component={ViewScreen6} />
        <Stack.Screen name="View7" component={ViewScreen7} />
        <Stack.Screen name="View8" component={ViewScreen8} />
        <Stack.Screen name="View9" component={ViewScreen9} />
        <Stack.Screen name="View10" component={ViewScreen10} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
