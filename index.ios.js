import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Main from './ios/app/components/Main';
import Login from './ios/app/components/Login';
import SignUp from './ios/app/components/SignUp';
import styles from './ios/app/style.js';

const newMobile = StackNavigator({
  Home: { screen: Login },
  SignUp: { screen: SignUp },
  Main: { screen: Main }
});

AppRegistry.registerComponent('newMobile', () => newMobile);
