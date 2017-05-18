import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Main from './ios/app/components/Main';
import Login from './ios/app/components/Login';
import SignUp from './ios/app/components/SignUp';
import CreateUser from './ios/app/components/CreateUser';
import ChangeUser from './ios/app/components/ChangeUser';
import styles from './ios/app/style.js';


const newMobile = StackNavigator({
  Home: { screen: Login },
  SignUp: { screen: SignUp },
  Main: { screen: Main },
  CreateUser: { screen: CreateUser },
  ChangeUser: { screen: ChangeUser }
});

AppRegistry.registerComponent('newMobile', () => newMobile);
