import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/Main';
import ViewScreen from '../screens/ShoesView';

const AuthStack = createStackNavigator(
  {
    HomeScreen: {screen: HomeScreen},
    ViewScreen: {screen: ViewScreen},
  },
  {
    initialRouteName: 'HomeScreen',
  },
);

// 최상단 네비게이터
const AppNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(AppNavigator);
